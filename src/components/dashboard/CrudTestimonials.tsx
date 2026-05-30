import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { Testimonial } from '../../types';
import { Plus, Edit, Trash2, Save, X, Star, MessageSquare, Upload, Grid, Search } from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',  // Female PM
  'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150',// Male Tech Lead
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',  // Male CEO
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',  // Female Designer
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',// Male Engineer
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'   // Female Client
];

export const CrudTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => dbService.getTestimonials());
  const [searchQuery, setSearchQuery] = useState('');

  // Form / Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    nama: '',
    jabatan: '',
    foto: PRESET_AVATARS[0],
    rating: 5,
    isiTestimoni: ''
  });

  const [uploading, setUploading] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(dbService.getTestimonials());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      nama: '',
      jabatan: '',
      foto: PRESET_AVATARS[0],
      rating: 5,
      isiTestimoni: ''
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      nama: testimonial.nama,
      jabatan: testimonial.jabatan,
      foto: testimonial.foto,
      rating: testimonial.rating,
      isiTestimoni: testimonial.isiTestimoni
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus testimoni dari "${name}" dari database?`)) {
      dbService.deleteTestimonial(id);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      alert('Ukuran file foto terlalu besar. Maksimal 1MB.');
      return;
    }

    setUploading(true);
    try {
      const base64Url = await dbService.uploadImage(file);
      setFormData((prev) => ({ ...prev, foto: base64Url }));
    } catch (err) {
      alert('Gagal mengunggah foto.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.jabatan || !formData.isiTestimoni) {
      alert('Harap isi semua kolom wajib.');
      return;
    }

    if (editingId) {
      dbService.updateTestimonial(editingId, formData);
    } else {
      dbService.createTestimonial(formData);
    }
    setIsOpen(false);
  };

  const filteredTestimonials = testimonials.filter((t) =>
    t.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Kelola Testimoni
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Kelola testimoni, ulasan bintang, dan feedback dari klien atau rekan kerja.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500 cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" />
          Tambah Testimoni Baru
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
          placeholder="Cari berdasarkan nama klien atau jabatan..."
          className="w-full rounded-xl border border-slate-200 bg-white/40 pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-white dark:focus:border-indigo-500"
        />
      </div>

      {/* Testimonials Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/50 bg-white/40 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="px-6 py-4">Klien / Pemberi Ulasan</th>
              <th className="px-6 py-4">Rating Bintang</th>
              <th className="px-6 py-4">Isi Testimoni</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredTestimonials.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 dark:text-slate-500">
                  Tidak ada testimoni ditemukan.
                </td>
              </tr>
            ) : (
              filteredTestimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-950/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.foto}
                        alt={t.nama}
                        className="h-10 w-10 rounded-full object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PRESET_AVATARS[0];
                        }}
                      />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {t.nama}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono block mt-0.5">
                          {t.jabatan}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 max-w-sm">
                      "{t.isiTestimoni}"
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                        title="Edit Testimoni"
                      >
                        <Edit className="h-4 w-4 text-indigo-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id, t.nama)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
                        title="Hapus Testimoni"
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
                {editingId ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
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
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Client Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Nama Klien *
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="Contoh: Sarah Amalia"
                    required
                  />
                </div>

                {/* Client Job */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Jabatan & Instansi *
                  </label>
                  <input
                    type="text"
                    value={formData.jabatan}
                    onChange={(e) => setFormData((prev) => ({ ...prev, jabatan: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="Contoh: Product Manager di TechCorp"
                    required
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Rating Bintang (1 - 5)
                </label>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, rating: i + 1 }))}
                      className="text-slate-300 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          i < formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Foto Avatar Klien
                </label>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="h-14 w-14 rounded-full overflow-hidden border border-slate-200 bg-slate-50 shrink-0 flex items-center justify-center dark:border-slate-800 dark:bg-slate-950/50">
                    {uploading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    ) : (
                      <img src={formData.foto} alt="Preview" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <label className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer">
                        <Upload className="h-3.5 w-3.5 text-indigo-500" />
                        Upload (Cloudinary)
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPresets(!showPresets)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        <Grid className="h-3.5 w-3.5 text-indigo-500" />
                        Pilih Preset Avatar
                      </button>
                    </div>
                  </div>
                </div>

                {showPresets && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-950/20">
                    <div className="grid grid-cols-6 gap-2">
                      {PRESET_AVATARS.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, foto: img }));
                            setShowPresets(false);
                          }}
                          className={`relative aspect-square h-10 w-10 rounded-full overflow-hidden border-2 transition-all ${
                            formData.foto === img ? 'border-indigo-500 scale-90' : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img src={img} alt={`Preset ${i}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Testimony content */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Isi Testimoni / Feedback *
                </label>
                <textarea
                  value={formData.isiTestimoni}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isiTestimoni: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white resize-none"
                  placeholder="Tuliskan ulasan atau rekomendasi klien mengenai hasil kerja Anda secara lengkap..."
                  required
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
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
