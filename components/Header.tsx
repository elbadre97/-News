import React from 'react';
import ThemeToggler from './ThemeToggler';
import LanguageToggler from './LanguageToggler';
import SearchInput from './SearchInput';
import { Language, Page } from '../App';
import { Translations } from '../translations';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  translations: Translations;
  searchQuery: string;
  onSearch: (query: string) => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  theme, 
  toggleTheme, 
  language, 
  toggleLanguage, 
  translations, 
  searchQuery, 
  onSearch,
  currentPage,
  onNavigate
}) => {
  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: translations.navHome },
    { page: 'about', label: translations.navAbout },
    { page: 'privacy', label: translations.navPrivacy },
  ];

  return (
    <header className="py-8 px-4 sm:px-0 text-center relative">
      <div className="absolute top-4 end-4 sm:top-6 sm:end-6 lg:start-4 lg:end-auto flex gap-2">
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        <LanguageToggler language={language} toggleLanguage={toggleLanguage} />
      </div>
      <h1 
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        News+
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {translations.headerSubtitle}
      </p>
      
      <nav className="mt-6">
        <ul className="flex items-center justify-center gap-4 sm:gap-6">
          {navItems.map(item => (
            <li key={item.page}>
              <button 
                onClick={() => onNavigate(item.page)}
                className={`text-base font-semibold transition-colors duration-300 relative pb-1 ${
                  currentPage === item.page
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 transition-transform duration-300 ease-out ${
                  currentPage === item.page ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {currentPage === 'home' && (
        <div className="mt-8 max-w-xl mx-auto">
          <SearchInput 
            onSearch={onSearch} 
            searchQuery={searchQuery} 
            translations={translations} 
          />
        </div>
      )}
    </header>
  );
};

export default Header;