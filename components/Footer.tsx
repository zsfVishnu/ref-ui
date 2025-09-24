import { Check, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Footer() {
  const [feedbackData, setFeedbackData] = useState({
    email: '',
    linkedin: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [agreeNewsletter, setAgreeNewsletter] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackData.email || !feedbackData.message.trim()) {
      toast.error('Please fill in email and message fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        toast.success('Thank you for your feedback!');
        setFeedbackData({ email: '', linkedin: '', message: '' });
      } else {
        toast.error('Failed to send feedback. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !agreeNewsletter) {
      toast.error('Please enter your email and agree to subscribe');
      return;
    }
    toast.success('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
    setAgreeNewsletter(false);
  };

  return (
    <footer className="bg-yellow-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-12">
          <div className="bg-black text-white p-1 rounded">
            <Check className="h-4 w-4" />
          </div>
          <div>
            <div className="font-bold text-lg text-black">Get Referral</div>
            <div className="text-xs text-black/80">Your Gateway to Job Referrals</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Send Feedback */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">Send Feedback</h3>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <Label htmlFor="feedback-email" className="text-black font-medium">
                  Email *
                </Label>
                <Input
                  id="feedback-email"
                  type="email"
                  placeholder="Enter your email"
                  value={feedbackData.email}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white border-black text-black mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="feedback-linkedin" className="text-black font-medium">
                  LinkedIn (Optional)
                </Label>
                <Input
                  id="feedback-linkedin"
                  type="url"
                  placeholder="LinkedIn profile URL"
                  value={feedbackData.linkedin}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, linkedin: e.target.value }))}
                  className="bg-white border-black text-black mt-1"
                />
              </div>
            </form>
          </div>

          {/* Feedback Message */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">Your Message</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="feedback-message" className="text-black font-medium">
                  Message *
                </Label>
                <Textarea
                  id="feedback-message"
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  value={feedbackData.message}
                  onChange={(e) => setFeedbackData(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-white border-black text-black mt-1"
                  rows={4}
                  required
                />
              </div>
              <Button
                onClick={handleFeedbackSubmit}
                disabled={isSubmitting || !feedbackData.email || !feedbackData.message.trim()}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">Quick Links</h3>
            <div className="space-y-4 text-black">
              <Link href="/privacy" className="block hover:text-black/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block hover:text-black/70 transition-colors">
                Terms & Conditions
              </Link>
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Follow Us</h4>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">Newsletter</h3>
            <div className="space-y-4 text-black mb-6">
              <p>Stay updated with the latest news and developments in the job referral space.</p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="block text-black font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white border-black text-black"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsletter" 
                  checked={agreeNewsletter}
                  onCheckedChange={(checked) => setAgreeNewsletter(checked as boolean)}
                />
                <label htmlFor="newsletter" className="text-black text-sm">
                  Yes, subscribe me to your newsletter. *
                </label>
              </div>

              <Button 
                type="submit"
                disabled={!newsletterEmail || !agreeNewsletter}
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-black/20 pt-8">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex space-x-6">
              <div>
                <h4 className="font-semibold text-black mb-2">Twitter</h4>
                <a href="#" className="text-black hover:text-black/70 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Instagram</h4>
                <a href="#" className="text-black hover:text-black/70 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-black mb-2">Facebook</h4>
                <a href="#" className="text-black hover:text-black/70 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
