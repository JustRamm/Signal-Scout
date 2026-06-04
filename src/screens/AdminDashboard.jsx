import React, { useState, useEffect } from 'react';
import { INSTITUTIONS } from '../data/institutions';
const AdminDashboard = ({ onExit }) => {
    const [stats, setStats] = useState({
        totalPlayers: 0,
        avgScore: 0,
        topColleges: [],
        recentFeedback: [],
        loading: true,
        hubs: [],
        scoreDistribution: [65, 35],
        trendData: [30, 45, 35, 60, 55, 80, 75],
        ageGroups: { '0-10': 0, '11-18': 0, '19-21': 0, '22-25': 0, '26-30': 0, '31+': 0 },
        genderStats: { 'Male': 0, 'Female': 0, 'Other': 0 },
        fieldStats: {}
    });
    const [selectedState, setSelectedState] = useState('Overall');
    const [selectedField, setSelectedField] = useState('Overall');
    const [timeFilter, setTimeFilter] = useState('Overall'); // '1w', '1m', '6m', '1y', 'Overall'
    const [allData, setAllData] = useState([]);

    // Extracting state list from institutions
    const stateList = Object.keys(INSTITUTIONS).sort();
    
    // Extracting unique fields from institutions
    const fieldList = [...new Set(Object.values(INSTITUTIONS).flatMap(s => Object.keys(s)))].sort();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Supabase removed; using mock data for UI display
            const mockData = [
                { id: 1, created_at: new Date().toISOString(), state: 'California', field_of_study: 'Computer Science', score: 85, age: 20, gender: 'Female', college: 'Stanford University', university: 'Stanford University', feedback: 'Great experience!', name: 'Alice', rating: 5 },
                { id: 2, created_at: new Date(Date.now() - 86400000).toISOString(), state: 'New York', field_of_study: 'Psychology', score: 92, age: 22, gender: 'Male', college: 'NYU', university: 'NYU', feedback: 'Very insightful.', name: 'Bob', rating: 4 },
                { id: 3, created_at: new Date(Date.now() - 86400000 * 2).toISOString(), state: 'Texas', field_of_study: 'Engineering', score: 78, age: 19, gender: 'Other', college: 'UT Austin', university: 'UT Austin', feedback: 'Helped a lot', name: 'Charlie', rating: 5 }
            ];

            setAllData(mockData);
            processStats(mockData, 'Overall', 'Overall', 'Overall');
        } catch (err) {
            console.error('Error fetching admin stats:', err);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    const processStats = (data, state, field, time) => {
        let filtered = data;

        // State Filtering
        if (state !== 'Overall') {
            filtered = filtered.filter(p => p.state === state);
        }

        // Field Filtering
        if (field !== 'Overall') {
            filtered = filtered.filter(p => p.field_of_study === field);
        }

        // Time Filtering logic
        if (time !== 'Overall') {
            const now = new Date();
            const timeLimit = new Date();
            if (time === '1w') timeLimit.setDate(now.getDate() - 7);
            else if (time === '1m') timeLimit.setMonth(now.getMonth() - 1);
            else if (time === '6m') timeLimit.setMonth(now.getMonth() - 6);
            else if (time === '1y') timeLimit.setFullYear(now.getFullYear() - 1);

            filtered = filtered.filter(p => new Date(p.created_at) >= timeLimit);
        }

        const totalPlayers = filtered.length;
        const totalScore = filtered.reduce((acc, p) => acc + (p.score || 0), 0);

        // Age Distribution Logic - Expanded
        const ageGroups = { '0-10': 0, '11-18': 0, '19-21': 0, '22-25': 0, '26-30': 0, '31+': 0 };
        filtered.forEach(p => {
            const age = parseInt(p.age);
            if (age >= 0 && age <= 10) ageGroups['0-10']++;
            else if (age >= 11 && age <= 18) ageGroups['11-18']++;
            else if (age >= 19 && age <= 21) ageGroups['19-21']++;
            else if (age >= 22 && age <= 25) ageGroups['22-25']++;
            else if (age >= 26 && age <= 30) ageGroups['26-30']++;
            else if (age >= 31) ageGroups['31+']++;
        });

        // Gender & Field Stats Logic
        const genderStats = { 'Male': 0, 'Female': 0, 'Other': 0 };
        const fieldMap = {};
        
        filtered.forEach(p => {
            if (p.gender) genderStats[p.gender] = (genderStats[p.gender] || 0) + 1;
            if (p.field_of_study) fieldMap[p.field_of_study] = (fieldMap[p.field_of_study] || 0) + 1;
        });
        const fieldStats = Object.entries(fieldMap)
            .sort((a, b) => b[1] - a[1]);

        const collegeMap = {};
        filtered.forEach(p => {
            if (p.college) collegeMap[p.college] = (collegeMap[p.college] || 0) + 1;
        });
        const topColleges = Object.entries(collegeMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const hubMap = {};
        filtered.forEach(p => {
            if (state === 'Overall') {
                const region = p.state || 'Core Community';
                hubMap[region] = (hubMap[region] || 0) + 1;
            } else if (p.university) {
                const hub = p.university.split(' ')[0] || 'Local Hub';
                hubMap[hub] = (hubMap[hub] || 0) + 1;
            } else {
                hubMap['General'] = (hubMap['General'] || 0) + 1;
            }
        });
        const hubs = Object.entries(hubMap).sort((a, b) => b[1] - a[1]).slice(0, 10);

        setStats(prev => ({
            ...prev,
            totalPlayers,
            avgScore: totalPlayers ? Math.round(totalScore / totalPlayers) : 0,
            topColleges,
            recentFeedback: filtered.filter(p => p.feedback).slice(0, 24), // Show more in pictorial view
            loading: false,
            hubs,
            ageGroups,
            genderStats,
            fieldStats
        }));
    };

    const changeState = (state) => {
        setSelectedState(state);
        processStats(allData, state, selectedField, timeFilter);
    };

    const changeField = (field) => {
        setSelectedField(field);
        processStats(allData, selectedState, field, timeFilter);
    };

    const changeTime = (time) => {
        setTimeFilter(time);
        processStats(allData, selectedState, selectedField, time);
    };

    if (stats.loading) {
        return (
            <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[250]">
                <div className="w-16 h-1 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-loading-bar"></div>
                </div>
            </div>
        );
    }

    const generateSparkline = (points) => {
        const width = 200;
        const height = 40;
        const max = Math.max(...points);
        const min = Math.min(...points);
        const range = max - min || 1;
        const step = width / (points.length - 1);

        const d = points.map((p, i) => {
            const x = i * step;
            const y = height - ((p - min) / range) * height;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');

        return <path d={d} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />;
    };

    return (
        <div className="fixed inset-0 bg-[#f8fafc] text-slate-900 overflow-y-auto z-[250] font-sans pb-20">
            {/* Fully Responsive Professional Header */}
            <header className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-auto md:h-20 py-4 md:py-0 flex flex-col md:row gap-4 md:flex-row justify-between items-center">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden shadow-xl shadow-indigo-100 border-2 border-white ring-1 ring-slate-100 flex-shrink-0">
                            <img src="/brand/ME.jpeg" alt="Mind Empowered" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-black tracking-tighter text-slate-900 leading-none">SCOUT<span className="text-indigo-600">INTEL</span></h1>
                            <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 animate-pulse">● System Live / {selectedState} / {selectedField}</p>
                        </div>
                        {/* Mobile exit button hidden on desktop */}
                        <div className="ml-auto md:hidden">
                            <button onClick={onExit} className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-xl shadow-lg">✕</button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                        <div className="flex-1 flex items-center gap-1.5 bg-slate-50 md:bg-white shadow-sm border border-slate-100 p-1.5 md:p-2 pr-3 md:pr-6 rounded-2xl">
                            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 md:pl-3 whitespace-nowrap">State:</span>
                            <select
                                value={selectedState}
                                onChange={(e) => changeState(e.target.value)}
                                className="bg-transparent md:bg-slate-50 border-none outline-none rounded-xl px-1 md:px-4 py-1.5 text-[10px] md:text-xs font-bold text-indigo-600 cursor-pointer min-w-0 w-full"
                            >
                                <option value="Overall">Overall</option>
                                {stateList.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 flex items-center gap-1.5 bg-slate-50 md:bg-white shadow-sm border border-slate-100 p-1.5 md:p-2 pr-3 md:pr-6 rounded-2xl">
                            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 md:pl-3 whitespace-nowrap">Field:</span>
                            <select
                                value={selectedField}
                                onChange={(e) => changeField(e.target.value)}
                                className="bg-transparent md:bg-slate-50 border-none outline-none rounded-xl px-1 md:px-4 py-1.5 text-[10px] md:text-xs font-bold text-indigo-600 cursor-pointer min-w-0 w-full"
                            >
                                <option value="Overall">Overall</option>
                                {fieldList.map(f => (
                                    <option key={f} value={f}>{f}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 flex items-center gap-1.5 bg-slate-50 md:bg-white shadow-sm border border-slate-100 p-1.5 md:p-2 pr-3 md:pr-6 rounded-2xl">
                            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 md:pl-3 whitespace-nowrap">Time:</span>
                            <select
                                value={timeFilter}
                                onChange={(e) => changeTime(e.target.value)}
                                className="bg-transparent md:bg-slate-50 border-none outline-none rounded-xl px-1 md:px-4 py-1.5 text-[10px] md:text-xs font-bold text-indigo-600 cursor-pointer min-w-0 w-full"
                            >
                                <option value="Overall">Overall</option>
                                <option value="1y">1 Year</option>
                                <option value="6m">6 Mon</option>
                                <option value="1m">1 Mon</option>
                                <option value="1w">1 Week</option>
                            </select>
                        </div>

                        <button onClick={onExit} className="hidden md:flex w-10 h-10 items-center justify-center bg-slate-900 text-white rounded-xl hover:rotate-90 transition-transform shadow-lg shadow-slate-200">
                            ✕
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                {/* 1. TOP CARDS - PICTORIAL STATS */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Scout Accumulation</p>
                                <h2 className="text-6xl font-black text-slate-900 tabular-nums leading-none tracking-tighter">{stats.totalPlayers}</h2>
                            </div>
                            <div className="text-indigo-500 group-hover:scale-110 transition-transform">
                                <svg width="200" height="40">
                                    {generateSparkline(stats.trendData)}
                                </svg>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-teal-600 bg-teal-50 px-4 py-2 rounded-xl w-fit flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> Healthy Enrollment Growth
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Avg Proficiency</p>
                            <h2 className="text-6xl font-black text-slate-900 tabular-nums tracking-tighter">{stats.avgScore}</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Points Per Scout</p>
                        </div>
                        <div className="relative w-24 h-24">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#4f46e5" strokeWidth="4" strokeDasharray={`${stats.avgScore / 20}, 100`} strokeLinecap="round" className="animate-grow-stroke" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-indigo-500">
                                {Math.min(100, Math.round(stats.avgScore / 20))}%
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-slate-900 p-10 rounded-[48px] shadow-2xl overflow-hidden relative group">
                        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8 relative z-10">
                            <div>
                                <h3 className="text-white font-black text-xl italic tracking-tighter">Strategic Demographics</h3>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Gender & Talent Distribution</p>
                            </div>
                            <span className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">Impact Core</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                            {/* Gender Spreads */}
                            <div>
                                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Gender Diversity</p>
                                <div className="space-y-4">
                                    {Object.entries(stats.genderStats).map(([gender, count]) => {
                                        const pc = stats.totalPlayers ? Math.round((count / stats.totalPlayers) * 100) : 0;
                                        return (
                                            <div key={gender}>
                                                <div className="flex justify-between text-[10px] font-bold text-white mb-1.5">
                                                    <span>{gender}</span>
                                                    <span>{pc}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500" style={{ width: `${pc}%` }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Field Spread */}
                            <div>
                                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Focus Disciplines</p>
                                <div className="space-y-4">
                                    {stats.fieldStats.slice(0, 3).map(([field, count]) => (
                                        <div key={field} className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <span className="text-[10px] font-black text-indigo-300 uppercase">{field}</span>
                                            <span className="text-xl font-black text-white">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                    </div>

                    {/* NEW: AGE GROUP PICTORIAl DEMOGRAPHICS */}
                    <div className="md:col-span-2 bg-white p-10 rounded-[48px] shadow-2xl border border-slate-100 relative group overflow-hidden">
                         <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-slate-900 font-black text-xl italic tracking-tighter">Scout Demographics</h3>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Age-based recruitment spread</p>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-100"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {Object.entries(stats.ageGroups).map(([group, count]) => {
                                const max = Math.max(...Object.values(stats.ageGroups)) || 1;
                                const heightPc = (count / max) * 100;
                                return (
                                    <div key={group} className="flex flex-col items-center group/age">
                                        <div className="w-full h-32 bg-slate-50 rounded-3xl relative overflow-hidden mb-4 border border-slate-100">
                                            <div 
                                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover/age:from-indigo-500 transition-all duration-1000 ease-out animate-grow-height shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                                                style={{ height: `${heightPc}%` }}
                                            />
                                            <div className="absolute inset-x-0 bottom-4 text-center">
                                                <span className={`text-[10px] font-black ${heightPc > 30 ? 'text-white' : 'text-slate-400'}`}>{count}</span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{group}</span>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Pictorial pattern background */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                             <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                                 <circle cx="50" cy="50" r="40" strokeWidth="2" strokeDasharray="5 5" />
                                 <path d="M50 30 V70 M30 50 H70" strokeWidth="2" />
                             </svg>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <section className="bg-indigo-600 p-10 rounded-[48px] shadow-xl text-white h-full relative overflow-hidden group">
                        <h3 className="text-2xl font-black italic tracking-tighter mb-10 relative z-10">Leading<br />Institutions</h3>
                        <div className="space-y-8 relative z-10">
                            {stats.topColleges.map(([college, count], i) => (
                                <div key={college} className="group/item">
                                    <div className="flex justify-between items-end mb-3">
                                        <p className="text-sm font-bold tracking-tight truncate pr-4 opacity-80 group-hover/item:opacity-100 transition-opacity">{college.slice(0, 30)}</p>
                                        <p className="text-xl font-black text-indigo-200">{count}</p>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white opacity-80 animate-grow-width shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                            style={{ width: `${(count / (stats.topColleges[0][1] || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <svg className="absolute bottom-0 left-0 opacity-10 group-hover:scale-110 transition-transform duration-1000" viewBox="0 0 200 100">
                            <path d="M0,50 Q50,0 100,50 T200,50" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 5" />
                        </svg>
                    </section>
                </div>

                <div className="lg:col-span-12 mt-10">
                    <h3 className="font-black text-slate-800 italic uppercase text-xs tracking-[0.4em] mb-10 px-4 flex items-center justify-between">
                        <span>Voices of the Mission</span>
                        <div className="h-[1px] flex-1 mx-8 bg-slate-200"></div>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pb-20">
                        {stats.recentFeedback.map((p, i) => (
                            <div key={i} className="bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform h-fit">
                                <div className="flex gap-4 items-center mb-6">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-sm font-black text-indigo-600">
                                        {p.name?.charAt(0) || 'S'}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-slate-900 truncate">{p.name || 'Anonymous'}</p>
                                        <p className="text-[9px] text-slate-400 font-bold uppercase truncate">{p.college?.slice(0, 20)}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed italic line-clamp-4">"{p.feedback}"</p>
                                <div className="mt-8 flex justify-between items-center opacity-40">
                                    <div className="flex gap-1">
                                        {[...Array(p.rating || 5)].map((_, j) => <div key={j} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>)}
                                    </div>
                                    <span className="text-[9px] font-black">{new Date(p.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes grow-width { from { width: 0; } }
                @keyframes loading-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                @keyframes grow-stroke { from { stroke-dasharray: 0, 100; } }
                .animate-grow-width { animation: grow-width 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-grow-stroke { animation: grow-stroke 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
