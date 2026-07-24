import React, { useState, useCallback } from 'react';
import SignalScoutScreen from './screens/SignalScoutScreen';
import SplashScreen from './screens/SplashScreen';
import AdminDashboard from './screens/AdminDashboard';
import { audioManager } from './utils/audio';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const handleExit = () => {
    if (confirm('Exit Gatekeeper Program?')) {
      window.location.reload();
    }
  };

  const handleStart = () => {
    setGameStarted(true);
    if (audioManager && audioManager.playConfirm) {
        audioManager.playConfirm();
    }
  };

  const handleLogoClick = useCallback(() => {
    setLogoClicks(prev => {
        const next = prev + 1;
        if (next >= 5) {
            setShowAdmin(true);
            if (audioManager) audioManager.playCoachTip();
            return 0;
        }
        return next;
    });
    // Reset clicks after 2 seconds
    setTimeout(() => setLogoClicks(0), 3000);
  }, []);

  return (
    <div className="w-full min-h-screen relative bg-slate-900">
      {showAdmin && (
          <AdminDashboard onExit={() => setShowAdmin(false)} />
      )}

      {!gameStarted ? (
        <SplashScreen 
            onStart={handleStart} 
            audioManager={audioManager} 
            onLogoClick={handleLogoClick}
        />
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
