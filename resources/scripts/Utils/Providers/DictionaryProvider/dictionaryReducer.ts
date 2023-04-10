import { Dictionary, Translation } from '@/Types/Dictionary';

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
