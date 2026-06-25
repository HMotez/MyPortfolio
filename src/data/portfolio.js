export const personalInfo = {
  name: "Hamzaoui Moetez",
  title: "Full-Stack Developer",
  email: "hamzaouii.moetez@gmail.com",
  phone: "+216 95 200 179",
  location: "Monastir, Tunisia",
  github: "https://github.com/HMotez",
  linkedin: "https://linkedin.com/in/hamzaoui-moetez",
  bio: [
    "I'm a freshly graduated Software Engineering student from the Faculty of Sciences of Monastir, with hands-on experience building full-stack web applications, integrating AI, and managing Agile projects.",
    "During my final-year internship at ACTIA Engineering Services, I developed an ISO 9001-compliant Document Management System — from architecture design to Docker deployment.",
    "I'm currently seeking an alternance opportunity to grow in a stimulating environment and contribute to high-impact projects.",
  ],
  stats: [
    { number: "3+", label: "Years Coding" },
    { number: "5+", label: "Projects Built" },
    { number: "3", label: "Languages Spoken" },
  ],
};

export const skills = [
  {
    category: "Languages",
    icon: "💻",
    color: "#06b6d4",
    items: ["Python", "Java", "JavaScript", "C", "C++", "C#", ".NET"],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#a855f7",
    items: ["Node.js", "Express.js", "Spring Boot", "PHP", "JavaEE"],
  },
  {
    category: "Frontend",
    icon: "🎨",
    color: "#ec4899",
    items: ["React.js", "JavaScript", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Databases & Tools",
    icon: "🗄️",
    color: "#f59e0b",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "Git/GitHub", "Docker", "Postman"],
  },
  {
    category: "AI & Automation",
    icon: "🤖",
    color: "#10b981",
    items: ["Machine Learning", "NLP", "n8n Automation"],
  },
  {
    category: "Methodology",
    icon: "🔄",
    color: "#06b6d4",
    items: ["Scrum / Agile", "UML", "REST APIs", "SOA", "JWT Auth"],
  },
];

export const experiences = [
  {
    type: "work",
    title: "Full-Stack Developer Intern (PFE)",
    company: "ACTIA Engineering Services",
    period: "Feb 2026 – Jun 2026",
    location: "Monastir, Tunisia",
    description:
      "Designed and developed an ISO 9001-compliant Electronic Document Management System (DMS) for the Quality Management System. Built end-to-end with Node.js, Express.js, React.js, PostgreSQL and Docker. Integrated NLP for automated document quality analysis.",
    tags: ["Node.js", "React.js", "PostgreSQL", "Docker", "NLP", "Scrum"],
  },
  {
    type: "edu",
    title: "BSc Software Engineering & Information Systems",
    company: "Faculté des Sciences de Monastir (FSM)",
    period: "2023 – 2026",
    location: "Monastir, Tunisia",
    description:
      "Graduated with a degree in Software Engineering. Core modules: Advanced Algorithms, OOP, Web Development, UML & Software Design, Databases, Operating Systems, Networks.",
    tags: [],
  },
  {
    type: "edu",
    title: "Baccalauréat — Computer Science",
    company: "Lycée Jedlienne",
    period: "2023",
    location: "Jedlienne, Tunisia",
    description:
      "High school diploma in Computer Science with strong foundations in algorithms and programming.",
    tags: [],
  },
];

export const projects = [
  {
    title: "GED — ISO 9001 Quality System",
    subtitle: "PFE 2026",
    description:
      "ISO 9001-compliant Electronic Document Management System for ACTIA Engineering Services. Features role-based validation workflows, real-time notifications, and AI-powered quality document analysis.",
    tags: ["Node.js", "Express.js", "React.js", "PostgreSQL", "Docker", "NLP"],
    github: "https://github.com/HMotez/SMQ_GED",
    icon: "📄",
    gradient: "from-cyan-500 to-blue-600",
    featured: true,
  },
  {
    title: "TrueCare AI — Medical Reimbursements",
    subtitle: "AI 2025",
    description:
      "AI-powered predictive solution for healthcare reimbursement claims. Analyzes medical documents, insurance policies, and legal regulations to predict accurate reimbursement amounts and detect fraud.",
    tags: ["Python", "Machine Learning", "NLP"],
    github: "https://github.com/HMotez/MedClaimML",
    icon: "🏥",
    gradient: "from-purple-500 to-pink-600",
    featured: true,
  },
  {
    title: "Hotel Management System",
    subtitle: "Desktop 2024",
    description:
      "Desktop application for hotel management with staff tracking, room management, booking operations, and real-time availability checks. Built with JavaFX admin interface and MySQL database.",
    tags: ["Java", "JavaFX", "MySQL"],
    github: "https://github.com/HMotez/HotelSystem",
    icon: "🏨",
    gradient: "from-amber-500 to-orange-600",
    featured: false,
  },
  {
    title: "University SOA System",
    subtitle: "Academic",
    description:
      "Service-Oriented Architecture project implementing a complete University Management System using REST and SOAP web services, JWT authentication, Spring Boot, and Docker Compose.",
    tags: ["Spring Boot", "Java", "REST", "SOAP", "JWT", "Docker"],
    github: "https://github.com/HMotez/University-SOA",
    icon: "🎓",
    gradient: "from-emerald-500 to-teal-600",
    featured: false,
  },
];

export const certifications = [
  {
    title: "Soft Skills, Innovation & Entrepreneurship",
    issuer: "INNOVATECH TIC&Green — COOPI / EFE Tunisie / Impact Hub",
    date: "May 2026",
    icon: "💡",
    color: "#f59e0b",
  },
  {
    title: "Introduction to Amazon EC2",
    issuer: "Amazon Web Services (AWS)",
    date: "October 2025",
    icon: "☁️",
    color: "#f97316",
  },
  {
    title: "Introduction to Amazon S3",
    issuer: "Amazon Web Services (AWS)",
    date: "October 2025",
    icon: "🪣",
    color: "#f97316",
  },
  {
    title: "NDG Linux Unhatched",
    issuer: "NDG / Cisco NetAcad",
    date: "November 2025",
    icon: "🐧",
    color: "#06b6d4",
  },
];
