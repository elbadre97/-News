import React, { useState, useEffect } from 'react';
import { Article } from './types';
import { fetchNews } from './services/newsService';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import { getTranslations } from './translations';
import CategoryFilter from './components/CategoryFilter';

type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return (window.localStorage.getItem('language') as Language) || 'ar';
    }
    return 'ar';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const t = getTranslations(language);

  useEffect(() => {
    const root = window.document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const newsArticles = await fetchNews(language, selectedCategory);
        setArticles(newsArticles);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t.errorUnexpected);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [language, selectedCategory, t.errorUnexpected]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner translations={t} />;
    }

    if (error) {
      return <ErrorMessage message={error} translations={t} />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {articles.map((article, index) => (
          <NewsCard key={article.url + index} article={article} language={language} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white selection:bg-purple-500 selection:text-white transition-colors duration-300">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-100 dark:bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 dark:bg-purple-600 opacity-20 blur-[100px]"></div>
      </div>
      
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language}
        toggleLanguage={toggleLanguage}
        translations={t}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          categories={t.categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {renderContent()}
      </main>

      <Footer translations={t} />
    </div>
  );
};

export default App;