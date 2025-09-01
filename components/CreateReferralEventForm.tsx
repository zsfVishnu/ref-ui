'use client';

import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const companies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Apple',
  'Meta',
  'Netflix',
  'Tesla',
  'Uber',
  'Airbnb',
  'Spotify',
  'Adobe',
  'Salesforce',
  'Oracle',
  'IBM',
  'Intel',
];

export default function CreateReferralEventForm({ onClose }: { onClose?: () => void }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    jobUrl: '',
    location: '',
    maxApplicants: '',
    requirements: '',
    tags: '',
  });
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('starting submit');
    const newErrors: Record<string, string> = {};

    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.jobUrl) newErrors.jobUrl = 'Job URL is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.maxApplicants) newErrors.maxApplicants = 'Max applicants is required';
    if (!formData.requirements) newErrors.requirements = 'Requirements are required';
    if (!expiryDate) newErrors.expiryDate = 'Expiry date is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Prepare the full event data
      const referralEvent = {
        id: undefined, // Let backend assign
        company: formData.company,
        logo: '', // blank
        job_title: formData.jobTitle,
        location: formData.location,
        applicants: 0,
        max_applicants: Number(formData.maxApplicants),
        expiry_date: expiryDate ? expiryDate.toISOString() : '',
        posted_by: user?.id || '',
        requirements: formData.requirements,
        job_url: formData.jobUrl,
        tags: formData.tags,
      };
      await fetch('http://localhost:4000/referral-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(referralEvent),
      })
        .then(res => {
          console.log(res);
          if (!res.ok) throw new Error('Failed to create referral event');
          return res.json();
        })
        .then(data => {
          console.log('data', data);
          toast({
            title: 'Success',
            description: 'Referral event created successfully!',
            variant: 'default',
          });
          if (onClose) onClose();
        })
        .catch(err => {
          console.error(err);
          toast({
            title: 'Error',
            description: err.message || 'Failed to create referral event.',
            variant: 'destructive',
          });
        });
      // Reset form or show success message
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company *</Label>
          <Select value={formData.company} onValueChange={value => handleChange('company', value)}>
            <SelectTrigger className={`mt-1 ${errors.company ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(company => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
        </div>

        <div>
          <Label htmlFor="jobTitle">Job Title *</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={e => handleChange('jobTitle', e.target.value)}
            className={`mt-1 ${errors.jobTitle ? 'border-red-500' : ''}`}
            placeholder="e.g. Senior Software Engineer"
          />
          {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="jobUrl">Job Posting URL *</Label>
        <Input
          id="jobUrl"
          value={formData.jobUrl}
          onChange={e => handleChange('jobUrl', e.target.value)}
          className={`mt-1 ${errors.jobUrl ? 'border-red-500' : ''}`}
          placeholder="https://careers.company.com/jobs/123456"
        />
        {errors.jobUrl && <p className="mt-1 text-sm text-red-600">{errors.jobUrl}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={e => handleChange('location', e.target.value)}
            className={`mt-1 ${errors.location ? 'border-red-500' : ''}`}
            placeholder="e.g. San Francisco, CA"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div>
          <Label htmlFor="maxApplicants">Max Applicants *</Label>
          <Input
            id="maxApplicants"
            type="number"
            min="1"
            max="50"
            value={formData.maxApplicants}
            onChange={e => handleChange('maxApplicants', e.target.value)}
            className={`mt-1 ${errors.maxApplicants ? 'border-red-500' : ''}`}
            placeholder="e.g. 10"
          />
          {errors.maxApplicants && (
            <p className="mt-1 text-sm text-red-600">{errors.maxApplicants}</p>
          )}
        </div>
      </div>

      <div>
        <Label>Expiry Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full mt-1 justify-start text-left font-normal ${errors.expiryDate ? 'border-red-500' : ''}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiryDate ? format(expiryDate, 'PPP') : 'Select expiry date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={expiryDate}
              onSelect={date => {
                setExpiryDate(date);
                if (errors.expiryDate) {
                  setErrors(prev => ({ ...prev, expiryDate: '' }));
                }
              }}
              disabled={date => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
      </div>

      <div>
        <Label htmlFor="requirements">Requirements & Details *</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={e => handleChange('requirements', e.target.value)}
          className={`mt-1 ${errors.requirements ? 'border-red-500' : ''}`}
          rows={4}
          placeholder="Describe the role requirements, preferred qualifications, and any additional details..."
        />
        {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
      </div>

      <div>
        <Label htmlFor="tags">Skills/Tags (Optional)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={e => handleChange('tags', e.target.value)}
          className="mt-1"
          placeholder="e.g. React, Node.js, TypeScript (comma separated)"
        />
        <p className="mt-1 text-sm text-gray-500">Separate multiple tags with commas</p>
      </div>

      <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
        Create Referral Event
      </Button>
    </form>
  );
}
