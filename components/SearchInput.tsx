import React, { useState, useEffect } from 'react';
import { Translations } from '../translations';

interface SearchInputProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  translations: Translations;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, searchQuery, translations }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={translations.searchPlaceholder}
        className="w-full py-3 ps-4 pe-12 text-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/50 border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 backdrop-blur-sm"
        aria-label={translations.searchPlaceholder}
      />
      <button
        type="submit"
        className="absolute inset-y-0 inset-e-0 flex items-center justify-center w-12 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        aria-label={translations.searchButtonLabel}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchInput;