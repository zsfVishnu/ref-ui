'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Plus } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  logo: string;
  tags: string[];
  careersUrl: string;
}

interface ReferralRequestFormProps {
  company: Company;
}

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'Go',
  'AWS', 'Azure', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis',
  'Machine Learning', 'Data Science', 'DevOps', 'Product Management', 'UI/UX Design'
];

export default function ReferralRequestForm({ company }: ReferralRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinUrl: '',
    jobUrl: '',
    experience: '',
    skills: [] as string[],
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.linkedinUrl) newErrors.linkedinUrl = 'LinkedIn URL is required';
    if (!formData.jobUrl) newErrors.jobUrl = 'Job URL is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!selectedFile) newErrors.resume = 'Resume is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Referral request submitted:', { ...formData, resume: selectedFile });
      // Reset form or show success message
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setSelectedFile(file);
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      if (errors.skills) {
        setErrors(prev => ({ ...prev, skills: '' }));
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addCustomSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{company.logo}</div>
          <div>
            <h3 className="font-semibold text-lg">{company.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {company.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="linkedinUrl">LinkedIn Profile URL *</Label>
        <Input
          id="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={(e) => handleChange('linkedinUrl', e.target.value)}
          className={`mt-1 ${errors.linkedinUrl ? 'border-red-500' : ''}`}
          placeholder="https://linkedin.com/in/yourprofile"
        />
        {errors.linkedinUrl && <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl}</p>}
      </div>

      <div>
        <Label htmlFor="jobUrl">Job Posting URL *</Label>
        <Input
          id="jobUrl"
          value={formData.jobUrl}
          onChange={(e) => handleChange('jobUrl', e.target.value)}
          className={`mt-1 ${errors.jobUrl ? 'border-red-500' : ''}`}
          placeholder="Paste the job posting URL here"
        />
        {errors.jobUrl && <p className="mt-1 text-sm text-red-600">{errors.jobUrl}</p>}
      </div>

      <div>
        <Label htmlFor="experience">Years of Experience *</Label>
        <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)}>
          <SelectTrigger className={`mt-1 ${errors.experience ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-1">0-1 years</SelectItem>
            <SelectItem value="2-3">2-3 years</SelectItem>
            <SelectItem value="4-5">4-5 years</SelectItem>
            <SelectItem value="6-8">6-8 years</SelectItem>
            <SelectItem value="9-12">9-12 years</SelectItem>
            <SelectItem value="13+">13+ years</SelectItem>
          </SelectContent>
        </Select>
        {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
      </div>

      {/* Skills */}
      <div>
        <Label>Skills *</Label>
        <div className="mt-2">
          <div className="flex flex-wrap gap-2 mb-3">
            {skillOptions.map((skill) => (
              <Button
                key={skill}
                type="button"
                variant={formData.skills.includes(skill) ? "default" : "outline"}
                size="sm"
                onClick={() => formData.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                className="text-xs"
              >
                {skill}
                {formData.skills.includes(skill) && <X className="h-3 w-3 ml-1" />}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add custom skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
            />
            <Button type="button" onClick={addCustomSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {formData.skills.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Selected skills:</p>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
      </div>

      {/* Resume Upload */}
      <div>
        <Label htmlFor="resume">Resume *</Label>
        <div className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center ${errors.resume ? 'border-red-500' : 'border-gray-300'}`}>
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            {selectedFile ? selectedFile.name : 'Upload your resume (PDF or DOC)'}
          </p>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('resume')?.click()}
          >
            Choose File
          </Button>
        </div>
        {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">Additional Message (Optional)</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="mt-1"
          rows={4}
          placeholder="Tell the referrer why you're interested in this role and company..."
        />
      </div>

      <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
        Submit Referral Request
      </Button>
    </form>
  );
}