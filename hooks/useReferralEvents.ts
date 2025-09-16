import { useState, useEffect, useCallback } from 'react';
import { referralEventsApi, ReferralEvent, ApiResponse } from '@/lib/api';
import {useAuth} from "@/contexts/AuthContext";

interface UseReferralEventsReturn {
  referralEvents: ReferralEvent[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useReferralEvents(): UseReferralEventsReturn {
  const [referralEvents, setReferralEvents] = useState<ReferralEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {user} = useAuth()

  // Fetch all referral events
  const fetchReferralEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
        console.log("user for referral events", user);
        if (!user?.role) {
            console.error('Error fetching referral events. Invalid email id of referrer');
            setError('An unexpected error occurred');
            setReferralEvents([]);
        } else {
            const response = user?.role == 'candidate' ? await referralEventsApi.getAll()
                : await referralEventsApi.getAllOfMine(user?.email);

            if (response.success && response.data && Array.isArray(response.data)) {
                setReferralEvents(response.data);
            } else {
                setError(response.error || 'Failed to fetch referral events');
                setReferralEvents([]);
            }
        }
    } catch (err) {
      console.error('Error fetching referral events:', err);
      setError('An unexpected error occurred');
      setReferralEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchReferralEvents();
  }, [fetchReferralEvents]);

  return {
    referralEvents,
    isLoading,
    error,
    refetch: fetchReferralEvents,
  };
}
