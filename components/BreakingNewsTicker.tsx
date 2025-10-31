import React from 'react';
import { BreakingNewsArticle } from '../types';
import { Translations } from '../translations';

interface BreakingNewsTickerProps {
  articles: BreakingNewsArticle[];
  translations: Translations;
}

const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ articles, translations }) => {
  // Duplicate articles for seamless scrolling effect
  const duplicatedArticles = [...articles, ...articles];

  return (
    <div className="relative flex overflow-hidden bg-red-600 dark:bg-red-700 text-white py-3 mb-8 rounded-lg shadow-lg ticker-wrap">
      <div className="absolute inset-y-0 start-0 z-10 flex items-center bg-red-700 dark:bg-red-800 px-4 font-bold text-lg whitespace-nowrap">
        <span>{translations.breakingNews}</span>
      </div>
      <div className="flex-shrink-0 flex items-center ticker-move" style={{ paddingInlineStart: '10rem' }}>
        {duplicatedArticles.map((article, index) => (
          <a
            key={`${article.url}-${index}`}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline px-6 whitespace-nowrap transition-colors duration-200"
          >
            <span className="mx-2">&#8226;</span>
            {article.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
