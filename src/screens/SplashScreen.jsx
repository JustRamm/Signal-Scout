import React, { useState, useEffect } from 'react';
import CitySquareScenery from '../components/CitySquareScenery';

const SplashScreen = ({ onStart, audioManager }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Establishing connection...');

    useEffect(() => {
        // ...Existing progress timer logic...
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setStatus('City Scout Protocol active.');
                    return 100;
                }
                const next = prev + Math.random() * 15;
                if (next > 40 && next < 50) setStatus('Scanning urban sectors...');
                if (next > 70 && next < 80) setStatus('Calibrating signal filters...');
                return Math.min(next, 100);
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    const handleStart = () => {
        if (audioManager) {
            audioManager.init(); // Initialize audio context on first click
            audioManager.playConfirm();
        }
        onStart();
    };

    return (
        <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center overflow-hidden font-sans">
            {/* REAL Game Scenery Background - Clean version for Splash */}
            <div className="absolute inset-0 z-0">
                <CitySquareScenery showTrees={false} showLights={false} />
            </div>

            {/* Organization Branding (Top Left - Icon Only) */}
            <div className="absolute top-0 left-0 p-6 z-50 animate-fade-in">
                 <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-white/20 shadow-2xl transition-all hover:scale-110 group">
                     <img src="/brand/ME.jpeg" alt="Mind Empowered" className="w-full h-full object-cover group-hover:rotate-3 transition-transform duration-500" />
                 </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-8 text-center">
                
                {/* Logo/Icon */}
                <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden group">
                     <img 
                        src={`/brand/logo.svg?v=${Date.now()}`} 
                        alt="Signal Scout Logo" 
                        className="w-20 h-20 drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
                     />
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">
                    SIGNAL<span className="text-orange-400">SCOUT</span>
                </h1>
                <p className="text-slate-300 font-bold uppercase tracking-[0.3em] text-xs mb-12 opacity-80">
                    Urban Compassion System
                </p>

                {/* Progress Bar Container */}
                <div className="w-full h-24 flex flex-col items-center justify-center">
                    {progress < 100 ? (
                        <div className="w-full">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest animate-pulse">{status}</span>
                                <span className="text-[10px] font-black text-white/50">{Math.floor(progress)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <div 
                                    className="h-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all duration-300 shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={handleStart}
                            onMouseEnter={() => audioManager?.playHover()}
                            className="group relative px-12 py-4 bg-white text-slate-900 overflow-hidden rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">Initialize Scanning</span>
                            <div className="absolute inset-0 bg-orange-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    )}
                </div>

                <div className="mt-12 text-slate-400/60 text-[10px] font-black uppercase tracking-[0.2em] space-y-1">
                    <p>© 2024 MIND EMPOWERED</p>
                    <p className="opacity-50">Illuminating Minds • Transforming Lives</p>
                </div>
            </div>

            {/* Scanning Line Effect */}
            <div className="absolute inset-x-0 h-[1px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-scan pointer-events-none" />

            <style>{`
                @keyframes scan {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
