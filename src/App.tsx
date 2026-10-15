import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedArticleHero } from './components/FeaturedArticleHero';
import { FullArticleView } from './components/FullArticleView';
import { StoriesIndex } from './components/StoriesIndex';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { ARTICLES } from './data/articles';
import { Article } from './types/blog';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'story' | 'stories' | 'projects' | 'about'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article>(ARTICLES[0]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ishfaq_blog_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ishfaq_blog_bookmarks', JSON.stringify(bookmarks));
    } catch (err) {
      console.error('Failed to save bookmark:', err);
    }
  }, [bookmarks]);

  const toggleBookmark = (articleId: string) => {
    setBookmarks((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const isBookmarked = bookmarks.includes(selectedArticle.id);

  const handleNavigate = (view: 'home' | 'story' | 'stories' | 'projects' | 'about', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'story') {
      setSelectedArticle(ARTICLES[0]);
    }
    
    // Scroll to top or specific section
    setTimeout(() => {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F5F0] selection:bg-[#C7FF4A] selection:text-[#08090D] flex flex-col font-sans">
      
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenContact={() => setContactModalOpen(true)}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => toggleBookmark(selectedArticle.id)}
      />

      {/* Main Content Area based on currentView */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-12">
            <Hero
              onExploreStory={() => handleNavigate('story')}
              onDiscoverWork={() => handleNavigate('projects')}
            />
            <FeaturedArticleHero
              article={ARTICLES[0]}
              onReadFullStory={() => handleNavigate('story')}
            />
            <ProjectsSection />
            <AboutSection onOpenContact={() => setContactModalOpen(true)} />
          </div>
        )}

        {currentView === 'story' && (
          <FullArticleView
            article={selectedArticle}
            onBackToStories={() => handleNavigate('stories')}
            onOpenContact={() => setContactModalOpen(true)}
            isBookmarked={isBookmarked}
            onToggleBookmark={() => toggleBookmark(selectedArticle.id)}
          />
        )}

        {currentView === 'stories' && (
          <StoriesIndex
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentView === 'projects' && (
          <div className="pt-6">
            <ProjectsSection />
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-6">
            <AboutSection onOpenContact={() => setContactModalOpen(true)} />
          </div>
        )}
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Editorial Minimalist Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setContactModalOpen(true)}
      />
    </div>
  );
}
