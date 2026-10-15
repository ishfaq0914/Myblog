import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, BookOpen, Bookmark, Check } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'story' | 'stories' | 'projects' | 'about';
  onNavigate: (view: 'home' | 'story' | 'stories' | 'projects' | 'about', sectionId?: string) => void;
  onOpenContact: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenContact,
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkFeedback, setBookmarkFeedback] = useState(false);

  const handleBookmarkClick = () => {
    if (onToggleBookmark) {
      onToggleBookmark();
      setBookmarkFeedback(true);
      setTimeout(() => setBookmarkFeedback(false), 1500);
    }
  };

  const handleNavClick = (view: 'home' | 'story' | 'stories' | 'projects' | 'about', sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090D]/90 backdrop-blur-md border-b border-white/5 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-12 h-16 sm:h-20">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-lg sm:text-xl font-bold tracking-tight text-[#F5F5F0] hover:text-[#C7FF4A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4A] rounded"
          aria-label="ISHFAQ SHAFI Home"
        >
          ISHFAQ SHAFI
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#9699A5]">
          <button
            onClick={() => handleNavClick('stories')}
            className={`hover:text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A] ${
              currentView === 'stories' ? 'text-[#C7FF4A]' : ''
            }`}
          >
            Stories
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`hover:text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A] ${
              currentView === 'about' ? 'text-[#C7FF4A]' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`hover:text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A] ${
              currentView === 'projects' ? 'text-[#C7FF4A]' : ''
            }`}
          >
            Projects
          </button>
          <button
            onClick={onOpenContact}
            className="hover:text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A]"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'story' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBookmarkClick}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#9699A5] hover:text-[#F5F5F0] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                title={isBookmarked ? 'Bookmarked in this browser' : 'Bookmark story'}
              >
                {bookmarkFeedback ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C7FF4A]" />
                    <span className="text-[#C7FF4A]">Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#C7FF4A] text-[#C7FF4A]' : ''}`} />
                    <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleNavClick('stories')}
                className="px-4 py-2 text-xs font-semibold text-[#08090D] bg-[#C7FF4A] hover:bg-[#d4ff6e] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4A]"
              >
                Back to Stories
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('story')}
              className="px-4 py-2 text-xs font-semibold text-[#08090D] bg-[#C7FF4A] hover:bg-[#d4ff6e] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF4A] inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Featured Story</span>
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#9699A5] hover:text-[#F5F5F0] hover:bg-white/5 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#08090D] px-6 py-5 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left text-[#9699A5] hover:text-[#C7FF4A] transition-colors py-1"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left text-[#9699A5] hover:text-[#C7FF4A] transition-colors py-1 flex items-center justify-between"
            >
              <span>Featured Story</span>
              <span className="text-xs text-[#C7FF4A]">7 min</span>
            </button>
            <button
              onClick={() => handleNavClick('stories')}
              className="text-left text-[#9699A5] hover:text-[#C7FF4A] transition-colors py-1"
            >
              Stories Index
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left text-[#9699A5] hover:text-[#C7FF4A] transition-colors py-1"
            >
              About Ishfaq
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="text-left text-[#9699A5] hover:text-[#C7FF4A] transition-colors py-1"
            >
              Projects & Code
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left text-[#9699A5] hover:text-[#C7FF4A] transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
