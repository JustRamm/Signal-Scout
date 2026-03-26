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

                            <optgroup label="🏛️ Kerala — Engineering Colleges">
                                <option value="College of Engineering Trivandrum (CET)">College of Engineering Trivandrum (CET)</option>
                                <option value="Government Engineering College Thrissur">Government Engineering College Thrissur</option>
                                <option value="Government Engineering College Palakkad">Government Engineering College Palakkad</option>
                                <option value="Government Engineering College Kannur">Government Engineering College Kannur</option>
                                <option value="Government Engineering College Kozhikode">Government Engineering College Kozhikode</option>
                                <option value="Model Engineering College, Ernakulam">Model Engineering College, Ernakulam</option>
                                <option value="Rajiv Gandhi Institute of Technology, Kottayam">Rajiv Gandhi Institute of Technology, Kottayam</option>
                                <option value="NSS College of Engineering, Palakkad">NSS College of Engineering, Palakkad</option>
                                <option value="Mar Athanasius College of Engineering, Kothamangalam">Mar Athanasius College of Engineering, Kothamangalam</option>
                                <option value="Toc H Institute of Science and Technology (TIST)">Toc H Institute of Science and Technology (TIST)</option>
                                <option value="MES College of Engineering, Kuttippuram">MES College of Engineering, Kuttippuram</option>
                                <option value="LBS College of Engineering, Kasaragod">LBS College of Engineering, Kasaragod</option>
                                <option value="Sree Chitra Thirunal College of Engineering">Sree Chitra Thirunal College of Engineering</option>
                                <option value="Ilahia College of Engineering, Muvattupuzha">Ilahia College of Engineering, Muvattupuzha</option>
                                <option value="Viswajyothi College of Engineering, Vazhakulam">Viswajyothi College of Engineering, Vazhakulam</option>
                            </optgroup>

                            <optgroup label="🏥 Kerala — Medical Colleges">
                                <option value="Government Medical College Thiruvananthapuram">Government Medical College Thiruvananthapuram</option>
                                <option value="Government Medical College Kozhikode">Government Medical College Kozhikode</option>
                                <option value="Government Medical College Thrissur">Government Medical College Thrissur</option>
                                <option value="Government Medical College Kottayam">Government Medical College Kottayam</option>
                                <option value="Amrita Institute of Medical Sciences, Kochi">Amrita Institute of Medical Sciences, Kochi</option>
                                <option value="Pushpagiri Medical College, Thiruvalla">Pushpagiri Medical College, Thiruvalla</option>
                                <option value="Jubilee Mission Medical College, Thrissur">Jubilee Mission Medical College, Thrissur</option>
                                <option value="Believers Church Medical College, Thiruvalla">Believers Church Medical College, Thiruvalla</option>
                            </optgroup>

                            <optgroup label="🎓 Kerala — Arts, Science & Commerce">
                                <option value="University College Thiruvananthapuram">University College Thiruvananthapuram</option>
                                <option value="Maharaja's College Ernakulam">Maharaja's College Ernakulam</option>
                                <option value="St. Albert's College Ernakulam">St. Albert's College Ernakulam</option>
                                <option value="St. Teresa's College Ernakulam">St. Teresa's College Ernakulam</option>
                                <option value="Sacred Heart College Thevara">Sacred Heart College Thevara</option>
                                <option value="Farook College, Kozhikode">Farook College, Kozhikode</option>
                                <option value="Malabar Christian College, Kozhikode">Malabar Christian College, Kozhikode</option>
                                <option value="Devagiri College, Kozhikode">Devagiri College, Kozhikode</option>
                                <option value="Providence Women's College, Kozhikode">Providence Women's College, Kozhikode</option>
                                <option value="St. Joseph's College, Devagiri">St. Joseph's College, Devagiri</option>
                                <option value="SH College, Thevara">SH College, Thevara</option>
                                <option value="Baselius College, Kottayam">Baselius College, Kottayam</option>
                                <option value="Bharata Mata College, Thrikkakara">Bharata Mata College, Thrikkakara</option>
                                <option value="St. Paul's College, Kalamassery">St. Paul's College, Kalamassery</option>
                                <option value="Assumption College, Changanacherry">Assumption College, Changanacherry</option>
                                <option value="St. Berchmans College, Changanacherry">St. Berchmans College, Changanacherry</option>
                                <option value="BCM College, Kottayam">BCM College, Kottayam</option>
                                <option value="Government College Chittur, Palakkad">Government College Chittur, Palakkad</option>
                                <option value="Sree Kerala Varma College, Thrissur">Sree Kerala Varma College, Thrissur</option>
                                <option value="St. Thomas College, Thrissur">St. Thomas College, Thrissur</option>
                                <option value="Christ College, Irinjalakuda">Christ College, Irinjalakuda</option>
                                <option value="SNGS College, Pattambi">SNGS College, Pattambi</option>
                                <option value=" Catholicate College, Pathanamthitta"> Catholicate College, Pathanamthitta</option>
                                <option value="MES Asmabi College, Kodungallur">MES Asmabi College, Kodungallur</option>
                            </optgroup>

                            <optgroup label="🏫 Kerala — Universities & Deemed">
                                <option value="Cochin University of Science and Technology (CUSAT)">Cochin University of Science and Technology (CUSAT)</option>
                                <option value="Amrita Vishwa Vidyapeetham, Coimbatore/Kochi">Amrita Vishwa Vidyapeetham</option>
                                <option value="Kerala University, Thiruvananthapuram">Kerala University, Thiruvananthapuram</option>
                                <option value="Mahatma Gandhi University, Kottayam">Mahatma Gandhi University, Kottayam</option>
                                <option value="Calicut University">Calicut University</option>
                                <option value="Kannur University">Kannur University</option>
                                <option value="APJ Abdul Kalam Technological University">APJ Abdul Kalam Technological University</option>
                            </optgroup>

                            <optgroup label="🇮🇳 National Institutions">
                                <option value="IIT Bombay">IIT Bombay</option>
                                <option value="IIT Delhi">IIT Delhi</option>
                                <option value="IIT Madras">IIT Madras</option>
                                <option value="NIT Calicut">NIT Calicut</option>
                                <option value="NIT Trichy">NIT Trichy</option>
                                <option value="BITS Pilani">BITS Pilani</option>
                                <option value="Delhi University">Delhi University</option>
                                <option value="SRM University">SRM University</option>
                                <option value="VIT Vellore">VIT Vellore</option>
                                <option value="Manipal Institute">Manipal Institute</option>
                                <option value="Amity University">Amity University</option>
                                <option value="Anna University">Anna University</option>
                                <option value="Christ University Bangalore">Christ University Bangalore</option>
                                <option value="Symbiosis International">Symbiosis International</option>
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
