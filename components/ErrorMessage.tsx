import React from 'react';
import { Translations } from '../translations';

interface ErrorMessageProps {
  message: string;
  translations: Translations;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, translations }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 rounded-lg p-6 text-center">
      <svg
        className="w-16 h-16 text-red-500 dark:text-red-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">{translations.errorTitle}</h3>
      <p className="text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
};

export default ErrorMessage;