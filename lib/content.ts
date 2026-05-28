import { Language } from "./types";

export const ui = {
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
