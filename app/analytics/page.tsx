'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Search, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ExternalLink,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Users,
  TrendingUp,
  FileText,
  MessageSquare,
  Eye,
  ChevronRight,
  ArrowLeft,
  Building
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Enhanced mock data with more detailed applicant information
const initialMockApplicants = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    appliedRole: 'Senior Software Engineer',
    company: 'Google',
    currentCompany: 'Meta',
    previousCompany: 'Uber',
    experience: '5',
    education: 'MS Computer Science, Stanford University',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Python'],
    appliedDate: '2024-01-15',
    status: 'pending',
    linkedinUrl: 'https://linkedin.com/in/alexjohnson',
    resumeUrl: '/resumes/alex-johnson-resume.pdf',
    message: 'I am very excited about this opportunity at Google. I have been working with React and Node.js for the past 5 years and would love to contribute to your team.',
    referralEventId: 1,
    notes: '',
    rating: 0,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    appliedRole: 'Product Manager',
    company: 'Microsoft',
    currentCompany: 'Amazon',
    previousCompany: 'Apple',
    experience: '4',
    education: 'MBA, Harvard Business School',
    skills: ['Product Management', 'Analytics', 'B2B', 'Agile', 'SQL'],
    appliedDate: '2024-01-18',
    status: 'shortlisted',
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    resumeUrl: '/resumes/sarah-chen-resume.pdf',
    message: 'With 4 years of PM experience in B2B SaaS, I believe I can bring valuable insights to Microsoft\'s product team.',
    referralEventId: 2,
    notes: 'Strong background in B2B products. Good cultural fit.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    appliedRole: 'Data Scientist',
    company: 'Amazon',
    currentCompany: 'Netflix',
    previousCompany: 'Tesla',
    experience: '6',
    education: 'PhD Statistics, MIT',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow'],
    appliedDate: '2024-01-20',
    status: 'rejected',
    linkedinUrl: 'https://linkedin.com/in/michaelrodriguez',
    resumeUrl: '/resumes/michael-rodriguez-resume.pdf',
    message: 'PhD in Statistics with 6 years of industry experience in ML and data science. Excited to work on Amazon\'s recommendation systems.',
    referralEventId: 3,
    notes: 'Overqualified for the position. Looking for more senior role.',
    rating: 3,
  },
  {
    id: 4,
    name: 'Emily Wang',
    email: 'emily.wang@email.com',
    phone: '+1 (555) 321-0987',
    location: 'Cupertino, CA',
    appliedRole: 'iOS Developer',
    company: 'Apple',
    currentCompany: 'Spotify',
    previousCompany: 'Airbnb',
    experience: '3',
    education: 'BS Computer Science, UC Berkeley',
    skills: ['Swift', 'iOS', 'Mobile Development', 'UIKit', 'SwiftUI'],
    appliedDate: '2024-01-22',
    status: 'pending',
    linkedinUrl: 'https://linkedin.com/in/emilywang',
    resumeUrl: '/resumes/emily-wang-resume.pdf',
    message: 'Passionate iOS developer with 3 years of experience. Published 2 apps on the App Store and excited to contribute to Apple\'s ecosystem.',
    referralEventId: 4,
    notes: '',
    rating: 0,
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 789-0123',
    location: 'New York, NY',
    appliedRole: 'Senior Software Engineer',
    company: 'Google',
    currentCompany: 'Goldman Sachs',
    previousCompany: 'JPMorgan',
    experience: '7',
    education: 'MS Computer Science, Carnegie Mellon',
    skills: ['Java', 'Spring', 'Microservices', 'AWS', 'Docker'],
    appliedDate: '2024-01-25',
    status: 'shortlisted',
    linkedinUrl: 'https://linkedin.com/in/davidkim',
    resumeUrl: '/resumes/david-kim-resume.pdf',
    message: 'Senior engineer with fintech background looking to transition to big tech. Strong system design skills.',
    referralEventId: 1,
    notes: 'Excellent system design interview. Strong candidate.',
    rating: 5,
  },
];

