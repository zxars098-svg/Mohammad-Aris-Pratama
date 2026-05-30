import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Education } from '../components/sections/Education';
import { Skills } from '../components/sections/Skills';
import { Portfolio } from '../components/sections/Portfolio';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  // Handle hash scroll on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 transition-colors duration-500 selection:bg-indigo-500/30 dark:bg-slate-950 dark:text-slate-100">
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 mx-auto max-w-7xl">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      {/* Premium Footer */}
      <Footer />
    </div>
  );
};
