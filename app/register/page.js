// app/register/page.js
"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    slots: 1,
    fullName: '',
    email: '',
    phone: '',
    passengerNames: {} // Dynamically stores secondary traveler names
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSlotChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFormData(prev => {
      const updatedNames = { ...prev.passengerNames };
      // Clean up excess names if slots are reduced
      Object.keys(updatedNames).forEach(key => {
        if (parseInt(key, 10) >= value) {
          delete updatedNames[key];
        }
      });
      return { ...prev, slots: value, passengerNames: updatedNames };
    });
  };

  const handlePassengerNameChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      passengerNames: {
        ...prev.passengerNames,
        [index]: value
      }
    }));
  };

  if (submitted) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 bg-slate-950">
        <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-md border border-emerald-500/30 p-10 rounded-3xl text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-emerald-400 animate-pulse">
            ✓
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide uppercase mb-3">Request Received</h2>
          <p className="text-sm text-slate-400 font-light leading-relaxed mb-8">
            Your premium slot allocation is being prioritized. A community curator will reach out via WhatsApp shortly to finalize your itinerary confirmation.
          </p>
          <Link href="/" className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-widest text-xs py-3.5 px-8 rounded-xl transition duration-300">
            Return to Base
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 py-20 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-slate-900/20 backdrop-blur-md border border-slate-900 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative glow in background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Header Block */}
        <div className="text-center mb-10 relative z-10">
          <span className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block mb-3">
            Securing Departure
          </span>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">Slot Registration</h1>
          <p className="text-xs text-slate-500 font-light mt-2 tracking-wide">
            Please provide your operational details to lock in your community spot.
          </p>
        </div>

        {/* Premium Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {/* STEP 1: Number of Slots Selector (Moved to Top) */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Number of People
            </label>
            <div className="relative">
              <select 
                value={formData.slots}
                onChange={handleSlotChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition duration-200 font-light appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num} className="bg-slate-950 text-slate-200">
                    {num} {num === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Primary Explorer Name */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Traveller Name
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g., Maximus Decimus Meridius"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition duration-200 font-light"
            />
          </div>

          {/* Dynamic Extra Names Block */}
          {formData.slots > 1 && (
            <div className="space-y-4 pt-2 border-t border-slate-900">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                Additional Co-Traveler Details
              </label>
              {Array.from({ length: formData.slots - 1 }).map((_, idx) => {
                const passengerIndex = idx + 1;
                return (
                  <div key={passengerIndex}>
                    <input 
                      type="text" 
                      required
                      placeholder={`Person ${passengerIndex + 1} Full Name`}
                      value={formData.passengerNames[passengerIndex] || ''}
                      onChange={(e) => handlePassengerNameChange(passengerIndex, e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition duration-200 font-light"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact Row: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-900">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition duration-200 font-light"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                WhatsApp Contact
              </label>
              <input 
                type="tel" 
                required
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition duration-200 font-light"
              />
            </div>
          </div>

          {/* Premium CTA Button */}
          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-black uppercase tracking-[0.15em] text-xs py-4 px-6 rounded-xl transition duration-300 shadow-xl shadow-emerald-950/20 transform active:scale-[0.99]"
            >
              Request Spot Assignment
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}