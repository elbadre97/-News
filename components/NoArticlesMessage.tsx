import React from 'react';
import { Translations } from '../translations';

interface NoArticlesMessageProps {
  translations: Translations;
}

const NoArticlesMessage: React.FC<NoArticlesMessageProps> = ({ translations }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-64 bg-gray-50 dark:bg-gray-800/20 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-1-5h.01" />
      </svg>
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">{translations.noArticlesFound}</h3>
      <p className="text-gray-500 dark:text-gray-400">{translations.noArticlesFoundDescription}</p>
    </div>
  );
};

export default NoArticlesMessage;