import { InjectionToken } from '@angular/core';

export interface TranslationConfig {
  supportedLanguages: string[];
  defaultLanguage: string;
  fallbackLanguage: string;
}

export const TRANSLATION_CONFIG = new InjectionToken<TranslationConfig>(
  'translation.config'
);

export const defaultTranslationConfig: TranslationConfig = {
  supportedLanguages: ['en'],
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
};
