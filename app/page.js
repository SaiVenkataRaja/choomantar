// app/page.js
"use client";
import { useState, useEffect } from 'react';

const AVAILABLE_TRIPS = [
  {
    id: 1,
    destination: "Hampi Backpacking Trip",
    duration: "2 Days, 1 Night Trip",
    dates: "03rd July (Night) - 06th July (Morning)",
    price: "₹6999",
    status: "Last Few Slots Left",
    badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    highlights: ["Visit to Anjanadri Hill (Birthplace of Lord Hanuman)", "Cliff Jumping & Coracle Ride", "Relaxing River Stream Experience", "Campfire & Chill Night"],
    itineraryDay1: "Adventure & Nature: Anjanadri Hill climb, water actions, and campfire circle.",
    itineraryDay2: "Heritage Tour: Vijaya Vittala Temple, Stone Chariot, Elephant Stables, Lotus Mahal, and Virupaksha Temple.",
    inclusions: ["Urbania Transport (HYD to HYD)", "Comfortable 2-sharing stay", "2 Breakfasts, 1 Dinner", "Toll & Parking Charges"]
  },
  {
    id: 2,
    destination: "Chikmagalur Monsoon Escape",
    duration: "2 Days, 1 Night",
    dates: "25th June (Evening) - 28th June (Morning)",
    price: "₹8999",
    status: "Limited Seats Available",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    highlights: ["Hebbe Falls", "Kemmangundi & Z Point Trek", "Mullayanagiri Peak & Jhari Falls", "Baba Budangiri"],
    itineraryDay1: "Hebbe Falls exploration, Kemmangundi heights, and sunset vantage points.",
    itineraryDay2: "Conquering Mullayanagiri Peak, tracking Jhari cascades, and Baba Budangiri histories.",
    inclusions: ["AC Force Urbania Transportation (Hyd to Hyd)", "Comfortable Stay on Sharing Basis", "Local Sightseeing & Driver Allowances", "2 Breakfasts, 1 Dinner, Campfire, Swimming Pool Access"]
  },
  {
    id: 3,
    destination: "Andharban Devkund Waterfalls Trek",
    duration: "2 Days, 1 Night Package",
    dates: "10th July (Eve) - 13th July (Morning)",
    price: "₹9199",
    status: "Registrations Open",
    badgeColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    highlights: ["Andharban Dark Forest Trek", "Devkund Waterfalls Valley", "Secret Waterfalls Exploration", "Depart from HYD via AC Urbania"],
    itineraryDay1: "Deep jungle trek through the magical, dense Andharban forest shroud.",
    itineraryDay2: "Breathtaking trek into the hidden pools of Devkund Waterfalls.",
    inclusions: ["To & Fro Transport from HYD", "Comfortable Sharing Stay", "2 Breakfasts, 1 Dinner", "Treking Entry Fees Included"]
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Siri",
    role: "Solo Traveler",
    rating: "⭐⭐⭐⭐⭐",
    text: "The absolute best travel community out there. Exploring nature as a solo traveler with Choomantar felt completely natural and safe. High-end synchronization!",
  },
  {
    id: 2,
    name: "Sai",
    role: "", // No tag added as requested
    rating: "⭐⭐⭐⭐⭐",
    text: "Choomantar literally works magic! The monsoon escapes are pristine, the stays are premium, and the memories are absolutely timeless.",
  }
];

// Assuming your uploaded files are dropped into public/ folder
const SLIDESHOW_IMAGES = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg", "/slide4.jpg"];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTrip, setSelectedTrip] = useState(null); // Tracks modal popup state

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      
      {/* Immersive Cinematic Background Slide */}
      <section className="relative h-[600px] w-full flex items-center justify-center text-center px-4 overflow-hidden">
        {SLIDESHOW_IMAGES.map((imgUrl, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.9)), url('${imgUrl}')`,
              opacity: idx === currentImageIndex ? 1 : 0
            }}
          />
        ))}

        <div className="max-w-3xl z-10">
          <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs bg-emerald-500/10 backdrop-blur-md px-4 py-1.5 rounded-full inline-block mb-4 border border-emerald-500/20">
            EXPLORE • CONNECT 
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-white">
            CHOOMANTAR
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-light">
            
          </p>
          <a href="#trips" className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold tracking-wider text-xs uppercase py-4 px-8 rounded-full transition-all duration-300 shadow-xl inline-block transform hover:-translate-y-0.5">
            View Seasonal Departures
          </a>
        </div>
      </section>

      {/* Available Journeys Cards Grid */}
      <section id="trips" className="max-w-6xl mx-auto mt-28 px-6 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">Active Expeditions</h2>
          <div className="w-12 h-1 bg-emerald-400 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AVAILABLE_TRIPS.map((trip) => (
            <div key={trip.id} className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${trip.badgeColor}`}>
                    {trip.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">{trip.destination}</h3>
                <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">🗓️ {trip.dates}</p>
                
                <ul className="space-y-2 mb-6">
                  {trip.highlights.slice(0, 3).map((hl, index) => (
                    <li key={index} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-emerald-400">✦</span> {hl}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold"></p>
                  <span className="text-2xl font-black text-white">{trip.price}</span>
                  <span className="text-[10px] text-slate-500 ml-1">/ person</span>
                </div>
                <button 
                  onClick={() => setSelectedTrip(trip)}
                  className="bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Reviews Grid Section */}
      <section className="max-w-5xl mx-auto mt-36 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Community Voices</h2>
          <div className="w-12 h-1 bg-emerald-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="text-sm mb-4 text-amber-400">{review.rating}</div>
                <p className="text-slate-300 italic text-base font-light leading-relaxed mb-6">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-wide">{review.name}</h4>
                  {review.role && <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{review.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BACKDROP BLUR POPUP MODAL (Triggers upon details selection) */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all duration-300">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-800 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">{selectedTrip.duration}</span>
                <h3 className="text-2xl font-black text-white mt-1">{selectedTrip.destination}</h3>
              </div>
              <button 
                onClick={() => setSelectedTrip(null)}
                className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full text-xs transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Timeline Context */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">🗓️ Trip Schedule</h4>
                <p className="text-sm text-slate-300 font-medium bg-slate-950/40 p-3 rounded-xl border border-slate-800">{selectedTrip.dates}</p>
              </div>

              {/* Day Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">🗺️ Simplified Itinerary</h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <p className="bg-slate-950/20 p-2.5 rounded-lg"><strong className="text-white">Day 1:</strong> {selectedTrip.itineraryDay1}</p>
                  {selectedTrip.itineraryDay2 && <p className="bg-slate-950/20 p-2.5 rounded-lg"><strong className="text-white">Day 2:</strong> {selectedTrip.itineraryDay2}</p>}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">✅ Included Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrip.inclusions.map((inc, i) => (
                    <span key={i} className="bg-slate-950/60 text-slate-400 border border-slate-800 text-[11px] px-3 py-1.5 rounded-lg">
                      🔹 {inc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Action Pricing & Registration */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Total Slot Price</p>
                  <p className="text-3xl font-black text-white">{selectedTrip.price}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTrip(null);
                    // Force navigation or scroll directly to register action
                    window.location.href = '/register';
                  }}
                  className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold uppercase tracking-widest text-xs py-3.5 px-6 rounded-xl transition shadow-lg"
                >
                  Register Now
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}