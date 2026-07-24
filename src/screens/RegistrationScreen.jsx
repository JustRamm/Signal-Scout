import React, { useState, useEffect } from 'react';
import CitySquareScenery from '../components/CitySquareScenery';
import { INSTITUTIONS } from '../data/institutions';

const RegistrationScreen = ({ onRegister, audioManager }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        state: '',
        manualState: '',
        university: '',
        manualUniversity: '',
        college: '',
        manualCollege: '',
        gender: '',
        fieldOfStudy: '',
        hasPriorTraining: false
    });
    const [error, setError] = useState(null);

    const states = Object.keys(INSTITUTIONS).sort();
    
    // Updated filtering logic using the new hierarchy
    const universities = (formData.state && formData.fieldOfStudy)
        ? [...Object.keys((INSTITUTIONS[formData.state] || {})[formData.fieldOfStudy] || {}).filter(u => u !== "Other University").sort(), "Other University"]
        : [];
        
    const colleges = (formData.state && formData.fieldOfStudy && formData.university && formData.university !== 'Other University')
        ? [...(((INSTITUTIONS[formData.state] || {})[formData.fieldOfStudy] || {})[formData.university] || []).filter(c => c !== "Other").sort(), "Other"]
        : [];

    const isOther = formData.state === 'Other' || formData.university === 'Other University' || formData.college === 'Other';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const finalState = formData.state === 'Other' ? formData.manualState : formData.state;
        const finalUniversity = formData.university === 'Other University' ? formData.manualUniversity : formData.university;
        const finalCollege = (formData.college === 'Other' || formData.university === 'Other University' || formData.state === 'Other') 
            ? formData.manualCollege 
            : formData.college;

        // Validation
        if (!formData.name || !formData.age || !finalState || !finalUniversity || !finalCollege || !formData.gender || !formData.fieldOfStudy) {
            setError("Please fill in all the required details.");
            if (audioManager) audioManager.playSad();
            return;
        }

        if (isNaN(formData.age) || formData.age < 5 || formData.age > 100) {
            setError("Please enter a valid age.");
            return;
        }

        if (audioManager) audioManager.playConfirm();
        onRegister({
            ...formData,
            state: finalState,
            university: finalUniversity,
            college: finalCollege
        });
    };

    return (
        <div className="absolute inset-0 z-[400] bg-slate-900 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Real Backdrop */}
            <div className="absolute inset-0 z-0">
                <CitySquareScenery showTrees={true} showLights={true} />
            </div>

            <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[24px] sm:rounded-[32px] shadow-3xl border border-white/20 animate-scale-in flex flex-col" style={{maxHeight: '90vh'}}>

                {/* ── Sticky Header ── */}
                <div className="flex-shrink-0 text-center px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                        </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Scout Enrollment</h2>
                    <p className="text-slate-500 text-[11px] sm:text-sm font-medium">Join the urban compassion network</p>
                </div>

                {/* ── Scrollable Form Body ── */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-2" style={{scrollbarWidth: 'thin', scrollbarColor: '#fed7aa transparent'}}>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-600 text-[11px] font-bold animate-shake">
                            {error}
                        </div>
                    )}

                    <form id="enrollment-form" onSubmit={handleSubmit} className="space-y-3.5 pb-2">
                        {/* Name */}
                        <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. John D"
                                className="w-full px-5 py-3 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {/* Secondary Demographics Group */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {/* Gender */}
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Gender</label>
                                <select
                                    className="w-full px-5 py-3 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none appearance-none"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            {/* Age */}
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Your Age</label>
                                <input
                                    type="number"
                                    placeholder="Age"
                                    className="w-full px-5 py-3 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {/* Field of Study */}
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Field of Study</label>
                                <select
                                    className="w-full px-5 py-3 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none appearance-none"
                                    value={formData.fieldOfStudy}
                                    onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value, university: '', college: '' })}
                                >
                                    <option value="">Select Field</option>
                                    <option value="Science & Tech">Science &amp; Tech</option>
                                    <option value="Arts & Humanities">Arts &amp; Humanities</option>
                                    <option value="Commerce & Biz">Commerce &amp; Biz</option>
                                    <option value="Medical & Health">Medical &amp; Health</option>
                                    <option value="Law">Law</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            {/* State Dropdown */}
                            <div>
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Home State</label>
                                <select
                                    className="w-full px-5 py-3 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none appearance-none"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value, university: '', college: '' })}
                                >
                                    <option value="">Select State</option>
                                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Manual State Input */}
                        {formData.state === 'Other' && (
                            <div className="animate-fade-in text-left">
                                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Specify State</label>
                                <input
                                    type="text"
                                    placeholder="Enter your state name..."
                                    className="w-full px-4 py-3 bg-orange-50/50 border border-orange-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none"
                                    value={formData.manualState}
                                    onChange={(e) => setFormData({ ...formData, manualState: e.target.value })}
                                    autoFocus
                                />
                            </div>
                        )}

                        {/* Academic Section */}
                        {formData.state && formData.fieldOfStudy && (
                            <div className="space-y-3.5 pt-2 border-t border-slate-100 mt-2">
                                {/* University Dropdown */}
                                <div className="animate-fade-in text-left">
                                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">University / Board</label>
                                    <select
                                        className="w-full px-5 py-3 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none appearance-none"
                                        value={formData.university}
                                        onChange={(e) => setFormData({ ...formData, university: e.target.value, college: '' })}
                                    >
                                        <option value="">Select University</option>
                                        {universities.map(u => <option key={u} value={u}>{u}</option>)}
                                    </select>
                                </div>

                                {/* Manual University Input */}
                                {formData.university === 'Other University' && (
                                    <div className="animate-fade-in text-left">
                                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Specify University</label>
                                        <input
                                            type="text"
                                            placeholder="Enter university / board name..."
                                            className="w-full px-4 py-3 bg-orange-50/50 border border-orange-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none"
                                            value={formData.manualUniversity}
                                            onChange={(e) => setFormData({ ...formData, manualUniversity: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                )}

                                {/* College Dropdown */}
                                {formData.university && formData.university !== 'Other University' && (
                                    <div className="animate-fade-in text-left">
                                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">College Name</label>
                                        <select
                                            className="w-full px-5 py-3 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none appearance-none"
                                            value={formData.college}
                                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                        >
                                            <option value="">Select Institution</option>
                                            {colleges.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                )}

                                {/* Manual College Input */}
                                {(formData.college === 'Other' || formData.university === 'Other University' || formData.state === 'Other') && (
                                    <div className="animate-fade-in text-left">
                                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Specify Institution Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter college name manually..."
                                            className="w-full px-4 py-3 bg-orange-50/50 border border-orange-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none"
                                            value={formData.manualCollege}
                                            onChange={(e) => setFormData({ ...formData, manualCollege: e.target.value })}
                                            autoFocus
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Prior Knowledge Toggle */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-orange-50/30 rounded-2xl border border-orange-100 hover:bg-orange-50/50 transition-colors cursor-pointer group" onClick={() => setFormData({ ...formData, hasPriorTraining: !formData.hasPriorTraining })}>
                            <div className={`w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${formData.hasPriorTraining ? 'bg-orange-500 shadow-md' : 'bg-white border-2 border-orange-200'}`}>
                                {formData.hasPriorTraining && <svg className="w-3.5 h-3.5 text-white stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                            </div>
                            <label className="text-[10px] sm:text-xs font-bold text-slate-600 cursor-pointer select-none">
                                I have attended a Mental Health Awareness session before.
                            </label>
                        </div>
                    </form>
                </div>

                {/* ── Sticky Footer ── */}
                <div className="flex-shrink-0 px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-slate-100/80">
                    <button
                        type="submit"
                        form="enrollment-form"
                        className="w-full mt-2 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        Complete Enrollment
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                    <p className="mt-4 text-[8px] sm:text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest leading-relaxed">
                        By enrolling, you agree to the urban scout protocol and data privacy measures of Mind Empowered.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RegistrationScreen;
