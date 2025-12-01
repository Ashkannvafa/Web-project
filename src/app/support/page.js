"use client";
import { useState } from 'react';
import { Mail, MessageCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const { t } = useLanguage();

  const faqs = [
    { q: t('support.faq1q'), a: t('support.faq1a') },
    { q: t('support.faq2q'), a: t('support.faq2a') },
    { q: t('support.faq3q'), a: t('support.faq3a') },
    { q: t('support.faq4q'), a: t('support.faq4a') },
    { q: t('support.faq5q'), a: t('support.faq5a') },
  ];

  return (
    <div className="pt-24 min-h-screen max-w-6xl mx-auto px-6 pb-16">
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <span className="text-white">{t('support.title')}</span> {t('support.titleHighlight')}
        </h1>
        <p className="text-xl text-gray-300">{t('support.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Contact Form */}
        <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-6">
            <Mail className="text-neon-cyan" size={28} />
            <h2 className="text-2xl font-bold text-white">{t('support.contactUs')}</h2>
          </div>
          <p className="text-gray-300 mb-6">{t('support.contactDesc')}</p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder={t('support.yourEmail')}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors"
            />
            <textarea
              rows="5"
              placeholder={t('support.describeIssue')}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-cyan outline-none transition-colors resize-none"
            ></textarea>
            <button className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
              {t('support.sendMessage')}
            </button>
          </form>
        </div>

        {/* Help Resources */}
        <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="text-neon-purple" size={28} />
            <h2 className="text-2xl font-bold text-white">{t('support.quickHelp')}</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-black/30 border border-white/10 rounded-lg p-4 hover:border-neon-purple/50 transition-colors cursor-pointer">
              <h3 className="font-bold text-white mb-2">{t('support.emailSupport')}</h3>
              <p className="text-sm text-gray-300">support@harmoniq.io</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg p-4 hover:border-neon-cyan/50 transition-colors cursor-pointer">
              <h3 className="font-bold text-white mb-2">{t('support.documentation')}</h3>
              <p className="text-sm text-gray-300">{t('support.documentationDesc')}</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-lg p-4 hover:border-neon-purple/50 transition-colors cursor-pointer">
              <h3 className="font-bold text-white mb-2">{t('support.communityDiscord')}</h3>
              <p className="text-sm text-gray-300">{t('support.communityDiscordDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="glass-panel p-8 rounded-2xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="text-neon-cyan" size={28} />
          <h2 className="text-2xl font-bold text-white">{t('support.faq')}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-black/30 border border-white/10 rounded-lg overflow-hidden hover:border-neon-cyan/30 transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-bold text-white">{faq.q}</span>
                <ChevronDown
                  className={`text-neon-cyan transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-gray-300 border-t border-white/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
