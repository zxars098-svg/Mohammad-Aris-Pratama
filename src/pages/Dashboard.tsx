import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Award,
  GraduationCap,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  Settings,
  Database
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Overview } from '../components/dashboard/Overview';
import { CrudProfile } from '../components/dashboard/CrudProfile';
import { CrudProjects } from '../components/dashboard/CrudProjects';
import { CrudSkills } from '../components/dashboard/CrudSkills';
import { CrudEducation } from '../components/dashboard/CrudEducation';
import { CrudTestimonials } from '../components/dashboard/CrudTestimonials';

type TabType = 'overview' | 'profile' | 'projects' | 'skills' | 'education' | 'testimonials';

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Protected route check
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="font-mono text-sm tracking-widest text-slate-400">MEMUAT SESSION ADMIN...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const menuItems = [
    { id: 'overview', label: 'Ringkasan', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'profile', label: 'Kelola Profil', icon: <User className="h-5 w-5" /> },
    { id: 'projects', label: 'Kelola Projects', icon: <FolderGit2 className="h-5 w-5" /> },
    { id: 'skills', label: 'Kelola Skills', icon: <Award className="h-5 w-5" /> },
    { id: 'education', label: 'Kelola Edukasi', icon: <GraduationCap className="h-5 w-5" /> },
    { id: 'testimonials', label: 'Kelola Testimoni', icon: <MessageSquare className="h-5 w-5" /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'profile':
        return <CrudProfile />;
      case 'projects':
        return <CrudProjects />;
      case 'skills':
        return <CrudSkills />;
      case 'education':
        return <CrudEducation />;
      case 'testimonials':
        return <CrudTestimonials />;
      default:
        return <Overview />;
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari sesi admin?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-[#030712] dark:text-slate-100 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-900/40 backdrop-blur-md shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200/50 dark:border-slate-800/40">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-black tracking-wider text-transparent">
              R
            </span>
            <span className="font-mono text-xs tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              .ADMIN
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Profile Card */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/40 space-y-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {user?.name || 'Admin'}
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                {user?.email || 'admin@portfolio.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Keluar Sesi Admin
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Panel */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[2000] flex lg:hidden">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative flex flex-col w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-black text-transparent">
                R.ADMIN
              </span>
              <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Keluar Sesi Admin
              </button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200/50 bg-white/40 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Path indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 font-bold">
              <span>ADMIN</span>
              <span>/</span>
              <span className="text-indigo-500 uppercase">{activeTab}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ExternalLink className="h-3.5 w-3.5 text-indigo-500" />
              Lihat Website
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};
