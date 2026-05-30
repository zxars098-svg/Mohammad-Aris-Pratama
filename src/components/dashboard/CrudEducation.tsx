import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { Education } from '../../types';
import { Plus, Edit, Trash2, Save, X, GraduationCap, Calendar, Search } from 'lucide-react';

export const CrudEducation: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>(() => dbService.getEducation());
  const [searchQuery, setSearchQuery] = useState('');

  // Form / Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institusi: '',
    jurusan: '',
    tahunMulai: '',
    tahunSelesai: '',
    deskripsi: ''
  });

  useEffect(() => {
    const handleUpdate = () => {
      setEducationList(dbService.getEducation());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      institusi: '',
      jurusan: '',
      tahunMulai: new Date().getFullYear().toString(),
      tahunSelesai: '',
      deskripsi: ''
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institusi: edu.institusi,
      jurusan: edu.jurusan,
      tahunMulai: edu.tahunMulai,
      tahunSelesai: edu.tahunSelesai,
      deskripsi: edu.deskripsi
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data pendidikan "${name}" dari database?`)) {
      dbService.deleteEducation(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institusi || !formData.jurusan || !formData.tahunMulai) {
      alert('Harap isi kolom wajib.');
      return;
    }

    if (editingId) {
      dbService.updateEducation(editingId, formData);
    } else {
      dbService.createEducation(formData);
    }
    setIsOpen(false);
  };

  const filteredEducation = educationList.filter((e) =>
    e.institusi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.jurusan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Kelola Edukasi
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kelola riwayat pendidikan, pelatihan, bootcamp, dan workshop Anda.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500 cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" />
          Tambah Edukasi Baru
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
          placeholder="Cari institusi atau program studi..."
          className="w-full rounded-xl border border-slate-200 bg-white/40 pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-white dark:focus:border-indigo-500"
        />
      </div>

      {/* Education List Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/50 bg-white/40 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="px-6 py-4">Institusi & Program</th>
              <th className="px-6 py-4">Periode Tahun</th>
              <th className="px-6 py-4">Deskripsi Singkat</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredEducation.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 dark:text-slate-500">
                  Tidak ada riwayat pendidikan ditemukan.
                </td>
              </tr>
            ) : (
              filteredEducation.map((edu) => (
                <tr key={edu.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-950/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {edu.institusi}
                        </span>
                        <span className="text-xs text-indigo-500 font-mono block mt-0.5">
                          {edu.jurusan}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {edu.tahunMulai} — {edu.tahunSelesai || 'Sekarang'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 max-w-sm">
                      {edu.deskripsi}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(edu)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                        title="Edit Edukasi"
                      >
                        <Edit className="h-4 w-4 text-indigo-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu.id, edu.institusi)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
                        title="Hapus Edukasi"
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
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {editingId ? 'Edit Riwayat Pendidikan' : 'Tambah Edukasi Baru'}
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
              {/* Institution */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Institusi / Penyelenggara *
                </label>
                <input
                  type="text"
                  value={formData.institusi}
                  onChange={(e) => setFormData((prev) => ({ ...prev, institusi: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                  placeholder="Contoh: Universitas Indonesia / Hacktiv8"
                  required
                />
              </div>

              {/* Major / Program */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Jurusan / Program Studi *
                </label>
                <input
                  type="text"
                  value={formData.jurusan}
                  onChange={(e) => setFormData((prev) => ({ ...prev, jurusan: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                  placeholder="Contoh: S1 Teknik Informatika"
                  required
                />
              </div>

              {/* Years */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Tahun Mulai *
                  </label>
                  <input
                    type="text"
                    value={formData.tahunMulai}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tahunMulai: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="Contoh: 2019"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Tahun Selesai (Kosongkan jika masih berjalan)
                  </label>
                  <input
                    type="text"
                    value={formData.tahunSelesai}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tahunSelesai: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="Contoh: 2023 atau Sekarang"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Deskripsi / Aktivitas & Pencapaian
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white resize-none"
                  placeholder="Ceritakan singkat mengenai mata kuliah utama, sertifikat kelulusan, atau pencapaian IPK..."
                />
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
                  Simpan Riwayat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
