import { useState, useEffect, useCallback } from 'react';
import { appliedReferralsApi, AppliedReferral, ApiResponse } from '@/lib/api';

interface UseAppliedReferralsReturn {
  appliedReferrals: AppliedReferral[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAppliedReferrals(): UseAppliedReferralsReturn {
  const [appliedReferrals, setAppliedReferrals] = useState<AppliedReferral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all applied referrals
  const fetchAppliedReferrals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response: ApiResponse<AppliedReferral[]> = await appliedReferralsApi.getAll();
      
      if (response.success && response.data && Array.isArray(response.data)) {
        setAppliedReferrals(response.data);
      } else {
        setError(response.error || 'Failed to fetch applied referrals');
        setAppliedReferrals([]);
      }
    } catch (err) {
      console.error('Error fetching applied referrals:', err);
      setError('An unexpected error occurred');
      setAppliedReferrals([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAppliedReferrals();
  }, [fetchAppliedReferrals]);

  return {
    appliedReferrals,
    isLoading,
    error,
    refetch: fetchAppliedReferrals,
  };
}
