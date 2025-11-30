"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return addToast("All fields are required", "error");
    }

    if (formData.password.length < 6) {
      return addToast("Password must be at least 6 characters", "error");
    }

    setLoading(true);

    // Simulate API delay for dramatic effect
    setTimeout(() => {
      const result = register(formData.name, formData.email, formData.password);
      setLoading(false);

      if (!result.success) {
        addToast(result.message, "error");
      } else {
        addToast("Account created successfully!", "success");
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
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900 dark:from-neon-purple dark:to-neon-cyan">
            Join Harmoniq
          </h2>
          <p className="text-purple-700 dark:text-gray-400 mt-2 text-sm">Create your Artist Identity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="group">
            <label className="block text-xs font-bold text-purple-700 dark:text-gray-500 uppercase mb-1 tracking-widest group-focus-within:text-purple-600 dark:group-focus-within:text-neon-cyan transition-colors">
              Artist Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-purple-500 dark:text-gray-500 group-focus-within:text-purple-600 dark:group-focus-within:text-neon-cyan transition-colors" size={18} />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white dark:bg-black/40 border border-purple-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-purple-950 dark:text-white placeholder-purple-300 dark:placeholder-gray-600 focus:outline-none focus:border-purple-500 dark:focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                placeholder="Ex. The Weeknd"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="block text-xs font-bold text-purple-700 dark:text-gray-500 uppercase mb-1 tracking-widest group-focus-within:text-purple-600 dark:group-focus-within:text-neon-purple transition-colors">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-purple-500 dark:text-gray-500 group-focus-within:text-purple-600 dark:group-focus-within:text-neon-purple transition-colors" size={18} />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white dark:bg-black/40 border border-purple-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-purple-950 dark:text-white placeholder-purple-300 dark:placeholder-gray-600 focus:outline-none focus:border-purple-500 dark:focus:border-neon-purple focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="block text-xs font-bold text-purple-700 dark:text-gray-500 uppercase mb-1 tracking-widest group-focus-within:text-purple-600 dark:group-focus-within:text-neon-cyan transition-colors">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-purple-500 dark:text-gray-500 group-focus-within:text-purple-600 dark:group-focus-within:text-neon-cyan transition-colors" size={18} />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white dark:bg-black/40 border border-purple-200 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-purple-950 dark:text-white placeholder-purple-300 dark:placeholder-gray-600 focus:outline-none focus:border-purple-500 dark:focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button
            disabled={loading}
            className="w-full relative overflow-hidden group bg-purple-600 hover:bg-purple-700 dark:bg-gradient-to-r dark:from-neon-purple dark:to-neon-cyan text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              Initialize Dashboard <ArrowRight size={20} />
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
          Already have an account? <Link href="/login" className="text-purple-600 dark:text-white hover:text-purple-800 dark:hover:text-neon-cyan transition-colors font-semibold">Log In</Link>
        </p>
      </div>
    </div>
  );
}