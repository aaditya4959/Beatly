import { Music } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-purple-600 text-white border-t border-white/5 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding */}
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="relative w-7 h-7 flex items-center justify-center bg-primary rounded-full">
              <Music className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-bold">Beatly</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0 text-white font-bold">
            <a href="#features" className="text-sm  hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#" className="text-sm  hover:text-primary transition-colors">
              Documentation
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs ">
            © {year} Beatly
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;