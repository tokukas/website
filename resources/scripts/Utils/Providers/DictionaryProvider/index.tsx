import { Dictionary, Translation } from '@/Types/Dictionary';
import React from 'react';
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
  const [dictionary, dispatch] = React.useReducer(dictionaryReducer, []);

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

  // Load dictionary from storage
  React.useEffect(() => {
    const strDictionary = localStorage.getItem('dictionary');

    if (strDictionary) {
      (JSON.parse(strDictionary) as Dictionary).forEach((t) => {
        dispatch({ type: 'added', payload: t });
      });
    }
  }, []);

  // Save dictionary to cookies every time dictionary changed
  React.useEffect(() => {
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
  }, [dictionary]);

  return (
    <DictionaryContext.Provider value={dictionaryContext}>
      {children}
    </DictionaryContext.Provider>
  );
}
