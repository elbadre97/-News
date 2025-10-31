import React from 'react';
import { Language } from '../App';

interface LanguageTogglerProps {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageToggler: React.FC<LanguageTogglerProps> = ({ language, toggleLanguage }) => {
  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full font-bold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-purple-500 transition-colors duration-300"
    >
      <span className="sr-only">Toggle language</span>
      {language === 'ar' ? 'EN' : 'AR'}
    </button>
  );
};

export default LanguageToggler;