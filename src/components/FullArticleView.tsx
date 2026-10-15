import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Share2, Bookmark, Check, Copy, Terminal, 
  ShieldAlert, Cpu, Sparkles, BookOpen, Layers,
  ExternalLink, ChevronRight, Hash, Play, RotateCcw,
  Sliders, Type, Eye, ArrowRight
} from 'lucide-react';
import { Article } from '../types/blog';
import { AUTHOR_CONFIG } from '../data/authorConfig';

interface FullArticleViewProps {
  article: Article;
  onBackToStories: () => void;
  onOpenContact: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const FullArticleView: React.FC<FullArticleViewProps> = ({
  article,
  onBackToStories,
  onOpenContact,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Reading state
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [bookmarkFeedback, setBookmarkFeedback] = useState(false);

  // Reading Mode Customizations
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [focusMode, setFocusMode] = useState(false);

  // Interactive Section 02 Terminal State
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string; type?: 'info' | 'success' | 'warn' }>>([
    { cmd: 'uname -r', out: 'Linux 6.8.0-arch1-1 x86_64 POSIX' },
    { cmd: 'whoami', out: 'ishfaq (developer & security learner)' },
    { cmd: 'netstat -tuln', out: 'Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address          Foreign Address   State\ntcp        0      0 127.0.0.1:8080         0.0.0.0:*         LISTEN\ntcp        0      0 127.0.0.1:3000         0.0.0.0:*         LISTEN' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Interactive Section 04 Code snippet copy state
  const [codeCopied, setCodeCopied] = useState(false);

  // Sample Python socket scanner code
  const pythonScannerCode = `# Simple educational TCP Socket Port Prober
import socket
import sys

def probe_port(target_host, port, timeout=0.8):
    """Attempt a non-blocking TCP handshake on target_host:port"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(timeout)
        result = s.connect_ex((target_host, port))
        if result == 0:
            return True, f"[+] Port {port} is OPEN"
        else:
            return False, f"[-] Port {port} is closed"

# Testing loop on localhost interfaces
if __name__ == "__main__":
    host = "127.0.0.1"
    target_ports = [22, 80, 443, 3000, 8080]
    print(f"Scanning target {host}...")
    for port in target_ports:
        is_open, msg = probe_port(host, port)
        if is_open:
            print(msg)`;

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Track active section
      const sections = ['intro', 'section-01', 'section-02', 'section-03', 'section-04', 'section-05', 'section-06', 'closing'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.subtitle,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2000);
  };

  const handleBookmark = () => {
    onToggleBookmark();
    setBookmarkFeedback(true);
    setTimeout(() => setBookmarkFeedback(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const runTerminalCommand = (customCmd?: string) => {
    const cmdToRun = customCmd || terminalInput.trim();
    if (!cmdToRun) return;

    let output = '';
    let type: 'info' | 'success' | 'warn' = 'info';

    const lower = cmdToRun.toLowerCase();
    if (lower === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lower.startsWith('nmap')) {
      output = 'Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.00012s latency).\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n3000/tcp open  dev-server\nNmap done: 1 IP address scanned in 0.08 seconds';
      type = 'success';
    } else if (lower === 'whoami') {
      output = 'ishfaq (self-taught developer & security enthusiast)';
    } else if (lower === 'help') {
      output = 'Available sample commands: whoami, nmap -sV localhost, netstat -tuln, uname -r, python3 --version, clear';
    } else if (lower.includes('python')) {
      output = 'Python 3.12.3 (main, Apr 10 2026)\n[GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.';
    } else if (lower.startsWith('curl')) {
      output = 'HTTP/1.1 200 OK\nServer: nginx/1.24.0\nContent-Type: text/html; charset=UTF-8\nConnection: keep-alive';
      type = 'success';
    } else {
      output = `Command executed in educational sandbox: '${cmdToRun}'\nStatus: 0 errors returned.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: cmdToRun, out: output, type }]);
    setTerminalInput('');
  };

  const copyPythonCode = () => {
    navigator.clipboard.writeText(pythonScannerCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // Font family selector class
  const getProseFontClass = () => {
    switch (fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono text-sm leading-relaxed';
      default:
        return 'font-sans';
    }
  };

  const getProseSizeClass = () => {
    return fontSize === 'large' ? 'text-lg sm:text-xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed';
  };

  return (
    <article className="min-h-screen bg-[#08090D] text-[#F5F5F0]">
      {/* Sticky Article Navigation & Reading Progress Bar */}
      <div className="sticky top-16 sm:top-20 z-40 w-full bg-[#08090D]/95 backdrop-blur-md border-b border-white/5 transition-all">
        {/* Progress Line */}
        <div 
          className="h-[2px] bg-gradient-to-r from-[#9270FF] to-[#C7FF4A] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(readingProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-4 text-xs">
          {/* Back button & Title summary */}
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onBackToStories}
              className="inline-flex items-center gap-1.5 text-[#9699A5] hover:text-[#C7FF4A] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A] rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Stories</span>
            </button>
            <span className="text-white/20 hidden sm:inline">/</span>
            <span className="text-[#F5F5F0] truncate font-medium max-w-[280px] sm:max-w-md hidden sm:inline">
              {article.title}
            </span>
          </div>

          {/* Reading Controls & Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Reading font & size controls */}
            <div className="hidden md:flex items-center gap-1 bg-[#11131A] p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2 py-0.5 rounded text-[11px] font-sans ${fontFamily === 'sans' ? 'bg-white/10 text-[#C7FF4A]' : 'text-[#9699A5] hover:text-white'}`}
                title="Sans-serif font"
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2 py-0.5 rounded text-[11px] font-serif ${fontFamily === 'serif' ? 'bg-white/10 text-[#C7FF4A]' : 'text-[#9699A5] hover:text-white'}`}
                title="Editorial serif font"
              >
                Serif
              </button>
              <button
                onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
                className="px-2 py-0.5 rounded text-[11px] text-[#9699A5] hover:text-white flex items-center gap-0.5"
                title="Toggle font size"
              >
                <Type className="w-3 h-3" />
                <span>{fontSize === 'normal' ? '1x' : '1.2x'}</span>
              </button>
              <button
                onClick={() => setFocusMode(!focusMode)}
                className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 ${focusMode ? 'bg-[#C7FF4A]/20 text-[#C7FF4A]' : 'text-[#9699A5] hover:text-white'}`}
                title="Toggle Focus Reading Mode"
              >
                <Eye className="w-3 h-3" />
                <span className="hidden lg:inline">{focusMode ? 'Focus On' : 'Focus'}</span>
              </button>
            </div>

            {/* Reading percentage */}
            <span className="font-mono text-[11px] text-[#9699A5] hidden sm:inline">
              {Math.round(readingProgress)}%
            </span>

            {/* Bookmark button */}
            <button
              onClick={handleBookmark}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-[#9699A5] hover:text-[#F5F5F0] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              title="Bookmark story in your browser"
            >
              {bookmarkFeedback ? (
                <>
                  <Check className="w-3 h-3 text-[#C7FF4A]" />
                  <span className="text-[#C7FF4A]">Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-[#C7FF4A] text-[#C7FF4A]' : ''}`} />
                  <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
                </>
              )}
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-[#9699A5] hover:text-[#F5F5F0] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              title="Share story or copy link"
            >
              {shareFeedback ? (
                <>
                  <Check className="w-3 h-3 text-[#C7FF4A]" />
                  <span className="text-[#C7FF4A]">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container with Sticky TOC on Desktop and Article Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Sticky Table of Contents (3 cols, hidden on mobile / collapsible) */}
          <aside className={`lg:col-span-3 transition-opacity duration-300 ${focusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
            <div className="sticky top-36 space-y-8 hidden lg:block">
              {/* Author Card */}
              <div className="p-5 rounded-2xl bg-[#11131A] border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={AUTHOR_CONFIG.avatarUrl}
                      alt={AUTHOR_CONFIG.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F5F0]">{AUTHOR_CONFIG.name}</h4>
                    <p className="text-xs text-[#9699A5]">Author & Learner</p>
                  </div>
                </div>
                <p className="text-xs text-[#9699A5] leading-relaxed">
                  Class 12 STEM student exploring software architecture, network security, and creative production.
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={AUTHOR_CONFIG.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#C7FF4A] hover:underline inline-flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={onOpenContact}
                    className="text-xs text-[#9699A5] hover:text-white"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="p-5 rounded-2xl bg-[#11131A] border border-white/5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#9699A5] mb-4">
                  TABLE OF CONTENTS
                </div>
                <nav className="space-y-2 text-xs">
                  <button
                    onClick={() => scrollTo('intro')}
                    className={`block w-full text-left py-1 transition-colors ${
                      activeSection === 'intro' ? 'text-[#C7FF4A] font-medium' : 'text-[#9699A5] hover:text-[#F5F5F0]'
                    }`}
                  >
                    Introduction: The Question
                  </button>
                  {article.sections?.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`block w-full text-left py-1 transition-colors ${
                        activeSection === sec.id ? 'text-[#C7FF4A] font-medium' : 'text-[#9699A5] hover:text-[#F5F5F0]'
                      }`}
                    >
                      <span className="font-mono text-[#9699A5] mr-1.5">{sec.number}.</span>
                      <span>{sec.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => scrollTo('closing')}
                    className={`block w-full text-left py-1 transition-colors ${
                      activeSection === 'closing' ? 'text-[#C7FF4A] font-medium' : 'text-[#9699A5] hover:text-[#F5F5F0]'
                    }`}
                  >
                    Closing: A Curious Beginner
                  </button>
                </nav>
              </div>

              {/* Estimated Read Time Card */}
              <div className="p-4 rounded-xl bg-[#08090D] border border-white/5 text-xs text-[#9699A5] space-y-1">
                <div className="text-[#F5F5F0] font-medium">Estimated Reading Time</div>
                <div>{article.readTime} (approx. 1,400 words)</div>
              </div>
            </div>
          </aside>

          {/* Right Column: Editorial Article Body (9 cols, centered reading width) */}
          <main className="lg:col-span-9 max-w-3xl mx-auto lg:mx-0 w-full">
            
            {/* ARTICLE HEADER */}
            <header id="intro" className="pb-12 border-b border-white/10">
              {/* Unboxed Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9699A5] font-mono mb-6">
                <span className="text-[#C7FF4A] font-semibold">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>By {article.author}</span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              {/* Article Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold font-display text-[#F5F5F0] leading-[1.1] tracking-tight text-balance">
                {article.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-lg sm:text-xl text-[#9699A5] font-sans leading-relaxed">
                {article.subtitle}
              </p>

              {/* Cinematic Article Hero Image */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 relative bg-[#11131A] shadow-2xl">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[500px] object-cover"
                />
                <div className="p-3 bg-[#11131A] border-t border-white/5 text-[11px] text-[#9699A5] font-mono flex items-center justify-between">
                  <span>FIG 1.0 — DIGITAL ECOSYSTEM & RECONNAISSANCE MATRIX</span>
                  <span>ISHFAQ SHAFI / 2026</span>
                </div>
              </div>

              {/* INTRODUCTORY ESSAY PROSE */}
              <div className={`mt-10 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-6`}>
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#C7FF4A] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                  Welcome to my corner of the internet! They say curiosity killed the cat, but in technology, it builds a foundation. My journey into tech didn't start inside a traditional computer science classroom—it started with a simple, persistent question: <em className="text-[#F5F5F0] not-italic underline decoration-[#C7FF4A] decoration-2 underline-offset-4 font-semibold">How does this actually work under the hood?</em>
                </p>

                <p>
                  As a student balancing Class 12 board exams and competitive engineering preparation, my days were packed with Physics, Chemistry, and Mathematics. Yet, whenever I closed my textbooks, a different kind of textbook opened up: the digital world.
                </p>

                <p>
                  Here is the story of how an insatiable drive to learn turned everyday curiosity into hands-on skills in software development, cybersecurity, and problem-solving.
                </p>
              </div>
            </header>

            {/* VERTICAL EDITORIAL TIMELINE & SECTIONS */}
            <div className="relative mt-16 space-y-24">
              
              {/* Timeline continuous vertical guideline */}
              <div 
                className="absolute left-4 sm:left-6 top-8 bottom-12 w-px bg-gradient-to-b from-[#C7FF4A] via-[#9270FF] to-white/10 hidden sm:block" 
                aria-hidden="true"
              />

              {/* SECTION 01 */}
              <section id="section-01" className="relative sm:pl-16 scroll-mt-32">
                {/* Timeline node */}
                <div className="absolute left-6 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-[#08090D] border-2 border-[#C7FF4A] hidden sm:block" />

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-semibold text-[#C7FF4A]">01 —</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0]">
                    The Foundation: Analytical Thinking & Problem Solving
                  </h2>
                </div>

                <div className={`mt-6 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-5`}>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Academic Rigor:</strong> Preparing for competitive engineering entrances isn't just about memorizing formulas; it's about breaking down complex, abstract problems into logical steps.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Applying Logic:</strong> Working through calculus, differential equations, and organic reaction mechanisms taught me how to think systematically.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">The Shift:</strong> Soon, I found myself asking: <span className="text-[#C7FF4A] italic font-medium">Can I apply this exact logical breakdown to machines?</span> That question pulled me straight into programming and system architecture.
                  </p>
                </div>

                {/* Section 01 Visual Component: Mathematical Grid & Logic Decomposition */}
                <div className="mt-8 p-6 rounded-2xl bg-[#11131A] border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none" />
                  <div className="text-xs font-mono text-[#9699A5] mb-4 flex items-center justify-between">
                    <span>ANALYTICAL TRANSFORMATION MODEL</span>
                    <span className="text-[#C7FF4A]">STEM → CODE</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#08090D] border border-white/5">
                      <div className="text-xs font-mono text-[#9270FF] mb-1">01 / CALCULUS</div>
                      <div className="font-serif italic text-[#F5F5F0] text-sm mb-2">∫ f(x) dx · Rate of Change</div>
                      <p className="text-xs text-[#9699A5]">Continuous rates, integration bounds, and state limits.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#08090D] border border-white/5">
                      <div className="text-xs font-mono text-[#C7FF4A] mb-1">02 / LOGICAL CONVERSION</div>
                      <div className="font-mono text-[#F5F5F0] text-xs mb-2">while (state != target): break</div>
                      <p className="text-xs text-[#9699A5]">Deconstructing multi-variable equations into finite discrete operations.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#08090D] border border-white/5">
                      <div className="text-xs font-mono text-[#9270FF] mb-1">03 / SYSTEM ARCHITECTURE</div>
                      <div className="font-mono text-[#F5F5F0] text-xs mb-2">O(n log n) · Predictable State</div>
                      <p className="text-xs text-[#9699A5]">Predictable, resilient structures running without memory leaks.</p>
                    </div>
                  </div>
                </div>

                {/* Editorial Highlight Quote */}
                <blockquote className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="font-serif italic text-lg sm:text-xl text-[#F5F5F0] leading-relaxed">
                    “Can I apply this exact logical breakdown to machines? That question pulled me straight into programming and system architecture.”
                  </p>
                </blockquote>
              </section>

              {/* SECTION 02 */}
              <section id="section-02" className="relative sm:pl-16 scroll-mt-32">
                {/* Timeline node */}
                <div className="absolute left-6 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-[#08090D] border-2 border-[#9270FF] hidden sm:block" />

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-semibold text-[#9270FF]">02 —</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0]">
                    Exploring the Command Line: Linux & Networking
                  </h2>
                </div>

                <div className={`mt-6 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-5`}>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Environment Setup:</strong> I transitioned into Linux terminal environments, learning to navigate shell scripting and system commands.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Understanding Networks:</strong> My fascination with how systems communicate led me into networking protocols and infrastructure.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Security Mindset:</strong> I began exploring how data moves, where vulnerabilities can occur, and how engineers secure infrastructure against threats.
                  </p>
                </div>

                {/* Section 02 Interactive Terminal Sandbox */}
                <div className="mt-8 rounded-2xl bg-[#08090D] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#11131A] border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#9270FF]/40" />
                      <span className="w-3 h-3 rounded-full bg-[#C7FF4A]/40" />
                      <span className="w-3 h-3 rounded-full bg-white/20" />
                      <span className="ml-2 text-xs text-[#9699A5]">bash — educational shell simulation</span>
                    </div>
                    <button
                      onClick={() => setTerminalHistory([])}
                      className="text-[#9699A5] hover:text-[#C7FF4A] transition-colors flex items-center gap-1 text-[11px]"
                      title="Clear terminal output"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>

                  {/* Terminal Output */}
                  <div className="p-4 sm:p-6 space-y-3 max-h-72 overflow-y-auto">
                    <div className="text-[#9699A5] text-[11px]">
                      // Interactive Linux terminal simulator. Try clicking one of the sample commands below or type your own.
                    </div>

                    {terminalHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2 text-[#C7FF4A]">
                          <span>$</span>
                          <span className="text-[#F5F5F0]">{item.cmd}</span>
                        </div>
                        <pre className={`whitespace-pre-wrap text-[11px] pl-3 border-l border-white/10 ${
                          item.type === 'success' ? 'text-[#C7FF4A]' : 'text-[#9699A5]'
                        }`}>
                          {item.out}
                        </pre>
                      </div>
                    ))}
                  </div>

                  {/* Sample Command Quick Buttons */}
                  <div className="px-4 py-2.5 bg-[#11131A]/60 border-t border-white/5 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-[#9699A5]">Sample Commands:</span>
                    <button
                      onClick={() => runTerminalCommand('whoami')}
                      className="px-2 py-1 rounded bg-[#08090D] border border-white/10 hover:border-[#C7FF4A] text-[#F5F5F0] transition-colors"
                    >
                      whoami
                    </button>
                    <button
                      onClick={() => runTerminalCommand('nmap -sV localhost')}
                      className="px-2 py-1 rounded bg-[#08090D] border border-white/10 hover:border-[#C7FF4A] text-[#F5F5F0] transition-colors"
                    >
                      nmap -sV localhost
                    </button>
                    <button
                      onClick={() => runTerminalCommand('netstat -tuln')}
                      className="px-2 py-1 rounded bg-[#08090D] border border-white/10 hover:border-[#C7FF4A] text-[#F5F5F0] transition-colors"
                    >
                      netstat -tuln
                    </button>
                    <button
                      onClick={() => runTerminalCommand('curl -I http://localhost')}
                      className="px-2 py-1 rounded bg-[#08090D] border border-white/10 hover:border-[#C7FF4A] text-[#F5F5F0] transition-colors"
                    >
                      curl -I
                    </button>
                  </div>

                  {/* Terminal Input Bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      runTerminalCommand();
                    }}
                    className="flex items-center gap-2 px-4 py-3 bg-[#08090D] border-t border-white/5"
                  >
                    <span className="text-[#C7FF4A] font-bold">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type a harmless command or 'help'..."
                      className="w-full bg-transparent border-none text-[#F5F5F0] focus:outline-none placeholder:text-[#9699A5]/40 text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[#C7FF4A] text-[#08090D] font-semibold rounded text-xs hover:bg-[#d8ff7a] transition-colors shrink-0"
                    >
                      Run
                    </button>
                  </form>
                </div>
              </section>

              {/* SECTION 03 */}
              <section id="section-03" className="relative sm:pl-16 scroll-mt-32">
                {/* Timeline node */}
                <div className="absolute left-6 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-[#08090D] border-2 border-[#C7FF4A] hidden sm:block" />

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-semibold text-[#C7FF4A]">03 —</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0]">
                    Diving into Cybersecurity & Reconnaissance
                  </h2>
                </div>

                <div className={`mt-6 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-5`}>
                  <p>
                    I started experimenting with industry-standard and open-source tools to understand system reconnaissance and defensive security.
                  </p>

                  <p>
                    Tools I explored:
                  </p>
                </div>

                {/* Interactive Tool Cards Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Tool 1: Nmap */}
                  <div className="p-5 rounded-2xl bg-[#11131A] border border-white/5 hover:border-[#C7FF4A]/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#C7FF4A]/10 border border-[#C7FF4A]/20 flex items-center justify-center text-[#C7FF4A] font-mono font-bold text-xs">
                          Nm
                        </div>
                        <h4 className="text-base font-semibold text-[#F5F5F0]">Nmap</h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#9699A5]">Network Discovery</span>
                    </div>
                    <p className="text-xs text-[#9699A5] leading-relaxed">
                      Network discovery, host availability tracking, and port service mapping across local subnets.
                    </p>
                  </div>

                  {/* Tool 2: Metasploit & Nuclei */}
                  <div className="p-5 rounded-2xl bg-[#11131A] border border-white/5 hover:border-[#9270FF]/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#9270FF]/10 border border-[#9270FF]/20 flex items-center justify-center text-[#9270FF] font-mono font-bold text-xs">
                          Nu
                        </div>
                        <h4 className="text-base font-semibold text-[#F5F5F0]">Metasploit & Nuclei</h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#9699A5]">Vulnerability Testing</span>
                    </div>
                    <p className="text-xs text-[#9699A5] leading-relaxed">
                      Security assessment, automated template scanning, and vulnerability detection workflows.
                    </p>
                  </div>

                  {/* Tool 3: Nikto */}
                  <div className="p-5 rounded-2xl bg-[#11131A] border border-white/5 hover:border-[#C7FF4A]/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#C7FF4A]/10 border border-[#C7FF4A]/20 flex items-center justify-center text-[#C7FF4A] font-mono font-bold text-xs">
                          Nk
                        </div>
                        <h4 className="text-base font-semibold text-[#F5F5F0]">Nikto</h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#9699A5]">Web Server Auditing</span>
                    </div>
                    <p className="text-xs text-[#9699A5] leading-relaxed">
                      Web server configuration checks, dangerous files, outdated server software, and HTTP header audits.
                    </p>
                  </div>

                  {/* Tool 4: John the Ripper */}
                  <div className="p-5 rounded-2xl bg-[#11131A] border border-white/5 hover:border-[#9270FF]/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#9270FF]/10 border border-[#9270FF]/20 flex items-center justify-center text-[#9270FF] font-mono font-bold text-xs">
                          JR
                        </div>
                        <h4 className="text-base font-semibold text-[#F5F5F0]">John the Ripper</h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#9699A5]">Password Auditing</span>
                    </div>
                    <p className="text-xs text-[#9699A5] leading-relaxed">
                      Auditing weak password policies and hash entropy to understand password vulnerability patterns.
                    </p>
                  </div>

                </div>

                <div className={`mt-8 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-5`}>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Hands-On Practice:</strong> Rather than just reading theory, I explored practical learning environments, including PortSwigger Web Security Academy, and learned about open-source intelligence methodologies.
                  </p>
                </div>

                {/* Responsible Learning Note */}
                <div className="mt-8 p-5 rounded-2xl bg-[#11131A] border border-amber-500/20 text-xs flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-amber-300 mb-1">Responsible Learning Policy</div>
                    <p className="text-[#9699A5] leading-relaxed">
                      Security tools should always be used strictly in isolated sandbox labs or on systems that the learner owns or has explicit, written authorization to test. Ethical security practice begins with respect for privacy, infrastructure, and legal boundaries.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 04 */}
              <section id="section-04" className="relative sm:pl-16 scroll-mt-32">
                {/* Timeline node */}
                <div className="absolute left-6 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-[#08090D] border-2 border-[#9270FF] hidden sm:block" />

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-semibold text-[#9270FF]">04 —</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0]">
                    Writing Code: Software Development & Automation
                  </h2>
                </div>

                <div className={`mt-6 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-5`}>
                  <p>
                    Theory means little if you cannot build. I began translating concepts into functional code using Python, JavaScript, and Bash scripting.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Port Scanners:</strong> Building local socket port scanners to understand network socket programming from scratch.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Automation Scripts:</strong> Creating experimental media-related scripts and shell scripts to understand automation and repetitive workflows.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Web Dashboards:</strong> Exploring frontend development and integrating tools such as Replit, Supabase, and GitHub to bring web projects to life.
                  </p>
                </div>

                {/* Code Showcase with Copy Snippet */}
                <div className="mt-8 rounded-2xl bg-[#08090D] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 bg-[#11131A] border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C7FF4A]" />
                      <span className="font-mono text-xs text-[#F5F5F0] font-medium">socket_probe.py</span>
                      <span className="text-[11px] font-mono text-[#9699A5] hidden sm:inline">— Python 3</span>
                    </div>
                    <button
                      onClick={copyPythonCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-[#9699A5] hover:text-[#C7FF4A] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                      title="Copy code snippet"
                    >
                      {codeCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#C7FF4A]" />
                          <span className="text-[#C7FF4A]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 overflow-x-auto font-mono text-xs text-[#9699A5] leading-relaxed">
                    <pre>
                      <code>{pythonScannerCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Technologies Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#11131A] border border-white/5 text-center">
                    <div className="text-[#C7FF4A] font-mono font-bold text-sm">Python 3</div>
                    <div className="text-[11px] text-[#9699A5] mt-1">Sockets & Automation</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#11131A] border border-white/5 text-center">
                    <div className="text-[#9270FF] font-mono font-bold text-sm">JavaScript</div>
                    <div className="text-[11px] text-[#9699A5] mt-1">Web Applications</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#11131A] border border-white/5 text-center">
                    <div className="text-[#F5F5F0] font-mono font-bold text-sm">Bash Shell</div>
                    <div className="text-[11px] text-[#9699A5] mt-1">System Scripts</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#11131A] border border-white/5 text-center">
                    <div className="text-[#C7FF4A] font-mono font-bold text-sm">Git & GitHub</div>
                    <div className="text-[11px] text-[#9699A5] mt-1">Version Control</div>
                  </div>
                </div>
              </section>

              {/* SECTION 05 */}
              <section id="section-05" className="relative sm:pl-16 scroll-mt-32">
                {/* Timeline node */}
                <div className="absolute left-6 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-[#08090D] border-2 border-[#C7FF4A] hidden sm:block" />

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-semibold text-[#C7FF4A]">05 —</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0]">
                    Expanding Horizons: Content Creation & Freelancing
                  </h2>
                </div>

                <div className={`mt-6 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-5`}>
                  <p>
                    Technology is not only about logic; it is also about creativity.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Digital Creation:</strong> Alongside technical studies, I explored video-editing workflows, 3D text presets, and short-form content creation.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">Freelance Exploration:</strong> Working with digital workflows and freelance platforms introduced me to practical project presentation, client expectations, and adaptability.
                  </p>
                  <p>
                    <strong className="text-[#F5F5F0] font-semibold">The Lesson:</strong> Whether optimizing a Python script or editing a video, balancing creative and technical pursuits showed me that adaptability is an important asset for a developer.
                  </p>
                </div>

                {/* Section 05 Editorial Collage Showcase */}
                <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl bg-[#11131A]">
                  <img
                    src="/src/assets/images/creative_digital_collage_1792050218899.jpg"
                    alt="Creative digital collage: video editing timeline, 3D typography presets, and interface wireframes"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[420px]"
                  />
                  <div className="p-4 bg-[#11131A] border-t border-white/5 flex items-center justify-between text-xs text-[#9699A5]">
                    <span className="font-mono">FIG 5.0 — THE CREATIVE & TECHNICAL SPECTRUM</span>
                    <span className="text-[#C7FF4A]">Video · 3D Motion · UI Design</span>
                  </div>
                </div>

                <blockquote className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p className="font-serif italic text-lg sm:text-xl text-[#F5F5F0] leading-relaxed">
                    “Whether optimizing a Python script or editing a video, balancing creative and technical pursuits showed me that adaptability is an important asset for a developer.”
                  </p>
                </blockquote>
              </section>

              {/* SECTION 06 */}
              <section id="section-06" className="relative sm:pl-16 scroll-mt-32">
                {/* Timeline node */}
                <div className="absolute left-6 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-[#08090D] border-2 border-[#9270FF] hidden sm:block" />

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-sm font-semibold text-[#9270FF]">06 —</span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0]">
                    Looking Ahead
                  </h2>
                </div>

                <div className={`mt-6 ${getProseFontClass()} ${getProseSizeClass()} text-[#F5F5F0]/90 space-y-5`}>
                  <p>
                    My journey is still unfolding. From solving mathematical problems and studying physics to experimenting with network tools and building web projects, every step has been an opportunity to learn independently.
                  </p>
                  <p>
                    With plans to explore computer science, software engineering, and cybersecurity more deeply, my goal remains the same:
                  </p>
                </div>

                {/* Powerful Typographic Composition */}
                <div className="mt-10 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#11131A] via-[#151822] to-[#08090D] border border-white/10 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7FF4A]/10 blur-3xl pointer-events-none" />
                  <div className="text-xs font-mono uppercase tracking-widest text-[#9270FF] mb-4">
                    THE NORTH STAR PRINCIPLE
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold font-display text-[#F5F5F0] leading-tight max-w-2xl mx-auto">
                    “Keep breaking things down.<br />
                    Keep building them back up.<br />
                    <span className="text-[#C7FF4A]">Never stop being curious.”</span>
                  </h3>
                  <div className="mt-6 text-xs text-[#9699A5] font-mono">
                    — ISHFAQ SHAFI
                  </div>
                </div>
              </section>

              {/* CLOSING SECTION */}
              <section id="closing" className="relative sm:pl-16 pt-12 border-t border-white/10 scroll-mt-32">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C7FF4A] mb-2">
                  COMMUNITY & CONNECTION
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#F5F5F0]">
                  Every Expert Starts as a Curious Beginner.
                </h3>

                <p className="mt-4 text-base text-[#9699A5] leading-relaxed max-w-2xl">
                  If you're a fellow student, developer, creator, or technology enthusiast exploring your own path, you're welcome to explore my projects and follow the journey.
                </p>

                {/* Closing Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={AUTHOR_CONFIG.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#08090D] bg-[#C7FF4A] hover:bg-[#d8ff7a] rounded-xl transition-all inline-flex items-center gap-2 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4A]"
                  >
                    <span>Explore GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={onOpenContact}
                    className="px-6 py-3 text-xs sm:text-sm font-medium text-[#F5F5F0] hover:text-[#C7FF4A] bg-[#11131A] hover:bg-[#151822] border border-white/10 rounded-xl transition-all inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9270FF]"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onBackToStories}
                    className="px-4 py-3 text-xs sm:text-sm font-medium text-[#9699A5] hover:text-white transition-colors"
                  >
                    Back to Stories Index
                  </button>
                </div>
              </section>

            </div>

          </main>
        </div>
      </div>
    </article>
  );
};
