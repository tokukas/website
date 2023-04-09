import { ApiResponse } from '@/Types/ApiResponse';
import { AxiosError } from 'axios';
import { isEqual } from 'lodash';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import route from 'ziggy-js';

export type Translation = {
  key: string;
  replace?: Record<string, string | number>,
  translation: string;
}

export type Dictionary = readonly Translation[];

export default function useTranslator() {
  const [cookies, setCookies] = useCookies(['dictionary']);
  const [error, setError] = useState<AxiosError<ApiResponse> | null>(null);

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

  const get = (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => (<Dictionary>cookies.dictionary || []).find((item: Translation) => (
    item.key === key && isEqual(item.replace, replace)
  ));

  const add = (
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

  const translate = (
    key: Translation['key'],
    replace?: Translation['replace'],
  ) => {
    const item = get(key, replace);
    return item?.translation ?? key;
  };

  return {
    add,
    error,
    translate,
  };
}
