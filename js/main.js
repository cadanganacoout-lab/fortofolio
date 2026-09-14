(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var modules = [
    { id: "profile", label: "PROFILE", code: "01" },
    { id: "about", label: "ABOUT", code: "02" },
    { id: "skills", label: "SKILLS", code: "03" },
    { id: "projects", label: "PROJECTS", code: "04" },
    { id: "certificates", label: "CERTIFICATES", code: "05" },
    { id: "contact", label: "CONTACT", code: "06" },
  ];
  var statusMessages = ["READY", "ANALYSING", "LOADING"];
  var statusIndex = 0;
  var sceneState = {
    renderer: null,
    camera: null,
    sphere: null,
    core: null,
    coreHitArea: null,
    blackHole: null,
    pc: null,
    galaxy: null,
    codeStream: null,
    planets: [],
    frame: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  };
  var coreMessageTimer = null;

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getProfile() {
    return portfolioData.profile || {};
  }
  function getModule(id) {
    return (
      modules.filter(function (item) {
        return item.id === id;
      })[0] || modules[0]
    );
  }
  function linkFor(value) {
    var link = String(value || "#");
    if (
      /^https?:\/\//i.test(link) ||
      /^mailto:/i.test(link) ||
      /^tel:/i.test(link) ||
      link.charAt(0) === "#"
    )
      return link;
    if (link.indexOf("@") > -1 && link.indexOf("/") === -1)
      return "mailto:" + link;
    if (/^[+\d\s().-]+$/.test(link))
      return "tel:" + link.replace(/[^\d+]/g, "");
    return link;
  }
  function socialLinks(items) {
    return (items || [])
      .map(function (social) {
        return (
          '<a href="' +
          escapeHtml(linkFor(social.url)) +
          '" target="_blank" rel="noopener" aria-label="' +
          escapeHtml(social.label) +
          '">' +
          escapeHtml(social.label) +
          " ↗</a>"
        );
      })
      .join("");
  }

  function renderNavigation() {
    var orbit = document.getElementById("orbitNav");
    var mobile = document.getElementById("mobileNavGrid");
    orbit.innerHTML =
      '<span class="orbit-nav-title">SELECT MODULE</span><span class="orbit-nav-subtitle">CLICK TO CONNECT</span>' +
      modules
        .map(function (item) {
          return (
            '<button class="orbit-button" type="button" data-section="' +
            item.id +
            '" aria-label="Open ' +
            escapeHtml(item.label) +
            ' module"><span class="orbit-index">' +
            item.code +
            '</span><span class="orbit-label">' +
            escapeHtml(item.label) +
            '</span><span class="orbit-link" aria-hidden="true">↗</span></button>'
          );
        })
        .join("");
    mobile.innerHTML = modules
      .map(function (item) {
        return (
          '<button type="button" data-section="' +
          item.id +
          '"><span>' +
          item.code +
          "</span> / " +
          escapeHtml(item.label) +
          "</button>"
        );
      })
      .join("");
  }

  function renderHero() {
    var profile = getProfile();
    document.getElementById("brandName").textContent = (
      profile.name || "PORTFOLIO"
    )
      .split(" ")[0]
      .toUpperCase();
    document.getElementById("heroCopy").textContent =
      (profile.role || "Software student") +
      ". " +
      (profile.school || "Building useful digital experiences") +
      ".";
    document.getElementById("readoutLocation").textContent = (
      profile.location || "REMOTE"
    ).toUpperCase();
    document.getElementById("footerText").textContent =
      "© " +
      new Date().getFullYear() +
      " — " +
      (portfolioData.site.footerNote || "DIGITAL PORTFOLIO");
    document.title = portfolioData.site.title || "Portfolio Interface";
  }

  function profileMarkup() {
    var profile = getProfile();
    return (
      '<div class="profile-grid"><div>' +
      '<p class="profile-lead">' +
      escapeHtml(profile.name || "Digital creator") +
      "</p>" +
      "<p>" +
      escapeHtml(profile.role || "") +
      ". " +
      escapeHtml(profile.school || "") +
      ". " +
      escapeHtml(profile.status || "") +
      ".</p>" +
      '<div class="data-list"><div><dt>LOCATION</dt><dd>' +
      escapeHtml(profile.location || "—") +
      "</dd></div><div><dt>FOCUS</dt><dd>Frontend / Security</dd></div></div>" +
      '<div class="tag-list">' +
      (profile.tags || [])
        .map(function (tag) {
          return '<span class="tag">' + escapeHtml(tag) + "</span>";
        })
        .join("") +
      "</div></div>" +
      '<div class="panel-side-note"><strong>AI NOTE</strong>Curious mind detected.<br><br>Currently learning, experimenting, and turning small ideas into working interfaces.</div></div>'
    );
  }

  function aboutMarkup() {
    var about = portfolioData.about || {};
    var education = portfolioData.education || [];
    return (
      '<p class="profile-lead">' +
      escapeHtml(about.background || "") +
      "</p>" +
      '<div class="profile-grid"><div><div class="info-card"><span class="contact-label">WHY RPL</span><p>' +
      escapeHtml(about.whyRPL || "") +
      '</p></div><div class="info-card" style="margin-top:14px"><span class="contact-label">VISION</span><p>' +
      escapeHtml(about.vision || "") +
      '</p></div></div><div><span class="contact-label">MISSION LOG</span><ul class="bullet-list">' +
      (about.missions || [])
        .map(function (mission) {
          return "<li>" + escapeHtml(mission) + "</li>";
        })
        .join("") +
      '</ul></div></div><div style="margin-top:30px"><span class="contact-label">EDUCATION TRACE</span><div class="timeline-list">' +
      education
        .map(function (item) {
          return (
            '<div class="info-card"><small>' +
            escapeHtml(item.period) +
            "</small><div><h3>" +
            escapeHtml(item.name) +
            "</h3><p>" +
            escapeHtml(item.level) +
            " — " +
            escapeHtml(item.note) +
            "</p></div></div>"
          );
        })
        .join("") +
      "</div></div>"
    );
  }

  function skillsMarkup() {
    var languages = portfolioData.languages || [];
    var tools = portfolioData.tools || [];
    return (
      '<div class="skill-list">' +
      languages
        .map(function (skill) {
          var level = Math.max(0, Math.min(100, Number(skill.level) || 0));
          return (
            '<div class="skill-line"><span>' +
            escapeHtml(skill.name) +
            '</span><span class="skill-track"><i style="--level:' +
            level +
            '%"></i></span><strong>' +
            level +
            "%</strong></div>"
          );
        })
        .join("") +
      '</div><div class="chip-list">' +
      tools
        .map(function (tool) {
          return (
            '<span class="chip">' +
            escapeHtml(tool.symbol) +
            " &nbsp;" +
            escapeHtml(tool.name) +
            "</span>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function projectsMarkup() {
    return (
      '<div class="project-grid">' +
      (portfolioData.projects || [])
        .map(function (project) {
          return (
            '<a class="project-card" href="' +
            escapeHtml(linkFor(project.link)) +
            '" target="_blank" rel="noopener"><span class="project-year">' +
            escapeHtml(project.year) +
            "</span><h3>" +
            escapeHtml(project.title) +
            "</h3><p>" +
            escapeHtml(project.description) +
            '</p><div class="tag-list">' +
            (project.tags || [])
              .map(function (tag) {
                return '<span class="tag">' + escapeHtml(tag) + "</span>";
              })
              .join("") +
            "</div></a>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function certificatesMarkup() {
    return (
      '<div class="certificate-grid">' +
      (portfolioData.certificates || [])
        .map(function (certificate) {
          return (
            '<a class="certificate-card" href="' +
            escapeHtml(linkFor(certificate.link)) +
            '" target="_blank" rel="noopener"><span class="certificate-icon">✦</span><div><h3>' +
            escapeHtml(certificate.title) +
            "</h3><p>" +
            escapeHtml(certificate.issuer) +
            '</p><span class="cert-date">' +
            escapeHtml(certificate.date) +
            "</span></div></a>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function contactMarkup() {
    var contact = portfolioData.contact || {};
    return (
      '<div class="contact-grid"><div class="info-card"><span class="contact-label">EMAIL</span><span class="contact-value">' +
      escapeHtml(contact.email) +
      '</span></div><div class="info-card"><span class="contact-label">PHONE</span><span class="contact-value">' +
      escapeHtml(contact.phone) +
      '</span></div><div class="info-card"><span class="contact-label">LOCATION</span><span class="contact-value">' +
      escapeHtml(contact.address) +
      '</span><div class="social-links">' +
      socialLinks(contact.socials) +
      "</div></div></div>"
    );
  }

  function contentFor(id) {
    if (id === "profile") return profileMarkup();
    if (id === "about") return aboutMarkup();
    if (id === "skills") return skillsMarkup();
    if (id === "projects") return projectsMarkup();
    if (id === "certificates") return certificatesMarkup();
    return contactMarkup();
  }

  function openPanel(id) {
    var module = getModule(id);
    var panel = document.getElementById("contentPanel");
    document.getElementById("panelIndex").textContent = module.code + " / 06";
    document.getElementById("panelKicker").textContent =
      module.label + " MODULE";
    document.getElementById("panelTitle").textContent = module.label;
    document.getElementById("panelContent").innerHTML = contentFor(module.id);
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    document.querySelectorAll("[data-section]").forEach(function (item) {
      item.classList.toggle(
        "is-active",
        item.getAttribute("data-section") === module.id,
      );
    });
    if (history.replaceState) history.replaceState(null, "", "#" + module.id);
    document.getElementById("panelClose").focus();
    closeMobileNav();
  }

  function closePanel() {
    var panel = document.getElementById("contentPanel");
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".orbit-button").forEach(function (item) {
      item.classList.remove("is-active");
    });
    if (history.replaceState)
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
  }

  function closeMobileNav() {
    var nav = document.getElementById("mobileNav");
    var trigger = document.getElementById("menuTrigger");
    nav.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  }

  function initInteractions() {
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-section]");
      if (trigger) openPanel(trigger.getAttribute("data-section"));
    });
    document.getElementById("panelClose").addEventListener("click", closePanel);
    document
      .querySelector(".panel-backdrop")
      .addEventListener("click", closePanel);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closePanel();
        closeMobileNav();
      }
    });
    document
      .getElementById("menuTrigger")
      .addEventListener("click", function () {
        var nav = document.getElementById("mobileNav");
        var open = nav.classList.toggle("is-open");
        this.setAttribute("aria-expanded", String(open));
      });
    document
      .getElementById("mobileNavClose")
      .addEventListener("click", closeMobileNav);
    if (
      window.location.hash &&
      modules.some(function (item) {
        return item.id === window.location.hash.slice(1);
      })
    ) {
      openPanel(window.location.hash.slice(1));
    }
  }

  function initClock() {
    function tick() {
      var now = new Date();
      document.getElementById("clock").textContent = [
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
      ]
        .map(function (part) {
          return String(part).padStart(2, "0");
        })
        .join(":");
    }
    tick();
    window.setInterval(tick, 1000);
  }

  function updateStatus() {
    var status = document.getElementById("aiStatus");
    statusIndex = (statusIndex + 1) % statusMessages.length;
    status.textContent = statusMessages[statusIndex];
    document.getElementById("readoutMode").textContent =
      statusMessages[statusIndex] === "READY" ? "CREATIVE" : "PROCESSING";
  }

  function makeCodeTexture() {
    var canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 500;
    var context = canvas.getContext("2d");
    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return { canvas: canvas, context: context, texture: texture };
  }

  function makeCodeSprite(text) {
    var canvas = document.createElement("canvas");
    canvas.width = 420;
    canvas.height = 72;
    var context = canvas.getContext("2d");
    context.font = "22px monospace";
    context.fillStyle = "rgba(135, 255, 241, .82)";
    context.shadowColor = "#36e8da";
    context.shadowBlur = 10;
    context.fillText(text, 8, 43);
    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    var material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    var sprite = new THREE.Sprite(material);
    sprite.scale.set(1.12, 0.19, 1);
    return sprite;
  }

  function addGalaxyCodeBackdrop(scene) {
    var group = new THREE.Group();
    group.position.y = 0.38;

    var starPositions = [];
    var starColors = [];
    var arms = 4;
    for (var i = 0; i < 900; i += 1) {
      var radius = Math.pow(Math.random(), 0.62) * 4.4;
      var arm = i % arms;
      var angle =
        radius * 1.75 +
        (Math.PI * 2 * arm) / arms +
        (Math.random() - 0.5) * 0.62;
      var spread = (Math.random() - 0.5) * (0.18 + radius * 0.16);
      starPositions.push(
        Math.cos(angle) * radius + Math.cos(angle + Math.PI / 2) * spread,
        (Math.random() - 0.5) * (0.12 + radius * 0.1),
        Math.sin(angle) * radius + Math.sin(angle + Math.PI / 2) * spread - 0.8,
      );
      var tint = i % 5 === 0 ? [0.35, 0.55, 1] : [0.2, 1, 0.86];
      starColors.push(tint[0], tint[1], tint[2]);
    }
    var starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    starGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(starColors, 3),
    );
    group.add(
      new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({
          size: 0.026,
          vertexColors: true,
          transparent: true,
          opacity: 0.72,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );

    var codeStream = new THREE.Group();
    var codeLines = getProfile().typingLines || [
      "const core = true;",
      "return portfolio;",
      "01010101",
    ];
    for (var codeIndex = 0; codeIndex < 34; codeIndex += 1) {
      var streamAngle = (Math.PI * 2 * codeIndex) / 34 + (codeIndex % 3) * 0.05;
      var streamRadius = 2.65 + (codeIndex % 5) * 0.25;
      var codeSprite = makeCodeSprite(codeLines[codeIndex % codeLines.length]);
      codeSprite.scale.set(0.62, 0.105, 1);
      codeSprite.material.opacity = codeIndex % 4 === 0 ? 0.7 : 0.28;
      codeSprite.position.set(
        Math.cos(streamAngle) * streamRadius,
        ((codeIndex % 7) - 3) * 0.12,
        Math.sin(streamAngle) * streamRadius - 0.6,
      );
      codeSprite.rotation.z = -streamAngle + Math.PI / 2;
      codeStream.add(codeSprite);
    }
    group.add(codeStream);

    var galaxyCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 20, 20),
      new THREE.MeshBasicMaterial({
        color: 0x187e9c,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(galaxyCore);
    scene.add(group);
    sceneState.galaxy = group;
    sceneState.codeStream = codeStream;
  }

  function addCodePlanet(
    scene,
    position,
    radius,
    color,
    codeLines,
    speed,
    phase,
  ) {
    var planet = new THREE.Group();
    planet.position.set(position[0], position[1], position[2]);
    planet.userData.speed = speed;
    planet.userData.phase = phase;

    var surface = new THREE.Mesh(
      new THREE.IcosahedronGeometry(radius, 2),
      new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
      }),
    );
    planet.add(surface);

    var core = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.7, 16, 16),
      new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    planet.add(core);

    var ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 1.35, radius * 0.018, 6, 64),
      new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
      }),
    );
    ring.rotation.x = Math.PI * 0.58;
    ring.rotation.z = 0.25;
    planet.add(ring);

    for (var index = 0; index < 5; index += 1) {
      var code = makeCodeSprite(codeLines[index % codeLines.length]);
      code.scale.set(radius * 0.56, radius * 0.09, 1);
      code.position.set(
        Math.cos(index * 1.25) * radius * 1.12,
        (index - 2) * radius * 0.22,
        Math.sin(index * 1.25) * radius * 1.12,
      );
      code.rotation.z = index * 0.18;
      code.material.opacity = index % 2 === 0 ? 0.7 : 0.4;
      planet.add(code);
    }

    scene.add(planet);
    sceneState.planets.push(planet);
  }

  function addBlackHole(scene, position, radius, codeLines, speed, phase) {
    var blackHole = new THREE.Group();
    blackHole.position.set(position[0], position[1], position[2]);
    blackHole.userData.speed = speed;
    blackHole.userData.phase = phase;
    blackHole.userData.isBlackHole = true;
    sceneState.blackHole = blackHole;

    // The black center represents the observable shadow; the horizon is
    // visible through the hot photon ring and distorted accretion disk.
    var shadow = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.8, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    );
    blackHole.add(shadow);

    var photonRing = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.88, radius * 0.09, 12, 128),
      new THREE.MeshBasicMaterial({
        color: 0xff9d45,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    photonRing.scale.y = 0.78;
    blackHole.add(photonRing);
    blackHole.userData.eventHorizon = photonRing;

    var horizonHalo = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.98, radius * 0.025, 8, 128),
      new THREE.MeshBasicMaterial({
        color: 0xffe0a1,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    horizonHalo.scale.y = 0.8;
    blackHole.add(horizonHalo);

    // A real accretion disk is flattened and brighter on the approaching side.
    [1, 0.82, 0.62].forEach(function (scale, index) {
      var disk = new THREE.Mesh(
        new THREE.TorusGeometry(
          radius * (1.12 + index * 0.16),
          radius * (0.11 - index * 0.018),
          10,
          128,
        ),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? 0xff5b28 : index === 1 ? 0xffa13d : 0xffe0a1,
          transparent: true,
          opacity: 0.82 - index * 0.13,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      disk.scale.y = 0.18 * scale;
      disk.rotation.x = Math.PI * 0.56;
      disk.rotation.z = -0.16 + index * 0.05;
      blackHole.add(disk);
    });

    var hotSide = new THREE.Mesh(
      new THREE.TorusGeometry(
        radius * 1.28,
        radius * 0.16,
        8,
        96,
        Math.PI * 1.05,
      ),
      new THREE.MeshBasicMaterial({
        color: 0xfff0b0,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    hotSide.scale.y = 0.22;
    hotSide.rotation.x = Math.PI * 0.56;
    hotSide.rotation.z = -0.65;
    blackHole.add(hotSide);

    var lensGlow = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 1.02, radius * 0.035, 8, 128),
      new THREE.MeshBasicMaterial({
        color: 0xffd78b,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    lensGlow.scale.y = 0.78;
    blackHole.add(lensGlow);

    for (var index = 0; index < 8; index += 1) {
      var code = makeCodeSprite(codeLines[index % codeLines.length]);
      var angle = index * ((Math.PI * 2) / 8);
      var distance = radius * (1.24 + (index % 3) * 0.15);
      code.scale.set(radius * 0.42, radius * 0.065, 1);
      code.position.set(
        Math.cos(angle) * distance,
        Math.sin(index * 1.7) * radius * 0.16,
        Math.sin(angle) * distance,
      );
      code.rotation.z = -angle + Math.PI / 2;
      code.material.opacity = index % 2 === 0 ? 0.65 : 0.3;
      blackHole.add(code);
    }

    var jetMaterial = new THREE.MeshBasicMaterial({
      color: 0x6aa9ff,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    var jet = new THREE.Mesh(
      new THREE.ConeGeometry(radius * 0.16, radius * 2.5, 12),
      jetMaterial,
    );
    jet.rotation.z = Math.PI / 2;
    jet.position.x = radius * 1.2;
    blackHole.add(jet);

    scene.add(blackHole);
    sceneState.planets.push(blackHole);
  }

  function addCodePlanets(scene) {
    var lines = getProfile().typingLines || [
      "const orbit = true;",
      "return code;",
      "01010101",
    ];
    addCodePlanet(
      scene,
      [-3.2, 1.7, -1.9],
      0.34,
      0x6aa9ff,
      lines,
      0.00032,
      0.4,
    );
    addBlackHole(scene, [3.25, 0.8, -1.4], 0.66, lines, -0.00024, 1.7);
    addCodePlanet(
      scene,
      [-3.7, -1.7, -0.9],
      0.24,
      0x5ff9e5,
      lines,
      0.00042,
      2.4,
    );
    addCodePlanet(
      scene,
      [3.45, -2.1, -0.4],
      0.29,
      0xf1b35d,
      lines,
      -0.00036,
      3.1,
    );
  }

  function drawMonitor(textureData, time) {
    var context = textureData.context;
    var canvas = textureData.canvas;
    var profile = getProfile();
    var lines = (
      profile.typingLines || [
        "const portfolio = {",
        "  status: 'online',",
        "  ideas: Infinity,",
        "  build: () => 'ship',",
        "};",
      ]
    ).slice(0, 6);
    context.fillStyle = "#07131d";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#123747";
    context.fillRect(0, 0, canvas.width, 62);
    ["#ff6575", "#ffc857", "#5ff9e5"].forEach(function (color, index) {
      context.beginPath();
      context.fillStyle = color;
      context.arc(30 + index * 26, 31, 8, 0, Math.PI * 2);
      context.fill();
    });
    context.font = "24px monospace";
    context.fillStyle = "#b9f9f1";
    context.fillText("live-portfolio.js", 125, 39);
    context.font = "bold 24px monospace";
    lines.forEach(function (line, index) {
      var y = 112 + index * 55;
      context.fillStyle = "#67a7b4";
      context.fillText(String(index + 1).padStart(2, "0"), 28, y);
      context.fillStyle =
        index % 3 === 0 ? "#73fff0" : index % 3 === 1 ? "#b5cfff" : "#e0b7ff";
      context.fillText(line.slice(0, 42), 82, y);
    });
    context.fillStyle = "rgba(95,249,229,.12)";
    context.fillRect(
      72,
      78 + (Math.floor(time / 480) % Math.max(lines.length, 1)) * 55,
      790,
      40,
    );
    textureData.texture.needsUpdate = true;
  }

  function addSphere(scene) {
    var group = new THREE.Group();
    group.position.y = 0.98;
    var radius = 1.6;
    var wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(radius, 3),
      new THREE.MeshBasicMaterial({
        color: 0x4de8e0,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      }),
    );
    group.add(wire);
    var innerWire = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.92, 16, 10),
      new THREE.MeshBasicMaterial({
        color: 0x589eff,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      }),
    );
    group.add(innerWire);
    var core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.48, 2),
      new THREE.MeshBasicMaterial({
        color: 0x8ffff4,
        transparent: true,
        opacity: 0.9,
      }),
    );
    core.userData.isCore = true;
    group.add(core);
    sceneState.core = core;
    var coreHitArea = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 20, 20),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    coreHitArea.userData.isCoreHitArea = true;
    group.add(coreHitArea);
    sceneState.coreHitArea = coreHitArea;
    var glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x13d8ce,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
      }),
    );
    group.add(glow);

    var particlePositions = [];
    var nodePositions = [];
    for (var i = 0; i < 260; i += 1) {
      var phi = Math.acos(1 - 2 * Math.random());
      var theta = Math.PI * 2 * Math.random();
      var r = radius * (0.9 + Math.random() * 0.16);
      var position = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
      particlePositions.push(position.x, position.y, position.z);
      if (i % 22 === 0) nodePositions.push(position);
    }
    var particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3),
    );
    group.add(
      new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: 0x9cfff4,
          size: 0.028,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    var nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x67fff1 });
    nodePositions.forEach(function (position) {
      var node = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        nodeMaterial,
      );
      node.position.copy(position);
      group.add(node);
    });
    for (var n = 0; n < 5; n += 1) {
      var points = [];
      var start = nodePositions[n];
      var end = nodePositions[(n + 3) % nodePositions.length];
      if (!start || !end) continue;
      points.push(
        start,
        new THREE.Vector3(
          (start.x + end.x) / 2,
          (start.y + end.y) / 2 + 0.35,
          (start.z + end.z) / 2,
        ),
        end,
      );
      var curve = new THREE.CatmullRomCurve3(points);
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(24)),
          new THREE.LineBasicMaterial({
            color: 0x66dfff,
            transparent: true,
            opacity: 0.52,
          }),
        ),
      );
    }
    [0, 0.7, 1.4].forEach(function (offset) {
      var ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius + 0.05, 0.008, 5, 96),
        new THREE.MeshBasicMaterial({
          color: offset === 0.7 ? 0x76a8ff : 0x54f7e1,
          transparent: true,
          opacity: 0.35,
        }),
      );
      ring.rotation.x = offset;
      ring.rotation.y = offset * 0.7;
      group.add(ring);
    });
    var codeLines = getProfile().typingLines || [
      "const portfolio = {",
      "  status: 'online',",
      "  focus: 'build',",
      "  ideas: Infinity,",
      "};",
    ];
    for (var codeIndex = 0; codeIndex < 22; codeIndex += 1) {
      var codePhi = Math.acos(1 - 2 * ((codeIndex + 0.5) / 22));
      var codeTheta = codeIndex * 2.39996;
      var codePosition = new THREE.Vector3(
        (radius + 0.035) * Math.sin(codePhi) * Math.cos(codeTheta),
        (radius + 0.035) * Math.cos(codePhi),
        (radius + 0.035) * Math.sin(codePhi) * Math.sin(codeTheta),
      );
      var codeSprite = makeCodeSprite(codeLines[codeIndex % codeLines.length]);
      codeSprite.position.copy(codePosition);
      codeSprite.material.opacity = codeIndex % 3 === 0 ? 0.9 : 0.48;
      group.add(codeSprite);
    }
    scene.add(group);
    sceneState.sphere = group;
  }

  function addPc(scene) {
    var group = new THREE.Group();
    group.position.set(0, -2.48, 0.25);
    var dark = new THREE.MeshStandardMaterial({
      color: 0x0b1724,
      metalness: 0.75,
      roughness: 0.3,
    });
    var edge = new THREE.MeshStandardMaterial({
      color: 0x1c4350,
      metalness: 0.7,
      roughness: 0.25,
      emissive: 0x062c33,
    });
    var monitor = new THREE.Mesh(new THREE.BoxGeometry(2.65, 1.52, 0.16), dark);
    monitor.position.y = 0.98;
    group.add(monitor);
    var screenData = makeCodeTexture();
    var screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.42, 1.3),
      new THREE.MeshBasicMaterial({ map: screenData.texture }),
    );
    screen.position.set(0, 0.98, 0.091);
    group.add(screen);
    var stand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.44, 0.18), edge);
    stand.position.y = 0.12;
    group.add(stand);
    var base = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.08, 0.48), edge);
    base.position.y = -0.12;
    group.add(base);
    var keyboard = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 0.7), dark);
    keyboard.position.set(0, -0.28, 0.48);
    keyboard.rotation.x = -0.08;
    group.add(keyboard);
    var accent = new THREE.Mesh(
      new THREE.BoxGeometry(1.65, 0.012, 0.012),
      new THREE.MeshBasicMaterial({ color: 0x5ff9e5 }),
    );
    accent.position.set(0, -0.23, 0.83);
    group.add(accent);
    group.userData.screenData = screenData;
    scene.add(group);
    sceneState.pc = group;
  }

  function initThree() {
    if (!window.THREE) {
      document.getElementById("canvasWrap").innerHTML =
        '<div class="canvas-fallback">3D CORE UNAVAILABLE<br><small>Three.js gagal dimuat. Periksa koneksi internet lalu refresh halaman.</small></div>';
      return;
    }
    var canvas = document.getElementById("sceneCanvas");
    var wrap = document.getElementById("canvasWrap");
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
      });
    } catch (error) {
      wrap.innerHTML =
        '<div class="canvas-fallback">3D CORE UNAVAILABLE<br><small>Gunakan browser dengan dukungan WebGL untuk melihat scene.</small></div>';
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    sceneState.renderer = renderer;
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050913, 7, 15);
    var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.1, 10.6);
    camera.lookAt(0, -0.28, 0);
    sceneState.camera = camera;
    scene.add(new THREE.AmbientLight(0x4f91a2, 1.3));
    var keyLight = new THREE.PointLight(0x5ff9e5, 2.5, 10);
    keyLight.position.set(0, 1.4, 3);
    scene.add(keyLight);
    var blueLight = new THREE.PointLight(0x3d6fff, 1.5, 8);
    blueLight.position.set(-3, -1, 2);
    scene.add(blueLight);
    addSphere(scene);
    addGalaxyCodeBackdrop(scene);
    addCodePlanets(scene);
    addPc(scene);
    var floor = new THREE.GridHelper(8, 18, 0x1a6972, 0x0e2937);
    floor.position.y = -2.55;
    floor.material.transparent = true;
    floor.material.opacity = 0.33;
    scene.add(floor);
    var resize = function () {
      var width = wrap.clientWidth;
      var height = wrap.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();
    wrap.addEventListener("pointermove", function (event) {
      var rect = wrap.getBoundingClientRect();
      sceneState.targetY =
        ((event.clientX - rect.left) / rect.width - 0.5) * 0.55;
      sceneState.targetX =
        ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      var hoveringCore =
        raycaster.intersectObject(sceneState.coreHitArea, false).length > 0;
      canvas.style.cursor = hoveringCore ? "pointer" : "grab";
    });
    wrap.addEventListener("pointerdown", function (event) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      var hit = raycaster.intersectObject(sceneState.coreHitArea, false)[0];
      if (hit || isCoreClick(event.clientX, event.clientY, rect))
        showCoreMessage();
    }, true);
    var animate = function (time) {
      sceneState.frame = time;
      var movement = reduceMotion ? 0 : 1;
      sceneState.currentX += (sceneState.targetX - sceneState.currentX) * 0.035;
      sceneState.currentY += (sceneState.targetY - sceneState.currentY) * 0.035;
      if (sceneState.sphere) {
        sceneState.sphere.rotation.x =
          sceneState.currentX + time * 0.00005 * movement;
        sceneState.sphere.rotation.y =
          sceneState.currentY + time * 0.00013 * movement;
        var pulse = 1 + Math.sin(time * 0.002) * 0.06 * movement;
        sceneState.sphere.children[2].scale.setScalar(pulse);
      }
      if (sceneState.galaxy && !reduceMotion) {
        sceneState.galaxy.rotation.y = -time * 0.000018;
        sceneState.galaxy.rotation.z = Math.sin(time * 0.00025) * 0.025;
      }
      if (sceneState.codeStream && !reduceMotion) {
        sceneState.codeStream.rotation.y = time * 0.00005;
      }
      sceneState.planets.forEach(function (planet) {
        if (!reduceMotion) {
          if (planet.userData.isBlackHole) {
            planet.rotation.set(0, 0, 0);
            planet.userData.eventHorizon.rotation.z = time * 0.00028;
          } else {
            planet.rotation.y =
              time * planet.userData.speed + planet.userData.phase;
            planet.rotation.x =
              Math.sin(time * 0.0002 + planet.userData.phase) * 0.12;
          }
        }
      });
      if (sceneState.pc)
        drawMonitor(sceneState.pc.userData.screenData, reduceMotion ? 0 : time);
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    window.requestAnimationFrame(animate);
  }

  function isCoreClick(clientX, clientY, canvasRect) {
    if (!sceneState.core || !sceneState.camera) return false;
    sceneState.core.updateWorldMatrix(true, false);
    sceneState.camera.updateMatrixWorld();
    var corePosition = new THREE.Vector3();
    sceneState.core.getWorldPosition(corePosition);
    corePosition.project(sceneState.camera);
    var coreX = canvasRect.left + ((corePosition.x + 1) / 2) * canvasRect.width;
    var coreY = canvasRect.top + ((1 - corePosition.y) / 2) * canvasRect.height;
    var distance = Math.hypot(clientX - coreX, clientY - coreY);
    return distance <= Math.max(92, Math.min(canvasRect.width, canvasRect.height) * 0.12);
  }

  function initSpaceEvents() {
    var layer = document.getElementById("spaceEvents");
    if (!layer || reduceMotion) return;
    var flashCount = 0;

    function createFlash() {
      var flash = document.createElement("span");
      flash.className = "light-flash";
      flash.style.left = (8 + Math.random() * 84).toFixed(2) + "%";
      flash.style.top = (10 + Math.random() * 72).toFixed(2) + "%";
      layer.appendChild(flash);
      window.setTimeout(function () { flash.remove(); }, 1000);
    }

    function createMeteor() {
      var meteor = document.createElement("span");
      meteor.className = "meteor";
      meteor.style.left = (72 + Math.random() * 28).toFixed(2) + "%";
      meteor.style.top = (-5 + Math.random() * 45).toFixed(2) + "%";
      layer.appendChild(meteor);
      window.setTimeout(function () { meteor.remove(); }, 1800);
    }

    function scheduleFlash() {
      createFlash();
      flashCount += 1;
      if (flashCount % 5 === 0) createMeteor();
      window.setTimeout(scheduleFlash, 900 + Math.random() * 1100);
    }

    window.setTimeout(scheduleFlash, 1200);
  }

  function showCoreMessage() {
    var message = document.getElementById("coreMessage");
    var introduction =
      getProfile().introduction ||
      "Halo, saya Gilang. Saya sedang belajar membangun pengalaman digital melalui kode, desain, dan teknologi.";
    if (!message || !introduction) return;
    var stage = document.querySelector(".orbital-stage");
    var canvas = document.getElementById("sceneCanvas");
    if (stage && canvas && sceneState.camera && sceneState.blackHole) {
      var projected = sceneState.blackHole.position
        .clone()
        .project(sceneState.camera);
      var canvasRect = canvas.getBoundingClientRect();
      var stageRect = stage.getBoundingClientRect();
      var targetX =
        canvasRect.left +
        ((projected.x + 1) / 2) * canvasRect.width -
        (stageRect.left + stageRect.width / 2);
      var targetY =
        canvasRect.top +
        ((1 - projected.y) / 2) * canvasRect.height -
        (stageRect.top + stageRect.height * 0.48);
      message.style.setProperty("--sink-x", targetX.toFixed(1) + "px");
      message.style.setProperty("--sink-y", targetY.toFixed(1) + "px");
    }

    message.textContent = introduction;
    message.classList.remove("is-visible", "is-sinking");
    window.clearTimeout(coreMessageTimer);
    window.requestAnimationFrame(function () {
      message.classList.add("is-visible");
    });
    coreMessageTimer = window.setTimeout(function () {
      message.classList.add("is-sinking");
      coreMessageTimer = window.setTimeout(function () {
        message.classList.remove("is-visible", "is-sinking");
      }, 1450);
    }, 5000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderNavigation();
    renderHero();
    initInteractions();
    initClock();
    initThree();
    initSpaceEvents();
    window.setInterval(updateStatus, reduceMotion ? 8000 : 3500);
  });
})();
