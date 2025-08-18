import { useContext } from 'react';
import {
  type LanguageContextType,
  LanguageContext,
} from '../context/LanguageContext';

export const useLang = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
