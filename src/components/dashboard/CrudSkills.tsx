import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { Skill } from '../../types';
import { Plus, Edit, Trash2, Save, X, Award, Percent, Search } from 'lucide-react';

export const CrudSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(() => dbService.getSkills());
  const [searchQuery, setSearchQuery] = useState('');

  // Form / Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    nama: '',
    kategori: 'Frontend',
    level: 80
  });

  useEffect(() => {
    const handleUpdate = () => {
      setSkills(dbService.getSkills());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      nama: '',
      kategori: 'Frontend',
      level: 80
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      nama: skill.nama,
      kategori: skill.kategori,
      level: skill.level
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus skill "${name}" dari database?`)) {
      dbService.deleteSkill(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || formData.level < 0 || formData.level > 100) {
      alert('Harap isi kolom dengan benar (Level 0-100).');
      return;
    }

    if (editingId) {
      dbService.updateSkill(editingId, formData);
    } else {
      dbService.createSkill(formData);
    }
    setIsOpen(false);
  };

  const filteredSkills = skills.filter((s) =>
    s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Kelola Skills
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kelola daftar keahlian teknologi dan tingkat kemahiran Anda.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500 cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" />
          Tambah Skill Baru
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari skill berdasarkan nama atau kategori..."
          className="w-full rounded-xl border border-slate-200 bg-white/40 pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-white dark:focus:border-indigo-500"
        />
      </div>

      {/* Skills Table List */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/50 bg-white/40 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="px-6 py-4">Nama Skill</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Kemahiran (Level)</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredSkills.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 dark:text-slate-500">
                  Tidak ada skill ditemukan.
                </td>
              </tr>
            ) : (
              filteredSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-950/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                        <Award className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {skill.nama}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {skill.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 max-w-[200px]">
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          style={{ width: `${skill.level}%` }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 shrink-0">
                        {skill.level}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                        title="Edit Skill"
                      >
                        <Edit className="h-4 w-4 text-indigo-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id, skill.nama)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
                        title="Hapus Skill"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {editingId ? 'Edit Skill' : 'Tambah Skill Baru'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Skill Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Nama Skill *
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                  placeholder="Contoh: React / Next.js"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Kategori Skill *
                  </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData((prev) => ({ ...prev, kategori: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:bg-slate-900"
                  required
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Tools">Tools</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              {/* Skill level slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Tingkat Kemahiran (Level) *
                  </label>
                  <span className="font-mono text-sm font-bold text-indigo-500">
                    {formData.level}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData((prev) => ({ ...prev, level: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500 cursor-pointer"
                >
                  <Save className="h-4.5 w-4.5" />
                  Simpan Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
