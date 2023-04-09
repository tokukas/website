import { ApiResponse } from '@/Types/ApiResponse';
import { AxiosError } from 'axios';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import route from 'ziggy-js';

export type Translation = {
  key: string;
  replace?: Record<string, string | number>,
  translation: string;
}

export type Dictionary = readonly Translation[];

export default function useTranslator(
  /**
   * An array of translation keys to be loaded on mount.
   * You can also pass an object with a key and replace property.
   */
  keys?: (Translation['key'] | Omit<Translation, 'translation'>)[],
) {
  const [cookies, setCookies] = useCookies(['dictionary']);
  const [error, setError] = useState<AxiosError<ApiResponse> | null>(null);

  /**
   * Fetch the translation from the API.
   *
   * @param key The translation key.
   * @param replace The replace object.
   */
  const fetchTranslation = async (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => {
    const response = await window.axios.post<ApiResponse<string>>(
      route('translate'),
      { key, replace },
    );

    return response.data.data;
  };

  /**
   * Get a translation.
   *
   * @param key The translation key.
   * @param replace The replace object.
   */
  const get = (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => (<Dictionary>cookies.dictionary || []).find((item: Translation) => (
    item.key === key && isEqual(item.replace, replace)
  ));

  const saveTranslations = (translations: Translation[]) => {
    const dictionary = <Dictionary>cookies.dictionary || [];

    setCookies('dictionary', [...dictionary, ...translations], {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 1 month
      sameSite: 'lax',
    });
  };

  /**
   * Load a translation.
   *
   * @param key The translation key.
   * @param replace The replace object.
   */
  const load = async (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => {
    if (get(key, replace)) {
      return;
    }

    const translation = await fetchTranslation(key, replace);

    if (translation) {
      saveTranslations([{ key, replace, translation }]);
    }
  };

  /**
   * Load multiple translations.
   *
   * @param keysToLoad An array of keys and replaces.
   */
  const loadMany = async (
    keysToLoad: Omit<Translation, 'translation'>[],
  ) => {
    // Get all keys that doesn't exist in the dictionary.
    const unexistKeys = keysToLoad.filter((k) => (
      !get(k.key, k.replace)
    ));

    // Fetch all translation.
    const translations = await Promise.all(
      unexistKeys.map((k) => fetchTranslation(k.key, k.replace)),
    ) as string[];

    // Save translations to the dictionary.
    saveTranslations(translations.map((translation, index) => ({
      ...unexistKeys[index],
      translation,
    })));
  };

  // Adding translation on mount
  useEffect(() => {
    if (keys) {
      loadMany(keys.map((key) => (
        typeof key === 'string' ? { key } : key
      ))).catch((e) => {
        if (e instanceof AxiosError) {
          setError(e);
        } else {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      });
    }
  }, []);

  return {
    /**
     * Load a translation by key and replace.
     *
     * @param key The translation key.
     * @param replace The replace object.
     */
    load,
    /**
     * Get any error that occurred when loading a translation.
     */
    error,
    /**
     * Translate the given message.
     * If the translation doesn't exist, the key will be returned.
     *
     * @param key The translation key.
     * @param replace The replace object.
     */
    __: (key: Translation['key'], replace?: Translation['replace']) => (
      get(key, replace)?.translation ?? key
    ),
  };
}
