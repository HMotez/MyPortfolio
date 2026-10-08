/* Localized fields are { en, fr } — read them through `tr()` from useLang(). */

export const personalInfo = {
  name: "Hamzaoui Moetez",
  title: { en: "Full-Stack Developer", fr: "Développeur Full-Stack" },
  email: "hamzaouii.moetez@gmail.com",
  phone: "+216 95 200 179",
  location: { en: "Monastir, Tunisia", fr: "Monastir, Tunisie" },
  timeZone: "Africa/Tunis",
  github: "https://github.com/HMotez",
  linkedin: "https://linkedin.com/in/hamzaoui-moetez",
  bio: [
    {
      en: "I'm a freshly graduated Software Engineering student from the Faculty of Sciences of Monastir, with hands-on experience building full-stack web applications, integrating AI, and managing Agile projects.",
      fr: "Jeune diplômé en génie logiciel de la Faculté des Sciences de Monastir, j’ai une expérience concrète du développement d’applications web full-stack, de l’intégration de l’IA et de la gestion de projets Agile.",
    },
    {
      en: "During my final-year internship at ACTIA Engineering Services, I developed an ISO 9001-compliant Document Management System — from architecture design to Docker deployment.",
      fr: "Lors de mon stage de fin d’études chez ACTIA Engineering Services, j’ai développé un système de gestion documentaire conforme à la norme ISO 9001 — de la conception de l’architecture jusqu’au déploiement Docker.",
    },
    {
      en: "I'm currently seeking an alternance opportunity to grow in a stimulating environment and contribute to high-impact projects.",
      fr: "Je recherche actuellement une alternance pour évoluer dans un environnement stimulant et contribuer à des projets à fort impact.",
    },
  ],
  stats: [
    { number: "3+", key: "years" },
    { number: "5+", key: "projects" },
    { number: "3", key: "languages" },
  ],
};

/* `category` is the stable id (used for icons); `label` is what's displayed */
export const skills = [
  {
    category: "Languages",
    label: { en: "Languages", fr: "Langages" },
    color: "#06b6d4",
    items: ["Python", "Java", "JavaScript", "C", "C++", "C#", ".NET"],
  },
  {
    category: "Backend",
    label: { en: "Backend", fr: "Backend" },
    color: "#a855f7",
    items: ["Node.js", "Express.js", "Spring Boot", "PHP", "JavaEE"],
  },
  {
    category: "Frontend",
    label: { en: "Frontend", fr: "Frontend" },
    color: "#ec4899",
    items: ["React.js", "JavaScript", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Databases & Tools",
    label: { en: "Databases & Tools", fr: "Bases de données & Outils" },
    color: "#f59e0b",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "Git/GitHub", "Docker", "Postman"],
  },
  {
    category: "AI & Automation",
    label: { en: "AI & Automation", fr: "IA & Automatisation" },
    color: "#10b981",
    items: ["Machine Learning", "NLP", "n8n Automation"],
  },
  {
    category: "Methodology",
    label: { en: "Methodology", fr: "Méthodologie" },
    color: "#06b6d4",
    items: ["Scrum / Agile", "UML", "REST APIs", "SOA", "JWT Auth"],
  },
];

export const experiences = [
  {
    type: "work",
    title: { en: "Full-Stack Developer Intern (PFE)", fr: "Stagiaire Développeur Full-Stack (PFE)" },
    company: "ACTIA Engineering Services",
    period: { en: "Feb 2026 – Jun 2026", fr: "Févr. 2026 – Juin 2026" },
    location: { en: "Monastir, Tunisia", fr: "Monastir, Tunisie" },
    description: {
      en: "Designed and developed an ISO 9001-compliant Electronic Document Management System (DMS) for the Quality Management System. Built end-to-end with Node.js, Express.js, React.js, PostgreSQL and Docker. Integrated NLP for automated document quality analysis.",
      fr: "Conception et développement d’un système de gestion électronique de documents (GED) conforme ISO 9001 pour le système de management de la qualité. Réalisé de bout en bout avec Node.js, Express.js, React.js, PostgreSQL et Docker. Intégration du NLP pour l’analyse automatique de la qualité des documents.",
    },
    tags: ["Node.js", "React.js", "PostgreSQL", "Docker", "NLP", "Scrum"],
  },
  {
    type: "edu",
    title: { en: "BSc Software Engineering & Information Systems", fr: "Licence en Génie Logiciel & Systèmes d’Information" },
    company: "Faculté des Sciences de Monastir (FSM)",
    period: { en: "2023 – 2026", fr: "2023 – 2026" },
    location: { en: "Monastir, Tunisia", fr: "Monastir, Tunisie" },
    description: {
      en: "Graduated with a degree in Software Engineering. Core modules: Advanced Algorithms, OOP, Web Development, UML & Software Design, Databases, Operating Systems, Networks.",
      fr: "Diplômé en génie logiciel. Modules principaux : algorithmique avancée, POO, développement web, UML & conception logicielle, bases de données, systèmes d’exploitation, réseaux.",
    },
    tags: [],
  },
  {
    type: "edu",
    title: { en: "Baccalauréat — Computer Science", fr: "Baccalauréat — Informatique" },
    company: "Lycée Jedlienne",
    period: { en: "2023", fr: "2023" },
    location: { en: "Jedlienne, Tunisia", fr: "Jedlienne, Tunisie" },
    description: {
      en: "High school diploma in Computer Science with strong foundations in algorithms and programming.",
      fr: "Baccalauréat en informatique avec de solides bases en algorithmique et en programmation.",
    },
    tags: [],
  },
];

