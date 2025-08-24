'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReferralRequestForm from '@/components/ReferralRequestForm';

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
    name: 'TikTok',
    logo: '🎵',
    tags: ['Entertainment', 'Social Media', 'Tech'],
    careersUrl: 'https://careers.tiktok.com',
  },
  {
    id: 5,
    name: 'Meta',
    logo: '👥',
    tags: ['Entertainment', 'Social Media', 'Tech'],
    careersUrl: 'https://careers.meta.com',
  },
  {
    id: 6,
    name: 'Google',
    logo: '🔍',
    tags: ['Tech'],
    careersUrl: 'https://careers.google.com',
  },
  {
    id: 7,
    name: 'J.P. Morgan',
    logo: '🏦',
    tags: ['Finance'],
    careersUrl: 'https://careers.jpmorgan.com',
  },
  {
    id: 8,
    name: 'Oracle',
    logo: '🔴',
    tags: ['Tech'],
    careersUrl: 'https://careers.oracle.com',
  },
  {
    id: 9,
    name: 'J.P. Morgan Chase',
    logo: '🏦',
    tags: ['Finance', 'Tech'],
    careersUrl: 'https://careers.jpmorganchase.com',
  },
  {
    id: 10,
    name: 'Leidos',
    logo: '🟣',
    tags: ['Tech'],
    careersUrl: 'https://careers.leidos.com',
  },
  {
    id: 11,
    name: 'Tesla',
    logo: '🚗',
    tags: ['Automotive', 'Tech'],
    careersUrl: 'https://tesla.com/careers',
  },
  {
    id: 12,
    name: 'Visa',
    logo: '💳',
    tags: ['Finance', 'Tech'],
    careersUrl: 'https://usa.visa.com/careers',
  },
  {
    id: 13,
    name: 'Salesforce',
    logo: '☁️',
    tags: ['Tech'],
    careersUrl: 'https://salesforce.com/careers',
  },
  {
    id: 14,
    name: 'Deloitte',
    logo: '🟢',
    tags: ['Finance'],
    careersUrl: 'https://careers.deloitte.com',
  },
  {
    id: 15,
    name: 'Walmart Labs',
    logo: '🛒',
    tags: ['Commerce', 'Tech'],
    careersUrl: 'https://careers.walmart.com',
  },
  {
    id: 16,
    name: 'IBM',
    logo: '🔵',
    tags: ['Tech'],
    careersUrl: 'https://ibm.com/careers',
  },
  {
    id: 17,
    name: 'Cisco',
    logo: '🌐',
    tags: ['Tech'],
    careersUrl: 'https://jobs.cisco.com',
  },
  {
    id: 18,
    name: 'Uber',
    logo: '🚗',
    tags: ['Tech', 'Transportation', 'Travel'],
    careersUrl: 'https://uber.com/careers',
  },
];

const categories = ['All', 'Tech', 'Finance', 'Commerce', 'Entertainment', 'Social Media', 'Gaming', 'Media', 'Automotive', 'Transportation', 'Travel'];
const sortOptions = ['Name A-Z', 'Name Z-A', 'Most Popular'];

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Name A-Z');
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);

  const filteredCompanies = companies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || company.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Name A-Z':
          return a.name.localeCompare(b.name);
        case 'Name Z-A':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Get referred to over 1000+ <span className="text-blue-600">companies</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Select a company you want a referral for, enter the URL for the job posting 
            that you want, and send your profile off to our referrers!
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Popular: Amazon, Google, KPMG, etc"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Search
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Companies Grid */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Companies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    View Careers Page
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}