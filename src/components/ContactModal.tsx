import React, { useState, useEffect } from 'react';
import { X, Mail, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { AUTHOR_CONFIG } from '../data/authorConfig';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate clean client delivery and create mailto fallback
    setSubmitted(true);
    setTimeout(() => {
      // Allow mailto trigger if preferred
      window.location.href = `mailto:${AUTHOR_CONFIG.email}?subject=${encodeURIComponent(
        subject || 'Message from Blog Visitor'
      )}&body=${encodeURIComponent(`Hi Ishfaq,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
    }, 1000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(AUTHOR_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#11131A] border border-white/10 p-6 sm:p-8 shadow-2xl text-[#F5F5F0]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#9699A5] hover:text-[#F5F5F0] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7FF4A]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C7FF4A]">
            DIRECT DISPATCH
          </span>
          <h3 id="contact-modal-title" className="text-2xl font-bold font-display text-[#F5F5F0] mt-1">
            Get in Touch with Ishfaq
          </h3>
          <p className="text-xs sm:text-sm text-[#9699A5] mt-2">
            Have a question about code, cybersecurity, creative collaboration, or just want to connect?
          </p>
        </div>

        {/* Quick Email Copy Row */}
        <div className="p-3 mb-6 rounded-xl bg-[#08090D] border border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#9699A5]">
            <Mail className="w-4 h-4 text-[#C7FF4A]" />
            <span className="font-mono text-[#F5F5F0]">{AUTHOR_CONFIG.email}</span>
          </div>
          <button
            onClick={copyEmail}
            className="text-xs text-[#9699A5] hover:text-[#C7FF4A] inline-flex items-center gap-1 transition-colors"
          >
            {copiedEmail ? (
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

        {/* Contact Form */}
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C7FF4A]/10 text-[#C7FF4A] flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-display text-[#F5F5F0]">Message Formatted</h4>
            <p className="text-xs text-[#9699A5] max-w-xs mx-auto">
              Your default email client has been prepared, or you can write directly to <strong className="text-white">{AUTHOR_CONFIG.email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2 text-xs font-semibold text-[#08090D] bg-[#C7FF4A] rounded-xl hover:bg-[#d8ff7a] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#9699A5] mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#08090D] border border-white/10 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C7FF4A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#9699A5] mb-1.5">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#08090D] border border-white/10 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C7FF4A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#9699A5] mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Tech discussion, collaboration, or question"
                className="w-full px-3.5 py-2 rounded-xl bg-[#08090D] border border-white/10 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C7FF4A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#9699A5] mb-1.5">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts or inquiry..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#08090D] border border-white/10 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C7FF4A] transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#9699A5]">Directly delivered to Ishfaq</span>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-[#08090D] bg-[#C7FF4A] hover:bg-[#d8ff7a] rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-md"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
