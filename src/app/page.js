"use client";
import Link from 'next/link';
import Hero3D from '../components/Hero3D';
import { ShieldCheck, Music, DollarSign, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 🟢 HERO SECTION */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-hero-glow opacity-50 z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
              {t('home.heroTitle1')} <br />
              <span className="text-white bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
                {t('home.heroTitle2')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
              {t('home.heroDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/register" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 transition-all transform"
              >
                {t('nav.getStarted')}
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 rounded-full glass-panel text-white font-medium text-lg hover:bg-white/10 transition-colors"
              >
                {t('home.howItWorks')}
              </Link>
            </div>
          </div>

          {/* Right: 3D Object */}
          <div className="relative h-[500px] w-full">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* 🟢 ABOUT SECTION */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
          <h2 className="text-4xl font-bold text-white">{t('home.whyHarmoniq')} <span className="text-neon-cyan">Harmoniq?</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-2xl text-left hover:border-neon-purple/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4 text-neon-purple">{t('home.fairSplits')}</h3>
              <p className="text-gray-300">
                {t('home.fairSplitsDesc')}
              </p>
            </div>
            <div className="glass-panel p-8 rounded-2xl text-left hover:border-neon-cyan/50 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4 text-neon-cyan">{t('home.blockchainPowered')}</h3>
              <p className="text-gray-300">
                {t('home.blockchainPoweredDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 FEATURES SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">{t('home.powerfulFeatures')}</h2>
            <p className="text-gray-300">{t('home.everythingYouNeed')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Music size={32} />} 
              title={t('home.trackUpload')} 
              desc={t('home.trackUploadDesc')} 
              color="text-neon-purple"
            />
            <FeatureCard 
              icon={<Zap size={32} />} 
              title={t('home.smartSplits')} 
              desc={t('home.smartSplitsDesc')} 
              color="text-neon-cyan"
            />
            <FeatureCard 
              icon={<ShieldCheck size={32} />} 
              title={t('home.secure')} 
              desc={t('home.secureDesc')} 
              color="text-neon-purple"
            />
            <FeatureCard 
              icon={<DollarSign size={32} />} 
              title={t('home.autoPayouts')} 
              desc={t('home.autoPayoutsDesc')} 
              color="text-neon-cyan"
            />
          </div>
        </div>
      </section>

      {/* Footer (Simple) */}
      <footer className="py-8 text-center text-gray-500 border-t border-white/10 mt-auto">
        <p>{t('home.footer')}</p>
      </footer>
    </div>
  );
}

// Simple internal component for the cards to keep code clean
function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="glass-panel p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 group cursor-default">
      <div className={`mb-4 ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-300">{desc}</p>
    </div>
  );
}
