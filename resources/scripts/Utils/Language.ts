import { Language as TLang, languagesAll } from 'countries-list';

export default class Language {
  static getLanguageCodes() {
    return Object.keys(languagesAll);
  }

  static getAllLanguages() {
    return this.getLanguageCodes().map((code) => ({
      code,
      ...languagesAll[code],
    } as TLang & { code: string; }));
  }
}
