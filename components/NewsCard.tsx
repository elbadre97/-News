import React from 'react';
import { Article } from '../types';
import { Language } from '../App';

interface NewsCardProps {
  article: Article;
  language: Language;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, language }) => {
  const formatDate = (dateString: string) => {
    try {
      const locale = language === 'ar' ? 'ar-EG' : 'en-US';
      return new Date(dateString).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl dark:hover:shadow-purple-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // prevents infinite loop
            target.src = 'https://picsum.photos/600/400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 mb-2 flex-grow">
          {article.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {article.description}
        </p>
        <div className="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold">{article.source.name}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;