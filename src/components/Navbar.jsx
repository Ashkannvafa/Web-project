"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import { Hexagon, Settings, LogOut, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { t, language, changeLanguage, languages } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Define Links with translation keys
  const publicLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.features'), path: '/features' },
    { name: t('nav.support'), path: '/support' },
  ];

  const appLinks = [
    { name: t('nav.dashboard'), path: '/dashboard' },
    { name: t('nav.myTracks'), path: '/tracks' },
    { name: t('nav.history'), path: '/history' },
    { name: t('nav.myProfile'), path: '/profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            {/* The Icon */}
            <Hexagon className="text-neon-purple w-8 h-8 fill-neon-purple/20 animate-pulse" strokeWidth={2.5} />

            {/* The Text */}
            <Link href="/" className="text-2xl font-extrabold tracking-wider text-white hover:text-neon-cyan transition-colors">
              HARMONIQ
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {(user ? appLinks : publicLinks).map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
                    ${pathname === link.path ? 'text-neon-cyan' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Buttons (Right Side) */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Settings Icon - Visible on all screens */}
                <Link
                  href="/settings"
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    pathname === '/settings' 
                      ? 'bg-neon-purple/30 text-neon-cyan' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  title={t('nav.settings')}
                >
                  <Settings size={20} />
                </Link>
                {/* Logout Button - Hidden on mobile, visible on desktop */}
                <button 
                  onClick={logout}
                  className="hidden md:block bg-red-500/20 text-red-400 px-4 py-2 rounded-full border border-red-500/50 hover:bg-red-500/40 transition"
                >
                  {t('nav.logout')}
                </button>
                {/* Mobile Logout Icon */}
                <button 
                  onClick={logout}
                  className="md:hidden p-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/40 transition"
                  title={t('nav.logout')}
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Language Dropdown for non-logged in users */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      showLangMenu 
                        ? 'bg-neon-purple/30 text-neon-cyan' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={t('settings.language')}
                  >
                    <Globe size={20} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showLangMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl border border-white/10 shadow-xl overflow-hidden animate-fade-up">
                      <div className="p-3 border-b border-white/10">
                        <p className="text-xs text-gray-400 uppercase font-bold">{t('settings.selectLanguage')}</p>
                      </div>
                      <div className="p-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              changeLanguage(lang.code);
                              setShowLangMenu(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                              language === lang.code
                                ? 'bg-neon-cyan/10 text-neon-cyan'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="font-medium">{lang.name}</span>
                            {language === lang.code && (
                              <span className="ml-auto text-neon-cyan">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2">
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white px-5 py-2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
