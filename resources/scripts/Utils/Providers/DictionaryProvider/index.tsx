import { Dictionary, Translation } from '@/Types/Dictionary';
import React from 'react';
import dictionaryReducer from './dictionaryReducer';

export type DictionaryContextType = {
  dictionary: Dictionary;
  saveTranslation: (translation: Translation) => void;
  reset: () => void;
};

export const DictionaryContext = React.createContext<DictionaryContextType>({
  dictionary: [],
  saveTranslation: () => {
    //
  },
  reset: () => {
    //
  },
});

export type DictionaryProviderProps = {
  children: React.ReactNode;
};

const initDictionary = () => {
  const strDictionary = localStorage.getItem('dictionary');

  if (strDictionary) {
    return JSON.parse(strDictionary) as Dictionary;
  }

  return [];
};

export default function DictionaryProvider({
  children,
}: DictionaryProviderProps) {
  const [dictionary, dispatch] = React.useReducer(
    dictionaryReducer,
    initDictionary(),
  );

  /**
   * Save a translation.
   *
   * @param translation The translation.
   */
  const saveTranslation = (translation: Translation) => {
    dispatch({ type: 'added', payload: translation });
  };

  const reset = () => {
    dispatch({ type: 'reset' });
  };

  const dictionaryContext = React.useMemo<DictionaryContextType>(() => ({
    dictionary,
    saveTranslation,
    reset,
  }), [dictionary]);

  // Load dictionary from storage
  React.useEffect(() => {
    initDictionary().forEach((t) => {
      dispatch({ type: 'added', payload: t });
    });
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
