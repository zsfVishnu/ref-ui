'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Clock
} from 'lucide-react';

const applicants = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    appliedRole: 'Senior Software Engineer',
    company: 'Google',
    experience: '5 years',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    appliedDate: '2024-01-15',
    status: 'pending',
    linkedinUrl: 'https://linkedin.com/in/alexjohnson',
    resumeUrl: '/resumes/alex-johnson-resume.pdf',
    message: 'I am very excited about this opportunity at Google. I have been working with React and Node.js for the past 5 years and would love to contribute to your team.',
    referralEventId: 1,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    appliedRole: 'Product Manager',
    company: 'Microsoft',
    experience: '4 years',
    skills: ['Product Management', 'Analytics', 'B2B', 'Agile'],
    appliedDate: '2024-01-18',
    status: 'shortlisted',
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    resumeUrl: '/resumes/sarah-chen-resume.pdf',
    message: 'With 4 years of PM experience in B2B SaaS, I believe I can bring valuable insights to Microsoft\'s product team.',
    referralEventId: 2,
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    appliedRole: 'Data Scientist',
    company: 'Amazon',
    experience: '6 years',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    appliedDate: '2024-01-20',
    status: 'rejected',
    linkedinUrl: 'https://linkedin.com/in/michaelrodriguez',
    resumeUrl: '/resumes/michael-rodriguez-resume.pdf',
    message: 'PhD in Statistics with 6 years of industry experience in ML and data science. Excited to work on Amazon\'s recommendation systems.',
    referralEventId: 3,
  },
  {
    id: 4,
    name: 'Emily Wang',
    email: 'emily.wang@email.com',
    phone: '+1 (555) 321-0987',
    location: 'Cupertino, CA',
    appliedRole: 'iOS Developer',
    company: 'Apple',
    experience: '3 years',
    skills: ['Swift', 'iOS', 'Mobile Development', 'UIKit'],
    appliedDate: '2024-01-22',
    status: 'pending',
    linkedinUrl: 'https://linkedin.com/in/emilywang',
    resumeUrl: '/resumes/emily-wang-resume.pdf',
    message: 'Passionate iOS developer with 3 years of experience. Published 2 apps on the App Store and excited to contribute to Apple\'s ecosystem.',
    referralEventId: 4,
  },
];

const companies = ['All Companies', 'Google', 'Microsoft', 'Amazon', 'Apple'];
const roles = ['All Roles', 'Senior Software Engineer', 'Product Manager', 'Data Scientist', 'iOS Developer'];
const experienceLevels = ['All Experience', '0-2 years', '3-5 years', '6-8 years', '9+ years'];
const statuses = ['All Status', 'pending', 'shortlisted', 'rejected'];

export default function ManageApplicantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedExperience, setSelectedExperience] = useState('All Experience');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [activeTab, setActiveTab] = useState('all');

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

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.appliedRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany === 'All Companies' || applicant.company === selectedCompany;
    const matchesRole = selectedRole === 'All Roles' || applicant.appliedRole === selectedRole;
    const matchesStatus = selectedStatus === 'All Status' || applicant.status === selectedStatus;
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

    return matchesSearch && matchesCompany && matchesRole && matchesExperience && matchesStatus && matchesTab;
  });

  const updateApplicantStatus = (applicantId: number, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Updating applicant ${applicantId} status to ${newStatus}`);
  };

  const getApplicantCount = (status: string) => {
    if (status === 'all') return applicants.length;
    return applicants.filter(a => a.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Manage Applicants</h1>
          <p className="text-gray-600">
            Review and manage applications for your referral events
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
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
          </div>
        </div>

        {/* Status Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({getApplicantCount('all')})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({getApplicantCount('pending')})
            </TabsTrigger>
            <TabsTrigger value="shortlisted">
              Shortlisted ({getApplicantCount('shortlisted')})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({getApplicantCount('rejected')})
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

                      {/* Experience and Applied Date */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Experience:</strong> {applicant.experience}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
                        </div>
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
      </div>
    </div>
  );
}