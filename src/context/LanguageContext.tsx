import { Langs } from '@/enums/langs';
import { createContext, useState, useCallback, type ReactNode } from 'react';

export interface LanguageContextType {
  language: Langs;
  setLanguage: (lang: Langs) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Langs>(Langs.en); // Default to English

  const handleSetLanguage = useCallback((lang: Langs) => {
    setLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
