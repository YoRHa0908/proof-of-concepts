export type Language = "en" | "es";

export type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
  timestamp?: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  interest: string;
  language: Language;
  createdAt: string;
};
