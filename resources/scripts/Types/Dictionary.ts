export type Translation = {
  key: string;
  replace?: Record<string, string | number>,
  translation: string;
}

export type Dictionary = readonly Translation[];
