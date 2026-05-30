import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Target, Eye, Compass } from 'lucide-react';
import { Reveal } from '../Reveal';
import { dbService } from '../../services/db';
import { Profile } from '../../types';

export const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(() => dbService.getProfile());

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(dbService.getProfile());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  return (
    <section id="tentang" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-500">
              TENTANG SAYA
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Lebih Dekat Dengan Saya
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-indigo-500" />
          </Reveal>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Bio Card */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <div className="relative rounded-2xl border border-slate-200/50 bg-white/40 p-8 shadow-xl backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Profil Singkat
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      Full-Stack Developer
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                  Saya adalah seorang software engineer yang bersemangat untuk memecahkan masalah kompleks melalui teknologi. Saya senang merancang aplikasi web modern yang tidak hanya fungsional secara teknis, tetapi juga memiliki desain visual yang elegan dan berorientasi pada pengguna.
                </p>
                <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dengan pengalaman mendalam dalam ekosistem JavaScript/TypeScript, saya fokus pada pengembangan backend yang tangguh, integrasi database yang efisien, dan antarmuka frontend yang responsif serta interaktif.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Vision & Goals */}
          <div className="lg:col-span-6 space-y-6">
            {/* Vision Card */}
            <Reveal delay={0.3}>
              <div className="group relative rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-md backdrop-blur-md transition-all hover:border-indigo-500/50 dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-indigo-500/40">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Visi Saya
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Menjadi katalisator inovasi digital dengan menciptakan perangkat lunak berkualitas premium, ramah pengguna, dan berkinerja tinggi yang mampu memberikan dampak positif nyata bagi bisnis maupun masyarakat luas.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Goals Card */}
            <Reveal delay={0.4}>
              <div className="group relative rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-md backdrop-blur-md transition-all hover:border-indigo-500/50 dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-indigo-500/40">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
                    <Target className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Misi & Tujuan
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Menerapkan standar rekayasa perangkat lunak terbaik (clean code, TDD, CI/CD), terus mempelajari teknologi mutakhir, serta berkolaborasi secara transparan dengan klien untuk melahirkan solusi digital yang melampaui ekspektasi.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
