export interface ArticleSection {
  id: string;
  number: string;
  title: string;
  subheading?: string;
  content: string[];
  keyQuote?: string;
  interactiveType?: 'math-logic' | 'terminal' | 'security-tools' | 'code-showcase' | 'creative-collage' | 'typographic-future';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  publishedDate: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  featured: boolean;
  sections?: ArticleSection[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
  bio: string;
  extendedBio: string;
  email: string;
  location: string;
  status: string;
  avatarUrl: string;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}
