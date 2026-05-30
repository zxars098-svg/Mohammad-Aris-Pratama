import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { Project } from '../../types';
import { Plus, Edit, Trash2, Save, Upload, X, Star, Link as LinkIcon, Search, Eye, Grid } from 'lucide-react';

const PRESET_PROJECT_IMAGES = [
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600', // SaaS Analytics
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600', // AI Writing
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600', // E-Commerce
  'https://images.pexels.com/photos/1092670/pexels-photo-1092670.jpeg?auto=compress&cs=tinysrgb&w=600', // Mobile Wallet
  'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=600', // Code editor
  'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600'   // Modern UI
];

export const CrudProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => dbService.getProjects());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form / Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    judul: '',
    slug: '',
    deskripsi: '',
    thumbnail: PRESET_PROJECT_IMAGES[0],
    teknologi: '',
    kategori: 'Web Application',
    demo_url: '',
    repository_url: '',
    featured: false,
    tanggal: new Date().toISOString().split('T')[0]
  });

  const [uploading, setUploading] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(dbService.getProjects());
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    return () => window.removeEventListener('portfolio_db_update', handleUpdate);
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!editingId) {
      const generatedSlug = formData.judul
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.judul, editingId]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      judul: '',
      slug: '',
      deskripsi: '',
      thumbnail: PRESET_PROJECT_IMAGES[0],
      teknologi: '',
      kategori: 'Web Application',
      demo_url: '',
      repository_url: '',
      featured: false,
      tanggal: new Date().toISOString().split('T')[0]
    });
    setIsOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      judul: project.judul,
      slug: project.slug,
      deskripsi: project.deskripsi,
      thumbnail: project.thumbnail,
      teknologi: project.teknologi,
      kategori: project.kategori,
      demo_url: project.demo_url,
      repository_url: project.repository_url,
      featured: project.featured,
      tanggal: project.tanggal
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus project "${name}" dari database?`)) {
      dbService.deleteProject(id);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    setUploading(true);
    try {
      const base64Url = await dbService.uploadImage(file);
      setFormData((prev) => ({ ...prev, thumbnail: base64Url }));
    } catch (err) {
      alert('Gagal mengunggah gambar.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.judul || !formData.slug || !formData.deskripsi || !formData.teknologi) {
      alert('Harap lengkapi semua kolom wajib.');
      return;
    }

    if (editingId) {
      dbService.updateProject(editingId, formData);
    } else {
      dbService.createProject(formData);
    }
    setIsOpen(false);
  };

  const filteredProjects = projects.filter((p) =>
    p.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.teknologi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Kelola Projects
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tambah, edit, atau hapus project dari grid portfolio Anda.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500 cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" />
          Tambah Project Baru
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
          placeholder="Cari project berdasarkan judul, kategori, atau teknologi..."
          className="w-full rounded-xl border border-slate-200 bg-white/40 pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-white dark:focus:border-indigo-500"
        />
      </div>

      {/* Projects Table/List */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/50 bg-white/40 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20 font-mono text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400 dark:text-slate-500">
                  Tidak ada project ditemukan.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-950/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={project.thumbnail}
                        alt={project.judul}
                        className="h-10 w-16 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PRESET_PROJECT_IMAGES[0];
                        }}
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1 max-w-[200px] sm:max-w-xs">
                          {project.judul}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono line-clamp-1 max-w-[200px] sm:max-w-xs mt-0.5">
                          {project.teknologi}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                    {project.kategori}
                  </td>
                  <td className="px-6 py-4">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Yes
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400 dark:text-slate-500">
                    {project.tanggal}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit className="h-4 w-4 text-indigo-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.judul)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
                        title="Hapus Project"
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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {editingId ? 'Edit Project' : 'Tambah Project Baru'}
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
              {/* Title & Slug */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Judul Project *
                  </label>
                  <input
                    type="text"
                    value={formData.judul}
                    onChange={(e) => setFormData((prev) => ({ ...prev, judul: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="Contoh: Apex Analytics Dashboard"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Slug URL (Auto-Generated) *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 outline-none dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-400"
                    placeholder="apex-analytics-dashboard"
                    required
                    disabled={!!editingId} // Prevent editing slug after creation to preserve links
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Deskripsi Lengkap *
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white resize-none"
                  placeholder="Tulis detail project, fitur, tantangan, dan solusi..."
                  required
                />
              </div>

              {/* Thumbnail Image Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Thumbnail Project Image *
                </label>
                
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Preview */}
                  <div className="relative aspect-video h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 shrink-0 flex items-center justify-center">
                    {uploading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    ) : (
                      <img src={formData.thumbnail} alt="Preview" className="h-full w-full object-cover" />
                    )}
                  </div>

                  {/* Upload Actions */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <label className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer">
                        <Upload className="h-3.5 w-3.5 text-indigo-500" />
                        Upload File (Cloudinary)
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPresets(!showPresets)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        <Grid className="h-3.5 w-3.5 text-indigo-500" />
                        Pilih Gambar Preset Premium
                      </button>
                    </div>

                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                      placeholder="Atau tempelkan URL gambar langsung di sini"
                    />
                  </div>
                </div>

                {/* Presets Selection Panel */}
                {showPresets && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-950/20">
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 font-mono">
                      Pilih Gambar Default Premium:
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {PRESET_PROJECT_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, thumbnail: img }));
                            setShowPresets(false);
                          }}
                          className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                            formData.thumbnail === img ? 'border-indigo-500 scale-95 shadow-md' : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img src={img} alt={`Preset ${i}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies & Category */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Teknologi (Pisahkan dengan koma) *
                  </label>
                  <input
                    type="text"
                    value={formData.teknologi}
                    onChange={(e) => setFormData((prev) => ({ ...prev, teknologi: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="React, TypeScript, Tailwind, Prisma"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Kategori Project *
                  </label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData((prev) => ({ ...prev, kategori: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:bg-slate-900"
                    required
                  >
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
              </div>

              {/* Demo URL & Repository URL */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Demo URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, demo_url: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Repository URL (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.repository_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, repository_url: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              {/* Date & Featured Toggle */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 items-center">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                    Tanggal Pembuatan *
                  </label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tanggal: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
                    required
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center h-full pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                      className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Star className={`h-4 w-4 ${formData.featured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                      Tandai Sebagai Featured Project
                    </span>
                  </label>
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
                  Simpan Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
