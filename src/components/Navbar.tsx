import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', href: 'beranda' },
    { label: 'Tentang', href: 'tentang' },
    { label: 'Edukasi', href: 'edukasi' },
    { label: 'Skills', href: 'skills' },
    { label: 'Portfolio', href: 'portfolio' },
    { label: 'Testimoni', href: 'testimoni' },
    { label: 'Kontak', href: 'kontak' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (isHomePage) {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/#${href}`);
    }
  };

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 w-[92%] max-w-7xl -translate-x-1/2 rounded-2xl transition-all duration-300 ${
        isScrolled
          ? 'border border-slate-200/40 bg-white/70 shadow-lg backdrop-blur-xl dark:border-slate-800/40 dark:bg-slate-950/70'
          : 'border border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-black tracking-wider text-transparent">
            R
          </span>
          <span className="font-mono text-xs tracking-widest text-slate-400 dark:text-slate-500 font-bold hidden sm:inline">
            .DEV
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Admin Dashboard / Login Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
                title="Logout Admin"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Lock className="h-4 w-4" />
              Admin Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/10 text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-200 bg-white/95 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/95 lg:hidden rounded-b-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full py-2 text-left text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-semibold text-white shadow-md"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard Admin
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar Admin
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300"
                >
                  <Lock className="h-4 w-4" />
                  Admin Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
