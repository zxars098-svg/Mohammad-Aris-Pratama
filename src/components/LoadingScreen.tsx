import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 500); // Small delay for smooth transition
          return 100;
        }
        // Random increment for realistic load feel
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-slate-950 text-white"
        >
          {/* Glowing Background Accent */}
          <div className="absolute h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-black text-transparent">
                R
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg font-medium tracking-widest text-slate-400 uppercase"
            >
              MOHAMMAD ARIS PRATAMA
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-1 text-xs tracking-wider text-slate-500"
            >
              PORTFOLIO DEVELOPER PREMIUM
            </motion.p>

            {/* Progress Bar Container */}
            <div className="mt-12 h-[2px] w-64 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage Text */}
            <span className="mt-4 font-mono text-sm text-indigo-400 font-bold">
              {progress}%
            </span>
          </div>

          {/* Footer details */}
          <div className="absolute bottom-8 text-center text-xs tracking-widest text-slate-600">
            © {new Date().getFullYear()} • DESIGNED FOR EXCELLENCE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
