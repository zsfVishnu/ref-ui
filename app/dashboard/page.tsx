'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ReferralRequestForm from '@/components/ReferralRequestForm';
import CreateReferralEventForm from '@/components/CreateReferralEventForm';
import { useAuth } from '@/contexts/AuthContext';
import { useCompanies } from '@/hooks/useCompanies';
import { useReferralEvents } from '@/hooks/useReferralEvents';
import { useAppliedReferrals } from '@/hooks/useAppliedReferrals';
import Image from 'next/image';

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('companies');
  const [selectedReferralEvent, setSelectedReferralEvent] = useState<any>(null);
  const [isReferralTabOpen, setIsReferralTabOpen] = useState(false);

  // Use the hooks to fetch data from API
  const {
    companies,
    isLoading: companiesLoading,
    error: companiesError,
    refetch: refetchCompanies,
  } = useCompanies();
  const {
    referralEvents,
    isLoading: referralEventsLoading,
    error: referralEventsError,
    refetch: refetchReferralEvents,
  } = useReferralEvents();
  const {
    appliedReferrals,
    isLoading: appliedReferralsLoading,
    error: appliedReferralsError,
    refetch: refetchAppliedReferrals,
  } = useAppliedReferrals();

  // Use fallback data when API fails
  const displayCompanies = !companiesError ? companies : [];
  const displayReferralEvents = !referralEventsError ? referralEvents : [];
  const displayAppliedReferrals = !appliedReferralsError ? appliedReferrals : [];

  // Generate categories dynamically from API data - only when companies data is available
  const categories =
    displayCompanies && displayCompanies.length > 0
      ? [
          'All',
          ...Array.from(
            new Set(displayCompanies.flatMap((company: any) => company.tags || []))
          ).sort(),
        ]
      : ['All'];

  // Filter companies based on search and category - only when companies data is available
  const filteredCompanies =
    displayCompanies && displayCompanies.length > 0
      ? displayCompanies.filter((company: any) => {
          const matchesSearch =
            company.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
          const matchesCategory =
            selectedCategory === 'All' || (company.tags && company.tags.includes(selectedCategory));
          return matchesSearch && matchesCategory;
        })
      : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const addReferralEvent = () => {};

  const getDaysUntilExpiry = (dateString: string) => {
    const today = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'shortlisted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // @ts-ignore
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Welcome back, {user?.name}!👋
          </h1>
          <p className="text-lg text-gray-600">
            {user?.role === 'referrer'
              ? 'Manage your referral events and help candidates find their dream jobs.'
              : 'Discover job referral opportunities from top companies and boost your career.'}
          </p>
        </div>

        {/* Referrer Dashboard */}
        {user?.role === 'referrer' && (
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <h2 className="text-2xl font-bold text-black mb-4 lg:mb-0">Your Referral Events</h2>
              <Dialog
                  open={isReferralTabOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" onClick={() => setIsReferralTabOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Referral Event</DialogTitle>
                    <DialogDescription>
                      Post a referral opportunity for candidates to apply to
                    </DialogDescription>
                  </DialogHeader>
                  <CreateReferralEventForm onClose={() => setIsReferralTabOpen(false)}/>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {/* Loading State */}
              {referralEventsLoading && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <Card key={index} className="animate-pulse">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-32"></div>
                              <div className="h-3 bg-gray-200 rounded w-24"></div>
                            </div>
                          </div>
                          <div className="h-6 bg-gray-200 rounded w-20"></div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Error State */}
              {referralEventsError && !referralEventsLoading && (
                <div className="text-center py-8">
                  <div className="text-red-500 mb-4">
                    <XCircle className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Error loading referral events
                  </h3>
                  <p className="text-gray-600 mb-4">{referralEventsError}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-sm text-blue-800">
                    <p className="font-medium mb-2">💡 API Server Not Available</p>
                    <p>
                      Showing fallback data. To see real-time data, start your API server at{' '}
                      <code className="bg-blue-100 px-2 py-1 rounded">localhost:4000</code>
                    </p>
                  </div>
                  <Button onClick={refetchReferralEvents} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Referral Events */}
              {!referralEventsLoading &&
                !referralEventsError &&
                displayReferralEvents.map(event => {
                  const daysLeft = getDaysUntilExpiry(event.expiry_date);
                  const isExpiringSoon = daysLeft <= 3;
                  const isExpired = daysLeft < 0;

                  return (
                    <Card
                      key={event.id}
                      className={`hover:shadow-lg transition-shadow duration-200 ${isExpired ? 'opacity-60' : ''}`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                              <img
                                src={event.logo}
                                alt={`${event.company} logo`}
                                className="w-full h-full object-cover"
                                onError={e => {
                                  // Fallback to company initial if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {event.company.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <CardTitle className="text-xl">{event.job_title}</CardTitle>
                              <CardDescription className="text-lg font-medium">
                                {event.company}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="text-right">
                            {isExpired ? (
                              <Badge variant="destructive">Expired</Badge>
                            ) : isExpiringSoon ? (
                              <Badge variant="destructive">Expires in {daysLeft} days</Badge>
                            ) : (
                              <Badge variant="secondary">
                                Expires {formatDate(event.expiry_date)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {event.applicants}/{event.max_applicants} applicants
                            </div>
                              {user.role == 'candidate' && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Posted by {event.posted_by}
                            </div>
                              )}

                              <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Role {event.job_title}
                              </div>

                          </div>

                          <p className="text-gray-700">{event.requirements}</p>

                          <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => window.open(event.job_url, '_blank')}
                            >
                              View Job Posting
                            </Button>
                            <Dialog
                              open={selectedReferralEvent?.id === event.id}
                              onOpenChange={open => {
                                if (!open) setSelectedReferralEvent(null);
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                                  disabled={isExpired || event.applicants >= event.max_applicants}
                                  onClick={() => setSelectedReferralEvent(event)}
                                >
                                  {isExpired
                                    ? 'Expired'
                                    : event.applicants >= event.max_applicants
                                      ? 'Full'
                                      : 'Apply for Referral'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <ReferralRequestForm
                                  company={{
                                    name: event.company,
                                    logo: event.logo,
                                    id: event.id,
                                    tags: event.tags,
                                    careersUrl: event.job_url,
                                  }}
                                  eventId={event.id}
                                  onClose={() => setSelectedReferralEvent(null)}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(event.applicants / event.max_applicants) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

              {/* Empty State */}
              {!referralEventsLoading &&
                !referralEventsError &&
                displayReferralEvents.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <Filter className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No referral events yet
                    </h3>
                    <p className="text-gray-600">
                      Create your first referral event to start helping candidates.
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Job Seeker Tabbed Dashboard */}
        {user?.role === 'candidate' && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full smooth-tabs">
            <TabsList className="grid w-full grid-cols-3 mb-8 rounded-full p-1 bg-gray-100">
              <TabsTrigger value="applied" className="text-sm font-medium">
                Applied Referrals
              </TabsTrigger>
              <TabsTrigger value="companies" className="text-sm font-medium">
                Companies
              </TabsTrigger>
              <TabsTrigger value="events" className="text-sm font-medium">
                Active Events
              </TabsTrigger>
            </TabsList>

            {/* Applied Referrals Tab */}
            <TabsContent value="applied" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Your Applied Referrals</h2>
                <Badge variant="secondary" className="text-sm">
                  {displayAppliedReferrals.length} Applications
                </Badge>
              </div>

              <div className="grid gap-6">
                {/* Loading State */}
                {appliedReferralsLoading && (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <Card key={index} className="animate-pulse">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                              <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                              </div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {appliedReferralsError && !appliedReferralsLoading && (
                  <div className="text-center py-8">
                    <div className="text-red-500 mb-4">
                      <XCircle className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Error loading applied referrals
                    </h3>
                    <p className="text-gray-600 mb-4">{appliedReferralsError}</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-sm text-blue-800">
                      <p className="font-medium mb-2">💡 API Server Not Available</p>
                      <p>
                        Showing fallback data. To see real-time data, start your API server at{' '}
                        <code className="bg-blue-100 px-2 py-1 rounded">localhost:4000</code>
                      </p>
                    </div>
                    <Button onClick={refetchAppliedReferrals} variant="outline">
                      Try Again
                    </Button>
                  </div>
                )}

                {/* Applied Referrals */}
                {!appliedReferralsLoading &&
                  !appliedReferralsError &&
                  displayAppliedReferrals.map(referral => (
                    <Card
                      key={referral.id}
                      className="hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                              <img
                                src={referral.logo}
                                alt={`${referral.company} logo`}
                                className="w-full h-full object-cover"
                                onError={e => {
                                  // Fallback to company initial if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {referral?.company?.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <CardTitle className="text-xl">{referral.job_title}</CardTitle>
                              <CardDescription className="text-lg font-medium">
                                {referral?.company}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge
                            className={`${getStatusColor(referral.status)} flex items-center gap-1`}
                          >
                            {getStatusIcon(referral.status)}
                            {referral.status?.charAt(0).toUpperCase() + referral.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {referral.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Applied on {formatDate(referral.created_at)}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Expires on {formatDate(referral.expiry_date)}
                            </div>
                            <div>
                              <strong>Referrer:</strong> {referral.posted_by}
                            </div>
                          </div>

                          {referral.notes && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-700 mb-1">
                                Status Notes:
                              </p>
                              <p className="text-sm text-gray-600">{referral.notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {/* Empty State */}
                {!appliedReferralsLoading &&
                  !appliedReferralsError &&
                  displayAppliedReferrals.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Filter className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No applications yet
                      </h3>
                      <p className="text-gray-600">
                        Browse companies and active events to start applying for referrals.
                      </p>
                    </div>
                  )}
              </div>
            </TabsContent>

            {/* Companies Tab */}
            <TabsContent value="companies" className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-2xl font-bold text-black mb-4 lg:mb-0">Companies</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCompanies.map(company => (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img
                              src={company.logo}
                              alt={`${company.name} logo`}
                              className="w-full h-full object-cover"
                              onError={e => {
                                // Fallback to company initial if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                              {company.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-black">{company.name}</h3>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-yellow-400 hover:bg-yellow-500 text-black"
                              onClick={() => setSelectedCompany(company)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <ReferralRequestForm company={company} eventId={-1} />
                          </DialogContent>
                        </Dialog>
                      </div>

                      {/*<div className="flex flex-wrap gap-2 mb-4">*/}
                      {/*  {company.tags.map((tag, index) => (*/}
                      {/*    <Badge key={index} variant="secondary" className="text-xs">*/}
                      {/*      {tag}*/}
                      {/*    </Badge>*/}
                      {/*  ))}*/}
                      {/*</div>*/}

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(company.careersUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Careers
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Active Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Active Referral Events</h2>
                <Badge variant="secondary" className="text-sm">
                  {displayReferralEvents.length} Events Available
                </Badge>
              </div>

              <div className="grid gap-6">
                {/* Loading State */}
                {referralEventsLoading && (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <Card key={index} className="animate-pulse">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                              <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                              </div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {referralEventsError && !referralEventsLoading && (
                  <div className="text-center py-8">
                    <div className="text-red-500 mb-4">
                      <XCircle className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Error loading referral events
                    </h3>
                    <p className="text-gray-600 mb-4">{referralEventsError}</p>
                    <Button onClick={refetchReferralEvents} variant="outline">
                      Try Again
                    </Button>
                  </div>
                )}

                {/* Referral Events */}
                {!referralEventsLoading &&
                  !referralEventsError &&
                  displayReferralEvents.map(event => {
                    const daysLeft = getDaysUntilExpiry(event.expiry_date);
                    const isExpiringSoon = daysLeft <= 3;
                    const isExpired = daysLeft < 0;

                    return (
                      <Card
                        key={event.id}
                        className={`hover:shadow-lg transition-shadow duration-200 ${isExpired ? 'opacity-60' : ''}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                <img
                                  src={event.logo}
                                  alt={`${event.company} logo`}
                                  className="w-full h-full object-cover"
                                  onError={e => {
                                    // Fallback to company initial if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                                <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                  {event.company.charAt(0).toUpperCase()}
                                </div>
                              </div>
                              <div>
                                <CardTitle className="text-xl">{event.jobTitle}</CardTitle>
                                <CardDescription className="text-lg font-medium">
                                  {event.company}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="text-right">
                              {isExpired ? (
                                <Badge variant="destructive">Expired</Badge>
                              ) : isExpiringSoon ? (
                                <Badge variant="destructive">Expires in {daysLeft} days</Badge>
                              ) : (
                                <Badge variant="secondary">
                                  Expires {formatDate(event.expiry_date)}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {event.applicants}/{event.max_applicants} applicants
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Posted by {event.posted_by}
                              </div>
                            </div>

                            <p className="text-gray-700">{event.requirements}</p>

                            <div className="flex flex-wrap gap-2">
                              {event.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => window.open(event.job_url, '_blank')}
                              >
                                View Job Posting
                              </Button>
                              <Dialog
                                open={selectedReferralEvent?.id === event.id}
                                onOpenChange={open => {
                                  if (!open) setSelectedReferralEvent(null);
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    className="flex-1 bg-black hover:bg-gray-800 text-white"
                                    disabled={isExpired || event.applicants >= event.max_applicants}
                                    onClick={() => setSelectedReferralEvent(event)}
                                  >
                                    {isExpired
                                      ? 'Expired'
                                      : event.applicants >= event.max_applicants
                                        ? 'Full'
                                        : 'Apply for Referral'}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <ReferralRequestForm
                                    company={{
                                      name: event.company,
                                      logo: event.logo,
                                      id: event.id,
                                      tags: event.tags,
                                      careersUrl: event.job_url,
                                    }}
                                    eventId={event.id}
                                    onClose={() => setSelectedReferralEvent(null)}
                                  />
                                </DialogContent>
                              </Dialog>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(event.applicants / event.max_applicants) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                {/* Empty State */}
                {!referralEventsLoading &&
                  !referralEventsError &&
                  displayReferralEvents.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Filter className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No active events</h3>
                      <p className="text-gray-600">
                        Check back later for new referral opportunities.
                      </p>
                    </div>
                  )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
