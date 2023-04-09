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

  /**
   * Load a translation.
   *
   * @param key The translation key.
   * @param replace The replace object.
   */
  const load = (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => {
    if (get(key, replace)) {
      return;
    }

    (async () => {
      try {
        const translation = await fetchTranslation(key, replace);
        const dictionary = <Dictionary>cookies.dictionary || [];
        const newTranslation = {
          key,
          replace,
          translation,
        };

        setCookies('dictionary', [...dictionary, newTranslation], {
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 1 month
          sameSite: 'lax',
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err);
        } else {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    })();
  };

  // Adding translation on mount
  useEffect(() => {
    if (keys) {
      keys.forEach((item) => {
        if (typeof item === 'string') {
          load(item);
        } else {
          load(item.key, item.replace);
        }
      });
    }
  }, [keys]);

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
