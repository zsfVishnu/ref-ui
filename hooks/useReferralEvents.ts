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
    console.log('Fetching referral events for user:', user);
    setIsLoading(true);
    setError(null);

    try {
      if (!user?.role) {
        console.warn('No user role found, skipping referral events fetch');
        setError('User not authenticated');
        setReferralEvents([]);
        return;
      }

      const response = user?.role === 'candidate' 
        ? await referralEventsApi.getAll()
        : await referralEventsApi.getAllOfMine(user?.email || '');

      console.log('Referral events API response:', response);

      if (response.success && response.data && Array.isArray(response.data)) {
        console.log('Setting referral events data:', response.data);
        setReferralEvents(response.data);
      } else {
        console.warn('Referral events API failed:', response);
        setError(response.error || 'Failed to fetch referral events');
        setReferralEvents([]);
      }
    } catch (err) {
      console.error('Error fetching referral events:', err);
      setError('An unexpected error occurred');
      setReferralEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial fetch - only when user is available
  useEffect(() => {
    if (user) {
      fetchReferralEvents();
    } else {
      setIsLoading(false);
      setReferralEvents([]);
    }
  }, [user, fetchReferralEvents]);

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
