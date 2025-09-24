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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: check for stored user session
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

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
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
      const res = await fetch(`${API_URL}/api/auth/register`, {
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
        toast.error('Registration failed');
        return false;
      }

      // Auto-login after signup
      return await signIn(userData.email, userData.password);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  // Sign In (Login)
  const signIn = async (email: string, password: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        toast.error('Invalid email or password');
        return false;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            linkedin: data.user.linkedin,
            company: data.user.company,
        }));
      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        linkedin: data.user.linkedin,
        company: user?.company,
      });
      toast.success(`Welcome back, ${data.user.name}!`);
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  // Sign Out (Logout)
  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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