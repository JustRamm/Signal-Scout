import React from 'react';
import CitySquareScenery from '../components/CitySquareScenery';

const TutorialScreen = ({ onStart }) => {
    return (
        <div className="absolute inset-0 z-[300] bg-slate-900/95 backdrop-blur-xl flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Real Backdrop */}
            <div className="absolute inset-0 z-0">
                <CitySquareScenery />
            </div>

            <div className="bg-white rounded-[24px] sm:rounded-[32px] max-w-lg w-full p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden animate-scale-in text-center my-auto">

                <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg rotate-3">
                        <span className="text-2xl sm:text-3xl text-white font-bold">🔭</span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 sm:mb-2 tracking-tight uppercase">Signal Scout</h2>
                    <p className="text-orange-500/80 font-black uppercase text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6">Urban Compassion System</p>
                    
                    <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed text-[13px] sm:text-sm">
                        In this busy city square, some people are struggling silently. Your mission is to <strong className="text-slate-900 underline decoration-orange-300">identify silent cries for help</strong> and provide support.
                    </p>

                    <div className="space-y-4 mb-10 text-left">
                        <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center text-white text-[10px] font-bold">!</div>
                                <h3 className="font-black text-red-900 uppercase text-[10px] tracking-widest">Warning Signal</h3>
                            </div>
                            <p className="text-[10px] text-red-700 leading-snug">Tap speech bubbles with signs of <strong className="text-red-950">hopelessness, debt, or numbness</strong>.</p>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 opacity-80">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-6 h-6 bg-slate-400 rounded-md flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                                <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-widest">Normal Stress</h3>
                            </div>
                            <p className="text-[10px] text-slate-600 leading-snug">Ignore daily challenges (wedding work, rain, sports losses). Focus on the crisis.</p>
                        </div>
                    </div>

                    <button
                        onClick={onStart}
                        className="group relative w-full px-12 py-4 bg-slate-950 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10">Start Scouting</span>
                        <div className="absolute inset-0 bg-orange-500 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialScreen;
