'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Check, ChevronDown, Home } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-black text-white p-1 rounded">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-lg text-black">Get Referral</div>
              <div className="text-xs text-gray-600">Your Gateway to Job Referrals</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  pathname === '/' ? 'text-black' : 'text-gray-700 hover:text-black'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              {user.role === 'referrer' && (
                <Link 
                  href="/analytics" 
                  className={`font-medium transition-colors ${
                    pathname === '/analytics' ? 'text-black' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  Analytics
                </Link>
              )}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
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
                  {user.role === 'referrer' && (
                    <DropdownMenuItem asChild>
                      <Link href="/analytics">Analytics</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="text-sm text-gray-600">
                Sign in to access your dashboard
              </div>
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
              {user ? (
                <>
                  <Link 
                    href="/" 
                    className={`flex items-center space-x-2 font-medium transition-colors ${
                      pathname === '/' ? 'text-black' : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                  {user.role === 'referrer' && (
                    <Link 
                      href="/analytics" 
                      className={`font-medium transition-colors ${
                        pathname === '/analytics' ? 'text-black' : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      Analytics
                    </Link>
                  )}
                </>
              ) : null}
              {user ? (
                <div className="flex flex-col space-y-4 pt-4">
                  <Link 
                    href="/account" 
                    className={`font-medium transition-colors ${
                      pathname === '/account' ? 'text-black' : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    My Account
                  </Link>
                  {user.role === 'referrer' && (
                    <Link 
                      href="/analytics" 
                      className={`font-medium transition-colors ${
                        pathname === '/analytics' ? 'text-black' : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      Analytics
                    </Link>
                  )}
                  <Button variant="ghost" onClick={signOut} className="justify-start p-0 h-auto font-medium text-gray-700 hover:text-black">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-4">
                  <p className="text-sm text-gray-600">
                    Sign in to access your dashboard
                  </p>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}