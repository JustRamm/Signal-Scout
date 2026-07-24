import React from 'react';
import CitySquareScenery from '../components/CitySquareScenery';

const GameOverScreen = ({ score, isSuccess, onPlayAgain, onNext, onExit }) => {
    return (
        <div className="absolute inset-0 z-[300] bg-slate-900/95 backdrop-blur-xl flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="absolute inset-0 z-0">
                <CitySquareScenery />
            </div>
            <div className="max-w-md w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 text-center shadow-2xl animate-scale-in border-b-8 border-slate-900/10 my-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner border border-slate-200">
                    <img src="/brand/logo.svg" alt="Logo" className="w-8 h-8 sm:w-12 sm:h-12" />
                </div>
                
                <h2 className={`text-sm sm:text-xl font-black uppercase mb-1 sm:mb-2 tracking-widest ${isSuccess ? 'text-emerald-500' : 'text-slate-400'}`}>
                    {isSuccess ? 'Urban Victory' : 'Day Ended'}
                </h2>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tighter uppercase">Scout Report</h3>

                <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden group ${isSuccess ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                     <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest block mb-1 sm:mb-2 opacity-80 ${isSuccess ? 'text-emerald-600' : 'text-orange-500'}`}>Total Contribution</span>
                     <div className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter drop-shadow-sm">{score}</div>
                </div>

                <div className="flex flex-col gap-3">
                    {isSuccess ? (
                        <button
                            onClick={onNext}
                            className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                        >
                            Rate My Scout
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    ) : (
                        <button
                            onClick={onPlayAgain}
                            className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            Play Again ↺
                        </button>
                    )}
                    <button
                        onClick={onExit}
                        className="w-full py-4 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest rounded-2xl transition-all"
                    >
                        Return to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverScreen;
