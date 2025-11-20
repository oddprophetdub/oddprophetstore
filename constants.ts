import { TarotCardData } from './types';

export const DISCOUNT_CODE = "TEMPEST10";
export const LOGO_SRC = "https://media.sellfy.store/images/eBf0lIHr/SaeE/TT_MINIMAL_LIGHTNING_02_WHITE_ON_ALPHA_STICKER_STYLE.png";

// A curated list of Major Arcana for the widget using classic Rider-Waite imagery
export const TAROT_DECK: TarotCardData[] = [
  { id: 0, name: "The Fool", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg", keywords: ["Beginnings", "Innocence", "Spontaneity"] },
  { id: 1, name: "The Magician", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg", keywords: ["Manifestation", "Power", "Action"] },
  { id: 2, name: "The High Priestess", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg", keywords: ["Intuition", "Mystery", "Subconscious"] },
  { id: 3, name: "The Empress", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg", keywords: ["Abundance", "Nature", "Creativity"] },
  { id: 6, name: "The Lovers", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/RWS_Tarot_06_Lovers.jpg", keywords: ["Love", "Harmony", "Choices"] },
  { id: 9, name: "The Hermit", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg", keywords: ["Soul-searching", "Introspection", "Guidance"] },
  { id: 10, name: "Wheel of Fortune", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg", keywords: ["Luck", "Karma", "Cycles"] },
  { id: 17, name: "The Star", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg", keywords: ["Hope", "Inspiration", "Serenity"] },
  { id: 19, name: "The Sun", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg", keywords: ["Joy", "Success", "Vitality"] },
  { id: 21, name: "The World", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg", keywords: ["Completion", "Integration", "Travel"] },
];