/* `title` is a product name (also the id for icons) and stays untranslated */
export const projects = [
  {
    title: "AI Medical Assistant",
    subtitle: { en: "AI · Live 2026", fr: "IA · En ligne 2026" },
    description: {
      en: "AI-powered medical triage platform: describe symptoms in free text (EN/FR) and get calibrated top-5 conditions, urgency, the right specialist and explanations per symptom. Includes verified-doctor review, admin dashboard, bilingual PDF reports and a 3D health timeline.",
      fr: "Plateforme de triage médical basée sur l’IA : décrivez vos symptômes en texte libre (FR/EN) et obtenez les 5 pathologies les plus probables (probabilités calibrées), l’urgence, le spécialiste à consulter et l’influence de chaque symptôme. Avec relecture par des médecins vérifiés, tableau de bord admin, rapports PDF bilingues et timeline santé en 3D.",
    },
    tags: ["FastAPI", "React", "scikit-learn", "PostgreSQL", "Docker", "Three.js"],
    github: "https://github.com/HMotez/AI-Medical-Assistant",
    demo: "https://medai-hmotez.onrender.com",
    featured: true,
  },
  {
    title: "TrueCare AI — Medical Reimbursements",
    subtitle: { en: "AI 2025", fr: "IA 2025" },
    description: {
      en: "AI-powered predictive solution for healthcare reimbursement claims. Analyzes medical documents, insurance policies, and legal regulations to predict accurate reimbursement amounts and detect fraud.",
      fr: "Solution prédictive basée sur l’IA pour les demandes de remboursement de santé. Analyse les documents médicaux, les contrats d’assurance et la réglementation pour prédire le montant exact du remboursement et détecter la fraude.",
    },
    tags: ["Python", "Machine Learning", "NLP"],
    github: "https://github.com/HMotez/MedClaimML",
    featured: true,
  },
  {
    title: "Hotel Management System",
    subtitle: { en: "Desktop 2024", fr: "Bureau 2024" },
    description: {
      en: "Desktop application for hotel management with staff tracking, room management, booking operations, and real-time availability checks. Built with JavaFX admin interface and MySQL database.",
      fr: "Application de bureau pour la gestion hôtelière : suivi du personnel, gestion des chambres, réservations et vérification de la disponibilité en temps réel. Interface d’administration JavaFX et base de données MySQL.",
    },
    tags: ["Java", "JavaFX", "MySQL"],
    github: "https://github.com/HMotez/HotelSystem",
    featured: false,
  },
  {
    title: "University SOA System",
    subtitle: { en: "Academic", fr: "Académique" },
    description: {
      en: "Service-Oriented Architecture project implementing a complete University Management System using REST and SOAP web services, JWT authentication, Spring Boot, and Docker Compose.",
      fr: "Projet d’architecture orientée services (SOA) implémentant un système complet de gestion universitaire avec des services web REST et SOAP, une authentification JWT, Spring Boot et Docker Compose.",
    },
    tags: ["Spring Boot", "Java", "REST", "SOAP", "JWT", "Docker"],
    github: "https://github.com/HMotez/University-SOA",
    featured: false,
  },
];

/* `title` is the official certificate name (also the id for icons) */
export const certifications = [
  {
    title: "Soft Skills, Innovation & Entrepreneurship",
    issuer: "INNOVATECH TIC&Green — COOPI / EFE Tunisie / Impact Hub",
    date: { en: "May 2026", fr: "Mai 2026" },
    color: "#f59e0b",
  },
  {
    title: "Introduction to Amazon EC2",
    issuer: "Amazon Web Services (AWS)",
    date: { en: "October 2025", fr: "Octobre 2025" },
    color: "#f97316",
  },
  {
    title: "Introduction to Amazon S3",
    issuer: "Amazon Web Services (AWS)",
    date: { en: "October 2025", fr: "Octobre 2025" },
    color: "#f97316",
  },
  {
    title: "NDG Linux Unhatched",
    issuer: "NDG / Cisco NetAcad",
    date: { en: "November 2025", fr: "Novembre 2025" },
    color: "#06b6d4",
  },
];
