window.PORTFOLIO_DATA = {
links: {
  email: "", // Add your professional email.
  github: "", // Add your GitHub profile URL.
  linkedin: "", // Add your LinkedIn profile URL.
  cv: "", // Add your CV file under assets/documents and set its path here.
},

skills: [
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Responsive UI"] },
  { title: "Backend & .NET", items: ["C#", "ASP.NET Core", "REST APIs", "Entity Framework Core", "JWT"] },
  { title: "Data & architecture", items: ["SQL Server", "Database design", "Clean Architecture", "Multi-tenant systems"] },
  { title: "AI & product", items: ["Applied AI", "Personalized learning", "Product thinking", "Arabic / English UX"] },
  { title: "Automation", items: ["Python", "Excel automation", "UI automation", "PyInstaller"] },
  { title: "Tools & delivery", items: ["Git", "GitHub", "Vite", "Cloudflare Pages", "GitHub Pages"] },
],

projects: [
  { id: "iris", title: "IRIS", category: "AI · EDUCATION · SOCIAL IMPACT", art: "IRIS", description: "An AI-powered educational platform exploring more personalized learning and structured guidance for children with Down Syndrome and Williams Syndrome, and their families.", tags: ["Personalized learning", "Parent guidance", "Progress tracking"], award: "2nd Place · GDG Hackathon · 100+ teams", status: "Hackathon project", github: "", live: "" },
  { id: "teacherhub", title: "TeacherHub", category: "FULL-STACK · SAAS · .NET", art: "TH", description: "A teacher-focused SaaS platform for managing students, groups, exams, grades, attendance, and communication, built around a maintainable multi-tenant architecture.", tags: ["ASP.NET Core 8", "Clean Architecture", "EF Core · SQL Server"], award: "Backend APIs · JWT · React", status: "In development", github: "", live: "" },
  { id: "scale", title: "A-SCALE PLU Updater", category: "DESKTOP AUTOMATION · PYTHON", art: "PLU", description: "A Windows automation utility that transfers product names, codes, and prices from Excel into A-SCALE, reducing repetitive business data entry.", tags: ["Python", "Excel processing", "UI automation"], award: "Packaged for Windows · ~312 test runs", status: "Built for an operational workflow", github: "", live: "" },
],

otherProjects: [
  { title: "Shadow Rooftop", category: "MOBILE-FIRST WEB", description: "A premium, QR-ready digital menu for a rooftop venue, designed for fast phone browsing and clear food photography.", stack: "Responsive UI · Cloudflare Pages" },
  { title: "KYND Café Menu", category: "FRONTEND", description: "A lightweight digital café menu with category navigation and a mobile-first experience for QR access.", stack: "HTML · CSS · JavaScript" },
  { title: "Home-and-Car", category: "PRODUCT CONCEPT", description: "A service platform concept connecting customers to cars and technical services through a simple bilingual experience.", stack: "Arabic / English · Mobile-first" },
  { title: "CodeForge-Studio", category: "AI · EXPERIMENTAL", description: "An evolving exploration of AI-assisted video editing, automated storytelling, captions, and camera direction logic.", stack: "Experimental · Multi-milestone" },
],

education: [
  { title: "Faculty of Computers & Artificial Intelligence", detail: "University studies · Computer & AI", date: "Current" },
  { title: "Digital Egypt Pioneers Initiative (DEPI)", detail: ".NET Development / C# track · Backend, SQL, database design", date: "Training" },
  { title: "ITIDA Gigs", detail: "Freelancing training / program", date: "Program" },
],

achievements: [
  { title: "2nd Place · GDG Hackathon", detail: "IRIS · Egyptian Chinese University · 100+ participating teams", note: "IRIS" },
  { title: "Top 6 · IEEE-related event", detail: "IRIS was selected among the top six projects in an IEEE-related conference or competition.", note: "IRIS" },
  { title: "Engineers Syndicate competition", detail: "Participated with IRIS in a competition related to the Engineers Syndicate.", note: "Participation" },
  { title: "ITIDA-SECC Software Testing Competition", detail: "Participated in the software testing competition.", note: "Participation" },
]
};
