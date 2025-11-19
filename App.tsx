import React from 'react';
import { MysteryWidget } from './components/MysteryWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-tempest-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl z-10">
        <MysteryWidget />
      </div>

      {/* Branding Footer */}
      <div className="fixed bottom-4 right-4 text-tempest-gray text-xs font-bold tracking-widest uppercase opacity-50">
        Powered by Gemini • Tarot & Tempest
      </div>
    </div>
  );
};

export default App;