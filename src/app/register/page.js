"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return addToast(t('register.allFieldsRequired'), "error");
    }

    if (formData.password.length < 6) {
      return addToast(t('register.passwordTooShort'), "error");
    }

    setLoading(true);

    // Simulate API delay for dramatic effect
    setTimeout(() => {
      const result = register(formData.name, formData.email, formData.password);
      setLoading(false);

      if (!result.success) {
        addToast(result.message, "error");
      } else {
        addToast(t('register.accountCreated'), "success");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* 1. Moving Grid Background */}
      <div className="absolute inset-0 animate-grid opacity-30 z-0"></div>
      
      {/* 2. Ambient Glow Spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      {/* 3. The Glass Card */}
      <div className="relative z-10 w-full max-w-md p-8 glass-panel rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t border-white/10 animate-fade-up">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-cyan">
            {t('register.joinHarmoniq')}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">{t('register.createIdentity')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-widest group-focus-within:text-neon-cyan transition-colors">
              {t('register.artistName')}
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={18} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                placeholder={t('register.artistNamePlaceholder')}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-widest group-focus-within:text-neon-purple transition-colors">
              {t('register.email')}
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-widest group-focus-within:text-neon-cyan transition-colors">
              {t('register.password')}
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={18} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button 
            disabled={loading}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              {t('register.initializeDashboard')} <ArrowRight size={20} />
            </span>
            
            {/* Loading Spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          {t('register.alreadyHaveAccount')} <Link href="/login" className="text-white hover:text-neon-cyan transition-colors font-semibold">{t('register.logIn')}</Link>
        </p>
      </div>
    </div>
  );
}
