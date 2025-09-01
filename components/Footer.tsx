import { Check, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export default function Footer() {
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
          {/* Contact */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">Contact</h3>
            <div className="space-y-4 text-black">
              <p>123 Job Seeker Street, City, State, 12345</p>
              <p>
                General Inquiries:
                <br />
                info@getreferral.com
              </p>
            </div>
          </div>

          {/* Support & Quick Links */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">Support</h3>
            <div className="space-y-4 text-black">
              <p>support@getreferral.com</p>
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Quick Links</h4>
              </div>
            </div>
          </div>

          {/* Terms & Follow */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">Terms & Conditions</h3>
            <div className="space-y-4 text-black">
              <Link href="/privacy" className="block hover:text-black/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block hover:text-black/70 transition-colors">
                Terms & Conditions
              </Link>
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Follow</h4>
              </div>
            </div>
          </div>

          {/* LinkedIn & Social + Newsletter */}
          <div>
            <h3 className="font-bold text-black text-lg mb-6">LinkedIn</h3>
            <div className="space-y-4 text-black mb-6">
              <p>Stay updated with the latest news and developments in the job referral space.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-black font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white border-black text-black"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <label htmlFor="newsletter" className="text-black text-sm">
                  Yes, subscribe me to your newsletter. *
                </label>
              </div>

              <Button className="w-full bg-black hover:bg-gray-800 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-black/20 pt-8">
          <div className="flex justify-between items-center">
            <div className="text-black text-sm">© 2024 Get Referral. All rights reserved.</div>
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
