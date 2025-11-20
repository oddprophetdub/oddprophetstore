import React from 'react';
import { TarotCardData } from '../types';
import { LOGO_SRC } from '../constants';

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
          <div className="w-full h-full flex items-center justify-center bg-black">
             {/* Logo / Industrial Pattern */}
             <div className="border-2 border-white/10 w-[90%] h-[95%] flex items-center justify-center relative p-6">
                <img 
                  src={LOGO_SRC} 
                  alt="Logo" 
                  className="w-full h-full object-contain opacity-80 grayscale contrast-125 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
                />
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