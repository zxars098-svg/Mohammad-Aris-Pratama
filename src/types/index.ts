export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Profile {
  id: string;
  nama: string;
  foto: string;
  bio: string;
  email: string;
  telepon: string;
  alamat: string;
  github: string;
  linkedin: string;
  instagram: string;
}

export interface Project {
  id: string;
  judul: string;
  slug: string;
  deskripsi: string;
  thumbnail: string;
  teknologi: string; // Comma-separated list like "React, TypeScript, Tailwind"
  kategori: string;
  demo_url: string;
  repository_url: string;
  featured: boolean;
  tanggal: string;
}

export interface Skill {
  id: string;
  nama: string;
  kategori: string; // e.g., "Frontend", "Backend", "Mobile", "Tools"
  level: number; // 0 to 100
}

export interface Education {
  id: string;
  institusi: string;
  jurusan: string;
  tahunMulai: string;
  tahunSelesai: string;
  deskripsi: string;
}

export interface Testimonial {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  rating: number; // 1 to 5
  isiTestimoni: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalSkills: number;
  totalEducation: number;
  totalTestimonials: number;
  categoryStats: { name: string; count: number }[];
  skillCategoryStats: { name: string; count: number }[];
}
