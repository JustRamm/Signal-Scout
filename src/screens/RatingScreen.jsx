import React, { useState } from 'react';

const RatingScreen = ({ onSubmit, audioManager }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleStarClick = (num) => {
        setRating(num);
        if (audioManager) audioManager.playPop();
    };

    const handleSend = () => {
        if (rating === 0) return;
        onSubmit(rating, feedback);
    };

    return (
        <div className="absolute inset-0 z-[600] bg-slate-900/40 backdrop-blur-md flex items-start justify-center p-6 animate-fade-in overflow-y-auto">
            <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-3xl text-center transform animate-scale-in my-auto">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Grateful for your Signal Scout Service!</h2>
                    <p className="text-slate-500 text-sm mt-2">How was your experience navigating the urban square?</p>
                </div>

                <div className="flex justify-center gap-3 mb-8">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleStarClick(num)}
                            className={`text-4xl transition-all transform active:scale-90 ${num <= rating ? 'text-orange-400 scale-110' : 'text-slate-200 hover:text-slate-300'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <textarea
                    placeholder="Any suggestions for Mind Empowered? (Optional)"
                    className="w-full h-24 px-4 py-3 bg-slate-50 border-none rounded-2xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-400 transition-all outline-none resize-none mb-6"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />

                <button
                    onClick={handleSend}
                    disabled={rating === 0}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                    Submit Feedback
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
            </div>
        </div>
    );
};

export default RatingScreen;
