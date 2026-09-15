// Certificate list.
// Images are NOT embedded in the code — each certificate points to a file path
// under /public/certs/. Drop your own exported image there with the matching
// filename and it will show up automatically; if the file doesn't exist, the
// card/modal falls back to the icon instead (no broken-image icon).

const certificates = [
  {
    id: "cert1",
    icon: "🤖",
    image: "/certs/cert1.png",
    title: "Claude Code 101",
    org: "Anthropic · Aug 2026",
    desc: {
      ar: "إتمام برنامج Claude Code 101 من Anthropic، وبناء أساس عملي لاستخدام Claude Code كأداة تطوير مدعومة بالذكاء الاصطناعي.",
      en: "Successfully completed Anthropic's Claude Code 101, gaining practical foundations in using Claude Code as an AI-powered development tool.",
    },
    skills: {
      ar: ["Generative AI", "Artificial Intelligence", "+3 مهارات"],
      en: ["Generative AI", "Artificial Intelligence", "+3 skills"],
    },
  },
  {
    id: "cert2",
    icon: "🧠",
    image: "/certs/cert2.png",
    title: "AI Fluency: Framework & Foundations",
    org: "Anthropic · Aug 2026",
    desc: {
      ar: "إتمام برنامج AI Fluency: Framework & Foundations من Anthropic، وتطوير فهم منهجي لكيفية العمل بفعالية ومسؤولية مع أنظمة الذكاء الاصطناعي.",
      en: "Successfully completed Anthropic's AI Fluency: Framework & Foundations program, developing a structured understanding of how to work effectively and responsibly with AI.",
    },
    skills: {
      ar: ["Artificial Intelligence", "Generative AI", "+4 مهارات"],
      en: ["Artificial Intelligence", "Generative AI", "+4 skills"],
    },
  },
  {
    id: "cert3",
    icon: "💻",
    image: "/certs/cert3.jpeg",
    title: {
      ar: "تدريب مهني في تطوير الواجهات الأمامية",
      en: "Front-End Development Professional Internship",
    },
    org: "Webura Company · Apr 2026",
    desc: {
      ar: "شهادة ممنوحة عند إتمام تدريب مهني في تطوير الواجهات الأمامية بشركة Webura، تضمّن تدريبًا عمليًا على HTML وCSS وJavaScript.",
      en: "Certificate awarded upon the successful completion of a Front-End Development internship at Webura Company, including practical training in HTML, CSS and JavaScript.",
    },
    skills: {
      ar: ["Front-End Development", "HTML5", "+5 مهارات"],
      en: ["Front-End Development", "HTML5", "+5 skills"],
    },
  },
  {
    id: "cert4",
    icon: "🌍",
    image: "/certs/cert4.jpg",
    title: {
      ar: "شهادة تقدير في العمل الحر والعمل عن بُعد",
      en: "Certificate of Appreciation in Freelancing and Remote Work",
    },
    org: "Lingua Stochos · Mar 2026",
    desc: {
      ar: "شهادة تقدير تعترف بالإنجاز المهني في أساسيات العمل الحر والعمل عن بُعد، ومهارات التواصل، والتطوير المهني الرقمي.",
      en: "This certificate recognizes professional achievement in freelancing, remote work fundamentals, communication skills, and digital career development.",
    },
    skills: {
      ar: ["Freelancing", "Remote Work", "Communication"],
      en: ["Freelancing", "Remote Work", "Communication"],
    },
  },
  {
    id: "cert5",
    icon: "🗣️",
    image: "/certs/cert5.jpg",
    title: {
      ar: "ورشة ترجمة — شهادة إنجاز",
      en: "Certificate of Achievement – Translation Workshop",
    },
    org: "Lingua Stochos · Mar 2026",
    desc: {
      ar: "شهادة إنجاز عن إتمام تدريب مهني في مهارات الترجمة والتواصل وتطوير اللغة.",
      en: "This certificate recognizes successful completion of professional training in translation skills, communication, and language development.",
    },
    skills: {
      ar: ["Translation", "Communication", "Language Development"],
      en: ["Translation", "Communication", "Language Development"],
    },
  },
  {
    id: "cert6",
    icon: "🔌",
    image: "/certs/cert6.png",
    title: "Claude with the Anthropic API",
    org: "Anthropic · Aug 2026",
    desc: {
      ar: "إتمام دورة Claude with the Anthropic API من Anthropic، وتغطّي هندسة البرومبت، ودمج الـ API، واستخدام الأدوات (Tool Use)، وبروتوكول Model Context Protocol (MCP)، وتقييم البرومبت، وبناء تطبيقات مدعومة بالذكاء الاصطناعي باستخدام Claude.",
      en: "Completed the Claude with the Anthropic API course by Anthropic, covering prompt engineering, API integration, tool use, Model Context Protocol (MCP), prompt evaluation, and building AI-powered applications with Claude.",
    },
    skills: {
      ar: ["Anthropic API", "Prompt Engineering", "Tool Use", "MCP"],
      en: ["Anthropic API", "Prompt Engineering", "Tool Use", "MCP"],
    },
  },
  {
    id: "cert7",
    icon: "🎓",
    image: "/certs/cert7.png",
    title: "Claude 101",
    org: "Anthropic · Aug 2026",
    desc: {
      ar: "إتمام دورة Claude 101 من Anthropic، وبناء معرفة أساسية بقدرات Claude وطرق عملية للعمل بفعالية مع الذكاء الاصطناعي. تغطّي الدورة تصميم البرومبت الفعّال، السياق والقيود، Projects، Skills، Artifacts، الموصلات (connectors)، البحث المؤسسي، سير عمل البحث، واختيار منتجات Claude المناسبة لكل استخدام.",
      en: "Successfully completed Anthropic's Claude 101, gaining foundational knowledge of Claude's capabilities and practical approaches for working effectively with AI. Key topics covered include effective prompt design, context and constraints, Projects, Skills, Artifacts, connectors, Enterprise Search, Research workflows, and selecting Claude products for different use cases.",
    },
    skills: {
      ar: ["Claude Fundamentals", "Prompt Design", "AI Products"],
      en: ["Claude Fundamentals", "Prompt Design", "AI Products"],
    },
  },
];

export const certLinkedInUrl =
  "https://www.linkedin.com/in/abd-elrahman-jehad-aldasht/details/certifications/";

export default certificates;