const referralEvents = [
  { 
    id: 1, 
    title: 'Senior Software Engineer', 
    company: 'Google',
    location: 'Mountain View, CA',
    maxApplicants: 20,
    expiryDate: '2024-02-15',
    jobUrl: 'https://careers.google.com/jobs/results/123456789',
    requirements: 'Looking for experienced React/Node.js developers with 5+ years experience',
    tags: ['React', 'Node.js', 'TypeScript'],
    logo: 'https://logo.clearbit.com/google.com'
  },
  { 
    id: 2, 
    title: 'Product Manager', 
    company: 'Microsoft',
    location: 'Seattle, WA',
    maxApplicants: 15,
    expiryDate: '2024-02-20',
    jobUrl: 'https://careers.microsoft.com/us/en/job/1234567',
    requirements: 'Seeking PM with B2B SaaS experience and strong analytical skills',
    tags: ['Product Management', 'Analytics', 'B2B'],
    logo: 'https://logo.clearbit.com/microsoft.com'
  },
  { 
    id: 3, 
    title: 'Data Scientist', 
    company: 'Amazon',
    location: 'Seattle, WA',
    maxApplicants: 12,
    expiryDate: '2024-02-25',
    jobUrl: 'https://amazon.jobs/en/jobs/2345678',
    requirements: 'PhD in Statistics or related field with ML experience',
    tags: ['Python', 'Machine Learning', 'Statistics'],
    logo: 'https://logo.clearbit.com/amazon.com'
  },
  { 
    id: 4, 
    title: 'iOS Developer', 
    company: 'Apple',
    location: 'Cupertino, CA',
    maxApplicants: 10,
    expiryDate: '2024-02-28',
    jobUrl: 'https://jobs.apple.com/en-us/details/200345678',
    requirements: 'iOS development experience with Swift and SwiftUI',
    tags: ['Swift', 'iOS', 'Mobile Development'],
    logo: 'https://logo.clearbit.com/apple.com'
  },
];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [mockApplicants, setMockApplicants] = useState(initialMockApplicants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<typeof referralEvents[0] | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof mockApplicants[0] | null>(null);
  const [applicantNotes, setApplicantNotes] = useState('');

  // Update applicant status with visual feedback
  const updateApplicantStatus = useCallback((applicantId: number, newStatus: string) => {
    setMockApplicants(prev => 
      prev.map(applicant => 
        applicant.id === applicantId 
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
    
    const applicant = mockApplicants.find(a => a.id === applicantId);
    const statusText = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    
    toast.success(`${applicant?.name} has been ${statusText.toLowerCase()}`, {
      description: `Status updated successfully`,
    });
  }, [mockApplicants]);

  // Save applicant notes with feedback
  const saveApplicantNotes = useCallback(() => {
    if (selectedApplicant) {
      setMockApplicants(prev => 
        prev.map(applicant => 
          applicant.id === selectedApplicant.id 
            ? { ...applicant, notes: applicantNotes }
            : applicant
        )
      );
      
      toast.success('Notes saved successfully', {
        description: `Notes updated for ${selectedApplicant.name}`,
      });
      
      setSelectedApplicant(null);
      setApplicantNotes('');
    }
  }, [selectedApplicant, applicantNotes]);

  // Filter referral events based on search
  const filteredEvents = useMemo(() => {
    return referralEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Get applicants for selected event
  const eventApplicants = useMemo(() => {
    if (!selectedEvent) return [];
    return mockApplicants.filter(applicant => applicant.referralEventId === selectedEvent.id);
  }, [selectedEvent, mockApplicants]);

  // Calculate analytics for selected event
  const eventAnalytics = useMemo(() => {
    if (!selectedEvent) return null;
    
    const applicants = eventApplicants;
    const total = applicants.length;
    const pending = applicants.filter(a => a.status === 'pending').length;
    const shortlisted = applicants.filter(a => a.status === 'shortlisted').length;
    const rejected = applicants.filter(a => a.status === 'rejected').length;

    const skillsCount = applicants.reduce((acc, applicant) => {
      applicant.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const experienceDistribution = applicants.reduce((acc, applicant) => {
      const years = parseInt(applicant.experience);
      if (years <= 2) acc['0-2 years']++;
      else if (years <= 5) acc['3-5 years']++;
      else if (years <= 8) acc['6-8 years']++;
      else acc['9+ years']++;
      return acc;
    }, { '0-2 years': 0, '3-5 years': 0, '6-8 years': 0, '9+ years': 0 });

    return {
      total,
      pending,
      shortlisted,
      rejected,
      topSkills: Object.entries(skillsCount).sort(([,a], [,b]) => b - a).slice(0, 5),
      experienceDistribution
    };
  }, [selectedEvent, eventApplicants]);

  // Overall analytics for all events
  const overallAnalytics = useMemo(() => {
    const total = mockApplicants.length;
    const pending = mockApplicants.filter(a => a.status === 'pending').length;
    const shortlisted = mockApplicants.filter(a => a.status === 'shortlisted').length;
    const rejected = mockApplicants.filter(a => a.status === 'rejected').length;

    return { total, pending, shortlisted, rejected };
  }, [mockApplicants]);

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

  const exportData = () => {
    console.log('Exporting applicant data...');
    toast.success('Export started', {
      description: 'Your data export will be ready shortly',
    });
  };

  if (user?.role !== 'referrer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">This page is only available for referrers.</p>
        </div>
      </div>
    );
  }

  // Event Detail View
  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
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

          {/* Event Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={selectedEvent.logo} 
                  alt={`${selectedEvent.company} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
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
                <h1 className="text-3xl font-bold text-black">{selectedEvent.title}</h1>
                <p className="text-lg text-gray-600">{selectedEvent.company} • {selectedEvent.location}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedEvent.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-gray-700 mb-4">{selectedEvent.requirements}</p>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {eventApplicants.length}/{selectedEvent.maxApplicants} applicants
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Expires {formatDate(selectedEvent.expiryDate)}
              </div>
            </div>
          </div>

          {/* Event Analytics */}
          {eventAnalytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{eventAnalytics.total}</div>
                  <p className="text-xs text-muted-foreground">
                    For this event
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{eventAnalytics.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{eventAnalytics.shortlisted}</div>
                  <p className="text-xs text-muted-foreground">
                    Ready for next steps
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {eventAnalytics.total > 0 ? Math.round((eventAnalytics.shortlisted / eventAnalytics.total) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shortlist rate
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Applicants List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Applicants ({eventApplicants.length})</CardTitle>
                <Button onClick={exportData} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {eventApplicants.map((applicant) => (
                  <Card key={applicant.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-yellow-400 text-black font-semibold">
                              {applicant.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{applicant.name}</CardTitle>
                            <CardDescription className="text-lg">
                              {applicant.experience} years experience • {applicant.currentCompany}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getStatusColor(applicant.status)} flex items-center gap-1`}>
                            {getStatusIcon(applicant.status)}
                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <a href={`mailto:${applicant.email}`} className="hover:text-blue-600">
                              {applicant.email}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {applicant.phone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {applicant.location}
                          </div>
                        </div>

                        {/* Professional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Current:</strong> {applicant.currentCompany}
                          </div>
                          <div>
                            <strong>Previous:</strong> {applicant.previousCompany}
                          </div>
                        </div>

                        {/* Education */}
                        <div className="text-sm text-gray-600">
                          <strong>Education:</strong> {applicant.education}
                        </div>

                        {/* Skills */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        {applicant.message && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {applicant.message}
                            </p>
                          </div>
                        )}

                        {/* Notes */}
                        {applicant.notes && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Notes:</p>
                            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                              {applicant.notes}
                            </p>
                          </div>
                        )}

                        {/* Applied Date */}
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(applicant.linkedinUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            LinkedIn
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(applicant.resumeUrl, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Resume
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplicant(applicant);
                                  setApplicantNotes(applicant.notes);
                                }}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Notes
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Notes - {applicant.name}</DialogTitle>
                                <DialogDescription>
                                  Add private notes about this candidate
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  value={applicantNotes}
                                  onChange={(e) => setApplicantNotes(e.target.value)}
                                  placeholder="Add your notes about this candidate..."
                                  rows={4}
                                />
                                <div className="flex space-x-2">
                                  <Button onClick={saveApplicantNotes} className="flex-1">
                                    Save Notes
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setSelectedApplicant(null)}
                                    className="flex-1"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`mailto:${applicant.email}`, '_blank')}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          
                          {applicant.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => updateApplicantStatus(applicant.id, 'shortlisted')}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Shortlist
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateApplicantStatus(applicant.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          )}
                          
                          {applicant.status === 'shortlisted' && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateApplicantStatus(applicant.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          )}
                          
                          {applicant.status === 'rejected' && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => updateApplicantStatus(applicant.id, 'shortlisted')}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Reconsider
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {eventApplicants.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Users className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants yet</h3>
                    <p className="text-gray-600">
                      Applications will appear here once candidates start applying.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Event Analytics Charts */}
          {eventAnalytics && eventAnalytics.total > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Top Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {eventAnalytics.topSkills.map(([skill, count]) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${(count / eventAnalytics.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Experience Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(eventAnalytics.experienceDistribution).map(([range, count]) => (
                      <div key={range} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{range}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-400 h-2 rounded-full"
                              style={{ width: `${eventAnalytics.total > 0 ? (count / eventAnalytics.total) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Events List View
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Analytics & Events</h1>
          <p className="text-gray-600">
            Manage your referral events and track overall performance
          </p>
        </div>

        {/* Overall Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                Active referral events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAnalytics.total}</div>
              <p className="text-xs text-muted-foreground">
                Across all events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAnalytics.pending}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting your review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAnalytics.shortlisted}</div>
              <p className="text-xs text-muted-foreground">
                Ready for next steps
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Referral Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => {
            const eventApplicantsCount = mockApplicants.filter(a => a.referralEventId === event.id);
            const pending = eventApplicantsCount.filter(a => a.status === 'pending').length;
            const shortlisted = eventApplicantsCount.filter(a => a.status === 'shortlisted').length;
            const rejected = eventApplicantsCount.filter(a => a.status === 'rejected').length;
            const daysLeft = getDaysUntilExpiry(event.expiryDate);
            const isExpiringSoon = daysLeft <= 3;
            const isExpired = daysLeft < 0;

            // Calculate top skills for this event
            const eventSkills = eventApplicantsCount.reduce((acc, applicant) => {
              applicant.skills.forEach(skill => {
                acc[skill] = (acc[skill] || 0) + 1;
              });
              return acc;
            }, {} as Record<string, number>);
            const topSkills = Object.entries(eventSkills).sort(([,a], [,b]) => b - a).slice(0, 3);

            // Calculate experience distribution
            const expDistribution = eventApplicantsCount.reduce((acc, applicant) => {
              const years = parseInt(applicant.experience);
              if (years <= 2) acc['0-2']++;
              else if (years <= 5) acc['3-5']++;
              else if (years <= 8) acc['6-8']++;
              else acc['9+']++;
              return acc;
            }, { '0-2': 0, '3-5': 0, '6-8': 0, '9+': 0 });

            return (
              <Card key={event.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => setSelectedEvent(event)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img 
                          src={event.logo} 
                          alt={`${event.company} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
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
                    {/* Event Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-black">{eventApplicantsCount.length}</div>
                        <div className="text-sm text-gray-600">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{pending}</div>
                        <div className="text-sm text-gray-600">Pending</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{shortlisted}</div>
                        <div className="text-sm text-gray-600">Shortlisted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{rejected}</div>
                        <div className="text-sm text-gray-600">Rejected</div>
                      </div>
                    </div>

                    {/* Top Skills */}
                    {topSkills.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Top Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {topSkills.map(([skill, count]) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill} ({count})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience Distribution */}
                    {eventApplicantsCount.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Experience Distribution:</h4>
                        <div className="flex space-x-4 text-xs text-gray-600">
                          {Object.entries(expDistribution).map(([range, count]) => (
                            count > 0 && (
                              <span key={range}>
                                {range}y: {count}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Applications</span>
                        <span>{eventApplicantsCount.length}/{event.maxApplicants}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(eventApplicantsCount.length / event.maxApplicants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Event Tags */}
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
  );
}