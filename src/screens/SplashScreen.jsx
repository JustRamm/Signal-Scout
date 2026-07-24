import React, { useState, useEffect } from 'react';
import CitySquareScenery from '../components/CitySquareScenery';

const SplashScreen = ({ onStart, audioManager, onLogoClick }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Establishing connection...');

    useEffect(() => {
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

    useEffect(() => {
        if (progress >= 100 && audioManager) {
            audioManager.playMenuMusic(31);
        }
    }, [progress, audioManager]);

    const handleStart = () => {
        if (audioManager) {
            audioManager.init();
            audioManager.playConfirm();
            audioManager.playMenuMusic(31); // Start music at 31s if not already playing
        }
        onStart();
    };

    // Generic interaction handler to start music early if they click anything
    const handleSplashInteraction = () => {
        if (audioManager && !audioManager.initialized) {
            audioManager.init();
            audioManager.playMenuMusic(31);
        }
    };

    return (
        <div 
            onClick={handleSplashInteraction}
            className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center overflow-y-auto font-sans cursor-pointer"
        >
            {/* REAL Game Scenery Background */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <CitySquareScenery showTrees={false} showLights={false} />
            </div>

            {/* Cinematic HUD Corners */}
            <div className="absolute inset-0 pointer-events-none z-50">
                <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-orange-500/30 opacity-60 rounded-tl-2xl"></div>
                <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-orange-500/30 opacity-60 rounded-tr-2xl"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-orange-500/30 opacity-60 rounded-bl-2xl"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-orange-500/30 opacity-60 rounded-br-2xl"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-8 text-center">
                
                {/* Pulsing Logo Container */}
                <div 
                    className="relative mb-10 group cursor-pointer active:scale-95 transition-transform"
                    onClick={onLogoClick}
                >
                    <div className="absolute inset-0 bg-orange-500/20 blur-[60px] rounded-full animate-pulse-slow"></div>
                    <div className="w-28 h-28 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(251,146,60,0.2)] relative overflow-hidden">
                        <img 
                            src={`/brand/logo.svg?v=${Date.now()}`} 
                            alt="Signal Scout Logo" 
                            className="w-24 h-24 drop-shadow-2xl animate-float-slow" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400/30 to-transparent h-1/3 w-full animate-scan-logo pointer-events-none" />
                    </div>
                </div>

                <div className="animate-reveal-up">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        SIGNAL<span className="text-orange-500">SCOUT</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-orange-500/50"></div>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] opacity-70">
                            Urban Compassion System
                        </p>
                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-orange-500/50"></div>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-24 flex flex-col items-center justify-center">
                    {progress < 100 ? (
                        <div className="w-full max-w-xs animate-reveal-up">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-[10px] font-black text-orange-400/80 uppercase tracking-widest animate-pulse">{status}</span>
                                <span className="text-[10px] font-black text-white/40 tabular-nums">{Math.floor(progress)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                                <div 
                                    className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-amber-300 transition-all duration-300 shadow-[0_0_15px_rgba(251,146,60,0.6)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={handleStart}
                            onMouseEnter={() => audioManager?.playHover()}
                            className="group relative px-16 py-5 bg-white text-slate-900 overflow-hidden rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:shadow-orange-500/40 transition-all hover:scale-110 active:scale-95 animate-zoom-in"
                        >
                            <span className="relative z-10 transition-colors group-hover:text-white font-bold">Initialize Scanning</span>
                            <div className="absolute inset-0 bg-orange-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </button>
                    )}
                </div>

                <div className="mt-16 text-slate-500/40 text-[9px] font-black uppercase tracking-[0.3em] space-y-1 animate-fade-in">
                    <p>© 2024 MIND EMPOWERED</p>
                    <p className="opacity-50">Illuminating Minds • Transforming Lives</p>
                </div>
            </div>

            {/* Ambient Background Grid Effect */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Scanning Horizontal Line Effect */}
            <div className="absolute inset-x-0 h-[2px] bg-orange-500/20 shadow-[0_0_20px_rgba(251,146,60,0.4)] animate-scan pointer-events-none z-20" />

            <style>{`
                @keyframes scan {
                    0% { top: -10%; opacity: 0; }
                    20% { opacity: 0.5; }
                    80% { opacity: 0.5; }
                    100% { top: 110%; opacity: 0; }
                }
                @keyframes scan-logo {
                    0% { top: -100%; }
                    100% { top: 100%; }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes reveal-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes zoom-in {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scan { animation: scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                .animate-scan-logo { animation: scan-logo 2s linear infinite; }
                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
                .animate-reveal-up { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-zoom-in { animation: zoom-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
};

export default SplashScreen;
