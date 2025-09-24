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
    id: 1,
    name: "apple",
    careersUrl: "https://www.apple.com/careers/us/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/apple.jpeg"
  },
  {
    id: 2,
    name: "amazon",
    careersUrl: "https://www.amazon.jobs/en/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/amazon.jpeg"
  },
  {
    id: 3,
    name: "microsoft",
    careersUrl: "https://careers.microsoft.com/us/en/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/microsoft.png"
  },
  {
    id: 4,
    name: "tiktok",
    careersUrl: "https://careers.tiktok.com/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/tiktok.jpg"
  },
  {
    id: 5,
    name: "meta",
    careersUrl: "https://www.metacareers.com/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/meta.jpeg"
  },
  {
    id: 6,
    name: "google",
    careersUrl: "https://careers.google.com/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/google.jpeg"
  },
  {
    id: 7,
    name: "oracle",
    careersUrl: "https://www.oracle.com/careers/",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/oracle.png"
  },
  {
    id: 8,
    name: "jpmorgan",
    careersUrl: "https://careers.jpmorgan.com/us/en/home",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/jpmorgan.png"
  },
  {
    id: 9,
    name: "leidos",
    careersUrl: "https://careers.leidos.com/search/jobs/in/wa-washington",
    logo: "https://rcwbvvurvrnrzdwmsquz.supabase.co/storage/v1/object/public/logos/leidos.jpeg"
  },
  {
    id: 10,
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
        // Fallback to dummy data if API fails
        console.log('Using fallback dummy data for companies');
        setCompanies(dummyData);
      }
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('An unexpected error occurred');
      // Fallback to dummy data on error
      console.log('Using fallback dummy data due to error');
      setCompanies(dummyData);
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
