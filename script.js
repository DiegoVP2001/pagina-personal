/* ===========================
   NAVBAR scroll effect + hamburger
=========================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===========================
   TYPEWRITER EFFECT
=========================== */
const phrases = [
  'Ingeniero Civil Industrial Eléctrico',
  'Educador & Creador de contenido',
  'Campeón Universitario de Cross-Country',
  'Apasionado por la educación equitativa',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex--);
  } else {
    typeEl.textContent = current.substring(0, charIndex++);
  }

  let speed = isDeleting ? 40 : 75;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    charIndex = 0;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}

typeWriter();

/* ===========================
   SCROLL REVEAL
=========================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal, .timeline-item, .edu-card, .highlight-item').forEach(el => {
  revealObserver.observe(el);
});

/* ===========================
   GITHUB REPOS
=========================== */
const GITHUB_USER = 'DiegoVP2001';

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  R: '#198CE7',
  Shell: '#89e051',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
};

async function loadGitHubRepos() {
  const grid = document.getElementById('repos-grid');
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6&type=public`
    );
    if (!res.ok) throw new Error('GitHub API error');
    const repos = await res.json();

    grid.innerHTML = '';

    if (repos.length === 0) {
      grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;">No hay repositorios públicos aún.</p>';
      return;
    }

    repos.forEach((repo, i) => {
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.className = 'repo-card reveal';
      card.style.transitionDelay = `${i * 0.08}s`;

      const lang = repo.language || '';
      const color = langColors[lang] || '#8892B0';

      card.innerHTML = `
        <div class="repo-name">
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/></svg>
          ${repo.name}
        </div>
        <p class="repo-desc">${repo.description || 'Sin descripción.'}</p>
        <div class="repo-footer">
          ${lang ? `<span class="repo-lang"><span class="lang-dot" style="background:${color}"></span>${lang}</span>` : ''}
          <span class="repo-stars">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
            ${repo.stargazers_count}
          </span>
          <span class="repo-forks">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
            ${repo.forks_count}
          </span>
        </div>
      `;

      grid.appendChild(card);
      revealObserver.observe(card);
    });
  } catch (err) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:2rem;">
        <p>No se pudieron cargar los repositorios.</p>
        <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener" class="btn btn-outline" style="margin-top:1rem;display:inline-flex;">
          Ver GitHub →
        </a>
      </div>`;
  }
}

loadGitHubRepos();

/* ===========================
   YOUTUBE VIDEOS (via RSS2JSON)
   Instrucción: reemplaza YOUTUBE_CHANNEL_ID con tu Channel ID.
   Puedes obtenerlo en: https://www.youtube.com/account_advanced
   o buscando en el código fuente de tu canal.
=========================== */
const YOUTUBE_CHANNEL_ID = 'UCUNWj3SvNFBe3nJHiEVYvLA'; // <-- reemplaza si es incorrecto

async function loadYouTubeVideos() {
  const grid = document.getElementById('videos-grid');
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=6`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error();
    const data = await res.json();

    if (data.status !== 'ok' || !data.items?.length) throw new Error();

    grid.innerHTML = '';

    data.items.forEach((video, i) => {
      const videoId = video.link.split('v=')[1]?.split('&')[0] || '';
      const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      const date = new Date(video.pubDate).toLocaleDateString('es-CL', {
        year: 'numeric', month: 'short', day: 'numeric'
      });

      const card = document.createElement('a');
      card.href = video.link;
      card.target = '_blank';
      card.rel = 'noopener';
      card.className = 'video-card reveal';
      card.style.transitionDelay = `${i * 0.08}s`;

      card.innerHTML = `
        <div class="video-thumbnail">
          <img src="${thumbnail}" alt="${video.title}" loading="lazy" />
          <div class="video-play">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="video-info">
          <p class="video-title">${video.title}</p>
          <p class="video-date">${date}</p>
        </div>
      `;

      grid.appendChild(card);
      revealObserver.observe(card);
    });
  } catch (err) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:1rem;">
        <p style="margin-bottom:1rem;">Visita el canal para ver los videos más recientes.</p>
        <a href="https://www.youtube.com/@psudiego" target="_blank" rel="noopener" class="btn btn-youtube" style="display:inline-flex;">
          Ver canal →
        </a>
      </div>`;
  }
}

loadYouTubeVideos();

/* ===========================
   CONTACT FORM (mailto)
=========================== */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const body = `Hola Diego,%0A%0ASoy ${name} (${email}).%0A%0A${message}`;
  const mailto = `mailto:diego010427@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mailto;
});

/* ===========================
   SMOOTH NAV ACTIVE STATE
=========================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
