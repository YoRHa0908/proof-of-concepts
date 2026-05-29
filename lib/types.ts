export type Language = "en" | "es";

export type Message = {
  id: string;
  role: "assistant" | "user";
  /** Message content with translations */
  content: {
    en: string;
    es: string;
  };
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  interest: string;
  language: Language;
  createdAt: string;
};

export type UI = {
  badge: string;
  headline: string;
  subhead: string;
  chatTitle: string;
  chatStatus: string;
  inputPlaceholder: string;
  leadTitle: string;
  leadText: string;
  name: string;
  email: string;
  interest: string;
  submit: string;
  saved: string;
  adminLink: string;
  quickQuestions: string;
  clear: string;
  clearChat: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  interestPlaceholder: string;

};
