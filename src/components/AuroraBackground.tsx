import React from 'react';
import { motion } from 'framer-motion';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-50 transition-colors duration-500 dark:bg-[#030712]">
      {/* Animated Aurora Glows */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/30 blur-[120px] dark:bg-indigo-600/20"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px] dark:bg-purple-600/15"
        />
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 30, -50, 0],
            scale: [1, 1.1, 0.8, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[10%] left-[20%] h-[550px] w-[550px] rounded-full bg-teal-500/25 blur-[120px] dark:bg-teal-600/15"
        />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
      />
    </div>
  );
};
