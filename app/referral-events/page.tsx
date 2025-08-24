'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Plus, Search, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreateReferralEventForm from '@/components/CreateReferralEventForm';

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
  {
    id: 3,
    company: 'Amazon',
    logo: '📦',
    jobTitle: 'Data Scientist',
    location: 'Austin, TX',
    applicants: 15,
    maxApplicants: 25,
    expiryDate: '2024-02-18',
    postedBy: 'Emily Wang',
    requirements: 'PhD in Statistics/CS with ML experience, Python/R proficiency required',
    jobUrl: 'https://amazon.jobs/en/jobs/2345678',
    tags: ['Python', 'Machine Learning', 'Statistics'],
  },
  {
    id: 4,
    company: 'Apple',
    logo: '🍎',
    jobTitle: 'iOS Developer',
    location: 'Cupertino, CA',
    applicants: 6,
    maxApplicants: 10,
    expiryDate: '2024-02-22',
    postedBy: 'David Kim',
    requirements: 'Swift expert with 3+ years iOS development, App Store publications preferred',
    jobUrl: 'https://jobs.apple.com/en-us/details/200345678',
    tags: ['Swift', 'iOS', 'Mobile Development'],
  },
];

const companies = ['All Companies', 'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix'];
const sortOptions = ['Newest First', 'Expiry Date', 'Most Applicants', 'Least Applicants'];

export default function ReferralEventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [sortBy, setSortBy] = useState('Newest First');

  const filteredEvents = referralEvents
    .filter(event => {
      const matchesSearch = event.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = selectedCompany === 'All Companies' || event.company === selectedCompany;
      return matchesSearch && matchesCompany;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Expiry Date':
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        case 'Most Applicants':
          return b.applicants - a.applicants;
        case 'Least Applicants':
          return a.applicants - b.applicants;
        default:
          return 0;
      }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Referral Events</h1>
            <p className="text-gray-600">
              Browse active referral opportunities posted by company employees
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold mt-4 lg:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Create Referral Event
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

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6">
          {filteredEvents.map((event) => {
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
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No referral events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}