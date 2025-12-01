"use client";
import { Music, Zap, ShieldCheck, DollarSign, Users, Database, AlertTriangle, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Music size={32} />,
      title: t('features.trackUpload'),
      desc: t('features.trackUploadDesc'),
      color: "text-neon-purple"
    },
    {
      icon: <Zap size={32} />,
      title: t('features.ownershipSplits'),
      desc: t('features.ownershipSplitsDesc'),
      color: "text-neon-cyan"
    },
    {
      icon: <BarChart3 size={32} />,
      title: t('features.realTimeTracking'),
      desc: t('features.realTimeTrackingDesc'),
      color: "text-neon-purple"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: t('features.blockchainSecurity'),
      desc: t('features.blockchainSecurityDesc'),
      color: "text-neon-cyan"
    },
    {
      icon: <AlertTriangle size={32} />,
      title: t('features.fraudDetection'),
      desc: t('features.fraudDetectionDesc'),
      color: "text-neon-purple"
    },
    {
      icon: <DollarSign size={32} />,
      title: t('features.automatedPayouts'),
      desc: t('features.automatedPayoutsDesc'),
      color: "text-neon-cyan"
    },
    {
      icon: <Users size={32} />,
      title: t('features.teamCollaboration'),
      desc: t('features.teamCollaborationDesc'),
      color: "text-neon-purple"
    },
    {
      icon: <Database size={32} />,
      title: t('features.nftReady'),
      desc: t('features.nftReadyDesc'),
      color: "text-neon-cyan"
    }
  ];

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-16">
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <span className="text-white">{t('features.title')}</span> {t('features.titleHighlight')}
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {t('features.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, i) => (
          <div
            key={i}
            className="glass-panel p-6 rounded-xl hover:-translate-y-2 transition-all duration-300 group cursor-default animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className={`mb-4 ${feat.color} group-hover:scale-110 transition-transform`}>
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{feat.title}</h3>
            <p className="text-sm text-gray-300">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
