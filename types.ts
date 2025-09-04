
export type Section = 'dev' | 'chat' | 'image';

export interface Prompt {
  id: number;
  category: string;
  title: string;
  description: string;
  prompt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
