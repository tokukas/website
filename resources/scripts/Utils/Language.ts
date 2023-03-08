import { Language as TLang, languagesAll } from 'countries-list';

export type TLanguage = TLang & {
  code: string;
 };

export default class Language {
  static getLanguageCodes(): string[] {
    return Object.keys(languagesAll);
  }

  static getAllLanguages(): TLanguage[] {
    return this.getLanguageCodes().map((code) => ({
      code,
      ...languagesAll[code],
    } as TLanguage));
  }

  static getLanguageByCode(code: string): TLanguage | undefined {
    return this.getAllLanguages().find((lang) => (
      lang.code.toUpperCase() === code.toUpperCase()
    ));
  }
}
