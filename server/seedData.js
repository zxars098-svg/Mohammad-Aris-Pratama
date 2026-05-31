export const initialProfile = {
  id: "profile-1",
  nama: "Mohammad Aris Pratama",
  foto: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
  bio: "Senior Full-Stack Developer & UI/UX enthusiast dengan 2+ tahun pengalaman membangun aplikasi web modern berskala besar. Spesialisasi dalam React, Next.js, Node.js, dan arsitektur cloud. Berfokus pada performa tinggi, animasi interaktif premium, dan pengalaman pengguna yang luar biasa.",
  email: "rian.wijaya@dev.com",
  telepon: "+62 812-3456-7890",
  alamat: "Jakarta, Indonesia",
  github: "https://github.com/rianwijaya",
  linkedin: "https://linkedin.com/in/rianwijaya",
  instagram: "https://instagram.com/rianwijaya"
};

export const initialProjects = [
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

export const initialSkills = [
  { id: "sk-1", nama: "React / Next.js", kategori: "Frontend", level: 95 },
  { id: "sk-2", nama: "TypeScript", kategori: "Frontend", level: 90 },
  { id: "sk-3", nama: "Tailwind CSS & Framer Motion", kategori: "Frontend", level: 95 },
  { id: "sk-4", nama: "HTML5 / CSS3 / ES6+", kategori: "Frontend", level: 98 },
  { id: "sk-5", nama: "Node.js & Express / NestJS", kategori: "Backend", level: 88 },
  { id: "sk-6", nama: "PostgreSQL & Prisma ORM", kategori: "Backend", level: 85 },
  { id: "sk-7", nama: "GraphQL & RESTful APIs", kategori: "Backend", level: 90 },
  { id: "sk-8", nama: "Redis & MongoDB", kategori: "Backend", level: 78 },
  { id: "sk-9", nama: "Git & GitHub Actions (CI/CD)", kategori: "Tools", level: 90 },
  { id: "sk-10", nama: "Docker & Kubernetes", kategori: "Tools", level: 75 },
  { id: "sk-11", nama: "Vercel / AWS / Netlify", kategori: "Tools", level: 85 },
  { id: "sk-12", nama: "Figma (UI/UX Design)", kategori: "Tools", level: 80 }
];

export const initialEducation = [
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

export const initialTestimonials = [
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
