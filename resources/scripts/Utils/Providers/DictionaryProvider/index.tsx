import { Dictionary, Translation } from '@/Types/Dictionary';
import React from 'react';
import { useCookies } from 'react-cookie';
import dictionaryReducer from './dictionaryReducer';

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
  const [cookies, setCookies] = useCookies(['dictionary']);
  const [dictionary, dispatch] = React.useReducer(
    dictionaryReducer,
    cookies.dictionary as Translation[] ?? [],
  );

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
    dispatch({ type: 'added', payload: translation });
  };

  const dictionaryContext = React.useMemo<DictionaryContextType>(() => ({
    dictionary,
    getTranslation,
    saveTranslation,
  }), [dictionary]);

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
