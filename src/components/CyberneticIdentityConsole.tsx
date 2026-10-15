import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Shield, Cpu, Activity, Sparkles, 
  Copy, Check, RefreshCw, Radio, Image as ImageIcon,
  Key, Lock, Eye, Zap
} from 'lucide-react';
import { AUTHOR_CONFIG } from '../data/authorConfig';

export const CyberneticIdentityConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'terminal' | 'portrait'>('matrix');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('Idle · System Armed');
  const [copiedHash, setCopiedHash] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [packetCount, setPacketCount] = useState(1248);

  // Terminal state
  const [termHistory, setTermHistory] = useState<Array<{ cmd: string; res: string; isLime?: boolean }>>([
    { cmd: 'whoami', res: 'Ishfaq Shafi — Self-Taught Developer & Security Learner' },
    { cmd: 'status', res: 'Class 12 STEM Student | Competitive Prep | Systems Builder', isLime: true },
    { cmd: 'help', res: 'Try commands: whoami, stack, vision, ping, clear' },
  ]);
  const [termInput, setTermInput] = useState('');

  // 3D Card Tilt Effect on pointer move
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Live packet simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 3) + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanMessage('Probing local interfaces...');
    
    setTimeout(() => {
      setScanMessage('TCP Handshake OK · Latency 0.42ms');
    }, 1200);

    setTimeout(() => {
      setScanMessage('All Systems Secure · Integrity 100%');
      setIsScanning(false);
    }, 2600);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText('SHA256:8f2a9c4b1e5d7a3f0e8b2c9d1a4e7f0b2c5d8a1e');
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setTermHistory([]);
      setTermInput('');
      return;
    }

    let res = '';
    let isLime = false;

    if (cmd === 'whoami') {
      res = 'Ishfaq Shafi — Aspiring Software Engineer & Cybersecurity Enthusiast';
    } else if (cmd === 'stack') {
      res = 'Core: Python 3, Linux Shell/Bash, Sockets, React 19, TypeScript, Tailwind';
      isLime = true;
    } else if (cmd === 'vision') {
      res = '"Keep breaking things down. Keep building them back up. Never stop being curious."';
    } else if (cmd === 'ping') {
      res = '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms';
      isLime = true;
    } else if (cmd === 'help') {
      res = 'Commands: whoami, stack, vision, ping, clear';
    } else {
      res = `Command '${cmd}' logged in educational sandbox. Type 'help' for options.`;
    }

    setTermHistory((prev) => [...prev, { cmd: termInput.trim(), res, isLime }]);
    setTermInput('');
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative rounded-3xl bg-[#11131A] border border-white/10 overflow-hidden shadow-2xl transition-transform duration-200 ease-out flex flex-col justify-between"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#C7FF4A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#9270FF]/15 blur-3xl pointer-events-none" />

      {/* Top Controller Bar */}
      <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between gap-2 bg-[#08090D]/60 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF4A] shadow-[0_0_8px_#C7FF4A]" />
          <span className="font-mono text-xs font-semibold text-[#F5F5F0] tracking-wide">
            IDENTITY CONSOLE
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#151822] p-1 rounded-xl border border-white/5 text-xs font-mono">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'matrix' 
                ? 'bg-[#C7FF4A] text-[#08090D] font-bold shadow-sm' 
                : 'text-[#9699A5] hover:text-white'
            }`}
            title="Holographic Identity Matrix"
          >
            <Zap className="w-3 h-3" />
            <span>Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'terminal' 
                ? 'bg-[#C7FF4A] text-[#08090D] font-bold shadow-sm' 
                : 'text-[#9699A5] hover:text-white'
            }`}
            title="Interactive Shell"
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('portrait')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'portrait' 
                ? 'bg-[#C7FF4A] text-[#08090D] font-bold shadow-sm' 
                : 'text-[#9699A5] hover:text-white'
            }`}
            title="Classic Studio Portrait"
          >
            <ImageIcon className="w-3 h-3" />
            <span>Photo</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CYBERNETIC MATRIX VIEW */}
      {activeTab === 'matrix' && (
        <div className="relative p-6 sm:p-8 flex flex-col items-center justify-center min-h-[360px] text-center select-none overflow-hidden">
          
          {/* Background Digital Grid Lines */}
          <div className="absolute inset-0 bg-subtle-grid opacity-40 pointer-events-none" />

          {/* Central Holographic Monogram Shield */}
          <div className="relative my-4 flex items-center justify-center">
            
            {/* Outer Rotating Radar Ring */}
            <div className={`absolute w-44 h-44 rounded-full border border-dashed border-[#C7FF4A]/25 transition-all duration-1000 ${
              isScanning ? 'animate-spin scale-110 border-[#C7FF4A]' : ''
            }`} />

            {/* Middle Violet Orbit */}
            <div className="absolute w-36 h-36 rounded-full border border-[#9270FF]/20" />

            {/* Hexagonal Core Emblem */}
            <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#181A24] via-[#11131A] to-[#08090D] border-2 border-[#C7FF4A]/60 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(199,255,74,0.15)] group">
              <span className="font-display font-black text-4xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#F5F5F0] via-[#C7FF4A] to-[#9270FF]">
                IS
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#9699A5] uppercase mt-0.5">
                SEC_NODE
              </span>

              {/* Little corner micro-markers */}
              <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#C7FF4A]" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#C7FF4A]" />
              <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#C7FF4A]" />
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#C7FF4A]" />
            </div>
          </div>

          {/* Telemetry Readout */}
          <div className="mt-4 space-y-1.5 font-mono text-xs">
            <div className="text-[#F5F5F0] font-semibold flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#C7FF4A]" />
              <span>DEFENSIVE ARCHITECTURE CORE</span>
            </div>
            <div className="text-[11px] text-[#9699A5]">
              Active Protocol: <span className="text-[#9270FF]">TCP/IP & Linux POSIX</span>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerScan}
              disabled={isScanning}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-xl border transition-all inline-flex items-center gap-2 ${
                isScanning 
                  ? 'bg-[#C7FF4A]/20 border-[#C7FF4A] text-[#C7FF4A] animate-pulse'
                  : 'bg-white/[0.04] border-white/10 text-[#F5F5F0] hover:border-[#C7FF4A] hover:text-[#C7FF4A]'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Ping Network Core'}</span>
            </button>

            <button
              onClick={handleCopyHash}
              className="px-3 py-2 text-xs font-mono text-[#9699A5] hover:text-white bg-white/[0.02] border border-white/5 rounded-xl transition-colors inline-flex items-center gap-1.5"
              title="Copy cryptographic signature"
            >
              {copiedHash ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C7FF4A]" />
                  <span className="text-[#C7FF4A]">Copied</span>
                </>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5" />
                  <span>PGP Hash</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-3 text-[11px] font-mono text-[#C7FF4A]/80">
            {scanMessage}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE LIVE TERMINAL */}
      {activeTab === 'terminal' && (
        <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[360px] font-mono text-xs bg-[#08090D]">
          <div className="space-y-2.5 overflow-y-auto max-h-56 pr-1">
            <div className="text-[#9699A5] text-[11px] pb-1 border-b border-white/5">
              // Ishfaq Shafi Interactive Dossier v1.0
            </div>
            {termHistory.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#C7FF4A]">
                  <span>$</span>
                  <span className="text-[#F5F5F0]">{item.cmd}</span>
                </div>
                <div className={`text-[11px] pl-2 border-l border-white/10 ${
                  item.isLime ? 'text-[#C7FF4A]' : 'text-[#9699A5]'
                }`}>
                  {item.res}
                </div>
              </div>
            ))}
          </div>

          {/* Quick command buttons & input */}
          <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              <span className="text-[#9699A5] py-0.5">Quick:</span>
              <button
                onClick={() => setTermHistory((prev) => [...prev, { cmd: 'stack', res: 'Python 3, Linux Shell, Network Sockets, React 19, TypeScript', isLime: true }])}
                className="px-2 py-0.5 rounded bg-white/5 text-[#F5F5F0] hover:text-[#C7FF4A]"
              >
                stack
              </button>
              <button
                onClick={() => setTermHistory((prev) => [...prev, { cmd: 'vision', res: '"Keep breaking things down. Keep building them back up."', isLime: false }])}
                className="px-2 py-0.5 rounded bg-white/5 text-[#F5F5F0] hover:text-[#C7FF4A]"
              >
                vision
              </button>
              <button
                onClick={() => setTermHistory([])}
                className="px-2 py-0.5 rounded bg-white/5 text-[#9699A5] hover:text-white"
              >
                clear
              </button>
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
              <span className="text-[#C7FF4A] font-bold">$</span>
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="type 'help', 'whoami', 'stack'..."
                className="w-full bg-transparent border-none text-[#F5F5F0] focus:outline-none placeholder:text-[#9699A5]/40 text-xs font-mono"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-[#C7FF4A] text-[#08090D] font-bold rounded text-xs hover:bg-[#d8ff7a]"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: CLASSIC STUDIO PORTRAIT (Accessible at all times) */}
      {activeTab === 'portrait' && (
        <div className="relative aspect-square overflow-hidden bg-[#08090D]">
          <img
            src={AUTHOR_CONFIG.avatarUrl}
            alt={AUTHOR_CONFIG.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11131A] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#9699A5]">
            <span>STUDIO MONOGRAPH</span>
            <span className="text-[#C7FF4A]">ISHFAQ SHAFI</span>
          </div>
        </div>
      )}

      {/* Bottom Telemetry Strip */}
      <div className="px-5 py-3 bg-[#08090D]/80 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#9699A5]">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#C7FF4A]" />
          <span>Packets: {packetCount}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-[#9270FF]" />
          <span>SHA-256 Verified</span>
        </div>
      </div>
    </div>
  );
};
