import React, { useMemo } from 'react';

const CitySquareScenery = ({ showTrees = true, showLights = true }) => {
  // Memoize all randomized elements to prevent "re-randomization" on every render
  const buildings = useMemo(() => {
    return [...Array(8)].map(() => ({
      h1: 100 + Math.random() * 150,
      h2: 150 + Math.random() * 220
    }));
  }, []);

  const clouds = useMemo(() => {
    return [...Array(10)].map(() => ({
      width: 250 + Math.random() * 450,
      height: 80 + Math.random() * 150,
      top: Math.random() * 40,
      left: -10 + Math.random() * 100
    }));
  }, []);

  const birds = useMemo(() => {
    return [...Array(4)].map(() => ({
      top: 10 + Math.random() * 20,
      initialLeft: -5 - Math.random() * 20,
      duration: 15 + Math.random() * 15,
      delay: -Math.random() * 30,
      scale: 0.8 + Math.random() * 0.4
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-sky-900 transition-all duration-1000">
      {/* Brighter Sunset Sky Gradient - Deep Blue to Vibrant Orange */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-700 via-purple-500/30 to-orange-400/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,120,50,0.4)_0%,_transparent_70%)]" />

      {/* Corporate Buildings (Static) */}
      <div className="absolute bottom-[25%] inset-x-0 flex items-end justify-around px-10 opacity-60">
        {buildings.map((b, i) => (
          <div key={i} className="flex items-end gap-[1px]">
            <div 
                className="bg-slate-800 border-x border-t border-slate-700 rounded-t-sm shadow-xl"
                style={{ width: '45px', height: `${b.h1}px` }}
            />
            <div 
                className="bg-slate-700 border-x border-t border-slate-600 rounded-t-sm"
                style={{ width: '70px', height: `${b.h2}px` }}
            />
          </div>
        ))}
      </div>

      {/* Main Ground (Static) */}
      <div className="absolute bottom-0 inset-x-0 h-[30%] bg-slate-200 shadow-[inset_0_20px_60px_rgba(0,0,0,0.1)] bg-gradient-to-t from-slate-100/50 to-orange-100/30">
        <div 
            className="absolute inset-0 opacity-15"
            style={{ 
                backgroundImage: 'linear-gradient(90deg, #94a3b8 1px, transparent 1px), linear-gradient(#94a3b8 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                transform: 'perspective(600px) rotateX(45deg) scale(2.5)',
                transformOrigin: 'top'
            }}
        />
      </div>

      {/* Combined Alternating Street Accessories & Trees */}
      <div className="absolute bottom-[25.2%] inset-x-0 h-64 flex justify-around items-end px-4 md:px-20 pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const isLight = i % 2 === 0;
          const responsiveClass = i > 1 ? 'hidden md:flex' : 'flex';

          return (
            <div key={i} className={`relative h-64 w-20 flex flex-col justify-end items-center ${responsiveClass}`}>
              {isLight && showLights ? (
                <div className="absolute bottom-0 flex flex-col items-center opacity-70">
                  {/* Light Head */}
                  <div className="absolute top-0 w-8 h-4 bg-slate-400 rounded-full" />
                  <div className="absolute top-1 w-16 h-16 bg-orange-200/40 blur-2xl opacity-40" />
                  {/* Pole */}
                  <div className="w-1.5 h-64 bg-slate-500 rounded-t-full shadow-md" />
                  {/* Concrete Light Base */}
                  <div className="w-6 h-3 bg-slate-400 rounded-t-sm" />
                </div>
              ) : !isLight && showTrees ? (
                <div className="absolute bottom-0 flex flex-col items-center">
                  {/* Foilage */}
                  <div className="absolute top-0 w-24 h-24 bg-emerald-700/30 rounded-full blur-sm -translate-y-12" />
                  <div className="absolute top-0 left-4 w-20 h-20 bg-emerald-600/30 rounded-full blur-md -translate-y-16" />
                  {/* Trunk */}
                  <div className="w-2 h-20 bg-amber-950" />
                  {/* Simple Soil/Base */}
                  <div className="w-8 h-1 bg-amber-950/20 rounded-full blur-[1px]" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Static Plane */}
          <div 
            className="absolute top-24 opacity-40 flex items-center gap-1"
            style={{ left: '15%' }}
          >
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
              <div className="w-1 h-3 bg-slate-200 -mt-1" />
              <div className="w-1 h-1 bg-white rounded-full ml-[-2px] opacity-70" />
          </div>

          {/* Static Clouds */}
          {clouds.map((c, i) => (
              <div 
                key={i} 
                className="absolute bg-white/30 rounded-full blur-3xl"
                style={{ 
                    width: `${c.width}px`, 
                    height: `${c.height}px`,
                    top: `${c.top}%`,
                    left: `${c.left}%`,
                }}
              />
          ))}

          {/* ONLY MOVING BIRDS */}
          {birds.map((bird, i) => (
              <div 
                key={i}
                className="absolute animate-[bird_30s_linear_infinite]"
                style={{ 
                    top: `${bird.top}%`,
                    left: `${bird.initialLeft}%`,
                    animationDuration: `${bird.duration}s`,
                    animationDelay: `${bird.delay}s`,
                    transform: `scale(${bird.scale})`
                }}
              >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-500 fill-current opacity-60">
                      <path d="M12,18L7,15L12,12L17,15L12,18M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" transform="scale(0.5) rotate(-45)" />
                  </svg>
              </div>
          ))}
      </div>

      {/* Bird Animation Style */}
      <style>{`
        @keyframes bird {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(25vw) translateY(-2vh); }
          50% { transform: translateX(50vw) translateY(1vh); }
          75% { transform: translateX(75vw) translateY(-1vh); }
          100% { transform: translateX(120vw) translateY(0); }
        }
      `}</style>

      {/* Horizon Glow (Static) */}
      <div className="absolute bottom-[25%] inset-x-0 h-48 bg-gradient-to-t from-orange-400/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 w-[90vw] h-[2px] bg-orange-200/20 shadow-[0_0_40px_rgba(255,165,0,0.3)] blur-sm" />
    </div>
  );
};

export default CitySquareScenery;
