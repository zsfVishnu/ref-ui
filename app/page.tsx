'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';
import DashboardPage from '@/app/dashboard/page';
import LandingPage from '@/components/LandingPage';
import FeedbackWidget from '@/components/FeedbackWidget';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      <ProtectedRoute fallback={<LandingPage />}>
        <DashboardPage />
      </ProtectedRoute>
      {!user && <FeedbackWidget />}
    </div>
  );
}