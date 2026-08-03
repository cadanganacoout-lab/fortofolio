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
    title: "GILANG NUR MAULIDA FAID — Portofolio",
    footerNote: "Dibuat Individu oleh Gilang Nur Maulida Faid | 2026",
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
    name: "GILANG NUR MAULIDA FAID",
    initials: "GF",            // dipakai di avatar bulat, isi 2 huruf
    role: "Siswa Kelas 11 · Rekayasa Perangkat Lunak",
    school: "SMK PGRI 2 PONOROGO",
    location: "Ponorogo, Jawa Timur",
    status: "Terbuka untuk PKL / magang",

    // Baris kode ini akan "diketik" otomatis seperti animasi terminal.
    // Tambah/kurangi baris sesuka kamu, tetap dalam bentuk teks biasa.
    typingLines: [
      "const gilang = {",
      "  status: 'siswa RPL kelas 11',",
      "  sedangBelajar: ['CyberSecurity', 'Penetration Testing', 'RedHat'],",
      "  motto: 'consistency > intensity',",
      "  siapMagang: true,",
      "};",
    ],

    tags: ["Belajar tiap hari", "Suka CyberSecurity", "Frontend Enthusiast", "Mau magang / PKL"],

    // Isi 'url' dengan link asli akun kamu. Kosongkan "#" jika belum ada.
    socials: [
      { platform: "github",   label: "GitHub",   url: "https://github.com/cadanganacoout-lab" },
      { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/gilang-nur-naulida-faid-080233400/" },
      { platform: "instagram",label: "Instagram",url: "https://www.instagram.com/gilanzq_/" },
      { platform: "email",    label: "Email",    url: "cadanganacoout@gmail.com" },
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
      period: "2016 — 2022",
      level: "Sekolah Dasar",
      name: "MI MA'ARIF MAYAK",
      note: "Menyelesaikan pendidikan dasar dengan aktif di ekstrakurikuler komputer.",
    },
    {
      period: "2022 — 2025",
      level: "Sekolah Menengah Pertama",
      name: "MTSN DARUL HUDA MAYAK",
      note: "Sekolah menengah pertama dengan fokus pada bidang ahklaq dan sopan santun.",
    },
    {
      period: "2025 — Sekarang",
      level: "Sekolah Menengah Kejuruan",
      name: "SMK PGRI 2 PONOROGO",
      note: "Jurusan Rekayasa Perangkat Lunak (RPL), kelas 11 — fokus pada Frontend dan Pentester.",
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
    { name: "PHP",        level: 70 },
    { name: "MySQL",      level: 80 },
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
      title: "Website Kelas XI RPL",
      year: "2026",
      description: "Website profil kelas XI RPL SMK PGRI 2 Ponorogo, menampilkan informasi siswa, guru, dan kegiatan kelas.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://11rplsterida.vercel.app/",
    },
    {
      title: "Website Portfolio Pribadi",
      year: "2026",
      description: "Website portfolio pribadi yang menampilkan riwayat pendidikan, skills, dan proyek yang telah dikerjakan.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://tentangsayaaaa.vercel.app/",
    },
  //   {
  //     title: "Aplikasi To-Do List",
  //     year: "2024",
  //     description: "Aplikasi pencatat tugas harian dengan fitur tandai selesai, kategori, dan penyimpanan data di browser.",
  //     tags: ["JavaScript", "LocalStorage"],
  //     link: "#",
  //   },
  //   {
  //     title: "Company Profile Sekolah",
  //     year: "2024",
  //     description: "Redesign halaman profil sekolah dengan navigasi lebih sederhana dan tampilan yang mobile-friendly.",
  //     tags: ["HTML", "CSS"],
  //     link: "#",
  //   },
  //   {
  //     title: "Sistem Inventaris Lab Komputer",
  //     year: "2024",
  //     description: "Proyek kelompok untuk mendata dan memantau kondisi perangkat di laboratorium komputer sekolah.",
  //     tags: ["PHP", "MySQL"],
  //     link: "#",
  //   },
  ],

  // ------------------------------------------------------------------
  // SERTIFIKAT & PENGHARGAAN
  // ------------------------------------------------------------------
  certificates: [
    {
      title: "Kunjungan Industri Gamelab Indonesia",
      issuer: "Gamelab Indonesia",
      date: "2025",
      link: "assets/sertificate/gamelab.webp",
    },
    {
      title: "Partisipasi GLOW#321",
      issuer: "gameLAB Indonesia",
      date: "2025",
      link: "assets/sertificate/gamelab2.webp",
    },
    {
      title: "Partisipasi Dicoding METC",
      issuer: "Dicoding Indonesia",
      date: "2025",
      link: "assets/sertificate/dicoding.webp",
    },
    // {
    //   title: "Sertifikat Magang Kerja Industri (PKL)",
    //   issuer: "Perusahaan Mitra Sekolah",
    //   date: "2024",
    //   link: "#",
    // },
  ],

  // ------------------------------------------------------------------
  // KONTAK
  // ------------------------------------------------------------------
  contact: {
    email: "cadanganacoout@gmail.com",
    phone: "0889-9153-1800 (MESSAGE ONLY)",
    address: "Ponorogo, Jawa Timur, Indonesia",
    socials: [
      { platform: "github",    label: "GitHub",    url: "https://github.com/cadanganacoout-lab" },
      { platform: "linkedin",  label: "LinkedIn",  url: "https://www.linkedin.com/in/gilang-nur-naulida-faid-080233400/" },
      { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/gilanzq_/" },
      { platform: "whatsapp",  label: "WhatsApp",  url: "0889-9153-1800" },
    ],
  },
};
