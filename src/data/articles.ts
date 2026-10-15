import { Article } from '../types/blog';

export const ARTICLES: Article[] = [
  {
    id: 'from-curiosity-to-code',
    slug: 'from-curiosity-to-code',
    title: 'From Curiosity to Code: My Journey as a Self-Taught Developer & Security Enthusiast',
    subtitle: 'How curiosity, analytical thinking, and hands-on experimentation shaped my path into technology.',
    author: 'ISHFAQ SHAFI',
    category: 'PERSONAL JOURNEY',
    publishedDate: 'October 2026',
    readTime: '7 min read',
    coverImage: '/src/assets/images/hero_article_cover_1792050214813.jpg',
    excerpt: 'How an insatiable drive to learn turned everyday curiosity into hands-on skills in software development, cybersecurity, and problem-solving.',
    featured: true,
    tags: ['Personal Journey', 'Cybersecurity', 'Linux', 'Python', 'Self-Taught'],
    sections: [
      {
        id: 'section-01',
        number: '01',
        title: 'The Foundation: Analytical Thinking & Problem Solving',
        interactiveType: 'math-logic',
        content: [
          'Academic Rigor: Preparing for competitive engineering entrances isn\'t just about memorizing formulas; it\'s about breaking down complex, abstract problems into logical steps.',
          'Applying Logic: Working through calculus, differential equations, and organic reaction mechanisms taught me how to think systematically.',
          'The Shift: Soon, I found myself asking: Can I apply this exact logical breakdown to machines? That question pulled me straight into programming and system architecture.'
        ],
        keyQuote: 'Can I apply this exact logical breakdown to machines? That question pulled me straight into programming.'
      },
      {
        id: 'section-02',
        number: '02',
        title: 'Exploring the Command Line: Linux & Networking',
        interactiveType: 'terminal',
        content: [
          'Environment Setup: I transitioned into Linux terminal environments, learning to navigate shell scripting and system commands.',
          'Understanding Networks: My fascination with how systems communicate led me into networking protocols and infrastructure.',
          'Security Mindset: I began exploring how data moves, where vulnerabilities can occur, and how engineers secure infrastructure against threats.'
        ],
        keyQuote: 'Understanding how data traverses networks transformed the computer from a black box into an open architectural blueprint.'
      },
      {
        id: 'section-03',
        number: '03',
        title: 'Diving into Cybersecurity & Reconnaissance',
        interactiveType: 'security-tools',
        content: [
          'I started experimenting with industry-standard and open-source tools to understand system reconnaissance and defensive security.',
          'Tools I explored: Nmap for network discovery and mapping; Metasploit and Nuclei for security assessment and vulnerability testing; Nikto for web server security checks; and John the Ripper for password security auditing.',
          'Hands-On Practice: Rather than just reading theory, I explored practical learning environments, including PortSwigger Web Security Academy, and learned about open-source intelligence methodologies.'
        ],
        keyQuote: 'Security tools should be used strictly on systems the learner owns or has explicit permission to test.'
      },
      {
        id: 'section-04',
        number: '04',
        title: 'Writing Code: Software Development & Automation',
        interactiveType: 'code-showcase',
        content: [
          'Theory means little if you cannot build. I began translating concepts into functional code using Python, JavaScript, and Bash scripting.',
          'Port Scanners: Building local socket port scanners to understand network socket programming from scratch.',
          'Automation Scripts: Creating experimental media-related scripts and shell scripts to understand automation and repetitive workflows.',
          'Web Dashboards: Exploring frontend development and integrating tools such as Replit, Supabase, and GitHub to bring web projects to life.'
        ],
        keyQuote: 'Theory means little if you cannot build. The real test is crafting code that solves actual constraints.'
      },
      {
        id: 'section-05',
        number: '05',
        title: 'Expanding Horizons: Content Creation & Freelancing',
        interactiveType: 'creative-collage',
        content: [
          'Technology is not only about logic; it is also about creativity.',
          'Digital Creation: Alongside technical studies, I explored video-editing workflows, 3D text presets, and short-form content creation.',
          'Freelance Exploration: Working with digital workflows and freelance platforms introduced me to practical project presentation, client expectations, and adaptability.',
          'The Lesson: Whether optimizing a Python script or editing a video, balancing creative and technical pursuits showed me that adaptability is an important asset for a developer.'
        ],
        keyQuote: 'Balancing creative and technical pursuits showed me that adaptability is an essential asset for a developer.'
      },
      {
        id: 'section-06',
        number: '06',
        title: 'Looking Ahead',
        interactiveType: 'typographic-future',
        content: [
          'My journey is still unfolding. From solving mathematical problems and studying physics to experimenting with network tools and building web projects, every step has been an opportunity to learn independently.',
          'With plans to explore computer science, software engineering, and cybersecurity more deeply, my goal remains the same:',
          'Keep breaking things down. Keep building them back up. Never stop being curious.'
        ],
        keyQuote: 'Keep breaking things down. Keep building them back up. Never stop being curious.'
      }
    ]
  },
  {
    id: 'socket-programming-python',
    slug: 'socket-programming-python',
    title: 'Deconstructing Network Sockets: Building a Local Port Scanner with Python',
    subtitle: 'A hands-on breakdown of low-level TCP handshakes and non-blocking I/O routines.',
    author: 'ISHFAQ SHAFI',
    category: 'CYBERSECURITY',
    publishedDate: 'September 2026',
    readTime: '5 min read',
    coverImage: '/src/assets/images/network_security_card_1792050216703.jpg',
    excerpt: 'Deep-diving into the Berkeley socket interface to see how raw SYN/ACK packets traverse local network interfaces.',
    featured: false,
    tags: ['Python', 'Networking', 'TCP/IP', 'Sockets'],
  },
  {
    id: 'linux-command-line-mastery',
    slug: 'linux-command-line-mastery',
    title: 'Command Line as a Second Language: Essential Bash Workflows for Beginners',
    subtitle: 'From pipe redirection to process isolation, mastering terminal efficiency without GUI crutches.',
    author: 'ISHFAQ SHAFI',
    category: 'TECHNOLOGY',
    publishedDate: 'August 2026',
    readTime: '6 min read',
    coverImage: '/src/assets/images/hero_article_cover_1792050214813.jpg',
    excerpt: 'Why embracing the POSIX terminal philosophy accelerates problem-solving and system intuition.',
    featured: false,
    tags: ['Linux', 'Bash', 'DevOps', 'Terminal'],
  },
  {
    id: 'calculus-to-algorithms',
    slug: 'calculus-to-algorithms',
    title: 'From Differential Equations to Algorithmic Complexity: The Mathematical Pivot',
    subtitle: 'How STEM rigorous problem breakdown mirrors algorithmic time and space analysis.',
    author: 'ISHFAQ SHAFI',
    category: 'DEVELOPER STORY',
    publishedDate: 'July 2026',
    readTime: '4 min read',
    coverImage: '/src/assets/images/creative_digital_collage_1792050218899.jpg',
    excerpt: 'Connecting the dots between high school competitive mathematics and efficient computational thinking.',
    featured: false,
    tags: ['Mathematics', 'Algorithms', 'Logic', 'STEM'],
  }
];
