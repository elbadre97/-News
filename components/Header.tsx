import React from 'react';
import ThemeToggler from './ThemeToggler';
import LanguageToggler from './LanguageToggler';
import SearchInput from './SearchInput';
import { Language } from '../App';
import { Translations } from '../translations';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  translations: Translations;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, language, toggleLanguage, translations, searchQuery, onSearch }) => {
  return (
    <header className="py-8 px-4 sm:px-0 text-center relative">
      <div className="absolute top-4 end-4 sm:top-6 sm:end-6 lg:start-4 lg:end-auto flex gap-2">
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        <LanguageToggler language={language} toggleLanguage={toggleLanguage} />
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text">
        News+
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {translations.headerSubtitle}
      </p>
      <div className="mt-8 max-w-xl mx-auto">
        <SearchInput 
          onSearch={onSearch} 
          searchQuery={searchQuery} 
          translations={translations} 
        />
      </div>
    </header>
  );
};

export default Header;