"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import { Hexagon, Settings, LogOut, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { t, language, changeLanguage, languages } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const langMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

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

  const currentLinks = user ? appLinks : publicLinks;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <Hexagon className="text-neon-purple w-8 h-8 fill-neon-purple/20 animate-pulse" strokeWidth={2.5} />
              <Link href="/" className="text-2xl font-extrabold tracking-wider text-white hover:text-neon-cyan transition-colors">
                HARMONIQ
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {currentLinks.map((link) => (
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

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* Settings Icon */}
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
                  {/* Desktop Logout Button */}
                  <button 
                    onClick={logout}
                    className="hidden md:block bg-red-500/20 text-red-400 px-4 py-2 rounded-full border border-red-500/50 hover:bg-red-500/40 transition"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  {/* Language Dropdown - Desktop */}
                  <div className="relative" ref={langMenuRef}>
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Menu Panel */}
          <div 
            ref={mobileMenuRef}
            className="absolute top-20 left-0 right-0 bg-black/95 border-b border-white/10 animate-fade-up"
          >
            <div className="px-4 py-6 space-y-2">
              {/* Navigation Links */}
              {currentLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                    pathname === link.path 
                      ? 'bg-neon-purple/20 text-neon-cyan border border-neon-cyan/30' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Language Selection */}
              <div className="px-4 py-2">
                <p className="text-xs text-gray-400 uppercase font-bold mb-3">{t('settings.language')}</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        language === lang.code
                          ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Auth Buttons */}
              {user ? (
                <div className="space-y-2 px-4">
                  <Link
                    href="/settings"
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      pathname === '/settings'
                        ? 'bg-neon-purple/20 text-neon-cyan'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Settings size={20} />
                    {t('nav.settings')}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
                  >
                    <LogOut size={20} />
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 px-4">
                  <Link
                    href="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl text-gray-300 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  >
                    {t('nav.getStarted')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
