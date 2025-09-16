import { API_CONFIG, buildApiUrl } from './config';

// Types for API responses
export interface Company {
  id: number;
  name: string;
  logo: string;
  tags: string[];
  careersUrl: string;
  description?: string;
  industry?: string;
  size?: string;
  location?: string;
}

export interface ReferralEvent {
  id: number;
  company: string;
  logo: string;
  job_title: string;
  location: string;
  applicants: number;
  max_applicants: number;
  expiry_date: string;
  posted_by: string;
  requirements: string;
  job_url: string;
  tags: string[];
}

export interface AppliedReferral {
  id: number;
  company: string;
  logo: string;
  jobTitle: string;
  location: string;
  created_at: string;
  expiry_date: string;
  status: 'pending' | 'resume shortlisted' | 'rejected';
  posted_by: string;
  notes: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: string;
  applicationDeadline?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = buildApiUrl(endpoint);

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    // Create an AbortController for timeout functionality
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data,
      success: true,
    };
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);

    // Handle specific error types
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to server. Please check if the API server is running.';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      data: null as T,
      success: false,
      error: errorMessage,
    };
  }
}

// Companies API
export const companiesApi = {
  // Get all companies
  getAll: async (): Promise<ApiResponse<Company[]>> => {
    return apiRequest<Company[]>('/jobs');
  },

  // Get company by ID
  getById: async (id: number): Promise<ApiResponse<Company>> => {
    return apiRequest<Company>(`/jobs/${id}`);
  },

  // Search companies
  search: async (query: string): Promise<ApiResponse<Company[]>> => {
    return apiRequest<Company[]>(`/jobs?search=${encodeURIComponent(query)}`);
  },

  // Get companies by industry/tag
  getByTag: async (tag: string): Promise<ApiResponse<Company[]>> => {
    return apiRequest<Company[]>(`/jobs?tag=${encodeURIComponent(tag)}`);
  },
};

// Referral Events API
export const referralEventsApi = {
  // Get all referral events
  getAll: async (): Promise<ApiResponse<ReferralEvent[]>> => {
    return apiRequest<ReferralEvent[]>('/referral-events');
  },

    getAllOfMine: async (referrer: string): Promise<ApiResponse<ReferralEvent[]>> => {
        return apiRequest<ReferralEvent[]>('/referral-events?referrer=' + referrer);
    },

  // Get referral event by ID
  getById: async (id: number): Promise<ApiResponse<ReferralEvent>> => {
    return apiRequest<ReferralEvent>(`/referral-events/${id}`);
  },

  // Create new referral event
  create: async (event: Omit<ReferralEvent, 'id'>): Promise<ApiResponse<ReferralEvent>> => {
    return apiRequest<ReferralEvent>('/referral-events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  },
};

// Applied Referrals API
export const appliedReferralsApi = {
  // Get all applied referrals
  getAll: async (email: string): Promise<ApiResponse<AppliedReferral[]>> => {
    return apiRequest<AppliedReferral[]>('/applied-referrals?email=' + email);
  },

  // Get applied referral by ID
  getById: async (id: number): Promise<ApiResponse<AppliedReferral>> => {
    return apiRequest<AppliedReferral>(`/applied-referrals/${id}`);
  },

  // Create new applied referral
  create: async (referral: Omit<AppliedReferral, 'id'>): Promise<ApiResponse<AppliedReferral>> => {
    return apiRequest<AppliedReferral>('/applied-referrals', {
      method: 'POST',
      body: JSON.stringify(referral),
    });
  },
};

// Jobs API
export const jobsApi = {
  // Get all jobs
  getAll: async (): Promise<ApiResponse<Job[]>> => {
    return apiRequest<Job[]>('/jobs');
  },

  // Get job by ID
  getById: async (id: number): Promise<ApiResponse<Job>> => {
    return apiRequest<Job>(`/jobs/${id}`);
  },

  // Search jobs
  search: async (query: string): Promise<ApiResponse<Job[]>> => {
    return apiRequest<Job[]>(`/jobs?search=${encodeURIComponent(query)}`);
  },
};

// Generic API functions
export const api = {
  get: <T>(endpoint: string): Promise<ApiResponse<T>> => apiRequest<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, data: any): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: any): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string): Promise<ApiResponse<T>> =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};
