import React, { useState } from 'react';
import CitySquareScenery from '../components/CitySquareScenery';

const RegistrationScreen = ({ onRegister, audioManager }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        college: '',
        state: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
        "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name || !formData.age || !formData.college || !formData.state) {
            setError("Please fill in all the details.");
            if (audioManager) audioManager.playSad();
            return;
        }

        if (isNaN(formData.age) || formData.age < 5 || formData.age > 100) {
            setError("Please enter a valid age.");
            return;
        }

        setLoading(true);
        if (audioManager) audioManager.playConfirm();

        try {
            await onRegister(formData);
        } catch (err) {
            setError("Failed to register. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute inset-0 z-[400] bg-slate-900 flex items-center justify-center p-6 overflow-y-auto">
            {/* Real Backdrop */}
            <div className="absolute inset-0 z-0">
                <CitySquareScenery showTrees={true} showLights={true} />
            </div>

            <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 shadow-3xl border border-white/20 animate-scale-in">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Scout Enrollment</h2>
                    <p className="text-slate-500 text-sm font-medium">Join the urban compassion network</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-600 text-sm font-bold animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Full Name</label>
                        <input 
                            type="text"
                            placeholder="e.g. Abhiram S"
                            className="w-full px-5 py-3.5 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Age */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">Age</label>
                            <input 
                                type="number"
                                placeholder="Age"
                                className="w-full px-5 py-3.5 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none"
                                value={formData.age}
                                onChange={(e) => setFormData({...formData, age: e.target.value})}
                            />
                        </div>
                        {/* State Dropdown */}
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">State</label>
                            <select 
                                className="w-full px-5 py-3.5 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none appearance-none"
                                value={formData.state}
                                onChange={(e) => setFormData({...formData, state: e.target.value})}
                            >
                                <option value="">Select State</option>
                                {states.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* College Dropdown */}
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-2">College / Institution</label>
                        <select 
                            className="w-full px-5 py-3.5 bg-slate-100 border-none rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-orange-400 transition-all outline-none appearance-none"
                            value={formData.college}
                            onChange={(e) => setFormData({...formData, college: e.target.value})}
                        >
                            <option value="">Select College</option>
                            <optgroup label="Institutions">
                                <option value="IIT Bombay">IIT Bombay</option>
                                <option value="IIT Delhi">IIT Delhi</option>
                                <option value="IIT Madras">IIT Madras</option>
                                <option value="BITS Pilani">BITS Pilani</option>
                                <option value="Delhi University">Delhi University</option>
                                <option value="SRM University">SRM University</option>
                                <option value="VIT Vellore">VIT Vellore</option>
                                <option value="Manipal Institute">Manipal Institute</option>
                                <option value="Amity University">Amity University</option>
                                <option value="Anna University">Anna University</option>
                                <option value="Christ University">Christ University</option>
                                <option value="Symbiosis International">Symbiosis International</option>
                                <option value="Jawaharlal Nehru University">Jawaharlal Nehru University</option>
                            </optgroup>
                            <option value="Other / Not Listed">Other / Not Listed</option>
                        </select>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-orange-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : 'Complete Enrollment'}
                        {!loading && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
                    </button>
                </form>

                <p className="mt-8 text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest leading-relaxed">
                    By enrolling, you agree to the urban scout protocol and data privacy measures of Mind Empowered.
                </p>
            </div>
        </div>
    );
};

export default RegistrationScreen;
