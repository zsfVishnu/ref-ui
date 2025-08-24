'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from auth context in real app

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-black text-white p-1 rounded">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-lg text-black">Get Referral</div>
              <div className="text-xs text-gray-600">Your Gateway to Job Referrals</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-black font-medium transition-colors">
              Home
            </Link>
            <Link href="/companies" className="text-gray-700 hover:text-black font-medium transition-colors">
              Companies
            </Link>
            <Link href="/referral-events" className="text-gray-700 hover:text-black font-medium transition-colors">
              Referral Events
            </Link>
            <Link href="#" className="text-gray-700 hover:text-black font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                      <User className="h-4 w-4" />
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/manage-applicants">Manage Applicants</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-black font-medium">
                Home
              </Link>
              <Link href="/companies" className="text-gray-700 hover:text-black font-medium">
                Companies
              </Link>
              <Link href="/referral-events" className="text-gray-700 hover:text-black font-medium">
                Referral Events
              </Link>
              <Link href="#" className="text-gray-700 hover:text-black font-medium">
                Contact
              </Link>
              {isLoggedIn ? (
                <div className="flex flex-col space-y-4 pt-4">
                  <Link href="/account" className="text-gray-700 hover:text-black font-medium">
                    My Account
                  </Link>
                  <Link href="/manage-applicants" className="text-gray-700 hover:text-black font-medium">
                    Manage Applicants
                  </Link>
                  <Button variant="ghost" onClick={() => setIsLoggedIn(false)} className="justify-start p-0 h-auto font-medium text-gray-700 hover:text-black">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 pt-4">
                  <Link href="/signin">
                    <Button variant="ghost" className="font-medium">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}