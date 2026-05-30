import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { Profile } from '../../types';
import { Save, Upload, Trash2, CheckCircle2, User, Globe, Image as ImageIcon } from 'lucide-react';

export const CrudProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(() => dbService.getProfile());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('Ukuran file foto terlalu besar. Maksimal 2MB.');
      return;
    }

    setUploadProgress(true);
    setErrorMessage(null);

    try {
      // Simulate Cloudinary upload
      const base64Url = await dbService.uploadImage(file);
      setProfile((prev) => ({ ...prev, foto: base64Url }));
      setSuccessMessage('Foto berhasil diunggah (Cloudinary Simulation).');
    } catch (err) {
      setErrorMessage('Gagal mengunggah foto. Silakan coba kembali.');
    } finally {
      setUploadProgress(false);
    }
  };

  const handleRemoveImage = () => {
    setProfile((prev) => ({
      ...prev,
      foto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600' // Default fallback
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay
      dbService.updateProfile(profile);
      setSuccessMessage('Profil Anda berhasil diperbarui di database.');
    } catch (err) {
      setErrorMessage('Terjadi kesalahan saat memperbarui profil.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Kelola Profil
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Ubah informasi diri, kontak, dan tautan media sosial Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Alerts */}
        {successMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Avatar Upload Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40 text-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono mb-4">
                Foto Profil
              </h3>

              {/* Avatar Preview */}
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                {uploadProgress ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 text-white">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                ) : null}
                <img
                  src={profile.foto}
                  alt={profile.nama}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Upload controls */}
              <div className="mt-6 flex flex-col gap-2">
                <label className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer">
                  <Upload className="h-4 w-4 text-indigo-500" />
                  Unggah Foto Baru
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {profile.foto && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 px-4 py-2.5 text-xs font-bold text-red-600 transition-all hover:bg-red-100 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus / Reset Foto
                  </button>
                )}
              </div>
              <p className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                Mendukung JPG, PNG. Maksimal 2MB. Diunggah langsung ke Cloudinary virtual.
              </p>
            </div>
          </div>

          {/* Right: Profile Details Form */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200/50 bg-white/40 p-6 shadow-sm backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/40 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800/40 pb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-500" />
              Detail Informasi Diri
            </h3>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama"
                  value={profile.nama}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  name="telepon"
                  value={profile.telepon}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Alamat Rumah
                </label>
                <input
                  type="text"
                  name="alamat"
                  value={profile.alamat}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Bio field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                Bio Singkat (Tentang Diri)
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500 resize-none"
                required
              />
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono border-b border-slate-100 dark:border-slate-800/40 pt-4 pb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-indigo-500" />
              Kelola Tautan Sosial Media
            </h3>

            {/* Social Media Inputs */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                  Instagram URL
                </label>
                <input
                  type="url"
                  name="instagram"
                  value={profile.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/username"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/40">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4.5 w-4.5" />
                    Simpan Perubahan Profil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
