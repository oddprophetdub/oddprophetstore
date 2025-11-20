import React, { useState } from 'react';
import { TarotCardData, GeminiResponse } from '../types';
import { DISCOUNT_CODE } from '../constants';

interface ReadingOverlayProps {
  card: TarotCardData;
  readingData: GeminiResponse | null;
  onClose: () => void;
}

export const ReadingOverlay: React.FC<ReadingOverlayProps> = ({ card, readingData, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-black border-2 border-white/90 max-w-md w-full p-8 shadow-[0_0_50px_rgba(255,255,255,0.15)] flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Decorative Industrial Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-white"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/20"></div>
        
        <div className="mb-6 w-full">
           <h2 className="text-4xl font-black italic text-white mb-2 uppercase tracking-tighter transform -skew-x-12">{card.name}</h2>
           <div className="w-full h-[2px] bg-white/50"></div>
        </div>

        {readingData ? (
          <div className="space-y-8 animate-slideUp w-full">
            
            {/* The Reading - Big, Bold, Short */}
            <div className="text-center">
                <p className="text-white font-bold text-xl uppercase leading-none tracking-tight glitch-text">
                "{readingData.reading}"
                </p>
            </div>
            
            {/* The Directive - Industrial Label Style */}
            <div className="bg-white text-black p-2 transform -skew-x-6 inline-block">
              <p className="font-black text-lg uppercase tracking-widest">{readingData.blessing}</p>
            </div>

            {/* Access Code Section */}
            <div className="mt-4 pt-6 border-t border-dashed border-white/30 w-full">
              <p className="text-[10px] text-white/60 uppercase tracking-[0.3em] mb-4">Authorization Granted</p>
              
              <div className="flex items-stretch justify-center gap-0 mb-2 shadow-[4px_4px_0px_rgba(255,255,255,0.3)]">
                <div className="bg-white text-black text-2xl px-6 py-3 font-mono font-black tracking-wider border-r-2 border-black">
                  {DISCOUNT_CODE}
                </div>
                <button 
                  onClick={handleCopy}
                  className="bg-tempest-red hover:brightness-125 text-white font-bold py-3 px-6 transition-all uppercase text-sm tracking-wide"
                >
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
              
              <p className="text-white font-bold italic uppercase tracking-widest text-xs mt-6 animate-pulse">
                // ENJOY YOUR CODE //
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
             <div className="w-16 h-16 border-t-4 border-l-4 border-white animate-spin rounded-none"></div>
             <p className="text-white font-mono text-xs animate-pulse uppercase tracking-widest">Synthesizing...</p>
          </div>
        )}

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors hover:rotate-90 duration-300"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};