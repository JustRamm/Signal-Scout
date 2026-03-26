import React from 'react';
import CitySquareScenery from '../components/CitySquareScenery';

const GameView = ({ 
    score, 
    gameProgress, 
    people, 
    feedback, 
    onPersonClick, 
    onExit, 
    onTogglePause, 
    isPaused,
    audioManager
}) => {
    return (
        <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Binocular Vignette Effect */}
            <div className="absolute inset-0 z-40 pointer-events-none opacity-50 mix-blend-multiply"
                style={{ background: 'radial-gradient(circle at center, transparent min(40vw, 40vh), #000 min(95vw, 95vh))' }}>
            </div>

            {/* Header / HUD */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-50 pointer-events-none">
                <div className="flex flex-col gap-2">
                    <button
                        onClick={onExit}
                        className="pointer-events-auto w-10 h-10 bg-black/40 hover:bg-red-500/80 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all border border-white/10"
                    >
                        ✕
                    </button>
                    <div className="bg-slate-900/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-l-4 border-teal-500 shadow-lg">
                        <span className="text-[8px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-0.5">Score</span>
                        <span className="text-xl sm:text-2xl font-black text-white leading-none whitespace-nowrap">{score}</span>
                    </div>
                </div>

                {/* Progress Bar (Center) */}
                <div className="flex-1 max-w-[45%] sm:max-w-[40%] mt-1 sm:mt-2 px-3 sm:px-10">
                    <div className="flex justify-between items-end mb-1 sm:mb-1.5 px-0.5 sm:px-1">
                        <span className="text-[8px] sm:text-[10px] font-black text-white/50 uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">Urban Progress</span>
                        <span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-widest ml-1">{Math.round(gameProgress)}%</span>
                    </div>
                    <div className="h-3 sm:h-4 w-full bg-slate-900/50 backdrop-blur-md rounded-full border border-white/10 p-[2px] sm:p-[3px] shadow-inner overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                            style={{ width: `${gameProgress}%` }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 pointer-events-auto">
                    <button
                        onClick={onTogglePause}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95 shadow-lg whitespace-nowrap"
                    >
                        {isPaused ? '▶' : '‖ Pause'}
                    </button>
                </div>
            </div>

            {/* Game World */}
            <div className="flex-1 relative overflow-hidden cursor-crosshair">
                <CitySquareScenery />

                {/* Render People */}
                {people.map(person => (
                    <div
                        key={person.uid}
                        className="absolute group signal-scout-person"
                        style={{
                            left: `${person.x}%`,
                            top: `${person.y}%`,
                            zIndex: Math.floor(person.y),
                            width: 'clamp(70px, 12vw, 100px)',
                        }}
                    >
                        <div
                            className={`relative transition-all duration-300 ${person.isClicked ? 'scale-95 opacity-50 grayscale' : 'hover:scale-105'}`}
                            onClick={() => onPersonClick(person)}
                        >
                            {/* Speech Bubble Cue with Edge-Safety */}
                            <div 
                                className={`
                                    relative bg-white text-slate-900 px-3 py-2 rounded-xl shadow-xl border mb-1 cursor-pointer 
                                    ${person.data.type === 'risk' ? 'border-red-100 hover:border-red-300' : 'border-blue-50 hover:border-blue-200'} 
                                    transition-colors duration-200 signal-scout-bubble
                                `}
                                style={{ 
                                    transform: `translateX(${person.x < 15 ? '5%' : person.x > 85 ? '-105%' : '-50%'})`,
                                    minWidth: '130px',
                                    maxWidth: 'clamp(130px, 40vw, 210px)',
                                    left: '50%',
                                }}
                            >
                                <p className="text-[9.5px] md:text-[11.5px] font-bold leading-tight">{person.data.text}</p>
                                <div 
                                    className="absolute -bottom-1.5 left-1/2 -rotate-[45deg] w-3 h-3 bg-white border-b border-r border-inherit"
                                    style={{ left: person.x < 10 ? '25%' : person.x > 90 ? '75%' : '50%' }}
                                ></div>
                            </div>
                            {/* Stickman Asset */}
                            <div className={`h-24 md:h-32 w-full flex justify-center ${person.direction === -1 ? '-scale-x-100' : ''}`}>
                                <img 
                                    src={person.asset} 
                                    alt="Person" 
                                    className="w-full h-full drop-shadow-sm brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" 
                                    draggable="false" 
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Feedback Popup — fixed center bottom so it never clips on mobile */}
                {feedback && (
                    <div
                        className={`absolute z-[200] text-left px-4 py-3 rounded-2xl font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-pop-in pointer-events-none border-2 backdrop-blur-xl
                            ${feedback.type === 'good' ? 'bg-teal-900/70 text-white border-teal-500/50' : 'bg-red-900/70 text-white border-red-500/50'}
                        `}
                        style={{ 
                            left: '40%', // Shifted slightly left for mobile balance
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'clamp(260px, 85vw, 360px)',
                        }}
                    >
                        {/* Score Float */}
                        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 text-2xl font-black animate-float-up ${feedback.type === 'good' ? 'text-teal-300' : 'text-red-300'}`}>
                            {feedback.score}
                        </div>

                        <div className="flex items-center gap-2 mb-1.5">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${feedback.type === 'good' ? 'bg-teal-500' : 'bg-red-500'}`}>
                                {feedback.type === 'good' ? '✓' : '✕'}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-70">Analysis</span>
                        </div>
                        <h4 className="text-xs font-black mb-1 leading-tight">{feedback.text}</h4>
                        <p className="text-[9px] font-medium leading-relaxed opacity-80 italic line-clamp-2">{feedback.desc}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameView;
