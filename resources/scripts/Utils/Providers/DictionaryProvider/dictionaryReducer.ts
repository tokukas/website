import { Dictionary, Translation } from '@/Types/Dictionary';
import { isEqual } from 'lodash';

type Action = {
  type: 'added' | 'removed';
  payload: Translation;
};

export default function dictionaryReducer(
  dictionary: Dictionary,
  action: Action,
) {
  const { type, payload } = action;
  switch (type) {
    case 'added': {
      // Make sure if translation is not already exists
      const isExists = dictionary.some((t) => (
        t.key === payload.key
        && isEqual(t.replace, payload.replace)
      ));

      if (isExists) {
        return dictionary;
      }

      return [
        ...dictionary,
        payload,
      ];
    }
    case 'removed': {
      return dictionary.filter((t) => (
        t.key !== payload.key
      ));
    }
    default: {
      throw Error('Invalid action type');
    }
  }
}
