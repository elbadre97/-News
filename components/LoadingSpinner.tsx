import React from 'react';
import { Translations } from '../translations';

interface LoadingSpinnerProps {
  translations: Translations;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ translations }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{translations.loadingMessage}</p>
    </div>
  );
};

export default LoadingSpinner;