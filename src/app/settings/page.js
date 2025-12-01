"use client";
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '@/context/AppDataContext';
import { Settings, Bell, Lock, Volume2, VolumeX, Shield, Eye, EyeOff, Globe } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { language, changeLanguage, t, languages } = useLanguage();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      royaltyAlerts: true,
    },
    privacy: {
      profileVisibility: 'public',
      showBalance: true,
      twoFactorAuth: false,
    },
    audio: {
      soundEffects: true,
      volume: 75,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleNotificationToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
    addToast(!settings.notifications[key] ? t('settings.notificationsEnabled') : t('settings.notificationsDisabled'), 'success');
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
    addToast(t('settings.privacyUpdated'), 'success');
  };

  const handleVolumeChange = (e) => {
    const volume = parseInt(e.target.value);
    setSettings(prev => ({
      ...prev,
      audio: {
        ...prev.audio,
        volume,
      },
    }));
  };

  const handlePasswordChange = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      return addToast(t('settings.fillAllFields'), 'error');
    }
    if (passwordData.new !== passwordData.confirm) {
      return addToast(t('settings.passwordsNoMatch'), 'error');
    }
    if (passwordData.new.length < 8) {
      return addToast(t('settings.passwordTooShort'), 'error');
    }
    
    addToast(t('settings.passwordUpdated'), 'success');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="glass-panel p-8 rounded-2xl text-center">
          <p className="text-gray-300">{t('settings.loginRequired')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Settings className="text-neon-purple" size={36} />
          {t('settings.title')}
        </h1>
        <p className="text-gray-400">{t('settings.subtitle')}</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">

        {/* Language Selection */}
        <div className="glass-panel p-6 rounded-xl animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="text-neon-cyan" size={20} /> {t('settings.language')}
          </h3>
          <div>
            <label className="text-sm text-gray-300 uppercase font-bold mb-3 block">{t('settings.selectLanguage')}</label>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                    language === lang.code
                      ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                      : 'border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="glass-panel p-6 rounded-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Bell className="text-neon-cyan" size={20} /> {t('settings.notifications')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10">
              <div>
                <p className="text-white font-semibold">{t('settings.emailNotifications')}</p>
                <p className="text-sm text-gray-400">{t('settings.emailNotificationsDesc')}</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('email')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-neon-cyan' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.email ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10">
              <div>
                <p className="text-white font-semibold">{t('settings.pushNotifications')}</p>
                <p className="text-sm text-gray-400">{t('settings.pushNotificationsDesc')}</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('push')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.push ? 'bg-neon-cyan' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.push ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10">
              <div>
                <p className="text-white font-semibold">{t('settings.royaltyAlerts')}</p>
                <p className="text-sm text-gray-400">{t('settings.royaltyAlertsDesc')}</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('royaltyAlerts')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.royaltyAlerts ? 'bg-neon-cyan' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.royaltyAlerts ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="glass-panel p-6 rounded-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="text-neon-purple" size={20} /> {t('settings.privacySecurity')}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-300 uppercase font-bold mb-2 block">{t('settings.profileVisibility')}</label>
              <div className="flex gap-3">
                <button
                  onClick={() => handlePrivacyChange('profileVisibility', 'public')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    settings.privacy.profileVisibility === 'public'
                      ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                      : 'border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  {t('settings.public')}
                </button>
                <button
                  onClick={() => handlePrivacyChange('profileVisibility', 'private')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    settings.privacy.profileVisibility === 'private'
                      ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                      : 'border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  {t('settings.private')}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10">
              <div>
                <p className="text-white font-semibold">{t('settings.showBalance')}</p>
                <p className="text-sm text-gray-400">{t('settings.showBalanceDesc')}</p>
              </div>
              <button
                onClick={() => handlePrivacyChange('showBalance', !settings.privacy.showBalance)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.privacy.showBalance ? 'bg-neon-cyan' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.privacy.showBalance ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10">
              <div>
                <p className="text-white font-semibold">{t('settings.twoFactorAuth')}</p>
                <p className="text-sm text-gray-400">{t('settings.twoFactorAuthDesc')}</p>
              </div>
              <button
                onClick={() => handlePrivacyChange('twoFactorAuth', !settings.privacy.twoFactorAuth)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.privacy.twoFactorAuth ? 'bg-neon-cyan' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.privacy.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Change Password */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Lock className="text-neon-purple" size={18} /> {t('settings.changePassword')}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-300 uppercase font-bold mb-1 block">{t('settings.currentPassword')}</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white pr-10 focus:border-neon-purple outline-none"
                      placeholder={t('settings.enterCurrentPassword')}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-300 uppercase font-bold mb-1 block">{t('settings.newPassword')}</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-purple outline-none"
                    placeholder={t('settings.enterNewPassword')}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 uppercase font-bold mb-1 block">{t('settings.confirmPassword')}</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-purple outline-none"
                    placeholder={t('settings.confirmNewPassword')}
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                >
                  {t('settings.updatePassword')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="glass-panel p-6 rounded-xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            {settings.audio.soundEffects ? (
              <Volume2 className="text-neon-purple" size={20} />
            ) : (
              <VolumeX className="text-neon-purple" size={20} />
            )}{' '}
            {t('settings.audio')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 border border-white/10">
              <div>
                <p className="text-white font-semibold">{t('settings.soundEffects')}</p>
                <p className="text-sm text-gray-400">{t('settings.soundEffectsDesc')}</p>
              </div>
              <button
                onClick={() => {
                  setSettings(prev => ({
                    ...prev,
                    audio: {
                      ...prev.audio,
                      soundEffects: !prev.audio.soundEffects,
                    },
                  }));
                  addToast(!settings.audio.soundEffects ? t('settings.soundEnabled') : t('settings.soundDisabled'), 'success');
                }}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.audio.soundEffects ? 'bg-neon-cyan' : 'bg-gray-600'
                }`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.audio.soundEffects ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {settings.audio.soundEffects && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-300 font-semibold">{t('settings.volume')}</label>
                  <span className="text-neon-cyan font-bold">{settings.audio.volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.audio.volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
