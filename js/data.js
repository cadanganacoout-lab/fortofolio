/**
 * =====================================================================
 *  DATA PORTOFOLIO
 * =====================================================================
 *  Semua ISI website (teks, daftar proyek, sertifikat, dll) ada di
 *  file ini. Kamu tinggal ganti nilainya sesuai data kamu sendiri.
 *
 *  ATURAN AMAN EDIT:
 *  - Jangan ubah nama variabel/keys (tulisan sebelum tanda titik dua).
 *  - Teks yang boleh diganti selalu ada di dalam tanda kutip ' ... '
 *  - Kalau teks mengandung tanda kutip satu ( ' ), ganti pakai
 *    tanda kutip dua ( " ... " ) supaya tidak error.
 *  - Setelah selesai edit, cukup simpan file ini lalu refresh browser.
 * =====================================================================
 */

const portfolioData = {

  // ------------------------------------------------------------------
  // INFORMASI DASAR SITUS
  // ------------------------------------------------------------------
  site: {
    title: "Bima Satria Pradana — Portofolio",
    footerNote: "Dibuat dengan HTML, CSS & JavaScript murni.",
  },

  // ------------------------------------------------------------------
  // NAVIGASI SIDEBAR / DRAWER
  // icon boleh salah satu dari: "js" | "md" | "json" | "dir"
  // ------------------------------------------------------------------
  navigation: [
    { id: "home",         label: "profile.js",      icon: "js"   },
    { id: "about",        label: "about.md",        icon: "md"   },
    { id: "education",    label: "education.json",  icon: "json" },
    { id: "skills",       label: "skills.js",       icon: "js"   },
    { id: "projects",     label: "projects/",       icon: "dir"  },
    { id: "certificates", label: "certificates/",   icon: "dir"  },
    { id: "contact",      label: "contact.js",      icon: "js"   },
  ],

  // ------------------------------------------------------------------
  // PROFIL / HERO (bagian paling atas)
  // ------------------------------------------------------------------
  profile: {
    name: "Bima Satria Pradana",
    initials: "BS",            // dipakai di avatar bulat, isi 2 huruf
    role: "Siswa Kelas 11 · Rekayasa Perangkat Lunak",
    school: "SMK Cendekia Teknologi",
    location: "Malang, Jawa Timur",
    status: "Terbuka untuk PKL / magang",

    // Baris kode ini akan "diketik" otomatis seperti animasi terminal.
    // Tambah/kurangi baris sesuka kamu, tetap dalam bentuk teks biasa.
    typingLines: [
      "const bima = {",
      "  status: 'siswa RPL kelas 11',",
      "  sedangBelajar: ['JavaScript', 'PHP', 'MySQL'],",
      "  motto: 'consistency > intensity',",
      "  siapMagang: true,",
      "};",
    ],

    tags: ["Belajar tiap hari", "Suka UI/UX", "Anak organisasi"],

    // Isi 'url' dengan link asli akun kamu. Kosongkan "#" jika belum ada.
    socials: [
      { platform: "github",   label: "GitHub",   url: "#" },
      { platform: "linkedin", label: "LinkedIn", url: "#" },
      { platform: "instagram",label: "Instagram",url: "#" },
      { platform: "email",    label: "Email",    url: "#" },
    ],
  },

  // ------------------------------------------------------------------
  // TENTANG SAYA — visi misi, tujuan, latar belakang, alasan pilih RPL
  // ------------------------------------------------------------------
  about: {
    background:
      "Saya mulai tertarik dengan dunia komputer sejak SMP, waktu iseng " +
      "membongkar tampilan blog pribadi dan penasaran bagaimana sebuah " +
      "halaman web bisa 'hidup'. Dari situ saya mulai belajar otodidak " +
      "lewat video tutorial sebelum akhirnya melanjutkan pendidikan formal " +
      "di jurusan yang sesuai dengan minat saya.",

    whyRPL:
      "Saya memilih jurusan Rekayasa Perangkat Lunak karena ingin memahami " +
      "proses membangun aplikasi dari nol — mulai dari logika program, " +
      "desain tampilan, sampai aplikasi tersebut bisa dipakai orang lain. " +
      "Bagi saya, RPL adalah cara paling nyata untuk mengubah ide menjadi " +
      "sesuatu yang benar-benar bisa digunakan.",

    vision:
      "Menjadi software engineer yang mampu membangun produk digital yang " +
      "bermanfaat, mudah digunakan, dan dikerjakan dengan standar profesional.",

    missions: [
      "Menguasai dasar pemrograman web dan mobile dengan konsisten.",
      "Membangun proyek nyata untuk melatih kemampuan problem solving.",
      "Aktif mengikuti lomba dan sertifikasi untuk menguji kemampuan diri.",
      "Terus belajar teknologi baru sambil membantu teman satu tim.",
    ],
  },

  // ------------------------------------------------------------------
  // RIWAYAT PENDIDIKAN
  // ------------------------------------------------------------------
  education: [
    {
      period: "2017 — 2019",
      level: "Sekolah Dasar",
      name: "SDN Sukamaju 1",
      note: "Menyelesaikan pendidikan dasar dengan aktif di ekstrakurikuler komputer.",
    },
    {
      period: "2019 — 2022",
      level: "Sekolah Menengah Pertama",
      name: "SMPN 4 Sukamaju",
      note: "Mulai belajar dasar desain grafis dan mengikuti klub robotik sekolah.",
    },
    {
      period: "2022 — Sekarang",
      level: "Sekolah Menengah Kejuruan",
      name: "SMK Cendekia Teknologi",
      note: "Jurusan Rekayasa Perangkat Lunak (RPL), kelas 11 — fokus pada pengembangan web dan basis data.",
    },
  ],

  // ------------------------------------------------------------------
  // BAHASA PEMROGRAMAN — akan tampil sebagai progress bar
  // level diisi angka 0 - 100
  // ------------------------------------------------------------------
  languages: [
    { name: "HTML",       level: 90 },
    { name: "CSS",        level: 85 },
    { name: "JavaScript", level: 70 },
    { name: "PHP",        level: 55 },
    { name: "MySQL",      level: 60 },
    { name: "Java",       level: 40 },
  ],

  // ------------------------------------------------------------------
  // TOOLS / TECH STACK — tampil sebagai chip kecil
  // symbol bebas diisi karakter apa saja (bukan logo asli)
  // ------------------------------------------------------------------
  tools: [
    { name: "VS Code",       symbol: "{ }" },
    { name: "Git & GitHub",  symbol: "⑂"   },
    { name: "Figma",         symbol: "◈"   },
    { name: "XAMPP",         symbol: "▣"   },
    { name: "Bootstrap",     symbol: "▤"   },
    { name: "Laravel",       symbol: "λ"   },
    { name: "Canva",         symbol: "✎"   },
  ],

  // ------------------------------------------------------------------
  // PROYEK — kartu bisa diklik menuju link proyek kamu
  // ------------------------------------------------------------------
  projects: [
    {
      title: "Sistem Absensi Sekolah",
      year: "2025",
      description: "Aplikasi web untuk mencatat kehadiran siswa secara digital lengkap dengan rekap laporan bulanan untuk wali kelas.",
      tags: ["PHP", "MySQL", "Bootstrap"],
      link: "#",
    },
    {
      title: "Landing Page UMKM Kopi",
      year: "2025",
      description: "Website profil untuk usaha kopi lokal, dibuat responsif dengan fokus pada kecepatan akses dan tampilan menarik.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "#",
    },
    {
      title: "Aplikasi To-Do List",
      year: "2024",
      description: "Aplikasi pencatat tugas harian dengan fitur tandai selesai, kategori, dan penyimpanan data di browser.",
      tags: ["JavaScript", "LocalStorage"],
      link: "#",
    },
    {
      title: "Company Profile Sekolah",
      year: "2024",
      description: "Redesign halaman profil sekolah dengan navigasi lebih sederhana dan tampilan yang mobile-friendly.",
      tags: ["HTML", "CSS"],
      link: "#",
    },
    {
      title: "Sistem Inventaris Lab Komputer",
      year: "2024",
      description: "Proyek kelompok untuk mendata dan memantau kondisi perangkat di laboratorium komputer sekolah.",
      tags: ["PHP", "MySQL"],
      link: "#",
    },
  ],

  // ------------------------------------------------------------------
  // SERTIFIKAT & PENGHARGAAN
  // ------------------------------------------------------------------
  certificates: [
    {
      title: "Juara 2 Lomba Web Design Tingkat Kota",
      issuer: "Dinas Pendidikan Kota",
      date: "2025",
      link: "#",
    },
    {
      title: "Sertifikat Pelatihan Dasar Pemrograman Web",
      issuer: "Platform Belajar Online",
      date: "2024",
      link: "#",
    },
    {
      title: "Peserta Terbaik Lomba Kompetensi Siswa (LKS) — Web Technology",
      issuer: "Sekolah / Panitia LKS",
      date: "2024",
      link: "#",
    },
    {
      title: "Sertifikat Magang Kerja Industri (PKL)",
      issuer: "Perusahaan Mitra Sekolah",
      date: "2024",
      link: "#",
    },
  ],

  // ------------------------------------------------------------------
  // KONTAK
  // ------------------------------------------------------------------
  contact: {
    email: "bima.pradana@email.com",
    phone: "0812-xxxx-xxxx",
    address: "Malang, Jawa Timur, Indonesia",
    socials: [
      { platform: "github",    label: "GitHub",    url: "#" },
      { platform: "linkedin",  label: "LinkedIn",  url: "#" },
      { platform: "instagram", label: "Instagram", url: "#" },
      { platform: "whatsapp",  label: "WhatsApp",  url: "#" },
    ],
  },
};
