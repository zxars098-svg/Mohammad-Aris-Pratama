import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Wrench, Layers, Cpu } from 'lucide-react';
import { Reveal } from '../Reveal';
import { dbService } from '../../services/db';
import { Skill } from '../../types';

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(() => dbService.getSkills());
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  useEffect(() => {
    const handleUpdate = () => {
      setSkills(dbService.getSkills());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  // Preferred category order for Skills
  const preferredCategories = ['Semua', 'Frontend', 'Backend', 'Tools'];
  const extraCategories = Array.from(new Set(skills.map((s) => s.kategori))).filter(
    (category) => !preferredCategories.includes(category),
  );
  const categories = [...preferredCategories, ...extraCategories];

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === 'Semua'
      ? skills
      : skills.filter((s) => s.kategori === activeCategory);

  // Map category names to icons
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code className="h-5 w-5 text-indigo-500" />;
      case 'backend':
        return <Server className="h-5 w-5 text-purple-500" />;
      case 'tools':
      case 'devops':
        return <Wrench className="h-5 w-5 text-teal-500" />;
      default:
        return <Cpu className="h-5 w-5 text-pink-500" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
      {/* Decorative Blur */}
      <div className="absolute top-[20%] left-0 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-12 flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-500">
              KEAHLIAN TEKNIS
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Teknologi Yang Saya Kuasai
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-indigo-500" />
          </Reveal>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-center overflow-x-auto pb-2">
            <div className="flex flex-nowrap gap-2">
              {categories.map((category, index) => (
                <Reveal key={category} delay={0.05 * index}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      activeCategory === category
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'border border-slate-200 bg-white/40 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    {category}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            Belum ada keahlian di kategori ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-indigo-500/40"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/80">
                      {getCategoryIcon(skill.kategori)}
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {skill.nama}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-400/5 px-2.5 py-1 rounded-md">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>

                {/* Category label */}
                <div className="mt-3 text-right">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 font-mono">
                    {skill.kategori}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
