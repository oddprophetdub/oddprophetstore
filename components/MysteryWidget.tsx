import React, { useState, useEffect, useCallback } from 'react';
import { TAROT_DECK, LOGO_URL } from '../constants';
import { Card } from './Card';
import { ReadingOverlay } from './ReadingOverlay';
import { getTarotReading } from '../services/geminiService';
import { WidgetState, TarotCardData, GeminiResponse } from '../types';

export const MysteryWidget: React.FC = () => {
  const [gameState, setGameState] = useState<WidgetState>(WidgetState.IDLE);
  const [deck, setDeck] = useState<TarotCardData[]>(TAROT_DECK);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [readingData, setReadingData] = useState<GeminiResponse | null>(null);

  // Initial Shuffle Animation Effect
  useEffect(() => {
    if (gameState === WidgetState.IDLE) {
      // Auto-start shuffle after a delay. 
      // CRITICAL: Must be longer than the Card flip animation (700ms) + movement (800ms)
      // to prevent DOM reordering (shuffling) while the card is still flipping.
      const timer = setTimeout(() => {
        setGameState(WidgetState.SHUFFLING);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Shuffle Logic
  useEffect(() => {
    if (gameState === WidgetState.SHUFFLING) {
      const interval = setInterval(() => {
        setDeck(prev => [...prev].sort(() => Math.random() - 0.5));
      }, 150);

      const endShuffle = setTimeout(() => {
        clearInterval(interval);
        setGameState(WidgetState.PICKING);
      }, 2000);

      return () => {
        clearInterval(interval);
        clearTimeout(endShuffle);
      };
    }
  }, [gameState]);

  const handleCardClick = useCallback(async (card: TarotCardData) => {
    if (gameState !== WidgetState.PICKING) return;

    setSelectedCardId(card.id);
    setGameState(WidgetState.REVEALING);

    // Fetch reading immediately
    try {
      const data = await getTarotReading(card.name);
      setReadingData(data);
      setTimeout(() => {
        setGameState(WidgetState.READING);
      }, 800); 
    } catch (e) {
      console.error(e);
    }
  }, [gameState]);

  const handleReset = () => {
    setGameState(WidgetState.IDLE);
    setSelectedCardId(null);
    setReadingData(null);
  };

  // Layout calculations for the fan effect
  const getCardStyle = (index: number, total: number): React.CSSProperties => {
    // Base transform centers the card on the screen center (since parent is full screen and child is left-1/2 top-1/2)
    const centerTransform = 'translate(-50%, -50%)';

    if (gameState === WidgetState.IDLE || gameState === WidgetState.SHUFFLING) {
       // Stacked / Messy
       return {
         transform: `${centerTransform} translate(0px, 0px) rotate(0deg)`,
         zIndex: index,
         opacity: 1,
         // Slower transition for smooth return to deck
         transition: 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
         transformOrigin: 'center center'
       };
    }

    if (gameState === WidgetState.PICKING || gameState === WidgetState.REVEALING || gameState === WidgetState.READING) {
      // Fan spread parameters
      const angle = (index - (total - 1) / 2) * 8; // Tighter spread
      const xOffset = (index - (total - 1) / 2) * 35; 
      const yOffset = Math.abs(index - (total - 1) / 2) * 12; 

      // If a card is selected
      if (selectedCardId !== null) {
        const isSelected = deck[index].id === selectedCardId;
        if (isSelected) {
          return {
            // Dead center
            transform: `${centerTransform} scale(1.2) rotate(0deg)`,
            zIndex: 50,
            opacity: 1,
            transformOrigin: 'center center',
            transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          };
        } else {
          // Throw others away
          return {
            transform: `${centerTransform} translate(${xOffset * 5}px, ${yOffset + 500}px) rotate(${angle * 2}deg)`,
            opacity: 0,
            zIndex: 0,
            pointerEvents: 'none',
            transformOrigin: 'center center',
            transition: 'all 0.5s ease'
          };
        }
      }

      // Default Fan State
      return {
        transform: `${centerTransform} translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`,
        zIndex: index,
        opacity: 1,
        transformOrigin: 'bottom center', // Fan pivots from bottom
        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      };
    }
    
    return {};
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[600px] flex flex-col items-center justify-center overflow-hidden md:overflow-visible">
      {/* Header Logo - Resized to be smaller and tighter to top */}
      <div className="absolute top-2 z-20 flex flex-col items-center pointer-events-none w-full">
        <img 
          src={LOGO_URL} 
          alt="Tarot & Tempest" 
          className="w-28 md:w-36 mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        />
        <p className="text-white font-semibold text-[10px] md:text-xs tracking-[0.3em] uppercase animate-pulse mt-1 mix-blend-difference">
          {gameState === WidgetState.SHUFFLING && "INITIALIZING SEQUENCE..."}
          {gameState === WidgetState.PICKING && "SELECT YOUR FREQUENCY"}
          {gameState === WidgetState.REVEALING && "DECODING..."}
          {(gameState === WidgetState.IDLE) && "SYSTEM RESET..."}
        </p>
      </div>

      {/* Card Container */}
      <div className="relative w-full h-full perspective-1000">
         {deck.map((card, index) => (
           <div 
             key={card.id}
             // Using left-1/2 top-1/2 and negative translation in getCardStyle ensures strict centering
             className="absolute left-1/2 top-1/2 transition-all duration-500"
             style={getCardStyle(index, deck.length)}
           >
             <Card 
               card={card} 
               isFlipped={selectedCardId === card.id}
               onClick={() => handleCardClick(card)}
               disabled={gameState !== WidgetState.PICKING}
             />
           </div>
         ))}
      </div>

      {/* Result Overlay */}
      {gameState === WidgetState.READING && selectedCardId !== null && (
        <ReadingOverlay 
          card={deck.find(c => c.id === selectedCardId)!} 
          readingData={readingData}
          onClose={handleReset}
        />
      )}
    </div>
  );
};