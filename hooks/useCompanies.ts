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

const dummyData: Company[] = 
[
  {
    id: 4,
    name: "apple",
    careersUrl: "https://www.apple.com/careers/us/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/apple.jpeg"
  },
  {
    id: 3,
    name: "amazon",
    careersUrl: "https://www.amazon.jobs/en/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/amazon.jpeg"
  },
  {
    id: 1,
    name: "microsoft",
    careersUrl: "https://careers.microsoft.com/us/en/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/microsoft.png"
  },
  {
    id: 6,
    name: "tiktok",
    careersUrl: "https://careers.tiktok.com/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/tiktok.jpg"
  },
  {
    id: 21,
    name: "meta",
    careersUrl: "https://www.metacareers.com/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/meta.jpeg"
  },
  {
    id: 2,
    name: "google",
    careersUrl: "https://careers.google.com/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/google.jpeg"
  },
  {
    id: 315,
    name: "oracle",
    careersUrl: "https://www.oracle.com/careers/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/oracle.png"
  },
  {
    id: 429,
    name: "jpmorgan",
    careersUrl: "https://careers.jpmorgan.com/us/en/home",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/jpmorgan.png"
  },
  {
    id: 146,
    name: "leidos",
    careersUrl: "https://careers.leidos.com/search/jobs/in/wa-washington",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/leidos.jpeg"
  },
  {
    id: 230,
    name: "tesla",
    careersUrl: "https://www.tesla.com/careers/search",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/tesla.png"
  }
]


export function useCompanies(): UseCompaniesReturn {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all companies
  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse<Company[]> = await companiesApi.getAll();

      if (response.success && response.data && Array.isArray(response.data)) {
        setCompanies(response.data);
      } else {
        setError(response.error || 'Failed to fetch companies');
        // Fallback to empty array if API fails
        setCompanies([]);
      }
      setCompanies(dummyData)
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
