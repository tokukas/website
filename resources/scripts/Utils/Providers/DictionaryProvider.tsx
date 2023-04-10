import { Dictionary, Translation } from '@/Types/Dictionary';
import React from 'react';
import { useCookies } from 'react-cookie';

export type DictionaryContextType = {
  dictionary: Dictionary;
  getTranslation: (
    key: Translation['key'],
    replace?: Translation['replace']
  ) => Translation | undefined;
  saveTranslation: (translation: Translation) => void;
};

export const DictionaryContext = React.createContext<DictionaryContextType>({
  dictionary: [],
  getTranslation: () => undefined,
  saveTranslation: () => {
    //
  },
});

export type DictionaryProviderProps = {
  children: React.ReactNode;
};

export default function DictionaryProvider({
  children,
}: DictionaryProviderProps) {
  const [dictionary, setDictionary] = React.useState<Dictionary>([]);
  const [cookies, setCookies] = useCookies(['dictionary']);

  /**
   * Get a translation.
   *
   * @param key The translation key.
   * @param replace The replace object.
   */
  const getTranslation = (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => dictionary.find((item: Translation) => (
    item.key === key && window._.isEqual(item.replace, replace)
  ));

  /**
   * Save a translation.
   *
   * @param translation The translation.
   */
  const saveTranslation = (translation: Translation) => {
    if (getTranslation(translation.key, translation.replace)) {
      return;
    }
    setDictionary((prevDictionary) => [...prevDictionary, translation]);
  };

  const dictionaryContext = React.useMemo<DictionaryContextType>(() => ({
    dictionary,
    getTranslation,
    saveTranslation,
  }), [dictionary]);

  // Load dictionary from cookies
  React.useEffect(() => {
    if (cookies.dictionary) {
      setDictionary(cookies.dictionary as Dictionary);
    }
  }, []);

  // Save dictionary to cookies every time dictionary changed
  React.useEffect(() => {
    setCookies('dictionary', dictionary, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }, [dictionary]);

  return (
    <DictionaryContext.Provider value={dictionaryContext}>
      {children}
    </DictionaryContext.Provider>
  );
}
