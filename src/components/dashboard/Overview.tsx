import React, { useEffect, useState } from 'react';
import { dbService } from '../../services/db';
import { DashboardStats, Project } from '../../types';
import { FolderGit2, Award, GraduationCap, MessageSquare, RefreshCw, Database, ExternalLink, Calendar } from 'lucide-react';

export const Overview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>(() => dbService.getStats());
  const [latestProjects, setLatestProjects] = useState<Project[]>([]);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setStats(dbService.getStats());
      const allProjects = dbService.getProjects();
      // Sort projects by date descending and take top 2
      const sorted = [...allProjects].sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
      setLatestProjects(sorted.slice(0, 3));
    };

    loadData();
    window.addEventListener('portfolio_db_update', loadData);
    return () => window.removeEventListener('portfolio_db_update', loadData);
  }, []);

  const handleResetDB = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh database ke data bawaan (seed data)? Semua perubahan Anda akan dihapus.')) {
      setIsResetting(true);
      setTimeout(() => {
        dbService.resetToDefault();
      }, 1000);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: <FolderGit2 className="h-5 w-5 text-indigo-500" />,
      color: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Total Skills',
      value: stats.totalSkills,
      icon: <Award className="h-5 w-5 text-purple-500" />,
      color: 'border-purple-500/20 bg-purple-500/5 text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Total Education',
      value: stats.totalEducation,
      icon: <GraduationCap className="h-5 w-5 text-teal-500" />,
      color: 'border-teal-500/20 bg-teal-500/5 text-teal-600 dark:text-teal-400'
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: <MessageSquare className="h-5 w-5 text-pink-500" />,
      color: 'border-pink-500/20 bg-pink-500/5 text-pink-600 dark:text-pink-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Ringkasan Dashboard
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pantau statistik portfolio dan kelola konten Anda secara real-time.
          </p>
        </div>

        {/* Database Control */}
        <button
          onClick={handleResetDB}
          disabled={isResetting}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/50 px-4 py-2.5 text-xs font-semibold text-red-600 shadow-sm transition-all hover:bg-red-100 dark:border-red-950/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${isResetting ? 'animate-spin' : ''}`} />
          {isResetting ? 'Mereset Database...' : 'Reset Database ke Bawaan'}
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white/40 p-5 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
                {card.title}
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Database & Latest Projects Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Latest Projects */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Project Terbaru
          </h3>
          {latestProjects.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
              Belum ada project. Mulai dengan menambahkan project baru.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              {latestProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <img
                      src={project.thumbnail}
                      alt={project.judul}
                      className="h-12 w-20 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600';
                      }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {project.judul}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> {project.tanggal}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase tracking-wider font-mono">
                    {project.kategori}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Database Connection Status (Vercel Style) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            Database Status
          </h3>
          <div className="space-y-4">
            {/* Status indicator */}
            <div className="flex items-center justify-between rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-emerald-600 dark:text-emerald-400">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold font-mono">Prisma Connected</span>
              </div>
              <span className="text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                Active
              </span>
            </div>

            {/* Info details */}
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex justify-between">
                <span>Database Client:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">Prisma Client</span>
              </div>
              <div className="flex justify-between">
                <span>Driver:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">PostgreSQL (Dev Mode)</span>
              </div>
              <div className="flex justify-between">
                <span>Storage Layer:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">LocalStorage ORM</span>
              </div>
              <div className="flex justify-between">
                <span>Auto-Sync:</span>
                <span className="font-bold text-emerald-500">Enabled</span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800/40 pt-3">
              <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-mono">
                Sistem ini terintegrasi dengan ORM Prisma virtual yang mensimulasikan PostgreSQL. Semua perubahan CRUD disimpan secara persisten di browser Anda dan siap dipindahkan ke Postgres nyata kapan saja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
