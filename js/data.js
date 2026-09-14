const portfolioData = {
  site: {
    title: "GILANG NUR MAULIDA FAID — Portofolio",
    footerNote: "Dibuat Individu oleh Gilang Nur Maulida Faid | 2026",
  },

  navigation: [
    { id: "home", label: "profile.js", icon: "js" },
    { id: "about", label: "about.md", icon: "md" },
    { id: "education", label: "education.json", icon: "json" },
    { id: "skills", label: "skills.js", icon: "js" },
    { id: "projects", label: "projects/", icon: "dir" },
    { id: "certificates", label: "certificates/", icon: "dir" },
    { id: "contact", label: "contact.js", icon: "js" },
  ],

  profile: {
    name: "GILANG NUR MAULIDA FAID",
    initials: "GF",
    role: "Siswa Kelas 11 · Rekayasa Perangkat Lunak",
    school: "SMK PGRI 2 PONOROGO",
    location: "Ponorogo, Jawa Timur",
    status: "Terbuka untuk PKL / magang",
    introduction: "Halo, saya Gilang, siswa RPL yang senang mengubah ide dan barisan kode menjadi pengalaman digital yang hidup.",

    typingLines: [
      "const gilang = {",
      "  status: 'siswa RPL kelas 11',",
      "  sedangBelajar: ['CyberSecurity', 'Penetration Testing', 'RedHat'],",
      "  motto: 'consistency > intensity',",
      "  siapMagang: true,",
      "};",
    ],

    tags: [
      "Belajar tiap hari",
      "Suka CyberSecurity",
      "Frontend Enthusiast",
      "Mau magang / PKL",
    ],

    socials: [
      {
        platform: "github",
        label: "GitHub",
        url: "https://github.com/cadanganacoout-lab",
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/gilang-nur-naulida-faid-080233400/",
      },
      {
        platform: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/gilanzq_/",
      },
      { platform: "email", label: "Email", url: "cadanganacoout@gmail.com" },
    ],
  },

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

  languages: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 70 },
    { name: "PHP", level: 70 },
    { name: "MySQL", level: 80 },
    { name: "Java", level: 40 },
  ],

  tools: [
    { name: "VS Code", symbol: "{ }" },
    { name: "Git & GitHub", symbol: "⑂" },
    { name: "Figma", symbol: "◈" },
    { name: "XAMPP", symbol: "▣" },
    { name: "Bootstrap", symbol: "▤" },
    { name: "Laravel", symbol: "λ" },
    { name: "Canva", symbol: "✎" },
  ],

  projects: [
    {
      title: "Website Kelas XI RPL",
      year: "2026",
      description:
        "Website profil kelas XI RPL SMK PGRI 2 Ponorogo, menampilkan informasi siswa, guru, dan kegiatan kelas.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://11rplsterida.vercel.app/",
    },
    {
      title: "Website Portfolio Pribadi",
      year: "2026",
      description:
        "Website portfolio pribadi yang menampilkan riwayat pendidikan, skills, dan proyek yang telah dikerjakan.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://gilangfaid.vercel.app/",
    },
    {
      title: "Aplikaasi Kelas XI RPL",
      year: "2026",
      description:
        "Aplikasi Yang Saya Buat Untuk Kelas XI RPL SMK PGRI 2 Ponorogo, Karena Akan Berpisah Untuk Kenang-Kenangan Disaat PKL.",
      tags: ["DART", "Flutter"],
      link: "",
    },
  ],

  certificates: [
    {
      title: "Kunjungan Industri Gamelab Indonesia",
      issuer: "Gamelab Indonesia",
      date: "2025",
      link: "assets/sertificate/gamelab.webp",
    },
    {
      title: "Partisipasi GLOW#321",
      issuer: "GameLAB Indonesia",
      date: "2025",
      link: "assets/sertificate/gamelab2.webp",
    },
    {
      title: "Partisipasi Dicoding METC",
      issuer: "Dicoding Indonesia",
      date: "2025",
      link: "assets/sertificate/dicoding.webp",
    },
  ],

  contact: {
    email: "cadanganacoout@gmail.com",
    phone: "0889-9153-1800 (MESSAGE ONLY)",
    address: "Ponorogo, Jawa Timur, Indonesia",
    socials: [
      {
        platform: "github",
        label: "GitHub",
        url: "https://github.com/cadanganacoout-lab",
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/gilang-nur-naulida-faid-080233400/",
      },
      {
        platform: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/gilanzq_/",
      },
      { platform: "whatsapp", label: "WhatsApp", url: "0889-9153-1800" },
    ],
  },
};
