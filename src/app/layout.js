import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { AppDataProvider } from '../context/AppDataContext';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Harmoniq | Fair Music Royalty Splits',
  description: 'The modern Web3 platform for creators. Upload tracks, assign ownership percentages, and automate payouts with transparent blockchain technology.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppDataProvider>
            <ToastProvider>
              <Navbar />
              <main className="min-h-screen pt-20">
                {/* pt-20 adds padding so content isn't hidden behind fixed navbar */}
                {children}
              </main>
            </ToastProvider>
          </AppDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}