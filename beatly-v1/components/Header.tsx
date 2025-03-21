"use client";
import { useState, useEffect } from "react";
import { Music, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-600">
            <Music className="w-5 h-5 text-white" />
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

        {/* Auth Buttons */}
        <div className="hidden md:block">
          {session ? (
            <Button className="m-2 px-4 py-2 bg-purple-600 rounded-md" onClick={() => signOut({callbackUrl:"/"})}>
              Sign Out
            </Button>
          ) : (
            <Button className="m-2 px-4 py-2 bg-purple-600 rounded-md" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-background transition-transform duration-300 ${
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-3 text-center">
            <Link href="/" className="text-base hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="#features" className="text-base hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="#how-it-works" className="text-base hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </Link>
          </nav>
          <div className="flex flex-col gap-2">
            {session ? (
              <Button className="w-full bg-purple-600" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <Button className="w-full bg-purple-600" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
