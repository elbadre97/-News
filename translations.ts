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
    },
    navHome: 'Home',
    navAbout: 'About Us',
    navPrivacy: 'Privacy Policy',
    aboutTitle: 'About News+',
    aboutContentP1: 'News+ is a modern news aggregator powered by the advanced capabilities of the Gemini API. Our mission is to provide you with the most relevant, up-to-date global news in a clean, beautiful, and accessible interface.',
    aboutContentP2: 'Whether you are interested in technology, sports, business, or general headlines, we bring the world to your fingertips. Enjoy a seamless reading experience with our responsive design and dark mode support.',
    privacyTitle: 'Privacy Policy',
    privacyContentP1: 'Your privacy is important to us. At News+, we do not collect any personal information from our users. The application is designed to be completely anonymous.',
    privacyContentP2: 'The news content is fetched dynamically from the Gemini API based on your selected categories or search queries. We do not store your preferences, search history, or any other data. All settings, such as theme and language, are stored locally on your device and are not transmitted to our servers.',
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
    },
    navHome: 'الرئيسية',
    navAbout: 'من نحن',
    navPrivacy: 'سياسة الخصوصية',
    aboutTitle: 'عن News+',
    aboutContentP1: 'News+ هو مجمع أخبار حديث مدعوم بالإمكانيات المتقدمة لواجهة برمجة تطبيقات Gemini. مهمتنا هي تزويدك بأهم الأخبار العالمية وأحدثها في واجهة نظيفة وجميلة وسهلة الوصول.',
    aboutContentP2: 'سواء كنت مهتمًا بالتكنولوجيا أو الرياضة أو الأعمال أو العناوين العامة، فإننا نضع العالم في متناول يدك. استمتع بتجربة قراءة سلسة مع تصميمنا سريع الاستجابة ودعم الوضع الداكن.',
    privacyTitle: 'سياسة الخصوصية',
    privacyContentP1: 'خصوصيتك مهمة بالنسبة لنا. في News+، لا نجمع أي معلومات شخصية من مستخدمينا. تم تصميم التطبيق ليكون مجهول الهوية تمامًا.',
    privacyContentP2: 'يتم جلب محتوى الأخبار ديناميكيًا من واجهة برمجة تطبيقات Gemini بناءً على الفئات التي تختارها أو استعلامات البحث. نحن لا نخزن تفضيلاتك أو سجل البحث أو أي بيانات أخرى. يتم تخزين جميع الإعدادات، مثل المظهر واللغة، محليًا على جهازك ولا يتم نقلها إلى خوادمنا.',
  },
};

export type Translations = typeof translations.en;

export const getTranslations = (lang: Language): Translations => translations[lang];