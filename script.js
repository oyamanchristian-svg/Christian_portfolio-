/* ==========================================================================
   CHRISTIAN OYAMAN — PORTFOLIO SCRIPT
   Vanilla JS only. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initSkills();
  initProjects();
  initScrollReveal();
  initActiveNavLink();
  initBackToTop();
  initTypingAnimation();
  initContactForm();
  initBackgroundScene();
});

/* --------------------------------------------------------------------
   Navbar background on scroll
   -------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------
   Mobile hamburger menu
   -------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* --------------------------------------------------------------------
   Theme toggle (dark / light) — persists for the session
   -------------------------------------------------------------------- */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  const stored = sessionStorage ? null : null; // no persistent storage per spec; session-only via JS var
  let theme = 'dark';

  const applyTheme = t => {
    theme = t;
    if (t === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  };

  toggle.addEventListener('click', () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  });
}

/* --------------------------------------------------------------------
   Skills data + render
   -------------------------------------------------------------------- */
function initSkills() {
  const skills = [
    { name: 'HTML', level: 'Semantic markup', pct: 92, icon: 'html' },
    { name: 'CSS', level: 'Layout & animation', pct: 90, icon: 'css' },
    { name: 'JavaScript', level: 'DOM & interactivity', pct: 82, icon: 'js' },
    { name: 'PHP', level: 'Server-side basics', pct: 60, icon: 'php' },
    { name: 'MySQL', level: 'Relational data', pct: 58, icon: 'sql' },
    { name: 'Git', level: 'Version control', pct: 75, icon: 'git' },
    { name: 'Responsive Design', level: 'Mobile-first builds', pct: 88, icon: 'responsive' },
    { name: 'UI / UX Design', level: 'Interfaces that feel right', pct: 78, icon: 'uiux' },
  ];

  const icons = {
    html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m8 4-1 15 5 1.5 5-1.5-1-15z"/><path d="M9.5 9h5l-.3 3H10l.2 2.3L12 15l1.8-.6.2-2"/></svg>',
    css: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m8 4-1 15 5 1.5 5-1.5 1-15z" transform="scale(-1,1) translate(-24,0)"/><path d="M15 9H9.5l.2 2.5H14l-.3 3.2L12 15.3l-1.8-.6-.1-1.4" transform="scale(-1,1) translate(-24,0)"/></svg>',
    js: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9v6.5a1.5 1.5 0 0 1-3 0M15 9v5.5a1.5 1.5 0 0 0 3 0V13"/></svg>',
    php: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="12" rx="9" ry="5.5"/><path d="M8 10h1.4c1 0 1.6.6 1.4 1.6-.2 1-1 1.4-2 1.4H8v-3zM14.2 10h1.4c1 0 1.6.6 1.4 1.6-.2 1-1 1.4-2 1.4h-1.3M15.3 13v2M8 13v2"/></svg>',
    sql: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></svg>',
    git: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="12" r="2"/><path d="M6 8v8M8 6h4a5 5 0 0 1 5 5v-.5"/></svg>',
    responsive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="13" height="9" rx="1.5"/><rect x="17" y="9" width="4.5" height="8" rx="1"/><path d="M8 18h4"/></svg>',
    uiux: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><circle cx="9" cy="9" r="1.4" fill="currentColor" stroke="none"/><path d="M8 15.5c1-1.6 2.4-2.4 4-2.4s3 .8 4 2.4"/></svg>',
  };

  const grid = document.getElementById('skillsGrid');
  const frag = document.createDocumentFragment();

  skills.forEach((skill, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card reveal';
    card.style.transitionDelay = `${(i % 4) * 0.06}s`;
    card.innerHTML = `
      <div class="skill-icon">${icons[skill.icon]}</div>
      <h3 class="skill-name">${skill.name}</h3>
      <p class="skill-level">${skill.level}</p>
      <div class="skill-bar"><div class="skill-bar-fill" data-pct="${skill.pct}"></div></div>
    `;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

/* --------------------------------------------------------------------
   Projects data + render + modal
   -------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: 'Water Booking System',
    category: 'Web Application',
    desc: 'A modern interface for booking and managing water delivery services — built to make scheduling deliveries and tracking orders simple for everyday users. Designed as a personal concept project to practice real-world booking flows.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    thumb: 1,
    iconPath: '<path d="M12 3s6 6.8 6 11a6 6 0 1 1-12 0c0-4.2 6-11 6-11z"/>',
  },
  {
    title: 'Student Enrollment System',
    category: 'Information System',
    desc: 'A user-friendly interface for students to manage enrollment information, from personal details to subject selection. Focused on clear forms, validation, and a layout that reduces confusion during enrollment periods.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    thumb: 2,
    iconPath: '<path d="M12 4 3 8.5 12 13l9-4.5L12 4z"/><path d="M6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/>',
  },
  {
    title: 'Coffee Shop Website',
    category: 'Website Design',
    desc: 'A modern, responsive website concept for a coffee shop — featuring a warm visual identity, a browsable menu layout, and a design built to feel inviting on both desktop and mobile.',
    tags: ['HTML', 'CSS', 'Responsive Design'],
    thumb: 3,
    iconPath: '<path d="M6 9h11v5a5 5 0 0 1-5 5H9a3 3 0 0 1-3-3V9z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M9 4c-.5.7-.5 1.3 0 2M12.5 4c-.5.7-.5 1.3 0 2"/>',
  },
  {
    title: 'E-Commerce Website',
    category: 'Frontend Project',
    desc: 'A clean online shopping interface with product cards, categories, and cart interactions — a personal project built to practice grid layouts, filtering, and interactive UI states.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    thumb: 4,
    iconPath: '<path d="M4 4h2l1.5 10.5A2 2 0 0 0 9.5 16h7a2 2 0 0 0 2-1.6L20 7H6"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>',
  },
];

function initProjects() {
  const grid = document.getElementById('projectsGrid');
  const frag = document.createDocumentFragment();

  PROJECTS.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${(i % 2) * 0.08}s`;
    card.innerHTML = `
      <div class="project-thumb project-thumb-${p.thumb}">
        <div class="project-thumb-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${p.iconPath}</svg>
        </div>
      </div>
      <div class="project-body">
        <span class="project-category">${p.category}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc.split(' — ')[0]}.</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <button class="project-link" data-project-index="${i}">
          View Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    `;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
  initProjectModal();
}

function initProjectModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const titleEl = document.getElementById('modalTitle');
  const categoryEl = document.getElementById('modalCategory');
  const descEl = document.getElementById('modalDesc');
  const tagsEl = document.getElementById('modalTags');
  let lastFocused = null;

  const openModal = (project) => {
    titleEl.textContent = project.title;
    categoryEl.textContent = project.category;
    descEl.textContent = project.desc;
    tagsEl.innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  document.getElementById('projectsGrid').addEventListener('click', e => {
    const btn = e.target.closest('[data-project-index]');
    if (!btn) return;
    openModal(PROJECTS[Number(btn.dataset.projectIndex)]);
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}

/* --------------------------------------------------------------------
   Scroll reveal animations (IntersectionObserver)
   -------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Animate skill bars once their card reveals
        const bar = entry.target.querySelector('.skill-bar-fill');
        if (bar) {
          requestAnimationFrame(() => {
            bar.style.width = bar.dataset.pct + '%';
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
}

/* --------------------------------------------------------------------
   Active nav link while scrolling
   -------------------------------------------------------------------- */
function initActiveNavLink() {
  const sections = ['home', 'education', 'about', 'skills', 'projects', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const links = document.querySelectorAll('.nav-link');

  const setActive = (id) => {
    links.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    // Ignore the observer entirely while we're pinned to the very top —
    // the thin "-40% / -55%" trigger band can miss the short hero section
    // and leave a stale section (e.g. About) marked active. The scroll
    // listener below owns activation near the top instead.
    if (window.scrollY < 80) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => observer.observe(sec));

  // Explicitly force "Home" active whenever we're at (or very near) the
  // top of the page — covers clicking the Home link, the logo, or just
  // scrolling back up manually.
  const checkTop = () => {
    if (window.scrollY < 80) setActive('home');
  };
  checkTop();
  window.addEventListener('scroll', checkTop, { passive: true });
}

/* --------------------------------------------------------------------
   Back to top button
   -------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------
   Typing animation for the hero role
   -------------------------------------------------------------------- */
function initTypingAnimation() {
  const el = document.getElementById('typedRole');
  if (!el) return;

  const roles = ['Developer', 'Web Developer', 'UI Builder', 'Problem Solver'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  const tick = () => {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 1) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
    }

    el.textContent = current.slice(0, charIndex);
    setTimeout(tick, deleting ? 45 : 90);
  };

  setTimeout(tick, 1800);
}

/* --------------------------------------------------------------------
   Contact form validation (frontend only — no submission)
   -------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  const fields = {
    name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
    message: { input: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (field, msg) => {
    fields[field].input.closest('.form-row').classList.toggle('error', Boolean(msg));
    fields[field].error.textContent = msg || '';
  };

  const validate = () => {
    let valid = true;

    if (!fields.name.input.value.trim()) {
      setError('name', 'Please enter your name.');
      valid = false;
    } else {
      setError('name', '');
    }

    const emailVal = fields.email.input.value.trim();
    if (!emailVal) {
      setError('email', 'Please enter your email.');
      valid = false;
    } else if (!emailPattern.test(emailVal)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      setError('email', '');
    }

    if (!fields.message.input.value.trim()) {
      setError('message', 'Please enter a message.');
      valid = false;
    } else if (fields.message.input.value.trim().length < 10) {
      setError('message', 'Message should be at least 10 characters.');
      valid = false;
    } else {
      setError('message', '');
    }

    return valid;
  };

  Object.values(fields).forEach(({ input }) => {
    input.addEventListener('input', () => {
      if (input.closest('.form-row').classList.contains('error')) validate();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.style.color = 'var(--danger)';

    if (!validate()) {
      status.textContent = 'Please fix the highlighted fields.';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.style.color = 'var(--text-dim)';
    status.textContent = 'Sending...';

    setTimeout(() => {
      status.style.color = 'var(--success)';
      status.textContent = 'Message sent successfully! (Demo only)';
      form.reset();
      submitBtn.disabled = false;
    }, 900);
  });
}

/* --------------------------------------------------------------------
   3D-style animated background — floating spheres, cubes, rings +
   particles, drifting slowly with a subtle mouse-parallax effect.
   -------------------------------------------------------------------- */
function initBackgroundScene() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, dpr;
  let shapes = [];
  let particles = [];
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  let rafId = null;

  const ACCENTS = ['91,140,255', '167,139,250', '125,211,252'];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeShapes() {
    shapes = [];
    const count = width < 700 ? 6 : 10;
    const types = ['sphere', 'cube', 'ring'];

    for (let i = 0; i < count; i++) {
      shapes.push({
        type: types[i % types.length],
        x: Math.random() * width,
        y: Math.random() * height,
        size: 28 + Math.random() * 56,
        depth: 0.3 + Math.random() * 0.9, // parallax factor
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.0022,
        driftX: (Math.random() - 0.5) * 0.12,
        driftY: (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2,
        color: ACCENTS[i % ACCENTS.length],
        opacity: 0.12 + Math.random() * 0.18,
      });
    }
  }

  function makeParticles() {
    particles = [];
    const count = width < 700 ? 35 : 70;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.6,
        speedY: 0.04 + Math.random() * 0.08,
        speedX: (Math.random() - 0.5) * 0.05,
        opacity: 0.15 + Math.random() * 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawSphere(s, px, py) {
    const grad = ctx.createRadialGradient(
      px - s.size * 0.3, py - s.size * 0.3, s.size * 0.05,
      px, py, s.size
    );
    grad.addColorStop(0, `rgba(${s.color},${s.opacity + 0.15})`);
    grad.addColorStop(0.6, `rgba(${s.color},${s.opacity * 0.5})`);
    grad.addColorStop(1, `rgba(${s.color},0)`);
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(px, py, s.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${s.color},${s.opacity + 0.1})`;
    ctx.lineWidth = 1;
    ctx.arc(px, py, s.size * 0.62, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawCube(s, px, py) {
    const r = s.size * 0.55;
    const skew = Math.sin(s.rot) * 0.5;
    const depthOffset = r * 0.4;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(s.rot * 0.4);
    ctx.strokeStyle = `rgba(${s.color},${s.opacity + 0.15})`;
    ctx.lineWidth = 1.2;

    // back face
    ctx.strokeRect(-r / 2 + depthOffset * skew, -r / 2 - depthOffset * 0.5, r, r);
    // front face
    ctx.strokeRect(-r / 2, -r / 2, r, r);
    // connecting edges
    ctx.beginPath();
    ctx.moveTo(-r / 2, -r / 2);
    ctx.lineTo(-r / 2 + depthOffset * skew, -r / 2 - depthOffset * 0.5);
    ctx.moveTo(r / 2, -r / 2);
    ctx.lineTo(r / 2 + depthOffset * skew, -r / 2 - depthOffset * 0.5);
    ctx.moveTo(r / 2, r / 2);
    ctx.lineTo(r / 2 + depthOffset * skew, r / 2 - depthOffset * 0.5);
    ctx.moveTo(-r / 2, r / 2);
    ctx.lineTo(-r / 2 + depthOffset * skew, r / 2 - depthOffset * 0.5);
    ctx.stroke();
    ctx.restore();
  }

  function drawRing(s, px, py) {
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(1, 0.42 + Math.sin(s.rot) * 0.15);
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${s.color},${s.opacity + 0.18})`;
    ctx.lineWidth = 2.4;
    ctx.arc(0, 0, s.size * 0.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${s.color},${s.opacity * 0.5})`;
    ctx.lineWidth = 1;
    ctx.arc(0, 0, s.size * 0.82, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    // ease mouse toward target for a soft parallax feel
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    shapes.forEach(s => {
      s.x += s.driftX;
      s.y += s.driftY;
      s.rot += s.rotSpeed * 16;

      if (s.x < -100) s.x = width + 100;
      if (s.x > width + 100) s.x = -100;
      if (s.y < -100) s.y = height + 100;
      if (s.y > height + 100) s.y = -100;

      const bob = Math.sin(time * 0.0004 + s.phase) * 10;
      const px = s.x + targetX * s.depth * 18;
      const py = s.y + targetY * s.depth * 18 + bob;

      if (s.type === 'sphere') drawSphere(s, px, py);
      else if (s.type === 'cube') drawCube(s, px, py);
      else drawRing(s, px, py);
    });

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const twinkle = 0.6 + Math.sin(time * 0.002 + p.twinklePhase) * 0.4;
      ctx.beginPath();
      ctx.fillStyle = `rgba(220,228,255,${p.opacity * twinkle})`;
      ctx.arc(p.x + targetX * 6, p.y + targetY * 6, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    rafId = requestAnimationFrame(animate);
  }

  function handlePointerMove(e) {
    const cx = width / 2;
    const cy = height / 2;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const y = (e.touches ? e.touches[0].clientY : e.clientY);
    mouseX = (x - cx) / cx;
    mouseY = (y - cy) / cy;
  }

  resize();
  makeShapes();
  makeParticles();

  window.addEventListener('resize', () => {
    resize();
    makeShapes();
    makeParticles();
  });
  window.addEventListener('mousemove', handlePointerMove, { passive: true });
  window.addEventListener('touchmove', handlePointerMove, { passive: true });

  if (reduceMotion) {
    // Draw a single static frame instead of a continuous loop
    animate(0);
    if (rafId) cancelAnimationFrame(rafId);
    return;
  }

  rafId = requestAnimationFrame(animate);
}