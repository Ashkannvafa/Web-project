"use client";
import { Users, Target, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-16">
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-5xl font-bold mb-4 text-white">
          {t('about.title')} <span className="text-white">Harmoniq</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="glass-panel p-8 rounded-2xl border-t-2 border-neon-purple/50 hover:border-neon-purple transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <Target className="text-neon-purple mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-3 text-white">{t('about.ourMission')}</h3>
          <p className="text-gray-300">
            {t('about.ourMissionDesc')}
          </p>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-t-2 border-neon-cyan/50 hover:border-neon-cyan transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Zap className="text-neon-cyan mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-3 text-white">{t('about.theSpeed')}</h3>
          <p className="text-gray-300">
            {t('about.theSpeedDesc')}
          </p>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-t-2 border-white/50 hover:border-white transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Users className="text-white mb-4" size={40} />
          <h3 className="text-2xl font-bold mb-3 text-white">{t('about.theCommunity')}</h3>
          <p className="text-gray-300">
            {t('about.theCommunityDesc')}
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="glass-panel p-12 rounded-3xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="text-neon-cyan mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-bold mb-6 text-white">{t('about.whoWeAre')}</h2>
          <p className="text-lg text-gray-300 mb-6">
            {t('about.whoWeAreDesc1')}
          </p>
          <p className="text-lg text-gray-300 mb-6">
            {t('about.whoWeAreDesc2')}
          </p>
          <p className="text-lg text-gray-300">
            {t('about.whoWeAreDesc3')}
          </p>
        </div>
      </div>
    </div>
  );
}
