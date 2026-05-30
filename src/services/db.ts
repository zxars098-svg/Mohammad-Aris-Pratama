import { Profile, Project, Skill, Education, Testimonial, DashboardStats } from '../types';

// Initial Mock Seed Data
const INITIAL_PROFILE: Profile = {
  id: "profile-1",
  nama: "Mohammad Aris Pratama",
  foto: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
  bio: "Senior Full-Stack Developer & UI/UX enthusiast dengan 5+ tahun pengalaman membangun aplikasi web modern berskala besar. Spesialisasi dalam React, Next.js, Node.js, dan arsitektur cloud. Berfokus pada performa tinggi, animasi interaktif premium, dan pengalaman pengguna yang luar biasa.",
  email: "rian.wijaya@dev.com",
  telepon: "+62 812-3456-7890",
  alamat: "Jakarta, Indonesia",
  github: "https://github.com/rianwijaya",
  linkedin: "https://linkedin.com/in/rianwijaya",
  instagram: "https://instagram.com/rianwijaya"
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    judul: "Apex Analytics - Real-time SaaS Dashboard",
    slug: "apex-analytics",
    deskripsi: "Sebuah platform SaaS analitik real-time yang memproses jutaan data per detik. Dilengkapi dengan visualisasi grafik interaktif, kustomisasi dashboard drag-and-drop, laporan mingguan otomatis, dan integrasi API multi-platform. Didesain dengan estetika dark mode premium ala Linear dan Vercel.",
    thumbnail: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
    teknologi: "Next.js, TypeScript, Tailwind CSS, Tremor, Prisma, PostgreSQL, ChartJS",
    kategori: "Web Application",
    demo_url: "https://apex-demo.vercel.app",
    repository_url: "https://github.com/rianwijaya/apex-analytics",
    featured: true,
    tanggal: "2024-01-15"
  },
  {
    id: "proj-2",
    judul: "Nova AI - Writing Assistant Chrome Extension",
    slug: "nova-ai",
    deskripsi: "Ekstensi Google Chrome bertenaga AI yang membantu penulis, marketer, dan developer menyusun email, artikel, dan dokumentasi 10x lebih cepat. Menggunakan integrasi API OpenAI GPT-4, dengan fitur text-expansion, auto-completion, tone-adjustment, dan terjemahan instan.",
    thumbnail: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
    teknologi: "React, TypeScript, Tailwind CSS, OpenAI API, Chrome Extension API",
    kategori: "AI & Automation",
    demo_url: "https://nova-ai.com",
    repository_url: "https://github.com/rianwijaya/nova-ai",
    featured: true,
    tanggal: "2023-11-02"
  },
  {
    id: "proj-3",
    judul: "Zenith - Premium E-Commerce Platform",
    slug: "zenith-ecommerce",
    deskripsi: "Platform e-commerce premium untuk brand fashion mewah. Dilengkapi dengan sistem checkout super cepat, integrasi gerbang pembayaran Stripe dan Midtrans, pencarian instan cerdas, manajemen inventori real-time, serta animasi transisi halaman yang sangat halus mirip Apple Store.",
    thumbnail: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    teknologi: "React 19, Vite, Tailwind CSS, Framer Motion, Node.js, MongoDB, Stripe",
    kategori: "E-Commerce",
    demo_url: "https://zenith-store.com",
    repository_url: "https://github.com/rianwijaya/zenith-store",
    featured: false,
    tanggal: "2023-08-20"
  },
  {
    id: "proj-4",
    judul: "Velo Pay - Mobile FinTech Wallet",
    slug: "velo-pay",
    deskripsi: "Aplikasi dompet digital modern yang memfasilitasi transfer uang instan tanpa biaya, pembayaran tagihan, pelacakan pengeluaran cerdas, dan investasi mikro dalam satu aplikasi yang aman. Menggunakan enkripsi end-to-end tingkat tinggi dan otentikasi biometrik.",
    thumbnail: "https://images.pexels.com/photos/1092670/pexels-photo-1092670.jpeg?auto=compress&cs=tinysrgb&w=600",
    teknologi: "React Native, Expo, TypeScript, Tailwind CSS, Express.js, Redis, PostgreSQL",
    kategori: "Mobile Application",
    demo_url: "https://velopay.com",
    repository_url: "https://github.com/rianwijaya/velo-pay",
    featured: false,
    tanggal: "2023-05-10"
  }
];

