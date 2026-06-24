// app/components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-500 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs tracking-wide">
        
        {/* Brand Mission */}
        <div>
          <h3 className="text-white font-black tracking-[0.15em] text-sm mb-4">🔮 CHOOMANTAR</h3>
          <p className="leading-relaxed font-light text-slate-400">
            Connecting minds, exploring nature, and discovering the timeless beauty of hidden landscapes. Join our premier travel community.
          </p>
        </div>

        {/* Community Links */}
        <div>
          <h4 className="text-slate-300 font-bold uppercase tracking-widest mb-4">Contact Community</h4>
          <div className="space-y-3 font-light text-slate-400">
            <p className="flex items-center gap-2">
              <span></span>WhatsApp: <span className="text-white font-medium">+91 9491294674</span>
            </p>
            <p className="flex items-center gap-2">
              <span>Instagram :</span>  
              <Link 
                href="https://teams.microsoft.com/l/message/48:notes/1782290854027?context=%7B%22contextType%22%3A%22chat%22%2C%22oid%22%3A%228%3Aorgid%3A2d088881-541e-4943-b294-c60e3f724e2f%22%7D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium"
              >
                 @the_choomantar
              </Link>
            </p>
          </div>
        </div>

        {/* Safety Guard */}
        <div>
          <h4 className="text-slate-300 font-bold uppercase tracking-widest mb-4">Community Guard</h4>
          <p className="leading-relaxed font-light text-slate-500">
            All departures are highly synchronized. Limited spots are offered strictly on a first-come, first-serve basis.
          </p>
        </div>

      </div>

      {/* Dynamic Copyright Section */}
      <div className="max-w-6xl mx-auto px-6 mt-8 pt-8 border-t border-slate-900 text-center text-[10px] text-slate-600 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Choomantar Travel Community.
      </div>
    </footer>
  );
}