import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Reveal } from '../Reveal';
import { dbService } from '../../services/db';
import { Testimonial } from '../../types';

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => dbService.getTestimonials());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(dbService.getTestimonials());
      setCurrentIndex(0); // Reset index on update to avoid out of bounds
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4.5 w-4.5 ${
          i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-800'
        }`}
      />
    ));
  };

  return (
    <section id="testimoni" className="relative py-24 overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
      {/* Glow effect */}
      <div className="absolute top-[40%] right-[10%] -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-500">
              REKOMENDASI & TESTIMONI
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Apa Kata Klien & Rekan Kerja
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-indigo-500" />
          </Reveal>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            Belum ada testimoni. Tambahkan melalui dashboard admin.
          </p>
        ) : (
          <div className="relative mx-auto max-w-4xl px-4 sm:px-12">
            {/* Quote Icon Background */}
            <div className="absolute -top-10 left-6 sm:left-12 opacity-5 dark:opacity-10 text-indigo-500">
              <Quote className="h-32 w-32 rotate-180" />
            </div>

            {/* Slider Content Wrapper */}
            <div className="relative overflow-hidden min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full text-center space-y-6"
                >
                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl mx-auto italic">
                    "{testimonials[currentIndex].isiTestimoni}"
                  </p>

                  {/* Author Meta */}
                  <div className="flex flex-col items-center gap-3 pt-4">
                    {/* Author Avatar */}
                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-indigo-500 shadow-md bg-slate-100 dark:bg-slate-800">
                      <img
                        src={testimonials[currentIndex].foto}
                        alt={testimonials[currentIndex].nama}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150';
                        }}
                      />
                    </div>
                    {/* Name & Job */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {testimonials[currentIndex].nama}
                      </h4>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                        {testimonials[currentIndex].jabatan}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Buttons */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/40 text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/40 text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
