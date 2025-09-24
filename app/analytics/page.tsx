'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Filter, CheckCircle, Clock, Users, ChevronRight, Building, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { referralEventsApi, ReferralEvent } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import LandingPage from '@/components/LandingPage';

type UiEvent = {
  id: number;
  title: string;
  company: string;
  location: string;
  maxApplicants: number;
  applicants: number;
  expiryDate: string;
  jobUrl: string;
  requirements: string;
  tags: string[];
  logo: string;
};

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<UiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<UiEvent | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const resp = await referralEventsApi.getAllOfMine(user.email);
        if (resp.success && Array.isArray(resp.data)) {
          const mapped: UiEvent[] = (resp.data as ReferralEvent[]).map(e => ({
            id: e.id,
            title: e.job_title,
            company: e.company,
            location: e.location,
            maxApplicants: e.max_applicants,
            applicants: e.applicants,
            expiryDate: e.expiry_date,
            jobUrl: e.job_url,
            requirements: e.requirements,
            tags: e.tags,
            logo: e.logo,
          }));
          setEvents(mapped);
        } else {
          setEvents([]);
          setError(resp.error || 'Failed to load events');
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const filteredEvents = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return events.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
    );
  }, [events, searchTerm]);

  const overallAnalytics = useMemo(() => {
    const totalEvents = events.length;
    const totalApplicants = events.reduce((sum, e) => sum + (e.applicants || 0), 0);
    const shortlistApprox = Math.round(totalApplicants * 0.3);
    return {
      totalEvents,
      totalApplicants,
      shortlisted: shortlistApprox,
      pending: Math.max(totalApplicants - shortlistApprox, 0),
    };
  }, [events]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntilExpiry = (dateString: string) => {
    const today = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) return (
    <ProtectedRoute fallback={<LandingPage />}>{null}</ProtectedRoute>
  );
  if (user?.role !== 'referrer') return (
    <ProtectedRoute fallback={<LandingPage />}>{null}</ProtectedRoute>
  );

  if (selectedEvent) {
    const daysLeft = getDaysUntilExpiry(selectedEvent.expiryDate);
    const isExpiringSoon = daysLeft <= 3;
    const isExpired = daysLeft < 0;
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedEvent(null)}
              className="flex items-center text-gray-600 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={selectedEvent.logo}
                      alt={`${selectedEvent.company} logo`}
                      className="w-full h-full object-cover"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {selectedEvent.company.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedEvent.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {selectedEvent.company} • {selectedEvent.location}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {isExpired ? (
                    <Badge variant="destructive">Expired</Badge>
                  ) : isExpiringSoon ? (
                    <Badge variant="destructive">Expires in {daysLeft} days</Badge>
                  ) : (
                    <Badge variant="secondary">Expires {formatDate(selectedEvent.expiryDate)}</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{selectedEvent.requirements}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedEvent.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Applicants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedEvent.applicants}/{selectedEvent.maxApplicants}</div>
                    <p className="text-xs text-muted-foreground">Current / Max</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Shortlisted (est.)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.round(selectedEvent.applicants * 0.3)}</div>
                    <p className="text-xs text-muted-foreground">Estimated 30%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Expiry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex items-center"><Calendar className="h-4 w-4 mr-2" />{formatDate(selectedEvent.expiryDate)}</div>
                    <p className="text-xs text-muted-foreground">{isExpired ? 'Expired' : daysLeft + ' days left'}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-gray-600">Applicant details are not available from the backend yet.</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute fallback={<LandingPage />}>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Analytics & Events</h1>
          <p className="text-gray-600">Manage your referral events and track overall performance</p>
        </div>

        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && !loading && <div className="text-center text-red-600">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAnalytics.totalEvents}</div>
              <p className="text-xs text-muted-foreground">Active referral events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAnalytics.totalApplicants}</div>
              <p className="text-xs text-muted-foreground">Across all events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending (est.)</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAnalytics.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting your review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shortlisted (est.)</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAnalytics.shortlisted}</div>
              <p className="text-xs text-muted-foreground">Ready for next steps</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by job title, company, or location..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {filteredEvents.map(event => {
            const daysLeft = getDaysUntilExpiry(event.expiryDate);
            const isExpiringSoon = daysLeft <= 3;
            const isExpired = daysLeft < 0;
            return (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={event.logo}
                          alt={`${event.company} logo`}
                          className="w-full h-full object-cover"
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {event.company.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="text-lg font-medium">
                          {event.company} • {event.location}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {isExpired ? (
                        <Badge variant="destructive">Expired</Badge>
                      ) : isExpiringSoon ? (
                        <Badge variant="destructive">Expires in {daysLeft} days</Badge>
                      ) : (
                        <Badge variant="secondary">Expires {formatDate(event.expiryDate)}</Badge>
                      )}
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">{event.applicants}</div>
                        <div className="text-sm text-gray-600">Applicants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">{event.maxApplicants}</div>
                        <div className="text-sm text-gray-600">Max</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {event.maxApplicants > 0 ? Math.round((event.applicants / event.maxApplicants) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-600">Occupancy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{Math.round(event.applicants * 0.3)}</div>
                        <div className="text-sm text-gray-600">Shortlisted (est.)</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Create your first referral event to get started.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}


