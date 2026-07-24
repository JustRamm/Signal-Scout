import React from 'react';
import CitySquareScenery from '../components/CitySquareScenery';

const FinalCompletionScreen = ({ onRestart, onExit }) => {
    return (
        <div className="absolute inset-0 z-[500] bg-slate-900/98 backdrop-blur-3xl flex items-start justify-center p-6 text-center animate-fade-in overflow-y-auto">
            <div className="absolute inset-0 z-0">
                <CitySquareScenery />
            </div>

            <div className="relative z-10 max-w-lg w-full bg-white rounded-[32px] p-8 sm:p-12 shadow-3xl border border-white/20 animate-scale-in my-auto">
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20 rotate-3">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Response Recorded</h2>
                <p className="text-emerald-600 font-black uppercase text-[10px] tracking-[0.3em] mb-8">Mission Accomplished</p>

                <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100">
                    <p className="text-slate-600 leading-relaxed font-medium">
                        Thank you for playing. Your insights as an urban scout help strengthen our community's compassion network.
                        <br /><br />
                        <strong className="text-slate-900">I hope you'll identify these silent distress signals even more quickly in the real world.</strong>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onRestart}
                        className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95 text-sm"
                    >
                        Restart Game ↺
                    </button>
                    <button
                        onClick={onExit}
                        className="flex-1 py-4 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-sm"
                    >
                        Exit System
                    </button>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                    <img src="/brand/ME.jpeg" alt="Mind Empowered" className="h-8 mx-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-500" />
                    <p className="mt-3 text-[8px] text-slate-400 font-bold uppercase tracking-widest">A Mind Empowered Initiative</p>
                </div>
            </div>
        </div>
    );
};

export default FinalCompletionScreen;