const INITIAL_SKILLS: Skill[] = [
  // Frontend
  { id: "sk-1", nama: "React / Next.js", kategori: "Frontend", level: 95 },
  { id: "sk-2", nama: "TypeScript", kategori: "Frontend", level: 90 },
  { id: "sk-3", nama: "Tailwind CSS & Framer Motion", kategori: "Frontend", level: 95 },
  { id: "sk-4", nama: "HTML5 / CSS3 / ES6+", kategori: "Frontend", level: 98 },
  
  // Backend
  { id: "sk-5", nama: "Node.js & Express / NestJS", kategori: "Backend", level: 88 },
  { id: "sk-6", nama: "PostgreSQL & Prisma ORM", kategori: "Backend", level: 85 },
  { id: "sk-7", nama: "GraphQL & RESTful APIs", kategori: "Backend", level: 90 },
  { id: "sk-8", nama: "Redis & MongoDB", kategori: "Backend", level: 78 },
  
  // Tools / DevOps
  { id: "sk-9", nama: "Git & GitHub Actions (CI/CD)", kategori: "Tools", level: 90 },
  { id: "sk-10", nama: "Docker & Kubernetes", kategori: "Tools", level: 75 },
  { id: "sk-11", nama: "Vercel / AWS / Netlify", kategori: "Tools", level: 85 },
  { id: "sk-12", nama: "Figma (UI/UX Design)", kategori: "Tools", level: 80 }
];

const INITIAL_EDUCATION: Education[] = [
  {
    id: "edu-1",
    institusi: "Universitas Indonesia",
    jurusan: "S1 Teknik Informatika",
    tahunMulai: "2015",
    tahunSelesai: "2019",
    deskripsi: "Lulus dengan predikat Cum Laude (IPK 3.82). Berfokus pada rekayasa perangkat lunak, algoritma, dan sistem basis data. Aktif dalam organisasi mahasiswa sebagai Kepala Bidang Riset Teknologi."
  },
  {
    id: "edu-2",
    institusi: "Hacktiv8 Indonesia",
    jurusan: "Full Stack JavaScript Boot Camp",
    tahunMulai: "2019",
    tahunSelesai: "2019",
    deskripsi: "Program intensif selama 4 bulan yang berfokus pada teknologi JavaScript modern (Node.js, React, Redux, Vue, PostgreSQL, dan metodologi Agile). Terpilih sebagai Best Graduate."
  },
  {
    id: "edu-3",
    institusi: "Vercel & Next.js Advanced Workshop",
    jurusan: "Sertifikasi Next.js & Serverless Architecture",
    tahunMulai: "2022",
    tahunSelesai: "2022",
    deskripsi: "Workshop profesional mendalam mengenai Server Component, Server Actions, optimasi performa web, static-site generation (SSR/ISR), edge functions, dan deployment global."
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    nama: "Sarah Amalia",
    jabatan: "Product Manager di TechCorp",
    foto: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    isiTestimoni: "Rian adalah developer yang luar biasa. Dia tidak hanya menulis kode yang bersih dan terstruktur, tetapi juga memiliki kepekaan desain UI/UX yang sangat tinggi. Aplikasi Apex Dashboard kami selesai tepat waktu dengan performa yang melampaui ekspektasi."
  },
  {
    id: "test-2",
    nama: "Budi Santoso",
    jabatan: "CEO & Co-Founder Zenith Fashion",
    foto: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    isiTestimoni: "Bekerja bersama Rian dalam membangun platform e-commerce Zenith adalah pengalaman terbaik kami. Ia sangat komunikatif, solutif, dan mampu menerjemahkan visi bisnis kami menjadi produk digital yang premium, cepat, dan dicintai oleh pelanggan kami."
  },
  {
    id: "test-3",
    nama: "Michael Chen",
    jabatan: "Engineering Lead di FinGo",
    foto: "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5,
    isiTestimoni: "Keahlian teknis Rian dalam arsitektur Next.js dan TypeScript sangat mengagumkan. Dia membantu tim kami mengoptimalkan loading-speed aplikasi web kami sebesar 40% dan merestrukturisasi basis kode kami agar lebih modular serta mudah dideploy."
  }
];

