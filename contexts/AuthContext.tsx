'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  linkedin: string;
  company: string | null | undefined;
  role: 'candidate' | 'referrer';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: {
    firstName: string;
    lastName: string;
    linkedin: string;
    email: string;
    password: string;
    role: 'candidate' | 'referrer';
    company: string | null | undefined;
  }) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user credentials for testing
const DUMMY_USERS = {
  candidate: {
    id: 'dummy-candidate-1',
    email: 'candidate@test.com',
    password: 'password123',
    linkedin: 'dummy-linkedin',
    name: 'John Candidate',
    role: 'candidate' as const,
    company: null,
  },
  referrer: {
    id: 'dummy-referrer-1',
    email: 'referrer@test.com',
    password: 'password123',
    name: 'Sarah Referrer',
    company: 'GetReferred.Inc',
    linkedin: 'dummy-linkedin',
    role: 'referrer' as const,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: check for stored user session
  useEffect(() => {
    const storedUser = localStorage.getItem('dummyUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('dummyUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Check if email matches dummy user pattern
  const isDummyUser = (email: string) => {
    return email === DUMMY_USERS.candidate.email || email === DUMMY_USERS.referrer.email;
  };

  // Get dummy user by email
  const getDummyUser = (email: string) => {
    if (email === DUMMY_USERS.candidate.email) return DUMMY_USERS.candidate;
    if (email === DUMMY_USERS.referrer.email) return DUMMY_USERS.referrer;
    return null;
  };

  // Sign Up (Register)
  const signUp = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    linkedin: string;
    password: string;
    company: string | null | undefined;
    role: 'candidate' | 'referrer';
  }) => {
    // Check if it's a dummy user email
    if (isDummyUser(userData.email)) {
      const dummyUser = getDummyUser(userData.email);
      if (dummyUser && userData.password === dummyUser.password) {
        const userSession = {
          id: dummyUser.id,
          email: dummyUser.email,
          name: `${userData.firstName} ${userData.lastName}`,
          role: userData.role,
          linkedin: userData.linkedin,
          company: userData.company,
        };
        localStorage.setItem('dummyUser', JSON.stringify(userSession));
        setUser(userSession);
        toast.success("Welcome! You're using the demo account.", {
          description: 'This is a test environment with dummy data.',
        });
        return true;
      }
    }

    // For non-dummy users, try API
    try {
      const API_URL = 'http://localhost:4000/api/auth';
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: `${userData.firstName} ${userData.lastName}`,
          role: userData.role,
          linkedin: userData.linkedin,
          company: userData.company,
        }),
      });
      if (!res.ok) {
        toast.error('Registration failed', {
          description: 'Try using the demo accounts: candidate@test.com or referrer@test.com',
        });
        return false;
      }

      // Auto-login after signup
      return await signIn(userData.email, userData.password);
    } catch (error) {
      toast.error('API server not available', {
        description:
          'Use demo accounts: candidate@test.com or referrer@test.com (password: password123)',
      });
      return false;
    }
  };

  // Sign In (Login)
  const signIn = async (email: string, password: string) => {
    // Check if it's a dummy user
    if (isDummyUser(email)) {
      const dummyUser = getDummyUser(email);
      if (dummyUser && password === dummyUser.password) {
        const userSession = {
          id: dummyUser.id,
          email: dummyUser.email,
          name: dummyUser.name,
          role: dummyUser.role,
          linkedin: dummyUser.linkedin,
          company: dummyUser.company,
        };
        localStorage.setItem('dummyUser', JSON.stringify(userSession));
        setUser(userSession);
        toast.success(`Welcome back, ${dummyUser.name}!`, {
          description: "You're using the demo account.",
        });
        return true;
      } else {
        toast.error('Invalid credentials', {
          description: 'Use password: password123 for demo accounts',
        });
        return false;
      }
    }

    // For non-dummy users, try API
    try {
      const API_URL = 'http://localhost:4000/api/auth';
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        toast.error('Login failed', {
          description: 'Try using the demo accounts: candidate@test.com or referrer@test.com',
        });
        return false;
      }

      localStorage.setItem('token', data.token);
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        linkedin: data.user.linkedin,
        company: user?.company,
      });
      return true;
    } catch (error) {
      toast.error('API server not available', {
        description:
          'Use demo accounts: candidate@test.com or referrer@test.com (password: password123)',
      });
      return false;
    }
  };

  // Sign Out (Logout)
  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('dummyUser');
    setUser(null);
    toast.success('Signed out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
