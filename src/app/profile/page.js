"use client";
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '@/context/AppDataContext';
import { User, CreditCard, Shield, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import ProfilePictureButton from '@/components/ProfilePicture/ProfilePictureButton';
import { translations } from '@/utils/translations';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const { balance, setBalance, language } = useAppData();
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();
  const [withdrawing, setWithdrawing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const t = translations[language]?.profile || translations.en.profile;

  const handleWithdraw = () => {
    if (balance <= 0) return addToast("No funds to withdraw", "error");

    setWithdrawing(true);
    addToast("Initiating Blockchain Transfer...", "info");

    // Simulate Blockchain Delay
    setTimeout(() => {
      setBalance(0);
      setWithdrawing(false);
      addToast("0.45 ETH transferred to wallet!", "success");
      addToast("Transaction Hash: 0x89...21a", "info");
    }, 2500);
  };

  const handleSaveChanges = () => {
    if (!formData.name.trim()) {
      return addToast("Name cannot be empty", "error");
    }

    if (!formData.email.trim()) {
      return addToast("Email cannot be empty", "error");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return addToast("Please enter a valid email", "error");
    }

    updateUser({ name: formData.name, email: formData.email });
    setEditMode(false);
    addToast("Profile updated successfully!", "success");
  };

  const handleEditToggle = () => {
    if (!editMode) {
      setFormData({ name: user.name, email: user.email });
    }
    setEditMode(!editMode);
  };

  // Fake Wallet Address
  const walletAddress = "0x71C...92F";

  const handleCopy = () => {
    navigator.clipboard.writeText("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* 🟢 HERO PROFILE CARD */}
      <div className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 animate-fade-up">
        {/* Avatar Generator */}
        <ProfilePictureButton
          user={user}
          onUpdate={(newUrl) => updateUser({ profilePicture: newUrl })}
        />

        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-bold text-purple-950 dark:text-white">{user.name}</h1>
          <p className="text-gray-300">{user.email}</p>
          <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <span className="text-gray-300 text-sm">{t.wallet}</span>
            <span className="text-neon-cyan font-mono text-sm">{walletAddress}</span>
            <button onClick={handleCopy} className="text-purple-600 dark:text-gray-300 hover:text-purple-950 dark:hover:text-white transition-colors">
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs text-gray-300 uppercase">{t.availableBalance}</p>
            <p className="text-2xl font-bold text-neon-cyan">${balance.toFixed(2)}</p>
          </div>

          <button
            onClick={handleWithdraw}
            disabled={withdrawing || balance === 0}
            className="px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {withdrawing ? t.processing : t.withdraw}
          </button>
        </div>
      </div>

      {/* 🟢 SETTINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Account Details */}
        <div className="glass-panel p-6 rounded-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-purple-950 dark:text-white flex items-center gap-2">
              <User className="text-neon-purple" size={20} /> {t.accountDetails}
            </h3>
            <button
              onClick={handleEditToggle}
              className="text-xs px-3 py-1 rounded-lg border border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 transition-all"
            >
              {editMode ? t.cancel : t.edit}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-300 uppercase font-bold">{t.displayName}</label>
              <input
                type="text"
                value={editMode ? formData.name : user.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!editMode}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white mt-1 focus:border-neon-purple outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 uppercase font-bold">{t.email}</label>
              <input
                type="email"
                value={editMode ? formData.email : user.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!editMode}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white mt-1 focus:border-neon-purple outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-gray-400"
              />
            </div>
            {editMode && (
              <button
                onClick={handleSaveChanges}
                className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
              >
                {t.saveChanges}
              </button>
            )}
          </div>
        </div>

        {/* Payment & Security */}
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>

          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-xl font-bold text-purple-950 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="text-neon-cyan" size={20} /> {t.payoutMethod}
            </h3>
            <div className="flex items-center justify-between p-3 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-cyan flex items-center justify-center text-black font-bold">Ξ</div>
                <div>
                  <p className="text-sm font-bold text-purple-950 dark:text-white">{t.ethereumMainnet}</p>
                  <p className="text-xs text-neon-cyan font-semibold">{t.connected}</p>
                </div>
              </div>
              <button className="text-xs text-purple-600 dark:text-gray-300 hover:text-purple-950 dark:hover:text-white transition-colors">{t.change}</button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-red-900/30">
            <h3 className="text-xl font-bold text-purple-950 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="text-red-500" size={20} /> {t.dangerZone}
            </h3>
            <p className="text-sm text-gray-300 mb-4">{t.dangerDesc}</p>
            <button
              onClick={logout}
              className="w-full py-3 border border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all font-semibold"
            >
              {t.signOut}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}