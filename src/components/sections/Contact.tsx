import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Instagram } from 'lucide-react';
import { Reveal } from '../Reveal';
import { dbService } from '../../services/db';
import { Profile } from '../../types';

export const Contact: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(() => dbService.getProfile());
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(dbService.getProfile());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Semua kolom form wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate API submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Gagal mengirim pesan. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="relative py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-0 -z-10 h-[350px] w-[350px] rounded-full bg-indigo-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-500">
              HUBUNGI SAYA
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Mari Berkolaborasi Bersama
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-indigo-500" />
          </Reveal>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.2}>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Informasi Kontak
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                  Apakah Anda memiliki project menarik, tawaran pekerjaan, atau sekadar ingin berdiskusi? Jangan ragu untuk mengirim pesan! Saya akan merespon secepat mungkin.
                </p>
              </div>
            </Reveal>

            {/* Info Cards */}
            <div className="space-y-4 pt-4">
              <Reveal delay={0.3}>
                <div className="flex items-center gap-4 rounded-xl border border-slate-200/50 bg-white/40 p-4 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                      Email
                    </h4>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-500 transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-center gap-4 rounded-xl border border-slate-200/50 bg-white/40 p-4 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                      Telepon
                    </h4>
                    <a
                      href={`tel:${profile.telepon}`}
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-500 transition-colors"
                    >
                      {profile.telepon}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex items-center gap-4 rounded-xl border border-slate-200/50 bg-white/40 p-4 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                      Lokasi Alamat
                    </h4>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {profile.alamat}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.3}>
              <div className="relative rounded-2xl border border-slate-200/50 bg-white/40 p-8 shadow-xl backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Pesan Berhasil Dikirim!
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                      Terima kasih telah menghubungi saya. Saya akan meninjau pesan Anda dan segera membalasnya.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-500 cursor-pointer"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/20 dark:text-red-400 border border-red-200 dark:border-red-900/30">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Masukkan nama Anda"
                          className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-950"
                          required
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                          Alamat Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nama@email.com"
                          className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-950"
                          required
                        />
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                        Pesan Anda
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tuliskan pesan Anda secara detail di sini..."
                        rows={5}
                        className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-950 resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sedang Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Kirim Pesan
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
