// API Configuration
export const API_CONFIG = {
  // Base URL for the API - can be changed here or through environment variables
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',

  // API endpoints
  ENDPOINTS: {
    JOBS: '/jobs',
    COMPANIES: '/companies',
    REFERRAL_EVENTS: '/referral-events',
    APPLIED_REFERRALS: '/applied-referrals',
    USERS: '/users',
  },

  // Request timeout in milliseconds
  TIMEOUT: 15000,
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get full endpoint URL
export const getApiUrl = (endpointKey: keyof typeof API_CONFIG.ENDPOINTS): string => {
  return buildApiUrl(API_CONFIG.ENDPOINTS[endpointKey]);
};
