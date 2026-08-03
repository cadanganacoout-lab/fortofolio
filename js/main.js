/**
 * =====================================================================
 *  MAIN.JS
 * =====================================================================
 *  File ini TIDAK perlu diedit untuk mengganti isi website.
 *  Tugasnya: mengambil data dari data.js lalu menampilkannya ke HTML,
 *  serta menjalankan semua interaksi (tema, menu, animasi).
 * =====================================================================
 */

(function () {
  "use strict";

  /* -------------------- UTIL -------------------- */
  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function el(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html.trim();
    return tmp.firstElementChild;
  }

  // Warna gradasi untuk thumbnail proyek/badge sertifikat (bukan gambar asli)
  const GRADIENTS = [
    ["#4CE0D2", "#1D8E9A"],
    ["#DD7E2E", "#F5A623"],
    ["#8B7CF6", "#4CE0D2"],
    ["#F5A623", "#DD7E2E"],
    ["#33B6E0", "#4CE0D2"],
    ["#F06AA0", "#8B7CF6"],
  ];
  function gradientFor(seedText) {
    let hash = 0;
    for (let i = 0; i < seedText.length; i++) hash = (hash * 31 + seedText.charCodeAt(i)) >>> 0;
    const pair = GRADIENTS[hash % GRADIENTS.length];
    return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
  }

  /* -------------------- RENDER: NAV -------------------- */
  function renderNav() {
    const nav = document.getElementById("sidebarNav");
    nav.innerHTML = portfolioData.navigation
      .map(
        (item) => `
        <a class="nav-item" href="#${item.id}" data-nav="${item.id}">
          <span class="nav-dot nav-dot--${item.icon}"></span>
          <span>${escapeHtml(item.label)}</span>
        </a>`
      )
      .join("");
  }

  /* -------------------- RENDER: SIDEBAR PROFILE MINI -------------------- */
  function renderSidebarProfile() {
    const p = portfolioData.profile;
    document.getElementById("avatarMini").textContent = p.initials || "??";
    document.getElementById("sidebarName").textContent = p.name;
    document.getElementById("sidebarRole").textContent = p.role;
    document.getElementById("sidebarStatus").textContent = "● " + p.status;
    document.getElementById("mobileLogoName").textContent =
      (p.name || "portofolio").split(" ")[0].toLowerCase();
  }

  /* -------------------- RENDER: HERO -------------------- */
  function renderHero() {
    const p = portfolioData.profile;
    document.getElementById("avatarBig").textContent = p.initials || "??";
    document.getElementById("heroStatus").textContent = "● " + p.status;
    document.getElementById("terminalFilename").textContent =
      (p.name || "profile").split(" ")[0].toLowerCase() + ".js";
    document.title = portfolioData.site.title || document.title;

    document.getElementById("heroTags").innerHTML = (p.tags || [])
      .map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`)
      .join("");

    const iconFor = {
      github: "GH", linkedin: "in", instagram: "IG", email: "@", whatsapp: "WA",
    };
    document.getElementById("heroSocials").innerHTML = (p.socials || [])
      .map(
        (s) => `
        <a class="social-btn" href="${escapeHtml(s.url)}" target="_blank" rel="noopener" aria-label="${escapeHtml(s.label)}">
          <span style="font-family:var(--font-display);font-size:.72rem;">${iconFor[s.platform] || "•"}</span>
        </a>`
      )
      .join("");
  }

  /* -------------------- TYPEWRITER TERMINAL -------------------- */
  function colorizeLine(rawLine) {
    let line = escapeHtml(rawLine);
    line = line.replace(/'([^']*)'/g, "<span class=\"tok-string\">'$1'</span>");
    line = line.replace(/\b(const|let|true|false)\b/g, '<span class="tok-keyword">$1</span>');
    line = line.replace(/^(\s*)([a-zA-Z_][\w]*)(:)/, '$1<span class="tok-key">$2</span><span class="tok-punct">$3</span>');
    return line;
  }

  function typewriter() {
    const codeEl = document.getElementById("typingCode");
    const lines = (portfolioData.profile && portfolioData.profile.typingLines) || [];
    codeEl.innerHTML = "";
    if (!lines.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      codeEl.innerHTML = lines
        .map((l) => `<div class="code-line">${colorizeLine(l)}</div>`)
        .join("");
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let currentDiv = null;

    function typeChar() {
      if (lineIndex >= lines.length) return;
      if (charIndex === 0) {
        currentDiv = document.createElement("div");
        currentDiv.className = "code-line";
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        currentDiv.appendChild(cursor);
        codeEl.appendChild(currentDiv);
      }
      const fullLine = lines[lineIndex];

      if (charIndex < fullLine.length) {
        charIndex++;
        currentDiv.innerHTML = escapeHtml(fullLine.slice(0, charIndex)) + '<span class="cursor"></span>';
        setTimeout(typeChar, 22);
      } else {
        currentDiv.innerHTML = colorizeLine(fullLine);
        lineIndex++;
        charIndex = 0;
        if (lineIndex < lines.length) {
          setTimeout(typeChar, 140);
        } else {
          const finalCursor = document.createElement("span");
          finalCursor.className = "cursor";
          currentDiv.appendChild(finalCursor);
        }
      }
    }
    typeChar();
  }

  /* -------------------- RENDER: ABOUT -------------------- */
  function renderAbout() {
    const a = portfolioData.about;
    const wrap = document.getElementById("aboutContent");
    wrap.innerHTML = `
      <div class="about-card reveal">
        <h3>Latar Belakang</h3>
        <p>${escapeHtml(a.background)}</p>
      </div>
      <div class="about-card reveal">
        <h3>Kenapa Memilih RPL</h3>
        <p>${escapeHtml(a.whyRPL)}</p>
      </div>
      <div class="about-card about-full reveal">
        <h3>Visi</h3>
        <p>${escapeHtml(a.vision)}</p>
      </div>
      <div class="about-card about-full reveal">
        <h3>Misi</h3>
        <ul>${(a.missions || []).map((m) => `<li>${escapeHtml(m)}</li>`).join("")}</ul>
      </div>`;
  }

  /* -------------------- RENDER: EDUCATION -------------------- */
  function renderEducation() {
    const wrap = document.getElementById("educationTimeline");
    wrap.innerHTML = portfolioData.education
      .map(
        (e) => `
        <div class="timeline-item reveal">
          <p class="timeline-period">${escapeHtml(e.period)}</p>
          <p class="timeline-level">${escapeHtml(e.level)}</p>
          <p class="timeline-name">${escapeHtml(e.name)}</p>
          <p class="timeline-note">${escapeHtml(e.note)}</p>
        </div>`
      )
      .join("");
  }

  /* -------------------- RENDER: SKILLS -------------------- */
  function renderSkills() {
    const bars = document.getElementById("skillsBars");
    bars.innerHTML = portfolioData.languages
      .map(
        (l) => `
        <div class="skill-row reveal">
          <span class="skill-name">${escapeHtml(l.name)}</span>
          <span class="skill-track"><span class="skill-fill" data-level="${l.level}"></span></span>
          <span class="skill-pct">${l.level}%</span>
        </div>`
      )
      .join("");

    const tools = document.getElementById("toolsRow");
    tools.innerHTML = portfolioData.tools
      .map(
        (t) => `
        <span class="tool-chip reveal">
          <span class="tool-symbol">${escapeHtml(t.symbol)}</span>
          <span>${escapeHtml(t.name)}</span>
        </span>`
      )
      .join("");
  }

  /* -------------------- RENDER: PROJECTS -------------------- */
  function renderProjects() {
    const wrap = document.getElementById("projectsGrid");
    wrap.innerHTML = portfolioData.projects
      .map((p) => {
        const initial = (p.title || "?").trim().charAt(0).toUpperCase();
        return `
        <a class="project-card reveal" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">
          <div class="project-thumb" style="background:${gradientFor(p.title)}">${initial}</div>
          <div class="project-body">
            <p class="project-title">${escapeHtml(p.title)} <span style="color:var(--text-muted);font-weight:400;">— ${escapeHtml(p.year)}</span></p>
            <p class="project-desc">${escapeHtml(p.description)}</p>
            <div class="project-tags">${(p.tags || []).map((t) => `<span class="project-tag">${escapeHtml(t)}</span>`).join("")}</div>
            <span class="project-link">Lihat proyek →</span>
          </div>
        </a>`;
      })
      .join("");
  }

  /* -------------------- RENDER: CERTIFICATES -------------------- */
  function renderCertificates() {
    const wrap = document.getElementById("certificatesGrid");
    wrap.innerHTML = portfolioData.certificates
      .map(
        (c) => `
        <a class="cert-card reveal" href="${escapeHtml(c.link)}" target="_blank" rel="noopener">
          <span class="cert-badge">🏅</span>
          <div>
            <p class="cert-title">${escapeHtml(c.title)}</p>
            <p class="cert-issuer">${escapeHtml(c.issuer)}</p>
            <span class="cert-date">${escapeHtml(c.date)}</span>
          </div>
        </a>`
      )
      .join("");
  }

  /* -------------------- RENDER: CONTACT -------------------- */
  function renderContact() {
    const c = portfolioData.contact;
    const iconFor = { github: "GH", linkedin: "in", instagram: "IG", whatsapp: "WA", email: "@" };
    const wrap = document.getElementById("contactContent");
    wrap.innerHTML = `
      <div class="contact-card reveal">
        <span class="contact-label">Email</span>
        <span class="contact-value">${escapeHtml(c.email)}</span>
      </div>
      <div class="contact-card reveal">
        <span class="contact-label">Telepon</span>
        <span class="contact-value">${escapeHtml(c.phone)}</span>
      </div>
      <div class="contact-card reveal">
        <span class="contact-label">Alamat</span>
        <span class="contact-value">${escapeHtml(c.address)}</span>
      </div>
      <div class="contact-card reveal">
        <span class="contact-label">Sosial Media</span>
        <div class="hero-socials" style="margin-top:6px;">
          ${(c.socials || [])
            .map(
              (s) => `
            <a class="social-btn" href="${escapeHtml(s.url)}" target="_blank" rel="noopener" aria-label="${escapeHtml(s.label)}">
              <span style="font-family:var(--font-display);font-size:.72rem;">${iconFor[s.platform] || "•"}</span>
            </a>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    document.getElementById("footerText").textContent =
      `© ${year} ${portfolioData.profile.name} — ${portfolioData.site.footerNote}`;
  }

  /* -------------------- SCENE: bintang & lampu basecamp -------------------- */
  function buildScene() {
    const starsGroup = document.getElementById("starsGroup");
    let starsSvg = "";
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * 1440;
      const y = Math.random() * 430;
      const r = Math.random() * 1.4 + 0.4;
      const delay = (Math.random() * 3.4).toFixed(2);
      starsSvg += `<circle class="star" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" style="animation-delay:${delay}s"></circle>`;
    }
    starsGroup.innerHTML = starsSvg;

    const campGroup = document.getElementById("campLights");
    const points = [140, 260, 400, 560, 700, 860, 1000, 1160, 1300];
    let campSvg = "";
    points.forEach((x, i) => {
      const y = 700 + (i % 3) * 12;
      const delay = (Math.random() * 2.6).toFixed(2);
      campSvg += `<circle class="camp-light" cx="${x}" cy="${y}" r="3.2" style="animation-delay:${delay}s"></circle>`;
    });
    campGroup.innerHTML = campSvg;
  }

  /* -------------------- TEMA (dark/light) -------------------- */
  function applyThemeLabel(theme) {
    const isDark = theme === "dark";
    document.getElementById("toggleThumb").textContent = isDark ? "☾" : "☀";
    document.getElementById("toggleLabel").textContent = isDark ? "Mode malam" : "Mode siang";
    document.getElementById("mobileToggleIcon").textContent = isDark ? "☾" : "☀";
    document.getElementById("themeToggleDesktop").setAttribute("aria-pressed", String(isDark));
  }

  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    applyThemeLabel(next);
  }

  function initTheme() {
    // Tema awal mengikuti preferensi sistem perangkat; default gelap jika tidak ada preferensi.
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = prefersLight ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", initial);
    applyThemeLabel(initial);

    document.getElementById("themeToggleDesktop").addEventListener("click", toggleTheme);
    document.getElementById("themeToggleMobile").addEventListener("click", toggleTheme);
  }

  /* -------------------- DRAWER MOBILE -------------------- */
  function initDrawer() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("navOverlay");
    const hamburger = document.getElementById("hamburgerBtn");
    const closeBtn = document.getElementById("drawerClose");

    function openDrawer() {
      sidebar.classList.add("is-open");
      overlay.classList.add("is-visible");
      hamburger.setAttribute("aria-expanded", "true");
    }
    function closeDrawer() {
      sidebar.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      hamburger.setAttribute("aria-expanded", "false");
    }
    hamburger.addEventListener("click", () => {
      sidebar.classList.contains("is-open") ? closeDrawer() : openDrawer();
    });
    overlay.addEventListener("click", closeDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
    sidebar.querySelectorAll(".nav-item").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
  }

  /* -------------------- SCROLL SPY + REVEAL + SKILL BARS -------------------- */
  function initScrollEffects() {
    const navLinks = Array.from(document.querySelectorAll(".nav-item"));
    const sections = Array.from(document.querySelectorAll(".section[id]"));

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === entry.target.id));
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spyObserver.observe(s));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (entry.target.classList.contains("skill-row")) {
              const fill = entry.target.querySelector(".skill-fill");
              if (fill) fill.style.width = fill.dataset.level + "%";
            }
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((elm) => revealObserver.observe(elm));
  }

  /* -------------------- SCROLL TO TOP -------------------- */
  function initToTop() {
    const btn = document.getElementById("toTopBtn");
    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 480);
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* -------------------- INIT -------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildScene();
    renderNav();
    renderSidebarProfile();
    renderHero();
    renderAbout();
    renderEducation();
    renderSkills();
    renderProjects();
    renderCertificates();
    renderContact();
    renderFooter();

    initTheme();
    initDrawer();
    initToTop();
    initScrollEffects();
    typewriter();
  });
})();
