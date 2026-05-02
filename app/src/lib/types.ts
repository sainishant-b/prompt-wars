export type Role = "user" | "assistant";

export interface Message {
  role: Role;
  content: string;
}

export type LanguageCode =
  | "en"
  | "hi"
  | "ta"
  | "te"
  | "bn"
  | "mr"
  | "kn"
  | "ml"
  | "gu"
  | "pa";

export type KnowledgeLevel = "novice" | "intermediate" | "expert";

export interface ChatRequest {
  messages: Message[];
  language: LanguageCode;
  constituencyId?: string | null;
}
