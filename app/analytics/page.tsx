'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ChevronDown,
  ChevronUp
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
  { id: 1, title: 'Senior Software Engineer - Google', applicantCount: 2 },
  { id: 2, title: 'Product Manager - Microsoft', applicantCount: 1 },
  { id: 3, title: 'Data Scientist - Amazon', applicantCount: 1 },
  { id: 4, title: 'iOS Developer - Apple', applicantCount: 1 },
];

const companies = ['All Companies', 'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'Uber', 'Spotify', 'Goldman Sachs', 'JPMorgan'];
const experienceLevels = ['All Experience', '0-2 years', '3-5 years', '6-8 years', '9+ years'];
const statuses = ['All Status', 'pending', 'shortlisted', 'rejected'];
const locations = ['All Locations', 'San Francisco, CA', 'Seattle, WA', 'Austin, TX', 'Cupertino, CA', 'New York, NY'];
const educationLevels = ['All Education', 'BS', 'MS', 'MBA', 'PhD'];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [mockApplicants, setMockApplicants] = useState(initialMockApplicants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All Events');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedExperience, setSelectedExperience] = useState('All Experience');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedEducation, setSelectedEducation] = useState('All Education');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
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

  // Get all unique skills for filter
  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    mockApplicants.forEach(applicant => {
      applicant.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, []);

  const filteredApplicants = useMemo(() => {
    return mockApplicants.filter(applicant => {
      const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           applicant.appliedRole.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEvent = selectedEvent === 'All Events' || 
                          referralEvents.find(e => e.id === applicant.referralEventId)?.title.includes(selectedEvent.split(' - ')[1] || '');
      
      const matchesCompany = selectedCompany === 'All Companies' || 
                            applicant.company === selectedCompany ||
                            applicant.currentCompany === selectedCompany ||
                            applicant.previousCompany === selectedCompany;
      
      const matchesStatus = selectedStatus === 'All Status' || applicant.status === selectedStatus;
      const matchesLocation = selectedLocation === 'All Locations' || applicant.location === selectedLocation;
      const matchesEducation = selectedEducation === 'All Education' || applicant.education.includes(selectedEducation);
      const matchesTab = activeTab === 'all' || applicant.status === activeTab;
      
      let matchesExperience = true;
      if (selectedExperience !== 'All Experience') {
        const years = parseInt(applicant.experience);
        switch (selectedExperience) {
          case '0-2 years':
            matchesExperience = years <= 2;
            break;
          case '3-5 years':
            matchesExperience = years >= 3 && years <= 5;
            break;
          case '6-8 years':
            matchesExperience = years >= 6 && years <= 8;
            break;
          case '9+ years':
            matchesExperience = years >= 9;
            break;
        }
      }

      const matchesSkills = selectedSkills.length === 0 || 
                           selectedSkills.every(skill => applicant.skills.includes(skill));

      return matchesSearch && matchesEvent && matchesCompany && matchesExperience && 
             matchesStatus && matchesLocation && matchesEducation && matchesTab && matchesSkills;
    });
  }, [searchTerm, selectedEvent, selectedCompany, selectedExperience, selectedStatus, 
      selectedLocation, selectedEducation, selectedSkills, activeTab]);

  const analytics = useMemo(() => {
    const total = mockApplicants.length;
    const pending = mockApplicants.filter(a => a.status === 'pending').length;
    const shortlisted = mockApplicants.filter(a => a.status === 'shortlisted').length;
    const rejected = mockApplicants.filter(a => a.status === 'rejected').length;

    const skillsCount = mockApplicants.reduce((acc, applicant) => {
      applicant.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const experienceDistribution = mockApplicants.reduce((acc, applicant) => {
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
  }, []);

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

  const exportData = () => {
    console.log('Exporting applicant data...');
    toast.success('Export started', {
      description: 'Your data export will be ready shortly',
    });
  };

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Analytics & Applicants</h1>
          <p className="text-gray-600">
            Manage your referral events and track applicant progress
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.total}</div>
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
              <div className="text-2xl font-bold">{analytics.pending}</div>
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
              <div className="text-2xl font-bold">{analytics.shortlisted}</div>
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
                {analytics.total > 0 ? Math.round((analytics.shortlisted / analytics.total) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Shortlist rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filters & Search</CardTitle>
              <div className="flex items-center space-x-2">
                <Button onClick={exportData} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                  variant="outline"
                  size="sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {isFiltersExpanded ? 'Hide' : 'Show'} Filters
                  {isFiltersExpanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Expandable Filters */}
            {isFiltersExpanded && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Events">All Events</SelectItem>
                      {referralEvents.map(event => (
                        <SelectItem key={event.id} value={event.title}>{event.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map(company => (
                        <SelectItem key={company} value={company}>{company}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedEducation} onValueChange={setSelectedEducation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Skills Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map(skill => (
                      <Button
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSkillFilter(skill)}
                        className="text-xs"
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({mockApplicants.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({analytics.pending})
            </TabsTrigger>
            <TabsTrigger value="shortlisted">
              Shortlisted ({analytics.shortlisted})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({analytics.rejected})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Applicants List */}
            <div className="space-y-6">
              {filteredApplicants.map((applicant) => (
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
                            Applied for {applicant.appliedRole} at {applicant.company}
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Experience:</strong> {applicant.experience} years
                        </div>
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
            </div>

            {filteredApplicants.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or check back later for new applications.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Analytics Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Top Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topSkills.map(([skill, count]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${(count / analytics.total) * 100}%` }}
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
                {Object.entries(analytics.experienceDistribution).map(([range, count]) => (
                  <div key={range} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{range}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${analytics.total > 0 ? (count / analytics.total) * 100 : 0}%` }}
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
      </div>
    </div>
  );
}