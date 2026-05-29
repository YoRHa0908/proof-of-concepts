import { Language, UI } from "./types";

export const ui: Record<Language, UI> = {
  en: {
    badge: "Proof-of-concept demo",
    headline: "A bilingual admissions chat experience for Kingsway Academy",
    subhead: "A lightweight demo showing clear UI, FAQ automation, multilingual support, lead capture, and a simple admin workflow.",
    chatTitle: "Kingsway Assistant",
    chatStatus: "Online",
    inputPlaceholder: "Ask about admissions, programs, tuition, or contact...",
    leadTitle: "Request follow-up",
    leadText: "Save a parent or student inquiry for the admissions team.",
    name: "Full name",
    email: "Email address",
    interest: "What are you interested in?",
    submit: "Save inquiry",
    saved: "Inquiry saved. The admissions team can review it in the admin page.",
    adminLink: "Open admin dashboard",
    quickQuestions: "Quick Questions",
    clear: "Clear",
    clearChat: "Clear chat history",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "your.email@example.com",
    interestPlaceholder: "Tell us what you're interested in...",

  },
  es: {
    badge: "Demo de prueba",
    headline: "Una experiencia de chat bilingüe para Kingsway Academy",
    subhead: "Una demo ligera con interfaz clara, preguntas frecuentes, soporte multilingüe, captura de contactos y administración simple.",
    chatTitle: "Asistente Kingsway",
    chatStatus: "En línea",
    inputPlaceholder: "Pregunte sobre admisiones, programas, matrícula o contacto...",
    leadTitle: "Solicitar seguimiento",
    leadText: "Guarde una consulta para el equipo de admisiones.",
    name: "Nombre completo",
    email: "Correo electrónico",
    interest: "¿Qué le interesa?",
    submit: "Guardar consulta",
    saved: "Consulta guardada. El equipo de admisiones puede verla en el panel admin.",
    adminLink: "Abrir panel admin",
    quickQuestions: "Preguntas Rápidas",
    clear: "Limpiar",
    clearChat: "Limpiar historial de chat",
    namePlaceholder: "Ingrese su nombre completo",
    emailPlaceholder: "tu.correo@ejemplo.com",
    interestPlaceholder: "Cuéntenos qué le interesa...",

  },
};

export const faqs = [
  {
    keywords: ["admission", "apply", "enroll", "application", "admisión", "inscripción", "aplicar"],
    question: { en: "How does admission work?", es: "¿Cómo funciona la admisión?" },
    answer: {
      en: "Admissions usually starts with a family inquiry, a short consultation, program fit review, and enrollment guidance from the school team.",
      es: "La admisión normalmente comienza con una consulta familiar, una breve orientación, revisión del programa adecuado y apoyo para la inscripción.",
    },
  },
  {
    keywords: ["program", "course", "class", "curriculum", "programa", "curso", "clase"],
    question: { en: "What programs are available?", es: "¿Qué programas están disponibles?" },
    answer: {
      en: "This demo can support program FAQs such as academic support, language learning, tutoring, enrichment, or custom school-specific programs.",
      es: "Esta demo puede responder sobre apoyo académico, aprendizaje de idiomas, tutoría, enriquecimiento o programas específicos.",
    },
  },
  {
    keywords: ["tuition", "cost", "price", "fee", "matrícula", "costo", "precio"],
    question: { en: "Can I ask about tuition?", es: "¿Puedo preguntar sobre la matrícula?" },
    answer: {
      en: "Yes. For accurate tuition details, the assistant can collect contact information and route the inquiry to admissions.",
      es: "Sí. Para detalles exactos, el asistente puede guardar los datos de contacto y enviar la consulta a admisiones.",
    },
  },
  {
    keywords: ["contact", "phone", "email", "meeting", "call", "contacto", "correo", "llamar"],
    question: { en: "How can I contact the school?", es: "¿Cómo puedo contactar a la escuela?" },
    answer: {
      en: "You can submit the follow-up form in this demo. In production, this can send data to email, CRM, or an admissions dashboard.",
      es: "Puede enviar el formulario de seguimiento. En producción, puede enviarse a email, CRM o un panel de admisiones.",
    },
  },
];

export function getAnswer(question: string, language: Language): string {
  const normalized = question.toLowerCase();
  const match = faqs.find((faq) =>
    faq.keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
  );

  if (match) return match.answer[language];

  return language === "en"
    ? "I can help with admissions, programs, tuition, and contact. Try one of the quick questions below or submit your information for follow-up."
    : "Puedo ayudar con admisiones, programas, matrícula y contacto. Pruebe una pregunta rápida o envíe sus datos.";
}

/**
 * System messages that need to be translated when language changes
 */
export const systemMessages = {
  welcome: {
    en: "Welcome. I can help with admissions, programs, tuition, and contact questions.",
    es: "Bienvenido. Puedo ayudar con preguntas sobre admisiones, programas, matrícula y contacto."
  },
  noLeadsToExport: {
    en: "No leads to export yet. Submit a lead first.",
    es: "No hay contactos para exportar. Envíe un contacto primero."
  },
  exportedLeads: (count: number) => ({
    en: `Exported ${count} leads to CSV file.`,
    es: `Exportados ${count} contactos a archivo CSV.`
  }),
  loadError: {
    en: "Unable to load saved leads. Please refresh the page.",
    es: "No se pudieron cargar los contactos guardados. Por favor, recargue la página."
  },
  saveError: {
    en: "Failed to save your inquiry. Please try again.",
    es: "No se pudo guardar su consulta. Por favor, intente nuevamente."
  },
  exportError: {
    en: "Failed to export CSV. Please try again.",
    es: "No se pudo exportar el CSV. Por favor, intente nuevamente."
  },
  validationError: {
    en: "Please check the form. Name and valid email are required.",
    es: "Por favor revise el formulario. Se requieren nombre y correo electrónico válido."
  }
};

/**
 * Simple translation for common user phrases
 * This is a basic implementation for the demo
 */
export function translateUserMessage(text: string, currentLang: Language): { en: string; es: string } {
  const lowerText = text.toLowerCase();
  
  // Check if it's one of the FAQ questions
  for (const faq of faqs) {
    if (lowerText === faq.question.en.toLowerCase()) {
      return { en: faq.question.en, es: faq.question.es };
    }
    if (lowerText === faq.question.es.toLowerCase()) {
      return { en: faq.question.en, es: faq.question.es };
    }
  }
  
  // Simple word translations
  const translations: Record<string, { en: string; es: string }> = {
    "hello": { en: "hello", es: "hola" },
    "hi": { en: "hi", es: "hola" },
    "thanks": { en: "thanks", es: "gracias" },
    "thank you": { en: "thank you", es: "gracias" },
    "ok": { en: "ok", es: "ok" },
    "yes": { en: "yes", es: "sí" },
    "no": { en: "no", es: "no" },
  };
  
  // Check for exact matches
  for (const [key, translation] of Object.entries(translations)) {
    if (lowerText === key.toLowerCase()) {
      return translation;
    }
  }
  
  // If no translation found, use the same text for both languages
  // In a real app, you would use a proper translation API
  return { en: text, es: text };
}
