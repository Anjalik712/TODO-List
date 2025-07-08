import { TranslateService } from '@ngx-translate/core';
import { TranslationConfig } from './translation.config';

/**
 * Initializes the translation service before the Angular app boots.
 * This function is meant to be used with Angular's APP_INITIALIZER token.
 * It sets up supported languages, default language, and detects browser language.
 *
 * @param translateService The ngx-translate service instance
 * @param config An object that contains supported, default, and fallback languages
 * @returns A function that returns a Promise<void> which Angular will wait for before bootstrapping
 */

export function initializeTranslation(
    translateService: TranslateService,
    config: TranslationConfig
  ): () => Promise<void> {
  
    // Return a function that returns a Promise, as required by APP_INITIALIZER
    return (): Promise<void> => {
  
      // Register all supported languages with the translation service
      translateService.addLangs(config.supportedLanguages);
  
      // Set the default language to fall back to when translation is missing
      translateService.setDefaultLang(config.defaultLanguage);
  
      // Try to detect the browser's default language
      const browserLang = translateService.getBrowserLang();
  
      // Determine the language to use: use browser language if supported, else fallback
      const langToUse: string =
        config.supportedLanguages.includes(browserLang || '')
          ? browserLang
          : config.fallbackLanguage;
  
      // Use the selected language and return a promise that resolves when the translation file is loaded
      return translateService
        .use(langToUse || config.defaultLanguage)
        .toPromise()
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .then((): void => {}); // Ensures the returned Promise is of type Promise<void>
    };
  }
  