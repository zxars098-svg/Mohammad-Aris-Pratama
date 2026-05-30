import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, Briefcase, Award, Zap, Code } from 'lucide-react';
import { dbService } from '../../services/db';
import { Profile } from '../../types';

export const Hero: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(() => dbService.getProfile());
  const [projectsCount, setProjectsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);

  // Typing animation roles
  const roles = [
    'Full-Stack Developer',
    'Next.js Specialist',
    'UI/UX Enthusiast',
    'Cloud Architect'
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(dbService.getProfile());
      setProjectsCount(dbService.getProjects().length);
      setSkillsCount(dbService.getSkills().length);
    };
    
    // Initial counts
    setProjectsCount(dbService.getProjects().length);
    setSkillsCount(dbService.getSkills().length);

    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  // Typing effect logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && currentText === activeRole) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting ? prev.substring(0, prev.length - 1) : activeRole.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Side: Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-600 dark:border-indigo-400/20 dark:bg-indigo-400/5 dark:text-indigo-400"
            >
              <Zap className="h-3.5 w-3.5 animate-pulse" />
              Available for Freelance & Full-time
            </motion.div>

            {/* Greeting */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-lg font-medium tracking-wide text-slate-500 dark:text-slate-400 font-mono"
            >
              Halo, saya {profile.nama} 👋
            </motion.h3>

            {/* Title with Typing Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white"
            >
              Membangun Solusi{' '}
              <span className="block h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2">
                {currentText}
                <span className="animate-blink ml-1">|</span>
              </span>
            </motion.h1>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl"
            >
              {profile.bio}
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => handleScrollTo('kontak')}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                Hubungi Saya
              </button>
              <button
                onClick={() => handleScrollTo('portfolio')}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/40 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 hover:scale-[1.02] cursor-pointer"
              >
                <Briefcase className="h-4 w-4 text-indigo-500" />
                Lihat Portfolio
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </button>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/50 dark:border-slate-800/40 max-w-lg"
            >
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  5+
                </div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Tahun Pengalaman
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                  {projectsCount}+
                </div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Project Selesai
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-pink-600 dark:text-pink-400">
                  {skillsCount}+
                </div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Keahlian Teknis
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Profile Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
              className="relative flex h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] items-center justify-center"
            >
              {/* Outer Glowing Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-2xl animate-pulse" />
              
              {/* Spinning Decorative Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-indigo-500/40 dark:border-indigo-400/30"
              />

              {/* Profile Image Container */}
              <div className="relative h-[270px] w-[270px] sm:h-[340px] sm:w-[340px] overflow-hidden rounded-full border-4 border-white shadow-2xl dark:border-slate-900 bg-slate-100 dark:bg-slate-800">
                <img
                  src={profile.foto}
                  alt={profile.nama}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    // Fallback image if source fails
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600';
                  }}
                />
              </div>

              {/* Small Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/85 shadow-lg backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/85"
              >
                <Code className="h-5 w-5 text-indigo-500" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 right-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/85 shadow-lg backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/85"
              >
                <Award className="h-5 w-5 text-purple-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
