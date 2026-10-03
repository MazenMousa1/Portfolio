(() => {
  "use strict";
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const $ = (id) => document.getElementById(id);
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
  const httpUrl = (value) => {
    try { const url = new URL(value); return ["https:","http:"].includes(url.protocol) ? url.href : ""; }
    catch { return ""; }
  };
  const localAsset = (value) => /^assets\/[\w./ -]+$/i.test(value || "") && !value.includes("..") ? value : "";
  const assetUrl = (value) => localAsset(value) || httpUrl(value);
  const emailAddress = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "") ? value : "";
  // Lucide-style SVG icons: same 24px viewbox, 2px stroke, round caps and joins.
  const paths = {
    sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
    menu:'<path d="M4 5h16M4 12h16M4 19h16"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    "chevron-right":'<path d="m9 18 6-6-6-6"/>',
    "arrow-up-right":'<path d="M7 7h10v10M7 17 17 7"/>',
    download:'<path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5"/>',
    mail:'<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
    github:'<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    whatsapp:'<path d="M20.5 11.5a8.5 8.5 0 0 1-12.58 7.44L3 20l1.1-4.3A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.8 8.5c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.3.4-.1.7.3.6 1.1 1.7 2.1 2.4.7.5 1.2.7 1.6.9.3.1.5.1.7-.2l.8-.9c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .3-.2 1-.6 1.4-.4.4-1.1.7-1.8.7-.5 0-1.2-.1-2.2-.5-1.2-.5-2.5-1.4-3.6-2.5-1-1-1.8-2.1-2.2-3.1-.4-.9-.5-1.4-.5-2.1 0-.6.3-1.2.7-1.6z"/>',
    "code-xml":'<path d="m18 16 4-4-4-4m-12 0-4 4 4 4m8.5-12-5 16"/>',
    code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    "graduation-cap":'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0zM22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    "map-pin":'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    calendar:'<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/>',
    bug:'<path d="M12 20v-9"/><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"/><path d="M14.12 3.88 16 2M21 21a4 4 0 0 0-3.81-4M21 5a4 4 0 0 1-3.55 3.97M22 13h-4M3 21a4 4 0 0 1 3.81-4M3 5a4 4 0 0 0 3.55 3.97M6 13H2m6-11 1.88 1.88M9 7.13V6a3 3 0 1 1 6 0v1.13"/>',
    bot:'<path d="M12 8V4H8M2 14h2M20 14h2M9 13v2M15 13v2"/><rect x="4" y="8" width="16" height="12" rx="2"/>',
    smartphone:'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    "shield-check":'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    trophy:'<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zM6 9H4.5a1 1 0 0 1 0-5H6"/>',
    award:'<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 12a20 20 0 0 0 20 0M12 12v4"/>'
  };
  const icon = (name) => '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.code) + '</svg>';
  const accent = (index) => index % 2 ? "#8b5cf6" : "#3b82f6";
  const unavailableButton = (label, message, iconName, className = "button ghost") => '<button type="button" class="' + className + '" data-notice="' + escape(message) + '">' + (iconName ? icon(iconName) : "") + escape(label) + icon("chevron-right") + "</button>";
  const projectButton = (value) => {
    const url = httpUrl(value);
    const contents = icon("github") + "Open Repository" + icon("arrow-up-right");
    return url
      ? '<a class="button repo-button" href="' + escape(url) + '" target="_blank" rel="noopener noreferrer">' + contents + '</a>'
      : '<button type="button" class="button repo-button" data-notice="The repository link will be added soon.">' + contents + '</button>';
  };

  $("skills-grid").innerHTML = data.skills.map((skill) => {
    const classes = ["skill-tile", skill.priority === "core" ? "is-core" : skill.priority === "tool" ? "is-tool" : "is-standard"];
    if (!skill.icon) classes.push("is-text-only");
    const logo = skill.iconType === "inline"
      ? '<span class="skill-logo-inline" aria-hidden="true">' + icon(skill.icon) + "</span>"
      : skill.icon ? '<img src="assets/icons/' + escape(skill.icon) + '.svg" alt="" width="56" height="56" loading="lazy">' : "";
    return '<article class="' + classes.join(" ") + '">' + logo + '<span>' + escape(skill.name) + "</span></article>";
  }).join("");
  $("services-grid").innerHTML = data.services.map((service, index) => '<article class="card service-card" style="--card-accent:' + accent(index) + '"><div class="icon-box">' + icon(service.icon) + '</div><div><h3>' + escape(service.title) + "</h3><p>" + escape(service.description) + "</p></div></article>").join("");
  $("projects-grid").innerHTML = data.projects.map((project, index) => '<article class="card project-card" style="--card-accent:' + accent(index) + '"><div class="project-category">' + escape(project.category) + '</div><h3>' + escape(project.title) + '</h3><p class="project-description">' + escape(project.description) + '</p><div class="project-tags">' + project.tags.map((tag) => "<span>" + escape(tag) + "</span>").join("") + '</div><div class="project-actions">' + projectButton(project.github) + (httpUrl(project.live) ? '<a class="button ghost" href="' + escape(httpUrl(project.live)) + '" target="_blank" rel="noopener noreferrer">Live Demo ' + icon("arrow-up-right") + "</a>" : "") + "</div></article>").join("");
  $("awards-list").innerHTML = data.achievements.map((award) => {
    const url = httpUrl(award.url);
    return '<' + (url ? 'a href="' + escape(url) + '" target="_blank" rel="noopener noreferrer"' : "article") + ' class="card award-card' + (award.placeholder ? " is-placeholder" : "") + '" style="--card-accent:' + escape(award.color) + '"><div class="icon-box">' + icon(award.icon) + '</div><div class="award-body"><div class="award-label">' + escape(award.label) + "</div><h3>" + escape(award.title) + "</h3><p>" + escape(award.description) + "</p>" + (award.stat ? '<span class="award-stat">' + escape(award.stat) + "</span>" : "") + '</div><span class="award-arrow">' + icon("arrow-up-right") + "</span></" + (url ? "a" : "article") + ">";
  }).join("");

  const socials = [
    {key:"linkedin",name:"LinkedIn",icon:"linkedin",display:"linkedin.com/in/mazen-mahmoud-276077333"},
    {key:"github",name:"GitHub",icon:"github",display:"github.com/MazenMousa1"},
    {key:"email",name:"Email",icon:"mail",display:emailAddress(data.links.email)}
  ];
  const resolveSocialUrl = (key) => key === "email"
    ? (emailAddress(data.links.email) ? "mailto:" + emailAddress(data.links.email) : "")
    : httpUrl(data.links[key]);
  const socialMarkup = socials.map((social) => {
    const value = data.links[social.key];
    const url = resolveSocialUrl(social.key);
    return url ? '<a href="' + escape(url) + '" aria-label="' + social.name + '"' + (social.key === "email" ? "" : ' target="_blank" rel="noopener noreferrer"') + ' title="' + escape(value) + '">' + icon(social.icon) + "</a>"
      : '<button type="button" aria-label="' + social.name + ' — link coming soon" title="' + social.name + '" data-notice="' + social.name + ' details will be added soon.">' + icon(social.icon) + "</button>";
  }).join("");
  document.querySelectorAll("[data-socials]").forEach((element) => { element.innerHTML = socialMarkup; });
  const whatsappDigits = String(data.links.whatsapp || "").replace(/\D/g, "");
  const whatsappInternational = whatsappDigits.startsWith("0") ? "20" + whatsappDigits.slice(1) : whatsappDigits;
  const contactMethods = [
    socials[0],
    ...(whatsappInternational ? [{name:"WhatsApp",icon:"whatsapp",display:data.links.whatsapp,url:"https://wa.me/" + whatsappInternational}] : []),
    socials[2]
  ];
  document.querySelector("[data-contact-links]").innerHTML = contactMethods.map((social) => {
    const url = social.url || resolveSocialUrl(social.key);
    if (!url) return "";
    const label = social.display;
    return '<a class="contact-link" href="' + escape(url) + '"' + (social.key === "email" ? "" : ' target="_blank" rel="noopener noreferrer"') + '><span class="contact-link-icon">' + icon(social.icon) + '</span><span><small>' + escape(social.name) + '</small><strong>' + escape(label) + '</strong></span>' + (social.key === "email" ? "" : icon("arrow-up-right")) + "</a>";
  }).join("");
  document.querySelectorAll("[data-icon]").forEach((element) => { element.outerHTML = icon(element.dataset.icon); });
  const cvButton = document.querySelector('[data-profile-link="cv"]');
  const cvUrl = assetUrl(data.links.cv);
  if (cvUrl) {
    const link = document.createElement("a");
    link.className = cvButton.className;
    link.href = cvUrl;
    link.innerHTML = cvButton.innerHTML;
    link.setAttribute("download", "");
    cvButton.replaceWith(link);
  } else {
    cvButton.dataset.notice = "The CV will be available soon.";
  }

  function setPhoto(id, source, fallback, alt) {
    const image = $(id);
    const url = assetUrl(source);
    if (!url) return;
    image.addEventListener("error", () => { image.src = fallback; image.alt = "Image placeholder"; }, {once:true});
    image.src = url;
    image.alt = alt;
  }
  setPhoto("profile-photo", data.profile.photo, "assets/images/profile-placeholder.svg", data.profile.name);
  setPhoto("university-logo", data.profile.universityLogo, "assets/images/university-placeholder.svg", data.profile.university + " logo");
  if (data.profile.university) $("university-name").textContent = data.profile.university;
  if (data.profile.studyDates) $("study-dates").textContent = data.profile.studyDates;
  $("year").textContent = new Date().getFullYear();

  let toastTimer;
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-notice]");
    if (!trigger) return;
    const toast = $("toast");
    toast.textContent = trigger.dataset.notice;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
  });

  const menu = document.querySelector(".menu-toggle");
  const navigation = $("navigation");
  const header = $("topbar");
  function setMenu(open) {
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.innerHTML = icon(open ? "close" : "menu");
    navigation.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
  }
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
  navigation.addEventListener("click", (event) => { if (event.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { setMenu(false); menu.focus(); }
  });
  document.addEventListener("click", (event) => { if (!event.composedPath().includes(header)) setMenu(false); });
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", updateHeader, {passive:true});
  updateHeader();

  // Text-only animation; page visibility never depends on JavaScript or animation.
  const roles = data.profile.roles;
  const roleElement = $("typed-role");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  roleElement.textContent = roles[0] || "Software Engineer";
  if (!reducedMotion.matches && roles.length > 1) {
    let roleIndex = 0, position = roles[0].length, removing = true, timer;
    const tick = () => {
      if (document.hidden) { timer = setTimeout(tick, 1000); return; }
      const word = roles[roleIndex];
      position += removing ? -1 : 1;
      roleElement.textContent = word.slice(0, position);
      let delay = removing ? 55 : 80;
      if (position === 0) { removing = false; roleIndex = (roleIndex + 1) % roles.length; delay = 250; }
      else if (position === word.length && !removing) { removing = true; delay = 2200; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 2400);
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) { clearTimeout(timer); roleElement.textContent = roles[0]; }
    });
    window.addEventListener("pagehide", () => clearTimeout(timer), {once:true});
  }
})();
