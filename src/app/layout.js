import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { AppDataProvider } from '../context/AppDataContext';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Harmoniq',
  description: 'Split Your Music Royalties Fairly',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
          <AppDataProvider>
            <ToastProvider>
              <Navbar />
              <main className="min-h-screen pt-20">
                {/* pt-20 adds padding so content isn't hidden behind fixed navbar */}
                {children}
              </main>
            </ToastProvider>
          </AppDataProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}