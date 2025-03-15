
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectLanguage = (language: typeof availableLanguages[0]) => {
    setLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-brand-blue"></div>
            <span className="text-xl font-bold text-brand-blue">Dhan AI</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-brand-blue ${location.pathname === '/' ? 'text-brand-blue' : 'text-foreground'}`}
          >
            Home
          </Link>
          <Link 
            to="/loan-eligibility" 
            className={`text-sm font-medium transition-colors hover:text-brand-blue ${location.pathname === '/loan-eligibility' ? 'text-brand-blue' : 'text-foreground'}`}
          >
            Loan Eligibility
          </Link>
          <Link 
            to="/financial-tips" 
            className={`text-sm font-medium transition-colors hover:text-brand-blue ${location.pathname === '/financial-tips' ? 'text-brand-blue' : 'text-foreground'}`}
          >
            Financial Tips
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-brand-blue ${location.pathname === '/about' ? 'text-brand-blue' : 'text-foreground'}`}
          >
            About
          </Link>
        </nav>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between space-x-1 rounded-md border border-input px-4 py-2 text-sm"
          >
            <span>{currentLanguage.name}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-50">
              <ul className="py-2">
                {availableLanguages.map((language) => (
                  <li key={language.code}>
                    <button
                      onClick={() => selectLanguage(language)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      {language.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
