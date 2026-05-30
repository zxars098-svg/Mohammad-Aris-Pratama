import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowLeft, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const { login, isAuthenticated, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Silakan isi seluruh kolom email dan password.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
      {/* Decorative Aurora Background */}
      <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-[#030712] transition-colors duration-500" />
      <div className="absolute top-[20%] left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-600/10" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/40 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4 text-indigo-500" />
          Kembali ke Beranda
        </Link>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md rounded-2xl border border-slate-200/50 bg-white/40 p-8 shadow-2xl backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Login Admin Portfolio
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Akses dashboard kontrol portfolio premium Anda.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {(localError || error) && (
            <div className="rounded-lg bg-red-50 p-4 text-xs text-red-600 dark:bg-red-950/20 dark:text-red-400 border border-red-200 dark:border-red-900/30">
              {localError || error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
              Alamat Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white/50 pl-10 pr-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-950"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-white/50 pl-10 pr-10 py-3 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-950"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Mengotentikasi...
              </>
            ) : (
              'Masuk Sebagai Admin'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
