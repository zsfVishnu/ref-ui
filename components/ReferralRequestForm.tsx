'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Company {
  id: number;
  name: string;
  logo: string;
  tags: string[];
  careersUrl: string;
}

interface ReferralRequestFormProps {
  company: Company;
  eventId: number;
  onClose?: () => void;
}

const skillOptions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'Go',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Machine Learning',
  'Data Science',
  'DevOps',
  'Product Management',
  'UI/UX Design',
];

export default function ReferralRequestForm({
  company,
  eventId,
  onClose,
}: ReferralRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
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
    if (!formData.linkedin) newErrors.linkedin = 'LinkedIn URL is required';
    if (!formData.jobUrl) newErrors.jobUrl = 'Job URL is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!selectedFile) newErrors.resume = 'Resume is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const refObject = {
        ...formData,
        yoe: formData.experience,
        resume_file_path: 'resume path',
        additional_message: formData.message,
      };

      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
      await fetch(`${API_URL}/referral-events/${eventId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(refObject),
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to create referral event');
          return res.json();
        })
        .then(data => {
          toast({
            title: 'Success',
            description: 'Referral event created successfully!',
            variant: 'default',
          });
          if (onClose) onClose();
        })
        .catch(err => {
          toast({
            title: 'Error',
            description: err.message || 'Failed to create referral event.',
            variant: 'destructive',
          });
          if (onClose) onClose();
        });
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
        skills: [...prev.skills, skill],
      }));
      if (errors.skills) {
        setErrors(prev => ({ ...prev, skills: '' }));
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
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
      {/* Personal Information */}

      <div>
        <Label htmlFor="linkedin">LinkedIn Profile URL *</Label>
        <Input
          id="linkedin"
          value={formData.linkedin}
          onChange={e => handleChange('linkedin', e.target.value)}
          className={`mt-1 ${errors.linkedin ? 'border-red-500' : ''}`}
          placeholder="https://linkedin.com/in/yourprofile"
        />
        {errors.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>}
      </div>

      <div>
        <Label htmlFor="experience">Years of Experience *</Label>
        <Select
          value={formData.experience}
          onValueChange={value => handleChange('experience', value)}
        >
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
            {skillOptions.map(skill => (
              <Button
                key={skill}
                type="button"
                variant={formData.skills.includes(skill) ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  formData.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)
                }
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
              onChange={e => setNewSkill(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
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
        <div
          className={`mt-1 border-2 border-dashed rounded-lg p-6 text-center ${errors.resume ? 'border-red-500' : 'border-gray-300'}`}
        >
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
          onChange={e => handleChange('message', e.target.value)}
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
