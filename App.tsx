import React, { useState, useEffect } from 'react';
import { Article } from './types';
import { fetchNews } from './services/newsService';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';
import NoArticlesMessage from './components/NoArticlesMessage';
import AboutPage from './components/AboutPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import { getTranslations } from './translations';

type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';
export type Page = 'home' | 'about' | 'privacy';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
    if (currentPage !== 'home') return;

    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const newsArticles = await fetchNews(language, selectedCategory, searchQuery);
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
  }, [language, selectedCategory, searchQuery, t.errorUnexpected, currentPage]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('general');
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };
  
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page === 'home') {
      // Reset search and category when navigating back to home
      setSearchQuery('');
      setSelectedCategory('general');
    }
  };

  const renderHomePageContent = () => {
    if (isLoading) {
      return <LoadingSpinner translations={t} />;
    }

    if (error) {
      return <ErrorMessage message={error} translations={t} />;
    }
    
    if (articles.length === 0) {
      return <NoArticlesMessage translations={t} />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
        {articles.map((article, index) => (
          <NewsCard 
            key={article.url + index} 
            article={article} 
            language={language} 
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage translations={t} />;
      case 'privacy':
        return <PrivacyPolicyPage translations={t} />;
      case 'home':
      default:
        return (
          <>
            <div className="sticky top-0 z-10 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
              <CategoryFilter
                categories={t.categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />
            </div>
            {renderHomePageContent()}
          </>
        );
    }
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
        searchQuery={searchQuery}
        onSearch={handleSearch}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-12">
            {renderPage()}
        </div>
      </main>

      <Footer translations={t} />
    </div>
  );
};

export default App;