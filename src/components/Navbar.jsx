"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '@/context/AppDataContext';
import { usePathname } from 'next/navigation';
import { Settings, Menu, X } from 'lucide-react'; // Added Menu, X, removed Hexagon
import { translations } from '@/utils/translations';
import { useState } from 'react'; // Added useState

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language } = useAppData();
  const pathname = usePathname();
  const t = translations[language]?.navbar || translations.en.navbar;

  const [isOpen, setIsOpen] = useState(false); // Added isOpen state

  // Define Links (these are no longer directly used in the new structure, but keeping for context if needed elsewhere)
  const publicLinks = [
    { name: t.home, path: '/' },
    { name: t.about, path: '/about' },
    { name: t.features, path: '/features' },
    { name: t.support, path: '/support' },
  ];

  const appLinks = [
    { name: t.dashboard, path: '/dashboard' },
    { name: t.myTracks, path: '/tracks' },
    { name: t.history, path: '/history' },
    { name: t.myProfile, path: '/profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-purple-600 dark:bg-gradient-to-br dark:from-neon-purple dark:to-neon-cyan flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Harmoniq
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                {t.home}
              </Link>
              {user ? ( // Changed currentUser to user
                <>
                  <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {t.dashboard}
                  </Link>
                  <Link href="/tracks" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {t.myTracks}
                  </Link>
                  <Link href="/history" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {t.history}
                  </Link>
                  <Link href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {t.myProfile}
                  </Link>
                  <Link href="/settings" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center" title={t.settings}>
                    <Settings size={20} />
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
                  >
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/settings" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center" title="Settings">
                    <Settings size={20} />
                  </Link>
                  <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-neon-purple dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    {t.login}
                  </Link>
                  <Link href="/register" className="bg-purple-600 hover:bg-purple-700 dark:bg-neon-purple dark:hover:bg-neon-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20 dark:shadow-neon-purple/20">
                    {t.getStarted}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              {t.home}
            </Link>
            {user ? ( // Changed currentUser to user
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {t.dashboard}
                </Link>
                <Link href="/tracks" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {t.myTracks}
                </Link>
                <Link href="/history" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {t.history}
                </Link>
                <Link href="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {t.myProfile}
                </Link>
                <Link href="/settings" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {t.settings}
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left text-red-400 hover:text-red-300 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <Link href="/settings" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Settings
                </Link>
                <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {t.login}
                </Link>
                <Link href="/register" className="text-neon-purple hover:text-neon-purple/80 block px-3 py-2 rounded-md text-base font-medium">
                  {t.getStarted}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}