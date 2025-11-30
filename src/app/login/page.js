"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return addToast("All fields are required", "error");
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(formData.email, formData.password);
      setLoading(false);

      if (!result.success) {
        addToast(result.message, "error");
      } else {
        addToast("Welcome back!", "success");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 animate-grid opacity-20 z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-[80px] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl border-t border-white/10 animate-fade-up">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-950 dark:text-white">Welcome Back</h2>
          <p className="text-purple-700 dark:text-gray-400 mt-2 text-sm">Access your Artist Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-xs font-bold text-purple-700 dark:text-gray-500 uppercase mb-1">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-purple-500 dark:text-gray-500" size={18} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white dark:bg-black/40 border border-purple-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-purple-950 dark:text-white placeholder-purple-300 dark:placeholder-gray-600 focus:border-neon-cyan outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-purple-700 dark:text-gray-500 uppercase mb-1">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-purple-500 dark:text-gray-500" size={18} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white dark:bg-black/40 border border-purple-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-purple-950 dark:text-white placeholder-purple-300 dark:placeholder-gray-600 focus:border-neon-cyan outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full relative overflow-hidden bg-purple-600 hover:bg-purple-700 dark:bg-white text-white dark:text-black font-bold py-4 rounded-lg dark:hover:bg-gray-200 transition-all duration-300"
          >
            <span className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              Log In <ArrowRight size={20} />
            </span>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account? <Link href="/register" className="text-purple-600 dark:text-neon-cyan hover:text-purple-800 dark:hover:text-white transition-colors">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
