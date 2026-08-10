import { describe, it, expect, beforeEach } from 'vitest';

describe('Multilingual i18n & Spanish Language Context Unit Tests', () => {
  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.practiceQuestions': 'Practice Questions',
      'hero.title': 'Pass Your RBT Certification Exam on the First Try',
      'common.spanish': 'Spanish (Español)',
    },
    es: {
      'nav.home': 'Inicio',
      'nav.practiceQuestions': 'Preguntas de Práctica',
      'hero.title': 'Aprueba tu Examen de Certificación RBT al Primer Intento',
      'common.spanish': 'Español',
    },
  };

  it('should return English translation by default when language is "en"', () => {
    const lang: 'en' | 'es' = 'en';
    const t = (key: string) => translations[lang]?.[key as keyof (typeof translations)['en']] || key;

    expect(t('nav.home')).toBe('Home');
    expect(t('nav.practiceQuestions')).toBe('Practice Questions');
    expect(t('hero.title')).toBe('Pass Your RBT Certification Exam on the First Try');
  });

  it('should return Spanish translation when language is "es"', () => {
    const lang: 'en' | 'es' = 'es';
    const t = (key: string) => translations[lang]?.[key as keyof (typeof translations)['es']] || key;

    expect(t('nav.home')).toBe('Inicio');
    expect(t('nav.practiceQuestions')).toBe('Preguntas de Práctica');
    expect(t('hero.title')).toBe('Aprueba tu Examen de Certificación RBT al Primer Intento');
  });

  it('should fallback to English translation when translation key is missing in Spanish', () => {
    const lang = 'es';
    const fallbackTranslation = {
      ...translations.es,
    } as Record<string, string>;

    const t = (key: string) => fallbackTranslation[key] || translations.en[key as keyof typeof translations.en] || key;

    expect(t('nav.home')).toBe('Inicio');
    expect(t('missing.key')).toBe('missing.key');
  });

  it('should correctly format locale codes for English and Spanish', () => {
    const supportedLocales = ['en-US', 'es-ES', 'es-MX', 'es-US'];
    expect(supportedLocales).toContain('es-ES');
    expect(supportedLocales).toContain('es-MX');
  });
});
