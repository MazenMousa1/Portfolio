const { links, skills, projects, otherProjects, education, achievements } = window.PORTFOLIO_DATA;

const byId = (id) => document.getElementById(id);
const safeUrl = (url) => typeof url === "string" && /^https?:\/\//i.test(url);
const externalLink = (url, label) => safeUrl(url)
  ? `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`
  : "";

function renderLinks() {
  const socials = [externalLink(links.github, "GitHub"), externalLink(links.linkedin, "LinkedIn"), links.email ? `<a href="mailto:${links.email}">Email</a>` : ""].filter(Boolean).join("");
  byId("hero-socials").innerHTML = socials || `<span class="social-placeholder">Add GitHub · LinkedIn · Email in js/data.js</span>`;
  byId("footer-links").innerHTML = socials || `<span class="social-placeholder">Social links are ready to add</span>`;
  const actions = [
    links.email ? `<a class="button button-light" href="mailto:${links.email}">Email me <span aria-hidden="true">↗</span></a>` : "",
    links.linkedin ? `<a class="button button-outline" href="${links.linkedin}" target="_blank" rel="noreferrer">Connect on LinkedIn</a>` : "",
  ].filter(Boolean).join("");
  byId("contact-actions").innerHTML = actions || `<span class="social-placeholder">Add your email or LinkedIn URL in js/data.js to enable contact buttons.</span>`;
}

function renderSkills() {
  byId("skills-grid").innerHTML = skills.map((group) => `<article class="skill-card reveal"><h3>${group.title}</h3><p>${group.items.map((item) => `<span>${item}</span>`).join("")}</p></article>`).join("");
}

function renderProjects() {
  byId("featured-projects").innerHTML = projects.map((project, index) => {
    const code = safeUrl(project.github) ? `<a class="project-link" href="${project.github}" target="_blank" rel="noreferrer">View code <span>↗</span></a>` : `<span class="project-link">${project.status}</span>`;
    return `<article class="project-card reveal"><div class="project-art art-${project.id}" aria-hidden="true"><span class="art-orbit"></span><span class="art-word">${project.art}<small>${project.id === "iris" ? "LEARN · GROW · CONNECT" : project.id === "scale" ? "WORKFLOW AUTOMATION" : "TEACHER WORKSPACE"}</small></span></div><div class="project-content"><span class="project-index">0${index + 1} / 03</span><span class="project-category">${project.category}</span><h3>${project.title}</h3><p>${project.description}</p><div class="project-meta">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><div class="project-footer"><span class="project-award">${project.award}</span>${code}</div></div></article>`;
  }).join("");
  byId("other-projects").innerHTML = otherProjects.map((project) => `<article class="mini-project reveal"><span class="project-category">${project.category}</span><h4>${project.title}</h4><p>${project.description}</p><span class="mini-stack">${project.stack}</span></article>`).join("");
}

function renderJourney() {
  byId("education-list").innerHTML = education.map((item) => `<article class="timeline-item"><h3>${item.title}</h3><p>${item.detail}</p><small>${item.date}</small></article>`).join("");
  byId("achievement-list").innerHTML = achievements.map((item) => `<article class="achievement"><strong>${item.title}</strong><span>${item.detail}</span><em>${item.note}</em></article>`).join("");
}

function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = byId("site-nav");
  const close = () => { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation"); nav.classList.remove("is-open"); };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
}

function initReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  document.documentElement.classList.add("js-reveal");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}

renderLinks();
renderSkills();
renderProjects();
renderJourney();
byId("year").textContent = new Date().getFullYear();
initNavigation();
initReveals();
