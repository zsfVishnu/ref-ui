import { useState, useEffect, useCallback } from 'react';
import { referralEventsApi, ReferralEvent, ApiResponse } from '@/lib/api';

interface UseReferralEventsReturn {
  referralEvents: ReferralEvent[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useReferralEvents(): UseReferralEventsReturn {
  console.log("referral events called")
  const [referralEvents, setReferralEvents] = useState<ReferralEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all referral events
  const fetchReferralEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response: ApiResponse<ReferralEvent[]> = await referralEventsApi.getAll();
      console.log("referral events")
      console.log(response)
      
      if (response.success && response.data && Array.isArray(response.data)) {
        setReferralEvents(response.data);
      } else {
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
