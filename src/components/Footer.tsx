import React, { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { dbService } from '../services/db';
import { Profile } from '../types';

export const Footer: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(() => dbService.getProfile());

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(dbService.getProfile());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 bg-white/30 pt-16 pb-12 backdrop-blur-md dark:border-slate-900 dark:bg-slate-950/30">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left Column - Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-black tracking-wider text-transparent">
                {profile.nama.split(' ')[0]}
              </span>
              <span className="font-mono text-xs tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                .DEV
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              {profile.bio.substring(0, 150)}...
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/50 text-slate-600 transition-all hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/50 text-slate-600 transition-all hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {profile.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/50 text-slate-600 transition-all hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Middle Column - Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Kontak Saya
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-indigo-500 shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-indigo-500 transition-colors">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-indigo-500 shrink-0" />
                <a href={`tel:${profile.telepon}`} className="hover:text-indigo-500 transition-colors">
                  {profile.telepon}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
                <span>{profile.alamat}</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Navigation Links & Back to Top */}
          <div className="flex flex-col justify-between items-start md:items-end">
            <div className="space-y-2 text-left md:text-right">
              <p className="text-xs font-mono text-slate-400 dark:text-slate-500">
                TEKNOLOGI PRESTASI
              </p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                React 19 • Tailwind v4 • Framer Motion
              </p>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white/50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            >
              Back To Top
              <ArrowUp className="h-3.5 w-3.5 text-indigo-500" />
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 text-center text-xs text-slate-400 dark:border-slate-900 dark:text-slate-500">
          <p>© {new Date().getFullYear()} {profile.nama}. All rights reserved. Designed with precision.</p>
        </div>
      </div>
    </footer>
  );
};
