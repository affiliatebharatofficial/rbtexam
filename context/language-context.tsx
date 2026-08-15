'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'es';

interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.practiceQuestions': 'Practice Questions',
    'nav.mockExams': 'Mock Exams',
    'nav.flashcards': 'Flashcards',
    'nav.studyGuides': 'Study Guides',
    'nav.aiTutor': 'AI Tutor',
    'nav.pricing': 'Pricing',
    'nav.dashboard': 'Dashboard',
    'nav.adminCms': 'Admin CMS',
    'nav.logIn': 'Log In',
    'nav.startFree': 'Start Free',
    'nav.logOut': 'Log Out',
    'nav.profileSettings': 'Account Profile Settings',
    'nav.readinessScore': 'Readiness Score',

    // Hero & General UI
    'hero.badge': 'Aligned with BACB RBT 3rd Edition Task List',
    'hero.titlePrefix': 'Pass Your',
    'hero.titleHighlight': 'RBT Certification',
    'hero.titleSuffix': 'with Confidence',
    'hero.subtitle': 'Practice thousands of realistic RBT questions, take full-length mock exams, learn with AI Tutor, master flashcards and track your progress.',
    'hero.bullet1': '85-Question 90-Min Timed BACB Mocks',
    'hero.bullet2': 'AI Ethics & Practice Question Tutor',
    'hero.bullet3': 'Domains A-F Task List Coverage',
    'hero.bullet4': 'Weak Area Analysis & Analytics',
    'hero.startPractice': 'Start Practicing',
    'hero.mockExamBtn': 'Take a Mock Exam',
    'hero.exploreFlashcards': 'Explore Flashcards',
    'hero.aiTutorButton': 'Ask Socrates AI Tutor',

    // Footer
    'footer.brandDescription': 'The premier RBT Practice AI platform with thousands of practice questions, realistic mock exams, flashcards, and AI tutor support for BACB certification candidates.',
    'footer.examPrep': 'Exam Prep',
    'footer.company': 'Company & Blog',
    'footer.blog': 'Blog',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal & Policies',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.guarantee': 'Guarantee Terms',
    'footer.disclaimer': 'Disclaimer',
    // Features Section
    'features.tagline': 'Built for Maximum Exam Success',
    'features.mainHeading': 'Everything You Need to Pass the RBT Exam with Confidence',
    'features.subHeading': 'Engineered with modern cognitive science, spaced repetition, and real-time AI guidance.',
    'features.feat1.title': 'Adaptive AI Exam Simulator',
    'features.feat1.desc': '85-question 90-minute timed diagnostic exams built strictly according to BACB RBT 3rd Edition scoring weights. Dynamically adjusts question difficulty based on your performance history.',
    'features.feat2.title': 'Socrates AI Ethics & Roleplay Tutor',
    'features.feat2.desc': 'Interact with our conversational AI tutor trained on the RBT Ethics Code 2.0. Simulate challenging client scenarios, extinction bursts, and parent boundary situations in real-time.',
    'features.feat3.title': 'Spaced-Repetition Flashcards',
    'features.feat3.desc': 'Leverage the Leitner 5-box algorithm to lock core ABA terminology (DTT, DRO/DRA, Continuous Measurement, Latency, IRT) into your long-term memory with minimal study time.',
    'features.feat4.title': 'BACB RBT 3rd Ed Task List Mastery',
    'features.feat4.desc': 'Complete breakdown of all 6 Task List Domains (A through F). Track individual task item mastery from A-01 (Session Prep) to F-04 (5% Monthly Supervision).',
    'features.feat5.title': 'Domain Weakness Heatmaps',
    'features.feat5.desc': 'Visual analytics pinpoint exact weak spots before exam day so you spend 100% of your remaining study time on high-impact improvement areas.',
    'features.feat6.title': 'Clinic & Training Center B2B Portal',
    'features.feat6.desc': 'Supervisors and BCBAs can oversee trainee cohorts, track student exam readiness scores, assign practice tests, and verify 100% team pass readiness.',

    // Pricing Section
    'pricing.badge': 'RBT Practice AI Pass-or-Refund Guarantee',
    'pricing.heading': 'Invest in Your RBT Certification Success',
    'pricing.subheading': 'Choose the plan tailored for your exam target date or clinic cohort needs.',
    'pricing.monthly': 'Monthly Plan',
    'pricing.annual': 'Annual Pass',
    'pricing.save': 'Save 40%',

    // Exam Engine
    'exam.title': 'RBT Exam Simulator',
    'exam.subtitle': 'Realistic BACB RBT 3rd Edition Task List exam practice with detailed explanations.',
    'exam.selectDomain': 'Select Task List Domain',
    'exam.allDomains': 'All BACB Task List Domains',
    'exam.numQuestions': 'Number of Questions',
    'exam.startExam': 'Start Practice Exam',
    'exam.question': 'Question',
    'exam.of': 'of',
    'exam.submitAnswer': 'Submit Answer',
    'exam.nextQuestion': 'Next Question',
    'exam.previousQuestion': 'Previous Question',
    'exam.finishExam': 'Finish & Grade Exam',
    'exam.explanation': 'Clinical Rationale & Explanation',
    'exam.correctAnswer': 'Correct Answer',
    'exam.yourAnswer': 'Your Selected Answer',
    'exam.scoreSummary': 'Exam Score Summary',
    'exam.retakeExam': 'Retake Exam',
    'exam.backToSetup': 'Back to Setup',
    'exam.languageLabel': 'Question Language',

    // Flashcard Engine
    'flashcard.title': 'RBT Flashcard Deck',
    'flashcard.subtitle': 'Spaced repetition system (Leitner 5-Box) for maximum BACB retention.',
    'flashcard.flipHint': 'Click or press Space to flip card',
    'flashcard.knowIt': 'I Know This',
    'flashcard.dontKnowIt': 'Need Review',
    'flashcard.box': 'Box',
    'flashcard.generateAi': 'Generate AI Flashcards',
    'flashcard.languageSelect': 'Flashcard Language',

    // AI Tutor Engine
    'tutor.title': 'Socrates AI Clinical Tutor',
    'tutor.subtitle': '24/7 AI mentor trained on BACB RBT Task List standards.',
    'tutor.placeholder': 'Ask any question about RBT task list, ABA concepts, or practice questions...',
    'tutor.send': 'Send Message',
    'tutor.suggestedQuestions': 'Suggested Study Questions',
    'tutor.clinicalRationale': 'Clinical Guidance',
    'tutor.languageLabel': 'Tutor Language',

    // Dashboard
    'dashboard.welcome': 'Welcome back candidate',
    'dashboard.readinessTitle': 'RBT Certification Readiness',
    'dashboard.readinessDescription': 'Based on your recent exam accuracy and domain mastery.',
    'dashboard.weakDomains': 'Weakest Domain Areas',
    'dashboard.studyPlan': 'Personalized Study Recommendations',
    'dashboard.streak': 'Day Study Streak',
    'dashboard.questionsAnswered': 'Questions Answered',

    // Admin & General
    'admin.title': 'Super Admin CMS Control Center',
    'admin.defaultLocale': 'Default Candidate Locale',
    'admin.saveSettings': 'Save Platform Settings',
    'common.english': 'English',
    'common.spanish': 'Spanish (Español)',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.practiceQuestions': 'Preguntas de Práctica',
    'nav.mockExams': 'Exámenes Simulados',
    'nav.flashcards': 'Tarjetas Didácticas',
    'nav.studyGuides': 'Guías de Estudio',
    'nav.aiTutor': 'Tutor de IA',
    'nav.pricing': 'Precios',
    'nav.dashboard': 'Panel Principal',
    'nav.adminCms': 'CMS Administrador',
    'nav.logIn': 'Iniciar Sesión',
    'nav.startFree': 'Empezar Gratis',
    'nav.logOut': 'Cerrar Sesión',
    'nav.profileSettings': 'Configuración de Perfil',
    'nav.readinessScore': 'Puntaje de Preparación',

    // Hero & General UI
    'hero.badge': 'Alineado con el Temario BACB RBT 3ª Edición',
    'hero.titlePrefix': 'Aprueba tu',
    'hero.titleHighlight': 'Certificación RBT',
    'hero.titleSuffix': 'con Confianza',
    'hero.subtitle': 'Practica miles de preguntas realistas de RBT, realiza exámenes simulados completos, aprende con el Tutor de IA, domina tarjetas y rastrea tu progreso.',
    'hero.bullet1': 'Simulacros de 85 Preguntas y 90 Minutos BACB',
    'hero.bullet2': 'Tutor de Ética y Preguntas de Práctica de IA',
    'hero.bullet3': 'Cobertura Completa del Temario Dominios A-F',
    'hero.bullet4': 'Análisis de Áreas Débiles y Métricas',
    'hero.startPractice': 'Comenzar Práctica',
    'hero.mockExamBtn': 'Tomar Examen Simulado',
    'hero.exploreFlashcards': 'Explorar Tarjetas',
    'hero.aiTutorButton': 'Preguntar al Tutor de IA',

    // Footer
    'footer.brandDescription': 'La plataforma RBT Practice AI para la preparación del examen RBT con preguntas de práctica, exámenes simulados, tarjetas y tutor de IA para candidatos a la certificación BACB.',
    'footer.examPrep': 'Preparación para el Examen',
    'footer.company': 'Empresa y Blog',
    'footer.blog': 'Blog',
    'footer.about': 'Acerca de',
    'footer.contact': 'Contacto',
    'footer.legal': 'Legales y Políticas',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos del Servicio',
    'footer.guarantee': 'Términos de Garantía',
    'footer.disclaimer': 'Descargo de Responsabilidad',
    'footer.builtWithPrecision': 'Desarrollado con precisión para candidatos RBT',

    // Features Section
    'features.tagline': 'Diseñado para el Máximo Éxito en el Examen',
    'features.mainHeading': 'Todo lo que Necesitas para Aprobar el Examen RBT con Confianza',
    'features.subHeading': 'Diseñado con ciencia cognitiva moderna, repetición espaciada y guía de IA en tiempo real.',
    'features.feat1.title': 'Simulador de Examen de IA Adaptativo',
    'features.feat1.desc': 'Exámenes de diagnóstico cronometrados de 85 preguntas y 90 minutos construidos estrictamente según los pesos de calificación del Temario BACB RBT 3ª Edición. Ajusta dinámicamente la dificultad de las preguntas según tu historial.',
    'features.feat2.title': 'Tutor de Ética y Juegos de Rol de IA Sócrates',
    'features.feat2.desc': 'Interactúa con nuestro tutor de IA conversacional entrenado en el Código de Ética RBT 2.0. Simula escenarios complejos de clientes, explosiones de extinción y situaciones de límites con padres en tiempo real.',
    'features.feat3.title': 'Tarjetas de Repetición Espaciada',
    'features.feat3.desc': 'Aprovecha el algoritmo Leitner de 5 cajas para fijar la terminología básica de ABA (DTT, DRO/DRA, Medición Continua, Latencia, IRT) en tu memoria a largo plazo con el mínimo tiempo de estudio.',
    'features.feat4.title': 'Dominio del Temario BACB RBT 3ª Edición',
    'features.feat4.desc': 'Desglose completo de los 6 dominios del temario (A a F). Rastrea el dominio de cada elemento individual desde A-01 (Preparación de Sesión) hasta F-04 (Supervisión Mensual del 5%).',
    'features.feat5.title': 'Mapas de Calor de Debilidades por Dominio',
    'features.feat5.desc': 'Los análisis visuales identifican puntos débiles exactos antes del día del examen para que dediques el 100% de tu tiempo restante a áreas de alto impacto.',
    'features.feat6.title': 'Portal B2B para Clínicas y Centros de Capacitación',
    'features.feat6.desc': 'Los supervisores y BCBA pueden supervisar grupos de practicantes, rastrear puntajes de preparación para el examen, asignar pruebas de práctica y verificar el 100% de preparación del equipo.',

    // Pricing Section
    'pricing.badge': 'Garantía RBT Practice AI Aprueba-o-Reembolso',
    'pricing.heading': 'Invierte en tu Éxito de Certificación RBT',
    'pricing.subheading': 'Elige el plan adaptado a tu fecha objetivo de examen o necesidades de cohorte clínica.',
    'pricing.monthly': 'Plan Mensual',
    'pricing.annual': 'Pase Anual',
    'pricing.save': 'Ahorra 40%',

    // Exam Engine
    'exam.title': 'Simulador de Examen RBT',
    'exam.subtitle': 'Práctica de examen realista basada en el Temario BACB RBT 3ª Edición con explicaciones detalladas.',
    'exam.selectDomain': 'Seleccionar Dominio del Temario',
    'exam.allDomains': 'Todos los Dominios del Temario BACB',
    'exam.numQuestions': 'Número de Preguntas',
    'exam.startExam': 'Comenzar Examen de Práctica',
    'exam.question': 'Pregunta',
    'exam.of': 'de',
    'exam.submitAnswer': 'Enviar Respuesta',
    'exam.nextQuestion': 'Siguiente Pregunta',
    'exam.previousQuestion': 'Pregunta Anterior',
    'exam.finishExam': 'Finalizar y Calificar Examen',
    'exam.explanation': 'Justificación Clínica y Explicación',
    'exam.correctAnswer': 'Respuesta Correcta',
    'exam.yourAnswer': 'Tu Respuesta Seleccionada',
    'exam.scoreSummary': 'Resumen de Calificación del Examen',
    'exam.retakeExam': 'Reintentar Examen',
    'exam.backToSetup': 'Volver a Configuración',
    'exam.languageLabel': 'Idioma de Preguntas',

    // Flashcard Engine
    'flashcard.title': 'Mazo de Tarjetas RBT',
    'flashcard.subtitle': 'Sistema de repetición espaciada (Leitner 5-Cajas) para máxima retención BACB.',
    'flashcard.flipHint': 'Haz clic o presiona Espacio para voltear la tarjeta',
    'flashcard.knowIt': 'La Sé',
    'flashcard.dontKnowIt': 'Necesita Repaso',
    'flashcard.box': 'Caja',
    'flashcard.generateAi': 'Generar Tarjetas con IA',
    'flashcard.languageSelect': 'Idioma de Tarjetas',

    // AI Tutor Engine
    'tutor.title': 'Tutor Clínico de IA Sócrates',
    'tutor.subtitle': 'Mentor de IA 24/7 entrenado en los estándares del temario BACB RBT.',
    'tutor.placeholder': 'Haz cualquier pregunta sobre el temario RBT, conceptos de ABA o preguntas de práctica...',
    'tutor.send': 'Enviar Mensaje',
    'tutor.suggestedQuestions': 'Preguntas de Estudio Sugeridas',
    'tutor.clinicalRationale': 'Orientación Clínica',
    'tutor.languageLabel': 'Idioma del Tutor',

    // Dashboard
    'dashboard.welcome': 'Bienvenido de nuevo candidato',
    'dashboard.readinessTitle': 'Preparación para Certificación RBT',
    'dashboard.readinessDescription': 'Basado en tu precisión en exámenes recientes y dominio del temario.',
    'dashboard.weakDomains': 'Áreas de Dominio con Menor Puntaje',
    'dashboard.studyPlan': 'Recomendaciones de Estudio Personalizadas',
    'dashboard.streak': 'Días Consecutivos de Estudio',
    'dashboard.questionsAnswered': 'Preguntas Respondidas',

    // Admin & General
    'admin.title': 'Centro de Control Super Admin CMS',
    'admin.defaultLocale': 'Idioma Predeterminado del Candidato',
    'admin.saveSettings': 'Guardar Configuración de Plataforma',
    'common.english': 'Inglés (English)',
    'common.spanish': 'Español',
    'common.loading': 'Cargando...',
    'common.success': 'Éxito',
    'common.error': 'Error',
  },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY = 'rbt_user_language';

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
          setLanguageState(savedLang);
        } else {
          // Auto-detect browser language if available
          const browserLang = navigator.language.toLowerCase();
          if (browserLang.startsWith('es')) {
            setLanguageState('es');
          }
        }
      } catch (e) {
        console.error('Failed to read language preference from localStorage:', e);
      }
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        console.error('Failed to save language preference to localStorage:', e);
      }
    }
  };

  const t = (key: string, fallback?: string): string => {
    const translation = translations[language]?.[key];
    if (translation) return translation;
    // Fallback to English if translation key missing in current language
    const enTranslation = translations.en?.[key];
    if (enTranslation) return enTranslation;
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
