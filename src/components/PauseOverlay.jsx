import React from 'react';

const PauseOverlay = ({ onResume }) => {
    return (
        <div className="absolute inset-0 z-[400] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-scale-in">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    ‖
                </div>
                <h2 className="text-2xl font-black uppercase text-slate-800 mb-6 tracking-widest">Game Paused</h2>
                <button
                    onClick={onResume}
                    className="px-12 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl shadow-xl transition-all active:scale-95"
                >
                    Resume Game
                </button>
            </div>
        </div>
    );
};

export default PauseOverlay;
