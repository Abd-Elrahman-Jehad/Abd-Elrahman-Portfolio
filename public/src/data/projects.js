// Project list.
// Like certificates, images are NOT embedded in the code — each project points to
// a file path under /public/projects/. Drop a screenshot there with the matching
// filename (e.g. p1.jpg) and it replaces the icon/gradient thumbnail automatically.
// If the file doesn't exist yet, the card falls back to the icon + gradient shown below.

const projects = [
  {
    id: "p1",
    image: "/projects/p1.jpg",
    icon: "🏎️",
    gradient: "linear-gradient(135deg,#1a1f2e,#3a2f1a)",
    title: "TURPOTIC",
    desc: {
      ar: "معرض سيارات ودرّاجات فاخرة بتجربة تصفح سينمائية، مع تأثيرات زجاجية وانتقالات أنيقة وسلة شراء تفاعلية.",
      en: "A premium luxury car & motorcycle gallery with a cinematic browsing experience, glassmorphism effects, elegant transitions, and an interactive cart.",
    },
    tags: ["HTML/CSS/JS", "Glassmorphism", "Responsive"],
    live: "https://abd-elrahman-jehad.github.io/TURPOTIC/#home",
    code: "https://github.com/Abd-Elrahman-Jehad/TURPOTIC",
  },
  {
    id: "p2",
    image: "/projects/p2.jpg",
    icon: "🚴",
    gradient: "linear-gradient(135deg,#0a0e1f,#241a3a)",
    title: "XTRA",
    desc: {
      ar: "تجربة دراجات مستقبلية بجماليات سايبربانك، مع رسوم متحركة عبر GSAP وThree.js وجسيمات تفاعلية.",
      en: "A futuristic bicycle experience with cyberpunk aesthetics, GSAP & Three.js animations, and interactive particle backgrounds.",
    },
    tags: ["GSAP", "Three.js", "tsParticles"],
    live: "https://abd-elrahman-jehad.github.io/XTRA/",
    code: "https://github.com/Abd-Elrahman-Jehad/XTRA",
  },
  {
    id: "p3",
    image: "/projects/p3.jpg",
    icon: "🚘",
    gradient: "linear-gradient(135deg,#1f1410,#3a2418)",
    title: "Lilia Motors",
    desc: {
      ar: "صالة عرض سيارات فاخرة بهوية بصرية أنيقة، تصفية حسب الفئة، وتأثيرات سكرول ناعمة.",
      en: "A luxury car showroom with an elegant visual identity, category filtering, and smooth scroll-based reveal effects.",
    },
    tags: ["HTML5", "CSS3", "JS"],
    live: "https://abd-elrahman-jehad.github.io/lilia-motors-website/",
    code: "https://github.com/Abd-Elrahman-Jehad/lilia-motors-website",
  },
  {
    id: "p4",
    image: "/projects/p4.jpg",
    icon: "🦷",
    gradient: "linear-gradient(135deg,#0a1f1a,#123a2e)",
    title: "Lazord",
    desc: {
      ar: "موقع عيادة أسنان ومختبر رقمي مع نظام مصادقة كامل: تسجيل دخول، تسجيل حساب، واستعادة كلمة مرور.",
      en: "A dental clinic & digital lab website with a complete auth system: login, register, and password recovery.",
    },
    tags: ["Auth UI", "Healthcare", "JS"],
    live: "https://abd-elrahman-jehad.github.io/DentalClinic/",
    code: "https://github.com/Abd-Elrahman-Jehad/DentalClinic",
  },
  {
    id: "p5",
    image: "/projects/p5.jpg",
    icon: "🔐",
    gradient: "linear-gradient(135deg,#151a2e,#2a1e3a)",
    title: { ar: "واجهات مصادقة حديثة", en: "Modern Authentication UI" },
    desc: {
      ar: "مجموعة صفحات مصادقة كاملة: دخول، تسجيل، استعادة كلمة مرور، ومصادقة ثنائية، بدعم للوضع الليلي.",
      en: "A complete auth flow: login, register, password recovery, and 2FA, with dark mode support.",
    },
    tags: ["Auth", "Dark Mode", "2FA"],
    live: "https://abd-elrahman-jehad.github.io/auth-pages-html-css/",
    code: "https://github.com/Abd-Elrahman-Jehad/auth-pages-html-css",
  },
  {
    id: "p6",
    image: "/projects/p6.jpg",
    icon: "📦",
    gradient: "linear-gradient(135deg,#0d1a2e,#1a2a3a)",
    title: { ar: "نظام إدارة مخزون", en: "Inventory Management System" },
    desc: {
      ar: "نظام إدارة منتجات متكامل مبني بـ PHP وMySQL، ومحوسب بالكامل عبر Docker.",
      en: "A complete product inventory system built with PHP and MySQL, fully containerized with Docker.",
    },
    tags: ["PHP", "MySQL", "Docker"],
    code: "https://github.com/Abd-Elrahman-Jehad/php-product-inventory",
  },
];

export default projects;
