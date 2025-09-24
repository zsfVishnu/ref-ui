import { useState, useEffect, useCallback } from 'react';
import { appliedReferralsApi, AppliedReferral, ApiResponse } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface UseAppliedReferralsReturn {
  appliedReferrals: AppliedReferral[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAppliedReferrals(): UseAppliedReferralsReturn {
  const { user } = useAuth();
  const [appliedReferrals, setAppliedReferrals] = useState<AppliedReferral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all applied referrals
  const fetchAppliedReferrals = useCallback(async () => {
    console.log('Fetching applied referrals for user:', user?.email);
    setIsLoading(true);
    setError(null);

    try {
      if (!user || !user.email) {
        console.warn('No user email found, skipping applied referrals fetch');
        setError('An unexpected error occurred. Email address is required');
        setAppliedReferrals([]);
        return;
      } else {
        const response: ApiResponse<AppliedReferral[]> = await appliedReferralsApi.getAll(
          user?.email
        );
        console.log('Applied referrals API response:', response);
        
        if (response.success && response.data && Array.isArray(response.data)) {
          console.log('Setting applied referrals data:', response.data);
          setAppliedReferrals(response.data);
        } else {
          console.warn('Applied referrals API failed:', response);
          setError(response.error || 'Failed to fetch applied referrals');
          setAppliedReferrals([]);
        }
      }
    } catch (err) {
      console.error('Error fetching applied referrals:', err);
      setError('An unexpected error occurred');
      setAppliedReferrals([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial fetch - only when user is available
  useEffect(() => {
    if (user && user.email) {
      fetchAppliedReferrals();
    } else {
      setIsLoading(false);
      setAppliedReferrals([]);
    }
  }, [user, fetchAppliedReferrals]);

  return {
    appliedReferrals,
    isLoading,
    error,
    refetch: fetchAppliedReferrals,
  };
}
