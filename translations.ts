import { Language } from './App';

const translations = {
  en: {
    headerSubtitle: 'Your daily dose of global headlines',
    loadingMessage: 'Loading news...',
    errorTitle: 'An Error Occurred',
    errorUnexpected: 'An unexpected error occurred.',
    footerText: 'Powered by Gemini',
    searchPlaceholder: 'Search for news...',
    searchButtonLabel: 'Search',
    noArticlesFound: 'No Articles Found',
    noArticlesFoundDescription: 'Try adjusting your search or category selection.',
    categories: {
      general: 'General',
      technology: 'Technology',
      sports: 'Sports',
      business: 'Business',
      health: 'Health',
      entertainment: 'Entertainment',
    }
  },
  ar: {
    headerSubtitle: 'جرعتك اليومية من العناوين العالمية',
    loadingMessage: 'جاري تحميل الأخبار...',
    errorTitle: 'حدث خطأ',
    errorUnexpected: 'An unexpected error occurred.',
    footerText: 'مدعوم بواسطة Gemini',
    searchPlaceholder: 'ابحث عن أخبار...',
    searchButtonLabel: 'بحث',
    noArticlesFound: 'لم يتم العثور على مقالات',
    noArticlesFoundDescription: 'جرّب تعديل بحثك أو اختيار فئة أخرى.',
    categories: {
      general: 'عام',
      technology: 'تكنولوجيا',
      sports: 'رياضة',
      business: 'أعمال',
      health: 'صحة',
      entertainment: 'ترفيه',
    }
  },
};

export type Translations = typeof translations.en;

export const getTranslations = (lang: Language): Translations => translations[lang];