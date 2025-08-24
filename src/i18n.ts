import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
  en: {
    translation: {
      // Common
      'welcome': 'Welcome',
      'loading': 'Loading...',
      'error': 'Error',
      'success': 'Success',
      'save': 'Save',
      'cancel': 'Cancel',
      'delete': 'Delete',
      'edit': 'Edit',
      'create': 'Create',
      'back': 'Back',
      'next': 'Next',
      'submit': 'Submit',
      
      // Navigation
      'nav.home': 'Home',
      'nav.diagnose': 'Diagnose',
      'nav.marketplace': 'Marketplace',
      'nav.profile': 'Profile',
      'nav.chat': 'Chat',
      'nav.admin': 'Admin',
      
      // Home Page
      'home.welcome': 'Welcome to KrishiMitra',
      'home.subtitle': 'Your AI-powered farming companion',
      'home.startDiagnosis': 'Start Crop Diagnosis',
      'home.todaysWeather': 'Today\'s Weather',
      'home.myListings': 'My Listings',
      'home.tips': 'Farming Tips',
      
      // Diagnosis
      'diagnosis.title': 'Crop Disease Diagnosis',
      'diagnosis.subtitle': 'Upload crop images for AI-powered disease detection',
      'diagnosis.upload': 'Upload Image',
      'diagnosis.analyzing': 'Analyzing image...',
      'diagnosis.result': 'Diagnosis Result',
      'diagnosis.confidence': 'Confidence',
      'diagnosis.riskLevel': 'Risk Level',
      'diagnosis.recommendations': 'Recommendations',
      'diagnosis.downloadPdf': 'Download PDF Report',
      
      // Marketplace
      'marketplace.title': 'Crop Marketplace',
      'marketplace.subtitle': 'Buy and sell crops directly',
      'marketplace.filter': 'Filter',
      'marketplace.createListing': 'Create Listing',
      'marketplace.price': 'Price',
      'marketplace.quantity': 'Quantity',
      'marketplace.location': 'Location',
      
      // Profile
      'profile.title': 'Profile',
      'profile.name': 'Name',
      'profile.email': 'Email',
      'profile.role': 'Role',
      'profile.language': 'Language',
      'profile.location': 'Location',
      'profile.logout': 'Logout',
      
      // Auth
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.forgotPassword': 'Forgot Password?',
      'auth.noAccount': 'Don\'t have an account?',
      'auth.hasAccount': 'Already have an account?',
    }
  },
  hi: {
    translation: {
      // Common
      'welcome': 'स्वागत है',
      'loading': 'लोड हो रहा है...',
      'error': 'त्रुटि',
      'success': 'सफलता',
      'save': 'सेव करें',
      'cancel': 'रद्द करें',
      'delete': 'हटाएं',
      'edit': 'संपादित करें',
      'create': 'बनाएं',
      'back': 'वापस',
      'next': 'आगे',
      'submit': 'जमा करें',
      
      // Navigation
      'nav.home': 'होम',
      'nav.diagnose': 'जांच',
      'nav.marketplace': 'बाजार',
      'nav.profile': 'प्रोफाइल',
      'nav.chat': 'चैट',
      'nav.admin': 'एडमिन',
      
      // Home Page
      'home.welcome': 'कृषिमित्र में आपका स्वागत है',
      'home.subtitle': 'आपका AI-संचालित कृषि साथी',
      'home.startDiagnosis': 'फसल जांच शुरू करें',
      'home.todaysWeather': 'आज का मौसम',
      'home.myListings': 'मेरी लिस्टिंग',
      'home.tips': 'कृषि सुझाव',
      
      // Diagnosis
      'diagnosis.title': 'फसल रोग निदान',
      'diagnosis.subtitle': 'AI-संचालित रोग पहचान के लिए फसल की तस्वीरें अपलोड करें',
      'diagnosis.upload': 'तस्वीर अपलोड करें',
      'diagnosis.analyzing': 'तस्वीर का विश्लेषण...',
      'diagnosis.result': 'निदान परिणाम',
      'diagnosis.confidence': 'विश्वसनीयता',
      'diagnosis.riskLevel': 'जोखिम स्तर',
      'diagnosis.recommendations': 'सिफारिशें',
      'diagnosis.downloadPdf': 'PDF रिपोर्ट डाउनलोड करें',
      
      // Marketplace
      'marketplace.title': 'फसल बाजार',
      'marketplace.subtitle': 'सीधे फसल खरीदें और बेचें',
      'marketplace.filter': 'फ़िल्टर',
      'marketplace.createListing': 'लिस्टिंग बनाएं',
      'marketplace.price': 'मूल्य',
      'marketplace.quantity': 'मात्रा',
      'marketplace.location': 'स्थान',
      
      // Profile
      'profile.title': 'प्रोफाइल',
      'profile.name': 'नाम',
      'profile.email': 'ईमेल',
      'profile.role': 'भूमिका',
      'profile.language': 'भाषा',
      'profile.location': 'स्थान',
      'profile.logout': 'लॉगआउट',
      
      // Auth
      'auth.login': 'लॉगिन',
      'auth.register': 'पंजीकरण',
      'auth.email': 'ईमेल',
      'auth.password': 'पासवर्ड',
      'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
      'auth.forgotPassword': 'पासवर्ड भूल गए?',
      'auth.noAccount': 'खाता नहीं है?',
      'auth.hasAccount': 'पहले से खाता है?',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;