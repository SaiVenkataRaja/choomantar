
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export const metadata = {
  title: 'Choomantar the Traveller',
  description: 'Your ticket to magical journeys.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        
        {children}
        <Footer />
      </body>
    </html>
  );
}