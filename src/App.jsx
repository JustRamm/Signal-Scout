import React, { useState } from 'react';
import SignalScoutScreen from './screens/SignalScoutScreen';
import SplashScreen from './screens/SplashScreen';
import { audioManager } from './utils/audio';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleExit = () => {
    if (confirm('Exit Gatekeeper Program?')) {
      window.close();
      // If window.close() doesn't work (browser security), at least reset
      window.location.reload();
    }
  };

  const handleStart = () => {
    setGameStarted(true);
    // Optional: play an initial "system startup" sound if it exists
    if (audioManager && audioManager.playConfirm) {
        audioManager.playConfirm();
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
      {!gameStarted ? (
        <SplashScreen onStart={handleStart} />
      ) : (
        <SignalScoutScreen 
          audioManager={audioManager} 
          onExit={handleExit} 
          isPaused={false} 
        />
      )}
    </div>
  );
}

export default App;
