import React from 'react';
import { Translations } from '../translations';

interface FooterProps {
  translations: Translations;
}

const Footer: React.FC<FooterProps> = ({ translations }) => {
  return (
    <footer className="text-center py-6 mt-12 border-t border-gray-200 dark:border-gray-800">
      <p className="text-gray-500 dark:text-gray-400">
        {translations.footerText}
      </p>
    </footer>
  );
};

export default Footer;