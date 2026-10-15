import { Project } from '../types/blog';

export const PROJECTS: Project[] = [
  {
    id: 'socket-port-scanner',
    title: 'Python Socket Port Scanner',
    description: 'A multi-threaded CLI network utility built with native Python sockets to scan IP ranges, probe open TCP ports, and analyze connection latency without third-party dependencies.',
    category: 'Cybersecurity / Systems',
    technologies: ['Python 3', 'Sockets', 'Threading', 'IPv4/IPv6'],
    githubUrl: 'https://github.com/ishfaqshafi',
    featured: true,
    status: 'Active Exploration'
  },
  {
    id: 'recon-automation-scripts',
    title: 'Security Recon & Workflow Automator',
    description: 'A modular Bash and Python toolkit for authorized security reconnaissance, aggregating target enumeration, DNS records, and port service detection into clean markdown reports.',
    category: 'Security / Automation',
    technologies: ['Bash', 'Python', 'Nmap', 'OSINT'],
    githubUrl: 'https://github.com/ishfaqshafi',
    featured: true,
    status: 'Open Source'
  },
  {
    id: 'developer-web-hub',
    title: 'Modern Developer Hub & Dashboard',
    description: 'A responsive full-featured personal dashboard exploring modern frontend architecture, state synchronization, dark mode theming, and edge deployment via GitHub.',
    category: 'Web Engineering',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/ishfaqshafi',
    liveUrl: '#',
    featured: true,
    status: 'In Production'
  },
  {
    id: 'motion-typography-kit',
    title: 'Kinetic 3D Typography & Motion Presets',
    description: 'A curated collection of visual motion presets, kinetic text animations, and streamlined video editing templates built for tech creators and short-form digital storytelling.',
    category: 'Creative Media',
    technologies: ['Motion Design', 'Video Editing', '3D Presets', 'Creative Workflows'],
    liveUrl: '#',
    featured: false,
    status: 'Creator Pack'
  }
];
