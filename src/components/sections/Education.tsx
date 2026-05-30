import React, { useEffect, useState } from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { Reveal } from '../Reveal';
import { dbService } from '../../services/db';
import { Education as EducationType } from '../../types';

export const Education: React.FC = () => {
  const [educationList, setEducationList] = useState<EducationType[]>(() => dbService.getEducation());

  useEffect(() => {
    const handleUpdate = () => {
      setEducationList(dbService.getEducation());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  return (
    <section id="edukasi" className="relative py-24 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-[40%] right-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-500">
              EDUKASI & KUALIFIKASI
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Riwayat Pendidikan & Pelatihan
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-indigo-500" />
          </Reveal>
        </div>

        {/* Timeline Layout */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 top-0 h-full w-[2px] bg-slate-200 dark:bg-slate-800 sm:left-1/2 sm:-translate-x-1/2" />

          {educationList.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">
              Belum ada riwayat pendidikan. Tambahkan melalui dashboard admin.
            </p>
          ) : (
            <div className="space-y-12">
              {educationList.map((edu, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={edu.id} className="relative flex flex-col sm:flex-row sm:justify-between">
                    {/* Timeline Node Point */}
                    <div className="absolute left-4 top-1.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-50 bg-indigo-500 text-white shadow-md dark:border-slate-950 sm:left-1/2 sm:-translate-x-1/2">
                      <GraduationCap className="h-4 w-4" />
                    </div>

                    {/* Timeline Content Block */}
                    <div
                      className={`ml-12 sm:ml-0 sm:w-[45%] ${
                        isEven ? 'sm:text-right sm:order-1' : 'sm:order-2'
                      }`}
                    >
                      <Reveal delay={0.15 * index} yOffset={20}>
                        <div className="group relative rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-md backdrop-blur-md transition-all hover:border-indigo-500/50 dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-indigo-500/40">
                          {/* Year Badge */}
                          <div
                            className={`inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 mb-3 ${
                              isEven ? 'sm:flex-row-reverse' : ''
                            }`}
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {edu.tahunMulai} — {edu.tahunSelesai || 'Sekarang'}
                            </span>
                          </div>

                          {/* Institution & Major */}
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">
                            {edu.institusi}
                          </h3>
                          <p className="text-sm font-bold text-indigo-500 font-mono mt-1">
                            {edu.jurusan}
                          </p>

                          {/* Description */}
                          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            {edu.deskripsi}
                          </p>
                        </div>
                      </Reveal>
                    </div>

                    {/* Empty spacer for grid alignment on desktop */}
                    <div className="hidden sm:block sm:w-[45%] sm:order-2" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Additional Qualifications / Certificates Subsection */}
        <Reveal delay={0.4}>
          <div className="mt-20 mx-auto max-w-4xl rounded-2xl border border-dashed border-slate-200 bg-white/10 p-8 text-center dark:border-slate-800 dark:bg-slate-900/10">
            <div className="flex justify-center mb-4">
              <Award className="h-10 w-10 text-indigo-500 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Sertifikasi & Workshop Tambahan
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Saya secara aktif mengikuti berbagai sertifikasi industri dari AWS, Google Cloud, Vercel, dan freeCodeCamp untuk terus mengasah keterampilan dan mengadopsi standar pengembangan web terbaru.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
