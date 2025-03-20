"use client"
import { useState, useEffect } from 'react';
import { Music, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {data: session} = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg py-2 shadow-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-purple-600">
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg text-purple-600 font-bold">Beatly</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-sm hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">
            How It Works
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block text-white">
          {session ? (
                              <Button
                                  className="m-2 px-4 py-2 bg-purple-600 hover:cursor-pointer rounded-md"
                                  onClick={() => signOut()} // ✅ Function is now invoked
                              >
                                  Sign Out
                              </Button>
                          ) : (
                              <button
                                  className="m-2 px-4 py-2 bg-purple-600 hover:cursor-pointer rounded-md"
                                  onClick={() => signIn()} // ✅ Function is now invoked
                              >
                                  Sign In
                              </button>
                          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-3">
              <Link 
                href="/" 
                className="text-base hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#features" 
                className="text-base hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-base hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
            </nav>
            <Button className="w-full justify-center">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
