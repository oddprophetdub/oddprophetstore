export interface TarotCardData {
  id: number;
  name: string;
  imageUrl: string;
  keywords: string[];
}

export enum WidgetState {
  IDLE = 'IDLE',
  SHUFFLING = 'SHUFFLING',
  PICKING = 'PICKING',
  REVEALING = 'REVEALING',
  READING = 'READING',
}

export interface GeminiResponse {
  reading: string;
  blessing: string;
}