// Helper to initialize LocalStorage database
const initializeDB = () => {
  if (!localStorage.getItem('portfolio_profile')) {
    localStorage.setItem('portfolio_profile', JSON.stringify(INITIAL_PROFILE));
  }
  if (!localStorage.getItem('portfolio_projects')) {
    localStorage.setItem('portfolio_projects', JSON.stringify(INITIAL_PROJECTS));
  }
  if (!localStorage.getItem('portfolio_skills')) {
    localStorage.setItem('portfolio_skills', JSON.stringify(INITIAL_SKILLS));
  }
  if (!localStorage.getItem('portfolio_education')) {
    localStorage.setItem('portfolio_education', JSON.stringify(INITIAL_EDUCATION));
  }
  if (!localStorage.getItem('portfolio_testimonials')) {
    localStorage.setItem('portfolio_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
  }
};

// Execute initialization
initializeDB();

export const dbService = {
  // RESET TO DEFAULT SEED DATA
  resetToDefault: () => {
    localStorage.setItem('portfolio_profile', JSON.stringify(INITIAL_PROFILE));
    localStorage.setItem('portfolio_projects', JSON.stringify(INITIAL_PROJECTS));
    localStorage.setItem('portfolio_skills', JSON.stringify(INITIAL_SKILLS));
    localStorage.setItem('portfolio_education', JSON.stringify(INITIAL_EDUCATION));
    localStorage.setItem('portfolio_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
    window.location.reload();
  },

  // PROFILE CRUD
  getProfile: (): Profile => {
    initializeDB();
    const data = localStorage.getItem('portfolio_profile');
    return data ? JSON.parse(data) : INITIAL_PROFILE;
  },
  updateProfile: (profile: Profile): Profile => {
    localStorage.setItem('portfolio_profile', JSON.stringify(profile));
    // Trigger custom event to notify components
    window.dispatchEvent(new Event('portfolio_db_update'));
    return profile;
  },

  // PROJECTS CRUD
  getProjects: (): Project[] => {
    initializeDB();
    const data = localStorage.getItem('portfolio_projects');
    return data ? JSON.parse(data) : [];
  },
  getProjectBySlug: (slug: string): Project | undefined => {
    const projects = dbService.getProjects();
    return projects.find(p => p.slug === slug);
  },
  createProject: (project: Omit<Project, 'id'>): Project => {
    const projects = dbService.getProjects();
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`
    };
    projects.push(newProject);
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return newProject;
  },
  updateProject: (id: string, updatedData: Partial<Project>): Project => {
    const projects = dbService.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    projects[index] = { ...projects[index], ...updatedData };
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return projects[index];
  },
  deleteProject: (id: string): boolean => {
    const projects = dbService.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem('portfolio_projects', JSON.stringify(filtered));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return true;
  },

  // SKILLS CRUD
  getSkills: (): Skill[] => {
    initializeDB();
    const data = localStorage.getItem('portfolio_skills');
    return data ? JSON.parse(data) : [];
  },
  createSkill: (skill: Omit<Skill, 'id'>): Skill => {
    const skills = dbService.getSkills();
    const newSkill: Skill = {
      ...skill,
      id: `sk-${Date.now()}`
    };
    skills.push(newSkill);
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return newSkill;
  },
  updateSkill: (id: string, updatedData: Partial<Skill>): Skill => {
    const skills = dbService.getSkills();
    const index = skills.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Skill not found');
    
    skills[index] = { ...skills[index], ...updatedData };
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return skills[index];
  },
  deleteSkill: (id: string): boolean => {
    const skills = dbService.getSkills();
    const filtered = skills.filter(s => s.id !== id);
    localStorage.setItem('portfolio_skills', JSON.stringify(filtered));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return true;
  },

  // EDUCATION CRUD
  getEducation: (): Education[] => {
    initializeDB();
    const data = localStorage.getItem('portfolio_education');
    return data ? JSON.parse(data) : [];
  },
  createEducation: (edu: Omit<Education, 'id'>): Education => {
    const education = dbService.getEducation();
    const newEdu: Education = {
      ...edu,
      id: `edu-${Date.now()}`
    };
    education.push(newEdu);
    // Sort chronologically by starting year (descending)
    education.sort((a, b) => parseInt(b.tahunMulai) - parseInt(a.tahunMulai));
    localStorage.setItem('portfolio_education', JSON.stringify(education));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return newEdu;
  },
  updateEducation: (id: string, updatedData: Partial<Education>): Education => {
    const education = dbService.getEducation();
    const index = education.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Education not found');
    
    education[index] = { ...education[index], ...updatedData };
    education.sort((a, b) => parseInt(b.tahunMulai) - parseInt(a.tahunMulai));
    localStorage.setItem('portfolio_education', JSON.stringify(education));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return education[index];
  },
  deleteEducation: (id: string): boolean => {
    const education = dbService.getEducation();
    const filtered = education.filter(e => e.id !== id);
    localStorage.setItem('portfolio_education', JSON.stringify(filtered));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return true;
  },

  // TESTIMONIALS CRUD
  getTestimonials: (): Testimonial[] => {
    initializeDB();
    const data = localStorage.getItem('portfolio_testimonials');
    return data ? JSON.parse(data) : [];
  },
  createTestimonial: (testimonial: Omit<Testimonial, 'id'>): Testimonial => {
    const testimonials = dbService.getTestimonials();
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: `test-${Date.now()}`
    };
    testimonials.push(newTestimonial);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(testimonials));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return newTestimonial;
  },
  updateTestimonial: (id: string, updatedData: Partial<Testimonial>): Testimonial => {
    const testimonials = dbService.getTestimonials();
    const index = testimonials.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Testimonial not found');
    
    testimonials[index] = { ...testimonials[index], ...updatedData };
    localStorage.setItem('portfolio_testimonials', JSON.stringify(testimonials));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return testimonials[index];
  },
  deleteTestimonial: (id: string): boolean => {
    const testimonials = dbService.getTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(filtered));
    window.dispatchEvent(new Event('portfolio_db_update'));
    return true;
  },

  // DASHBOARD ANALYTICS
  getStats: (): DashboardStats => {
    const projects = dbService.getProjects();
    const skills = dbService.getSkills();
    const education = dbService.getEducation();
    const testimonials = dbService.getTestimonials();

    // Calculate project categories count
    const categoriesMap: { [key: string]: number } = {};
    projects.forEach(p => {
      categoriesMap[p.kategori] = (categoriesMap[p.kategori] || 0) + 1;
    });
    const categoryStats = Object.keys(categoriesMap).map(name => ({
      name,
      count: categoriesMap[name]
    }));

    // Calculate skill categories count
    const skillCategoriesMap: { [key: string]: number } = {};
    skills.forEach(s => {
      skillCategoriesMap[s.kategori] = (skillCategoriesMap[s.kategori] || 0) + 1;
    });
    const skillCategoryStats = Object.keys(skillCategoriesMap).map(name => ({
      name,
      count: skillCategoriesMap[name]
    }));

    return {
      totalProjects: projects.length,
      totalSkills: skills.length,
      totalEducation: education.length,
      totalTestimonials: testimonials.length,
      categoryStats,
      skillCategoryStats
    };
  },

  // CLOUDINARY SIMULATION (Base64 file upload with compression/resize logic)
  uploadImage: async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result); // Returns base64 representation
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = () => {
        reject(new Error('File reading error'));
      };
      reader.readAsDataURL(file);
    });
  }
};
