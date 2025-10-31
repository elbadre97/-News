import React from 'react';
import { Translations } from '../translations';

interface AboutPageProps {
  translations: Translations;
}

const AboutPage: React.FC<AboutPageProps> = ({ translations }) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-8 max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">{translations.aboutTitle}</h2>
      <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>{translations.aboutContentP1}</p>
        <p>{translations.aboutContentP2}</p>
      </div>
    </div>
  );
};

export default AboutPage;
