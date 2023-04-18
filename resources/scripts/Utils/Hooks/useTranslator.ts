import { ApiResponse } from '@/Types/ApiResponse';
import { Translation } from '@/Types/Dictionary';
import { DictionaryContext } from '@/Utils/Providers/DictionaryProvider';
import { router, usePage } from '@inertiajs/react';
import { AxiosError } from 'axios';
import { isEqual } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import route from 'ziggy-js';

export default function useTranslator(
  /**
   * An array of translation keys to be loaded on mount.
   * You can also pass an object with a key and replace property.
   */
  keys?: (Translation['key'] | Omit<Translation, 'translation'>)[],
) {
  const lang = usePage().props.locale as string;
  const { dictionary, saveTranslation, reset } = useContext(DictionaryContext);
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
      { key, replace, locale: lang },
    );

    return response.data.data;
  };

  const getTranslation = (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => dictionary.find((t) => (
    t.key === key
    && isEqual(t.replace, replace)
  ));

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
    if (getTranslation(key, replace)) {
      return;
    }

    const translation = await fetchTranslation(key, replace);

    if (translation) {
      saveTranslation({ key, replace, translation });
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
      !getTranslation(k.key, k.replace)
    ));

    // Fetch all translation.
    const translations = await Promise.all(
      unexistKeys.map((k) => fetchTranslation(k.key, k.replace)),
    ) as string[];

    // Save translations to the dictionary.
    translations.forEach((translation, index) => {
      saveTranslation({
        ...unexistKeys[index],
        translation,
      });
    });
  };

  const changeLanguage = (language: string) => {
    router.post(route('settings.language.set'), {
      language,
    }, {
      onSuccess: () => {
        reset();
        window.location.reload();
      },
    });
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
     * Change the app language.
     */
    changeLanguage,
    /**
     * Get current app language.
     */
    lang,
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
      getTranslation(key, replace)?.translation ?? key
    ),
  };
}
