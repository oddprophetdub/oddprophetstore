import React from 'react';
import { TarotCardData } from '../types';
import { LOGO_URL } from '../constants';

interface CardProps {
  card: TarotCardData;
  isFlipped: boolean;
  onClick: () => void;
  disabled: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ card, isFlipped, onClick, disabled, style, className }) => {
  return (
    <div 
      className={`relative w-48 h-80 perspective-1000 cursor-pointer ${className}`}
      style={style}
      onClick={() => !disabled && onClick()}
    >
      <div
        className={`w-full h-full relative transition-transform duration-700 preserve-3d shadow-[0_0_15px_rgba(255,255,255,0.1)] ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD BACK (The "Mystery") */}
        <div className="absolute w-full h-full backface-hidden border border-white/20 bg-tempest-offblack">
          <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4">
             {/* Branded Logo Back */}
             <div className="border-2 border-white/10 w-[90%] h-[95%] flex flex-col items-center justify-center relative overflow-hidden">
                <img 
                  src={LOGO_URL} 
                  alt="Tarot & Tempest" 
                  className="w-32 opacity-80 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
                />
                <div className="absolute bottom-4 text-[8px] tracking-[0.4em] text-white/40 uppercase font-bold">
                  MMXXIV
                </div>
             </div>
          </div>
        </div>

        {/* CARD FRONT (The Reveal) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 border border-white bg-black">
          <img 
            src={card.imageUrl} 
            alt={card.name} 
            className="w-full h-full object-cover opacity-80 grayscale contrast-125"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t border-white/20 p-4 text-center">
            <h3 className="text-white font-sans text-lg font-bold uppercase tracking-wider">{card.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};