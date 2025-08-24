'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, ExternalLink, Calendar, MapPin, Users, Filter, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReferralRequestForm from '@/components/ReferralRequestForm';
import CreateReferralEventForm from '@/components/CreateReferralEventForm';
import { useAuth } from '@/contexts/AuthContext';

const companies = [
  {
    id: 1,
    name: 'Apple',
    logo: '🍎',
    tags: ['Finance', 'Gaming', 'Media', 'Tech'],
    careersUrl: 'https://jobs.apple.com',
  },
  {
    id: 2,
    name: 'Amazon',
    logo: '📦',
    tags: ['Commerce', 'Gaming', 'Tech'],
    careersUrl: 'https://amazon.jobs',
  },
  {
    id: 3,
    name: 'Microsoft',
    logo: '🪟',
    tags: ['Finance', 'Gaming', 'Tech'],
    careersUrl: 'https://careers.microsoft.com',
  },
  {
    id: 4,
    name: 'Google',
    logo: '🔍',
    tags: ['Tech'],
    careersUrl: 'https://careers.google.com',
  },
];

const referralEvents = [
  {
    id: 1,
    company: 'Google',
    logo: '🔍',
    jobTitle: 'Senior Software Engineer',
    location: 'Mountain View, CA',
    applicants: 12,
    maxApplicants: 20,
    expiryDate: '2024-02-15',
    postedBy: 'Sarah Chen',
    requirements: 'Looking for experienced React/Node.js developers with 5+ years experience',
    jobUrl: 'https://careers.google.com/jobs/results/123456789',
    tags: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: 2,
    company: 'Microsoft',
    logo: '🪟',
    jobTitle: 'Product Manager',
    location: 'Seattle, WA',
    applicants: 8,
    maxApplicants: 15,
    expiryDate: '2024-02-20',
    postedBy: 'Michael Rodriguez',
    requirements: 'Seeking PM with B2B SaaS experience and strong analytical skills',
    jobUrl: 'https://careers.microsoft.com/us/en/job/1234567',
    tags: ['Product Management', 'Analytics', 'B2B'],
  },
];

// Mock applied referrals data
const appliedReferrals = [
  {
    id: 1,
    company: 'Google',
    logo: '🔍',
    jobTitle: 'Senior Software Engineer',
    location: 'Mountain View, CA',
    appliedDate: '2024-01-15',
    status: 'pending',
    referrerName: 'Sarah Chen',
    notes: 'Application under review by hiring team',
  },
  {
    id: 2,
    company: 'Microsoft',
    logo: '🪟',
    jobTitle: 'Product Manager',
    location: 'Seattle, WA',
    appliedDate: '2024-01-18',
    status: 'shortlisted',
    referrerName: 'Michael Rodriguez',
    notes: 'Moved to next round - technical interview scheduled',
  },
  {
    id: 3,
    company: 'Amazon',
    logo: '📦',
    jobTitle: 'Data Scientist',
    location: 'Austin, TX',
    appliedDate: '2024-01-10',
    status: 'rejected',
    referrerName: 'Emily Wang',
    notes: 'Position filled with internal candidate',
  },
];

const categories = ['All', 'Tech', 'Finance', 'Commerce', 'Entertainment', 'Social Media', 'Gaming', 'Media'];

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);
  const [activeTab, setActiveTab] = useState('companies');

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || company.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            {user?.role === 'referrer' 
              ? 'Manage your referral events and help candidates find their dream jobs.'
              : 'Discover job referral opportunities from top companies and boost your career.'
            }
          </p>
        </div>

        {/* Referrer Dashboard */}
        {user?.role === 'referrer' && (
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <h2 className="text-2xl font-bold text-black mb-4 lg:mb-0">Your Referral Events</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
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
                  <CreateReferralEventForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {referralEvents.map((event) => {
                const daysLeft = getDaysUntilExpiry(event.expiryDate);
                const isExpiringSoon = daysLeft <= 3;
                const isExpired = daysLeft < 0;

                return (
                  <Card key={event.id} className={`hover:shadow-lg transition-shadow duration-200 ${isExpired ? 'opacity-60' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{event.logo}</div>
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
                            <Badge variant="secondary">Expires {formatDate(event.expiryDate)}</Badge>
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
                            {event.applicants}/{event.maxApplicants} applicants
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Posted by {event.postedBy}
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
                            onClick={() => window.open(event.jobUrl, '_blank')}
                          >
                            View Job Posting
                          </Button>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(event.applicants / event.maxApplicants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Job Seeker Tabbed Dashboard */}
        {user?.role === 'candidate' && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
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
                  {appliedReferrals.length} Applications
                </Badge>
              </div>

              <div className="grid gap-6">
                {appliedReferrals.map((referral) => (
                  <Card key={referral.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{referral.logo}</div>
                          <div>
                            <CardTitle className="text-xl">{referral.jobTitle}</CardTitle>
                            <CardDescription className="text-lg font-medium">
                              {referral.company}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(referral.status)} flex items-center gap-1`}>
                          {getStatusIcon(referral.status)}
                          {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
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
                            Applied on {formatDate(referral.appliedDate)}
                          </div>
                          <div>
                            <strong>Referrer:</strong> {referral.referrerName}
                          </div>
                        </div>

                        {referral.notes && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-1">Status Notes:</p>
                            <p className="text-sm text-gray-600">{referral.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {appliedReferrals.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Filter className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
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
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCompanies.map((company) => (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{company.logo}</div>
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
                            <DialogHeader>
                              <DialogTitle>Request Referral - {company.name}</DialogTitle>
                              <DialogDescription>
                                Fill out the form below to request a referral for {company.name}
                              </DialogDescription>
                            </DialogHeader>
                            <ReferralRequestForm company={company} />
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {company.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

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
                  {referralEvents.length} Events Available
                </Badge>
              </div>

              <div className="grid gap-6">
                {referralEvents.map((event) => {
                  const daysLeft = getDaysUntilExpiry(event.expiryDate);
                  const isExpiringSoon = daysLeft <= 3;
                  const isExpired = daysLeft < 0;

                  return (
                    <Card key={event.id} className={`hover:shadow-lg transition-shadow duration-200 ${isExpired ? 'opacity-60' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl">{event.logo}</div>
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
                              <Badge variant="secondary">Expires {formatDate(event.expiryDate)}</Badge>
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
                              {event.applicants}/{event.maxApplicants} applicants
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Posted by {event.postedBy}
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
                              onClick={() => window.open(event.jobUrl, '_blank')}
                            >
                              View Job Posting
                            </Button>
                            <Button
                              className="flex-1 bg-black hover:bg-gray-800 text-white"
                              disabled={isExpired || event.applicants >= event.maxApplicants}
                            >
                              {isExpired ? 'Expired' : 
                               event.applicants >= event.maxApplicants ? 'Full' : 
                               'Apply for Referral'}
                            </Button>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(event.applicants / event.maxApplicants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {referralEvents.length === 0 && (
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