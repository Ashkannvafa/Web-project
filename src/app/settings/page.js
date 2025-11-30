"use client";
import { Settings as SettingsIcon, Bell, Shield, User, Wallet, Globe } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';
import { translations } from '@/utils/translations';

export default function SettingsPage() {
    const { language, setLanguage, theme, toggleTheme } = useAppData();
    const { user } = useAuth();
    const t = translations[language]?.settings || translations.en.settings;

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] p-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-neon-purple/10 rounded-xl border border-neon-purple/20">
                        <SettingsIcon className="text-neon-purple" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-purple-700 to-violet-600 dark:from-white dark:to-gray-400">
                        {user ? t.title : 'Preferences'}
                    </h1>
                </div>

                <div className="grid gap-6">
                    {/* Preferences */}
                    <section className="glass-panel rounded-2xl p-6 hover:border-neon-purple/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="text-neon-cyan" size={24} />
                            <h2 className="text-xl font-semibold">{t.preferences}</h2>
                        </div>
                        <p className="text-purple-700 dark:text-gray-400 mb-4">{t.preferencesDesc}</p>

                        {/* Language Selector */}
                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-black/20 rounded-lg border border-purple-200 dark:border-white/5 mb-3">
                            <span className="text-purple-800 dark:text-gray-300">{t.language}</span>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-white dark:bg-black/40 border border-purple-300 dark:border-white/10 rounded-lg px-3 py-1.5 text-purple-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors shadow-sm"
                            >
                                <option value="en">English (US)</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="ja">日本語</option>
                            </select>
                        </div>

                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-black/20 rounded-lg border border-purple-200 dark:border-white/5">
                            <span className="text-purple-800 dark:text-gray-300">Appearance</span>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-black/40 border border-purple-300 dark:border-white/10 rounded-lg text-purple-900 dark:text-white hover:border-neon-purple hover:shadow-md transition-all shadow-sm"
                            >
                                {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                            </button>
                        </div>
                    </section>

                    {/* Only show these sections if user is logged in */}
                    {user && (
                        <>
                            {/* Account Settings */}
                            <section className="glass-panel rounded-2xl p-6 hover:border-neon-purple/30 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <User className="text-neon-cyan" size={24} />
                                    <h2 className="text-xl font-semibold">{t.account}</h2>
                                </div>
                                <p className="text-purple-700 dark:text-gray-400 mb-4">{t.accountDesc}</p>
                                <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg border border-purple-300 dark:border-white/10 transition-all text-purple-900 dark:text-white shadow-sm hover:shadow-md">
                                    {t.editProfile}
                                </button>
                            </section>

                            {/* Notifications */}
                            <section className="glass-panel rounded-2xl p-6 hover:border-neon-purple/30 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <Bell className="text-neon-cyan" size={24} />
                                    <h2 className="text-xl font-semibold">{t.notifications}</h2>
                                </div>
                                <p className="text-purple-700 dark:text-gray-400 mb-4">{t.notificationsDesc}</p>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-neon-purple focus:ring-neon-purple" defaultChecked />
                                        <span className="text-gray-700 dark:text-gray-300">{t.emailNotif}</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-neon-purple focus:ring-neon-purple" />
                                        <span className="text-gray-700 dark:text-gray-300">{t.pushNotif}</span>
                                    </label>
                                </div>
                            </section>

                            {/* Security */}
                            <section className="glass-panel rounded-2xl p-6 hover:border-neon-purple/30 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="text-neon-cyan" size={24} />
                                    <h2 className="text-xl font-semibold">{t.security}</h2>
                                </div>
                                <p className="text-purple-700 dark:text-gray-400 mb-4">{t.securityDesc}</p>
                                <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg border border-purple-300 dark:border-white/10 transition-all text-purple-900 dark:text-white shadow-sm hover:shadow-md">
                                    {t.changePassword}
                                </button>
                            </section>

                            {/* Payment Methods */}
                            <section className="glass-panel rounded-2xl p-6 hover:border-neon-purple/30 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <Wallet className="text-neon-cyan" size={24} />
                                    <h2 className="text-xl font-semibold">{t.payment}</h2>
                                </div>
                                <p className="text-purple-700 dark:text-gray-400 mb-4">{t.paymentDesc}</p>
                                <button className="px-4 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg border border-purple-300 dark:border-white/10 transition-all text-purple-900 dark:text-white shadow-sm hover:shadow-md">
                                    {t.manageWallets}
                                </button>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
