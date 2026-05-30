import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, Layers, Calendar } from 'lucide-react';
import { Reveal } from '../Reveal';
import { dbService } from '../../services/db';
import { Project } from '../../types';

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => dbService.getProjects());
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(dbService.getProjects());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  // Preferred category order for Portfolio
  const preferredCategories = [
    'Semua',
    'Web Application',
    'AI & Automation',
    'E-Commerce',
    'Mobile Application',
  ];
  const extraCategories = Array.from(new Set(projects.map((p) => p.kategori))).filter(
    (category) => !preferredCategories.includes(category),
  );
  const categories = [...preferredCategories, ...extraCategories];

  // Filter projects
  const filteredProjects =
    activeCategory === 'Semua'
      ? projects
      : projects.filter((p) => p.kategori === activeCategory);

  // Sort featured projects first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[30%] left-[10%] -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] -z-10 h-[300px] w-[300px] rounded-full bg-pink-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-12 flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-500">
              PORTFOLIO SAYA
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Project Pilihan Terbaik
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-indigo-500" />
          </Reveal>
        </div>

        {/* Category Tabs */}
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

        {/* Grid Layout */}
        {sortedProjects.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            Belum ada project di kategori ini. Tambahkan melalui dashboard admin.
          </p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {sortedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white/40 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5 dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-indigo-500/40"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        <Star className="h-3.5 w-3.5 fill-white" />
                        <span>Featured</span>
                      </div>
                    )}

                    <img
                      src={project.thumbnail}
                      alt={project.judul}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600';
                      }}
                    />
                    
                    {/* Hover Overlay with Tech Stack (vibe Linear/Apple) */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-4">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-110"
                          title="Lihat Demo"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                      {project.repository_url && (
                        <a
                          href={project.repository_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-110"
                          title="Lihat Repository"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-mono mb-3">
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                        <Layers className="h-3.5 w-3.5" />
                        {project.kategori}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {project.tanggal}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-500 transition-colors">
                      {project.judul}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {project.deskripsi}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                      {project.teknologi.split(',').map((tech) => (
                        <span
                          key={tech.trim()}
                          className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 font-mono"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
