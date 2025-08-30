'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Check, Search, Unlock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import HowItWorksSection from '@/components/HowItWorksSection';
import TailoredSection from '@/components/TailoredSection';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate' as 'candidate' | 'referrer',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (isSignUp) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isSignUp && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        let success = true;
        if (isSignUp) {
          console.log("formdata " , formData);
          success = await signUp({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          });
          if (!success) {
            setErrors({ email: 'User already exists with this email' });
          }
        } else {
          success = true
            // await signIn(formData.email, formData.password);
          if (!success) {
            setErrors({ password: 'Invalid email or password' });
          }
        }
      } catch (error) {
        setErrors({ general: 'An error occurred. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      {/* Hero Section with Auth Forms */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6">
                Get Referral - Your Gateway to Job Referrals
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join our referral marketplace to discover job referral opportunities from top 
                companies and improve your chances of getting hired.
              </p>

              {/* Feature Icons */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-black text-white p-2 rounded-lg">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Empower</div>
                    <div className="text-gray-600 text-sm">Your Job Search</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-black text-white p-2 rounded-lg">
                    <Unlock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Unlock Job</div>
                    <div className="text-gray-600 text-sm">Opportunities</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-black text-white p-2 rounded-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Build Your</div>
                    <div className="text-gray-600 text-sm">Career Network</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Auth Form */}
            <div className="max-w-md w-full mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">
                    {isSignUp ? 'Create your account' : 'Welcome back'}
                  </CardTitle>
                  <CardDescription>
                    {isSignUp 
                      ? 'Join thousands of professionals finding their dream jobs through referrals'
                      : 'Sign in to your account to continue your job search journey'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                              placeholder="First name"
                            />
                            {errors.firstName && (
                              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                              placeholder="Last name"
                            />
                            {errors.lastName && (
                              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="role">I am a</Label>
                          <Select value={formData.role} onValueChange={(value: 'candidate' | 'referrer') => setFormData(prev => ({ ...prev, role: value }))}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="candidate">Job Seeker (Candidate)</SelectItem>
                              <SelectItem value="referrer">Company Employee (Referrer)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                          placeholder={isSignUp ? "Create a password" : "Enter your password"}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    {isSignUp && (
                      <>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm password</Label>
                          <div className="relative mt-1">
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                              placeholder="Confirm your password"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => 
                              setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                            }
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm">
                            I agree to the Terms of Service and Privacy Policy
                          </Label>
                        </div>
                        {errors.agreeToTerms && (
                          <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                        )}
                      </>
                    )}

                    {errors.general && (
                      <p className="text-sm text-red-600 text-center">{errors.general}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                      <button
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setErrors({});
                          setFormData({
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            role: 'candidate',
                            agreeToTerms: false,
                          });
                        }}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        {isSignUp ? 'Sign in' : 'Sign up'}
                      </button>
                    </p>
                  </div>

                  {!isSignUp && (
                    <div className="mt-4 text-center">
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections */}
      <HowItWorksSection />
      <TailoredSection />
      <SuccessStoriesSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}