import { useState, useEffect, useCallback } from 'react';
import { companiesApi, Company, ApiResponse } from '@/lib/api';

interface UseCompaniesReturn {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchCompanies: (query: string) => Promise<void>;
  filterByTag: (tag: string) => Promise<void>;
}

// removed dummyData; always rely on backend


export function useCompanies(): UseCompaniesReturn {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all companies
  const fetchCompanies = useCallback(async () => {
    console.log('Fetching companies...');
    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse<Company[]> = await companiesApi.getAll();
      console.log('Companies API response:', response);

      if (response.success && response.data && Array.isArray(response.data)) {
        console.log('Setting companies data:', response.data);
        setCompanies(response.data);
      } else {
        console.warn('Companies API failed or returned invalid data:', response);
        setError(response.error || 'Failed to fetch companies');
        setCompanies([]);
      }
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('An unexpected error occurred');
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search companies
  const searchCompanies = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        await fetchCompanies();
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response: ApiResponse<Company[]> = await companiesApi.search(query);

        if (response.success && response.data && Array.isArray(response.data)) {
          setCompanies(response.data);
        } else {
          setError(response.error || 'Search failed');
          setCompanies([]);
        }
      } catch (err) {
        console.error('Error searching companies:', err);
        setError('Search failed');
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCompanies]
  );

  // Filter companies by tag
  const filterByTag = useCallback(
    async (tag: string) => {
      if (!tag || tag === 'All') {
        await fetchCompanies();
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response: ApiResponse<Company[]> = await companiesApi.getByTag(tag);

        if (response.success && response.data && Array.isArray(response.data)) {
          setCompanies(response.data);
        } else {
          setError(response.error || 'Filter failed');
          setCompanies([]);
        }
      } catch (err) {
        console.error('Error filtering companies:', err);
        setError('Filter failed');
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCompanies]
  );

  // Initial fetch
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    isLoading,
    error,
    refetch: fetchCompanies,
    searchCompanies,
    filterByTag,
  };
}
