import React, { useState, useEffect, useRef } from 'react';

// --- COMPONENT: TERMINAL (For Cybersecurity Project) ---
const Terminal = ({ onClose }) => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Initializing Kali Linux environment...' },
    { type: 'output', content: 'Access granted. Welcome, Guest.' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];
      let response = '';
      switch (cmd) {
        case 'help': response = 'Available commands: help, whoami, skills, contact, clear, exit'; break;
        case 'whoami': response = 'User: Guest | Role: Recruiter/Visitor | Access: Restricted'; break;
        case 'skills': response = 'Loading... Python, Kali Linux, Wireshark, Burp Suite, Metasploit'; break;
        case 'contact': response = 'Email: irumvabonheur@icloud.com | Status: Open to work'; break;
        case 'clear': setHistory([]); setInput(''); return;
        case 'exit': onClose(); return;
        default: response = `Command not found: ${cmd}. Type "help" for assistance.`;
      }
      setHistory([...newHistory, { type: 'output', content: response }]);
      setInput('');
    }
  };

  return (
    <div className="bg-[#0c0c0c] w-full h-full text-green-500 font-mono p-4 rounded-lg flex flex-col border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
      <div className="flex justify-between items-center border-b border-green-500/30 pb-2 mb-2">
        <span className="text-xs">root@kali:~</span>
        <button onClick={onClose} className="text-red-500 hover:text-red-400">✖</button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-white' : 'text-green-400'}`}>
            {line.type === 'input' ? '> ' : ''}{line.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center mt-2">
        <span className="text-green-500 mr-2">root@kali:~#</span>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none outline-none flex-1 text-white" autoFocus />
      </div>
    </div>
  );
};

// --- COMPONENT: RESEARCH MODAL ---
const ResearchModal = ({ project, onClose }) => (
  <div className="bg-zinc-900 w-full h-full p-8 rounded-lg border border-gray-700 overflow-y-auto relative text-left">
    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✖</button>
    <div className="mb-6">
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 bg-${project.color}-500/10 text-${project.color}-400 border border-${project.color}-500/20`}>
        {project.type === 'research' ? 'Academic Paper' : 'Project Details'}
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
      <p className="text-gray-400 italic">{project.subtitle}</p>
    </div>
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <div className="bg-black/30 p-4 rounded border border-gray-800">
        <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">Abstract</h3>
        <p>{project.abstract}</p>
      </div>
      <div>
        <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">Key Findings</h3>
        <ul className="list-disc pl-5 space-y-2">
          {project.findings?.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

// --- COMPONENT: LIVE CV SHEET (New Feature) ---
const CVModal = ({ onClose }) => (
  <div className="bg-white w-full h-full text-slate-800 overflow-y-auto relative font-sans flex flex-col md:flex-row">
    {/* Close Button */}
    <button onClick={onClose} className="fixed top-4 right-6 bg-black text-white w-10 h-10 rounded-full z-50 hover:bg-red-600 transition shadow-lg flex items-center justify-center">✖</button>
    
    {/* Left Sidebar */}
    <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-slate-200 text-left">
      <div className="w-32 h-32 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img src="/me.jpg" alt="Profile" className="w-full h-full object-cover" />
      </div>
      
      <div className="space-y-6 text-sm">
        <div>
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 border-b-2 border-blue-500 inline-block">Contact</h3>
          <p className="mt-2">📍 Rwanda</p>
          <p>📧 irumvabonheur@icloud.com</p>
          <p>🔗 ndigucci.vercel.app</p>
          <p>🐙 github.com/ndigucci</p>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 border-b-2 border-blue-500 inline-block">Tech Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Python', 'Kali Linux', 'Cybersecurity', 'Git', 'React', 'Mendeley'].map(s => (
              <span key={s} className="bg-white border border-slate-300 px-2 py-1 rounded text-xs font-semibold">{s}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 border-b-2 border-blue-500 inline-block">Medical Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Pharmacy Practice', 'Med Safety', 'Clinical Research', 'Infection Control'].map(s => (
              <span key={s} className="bg-white border border-slate-300 px-2 py-1 rounded text-xs font-semibold">{s}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 border-b-2 border-blue-500 inline-block">Languages</h3>
          <ul className="space-y-1 text-slate-600 mt-2">
            <li>🇫🇷 French (Fluent)</li>
            <li>🇬🇧 English (Good)</li>
            <li>🇪🇸 Spanish (Good)</li>
            <li>🇰🇪 Swahili (Good)</li>
            <li>🇷🇼 Kinyarwanda (Native)</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Right Content */}
    <div className="w-full md:w-2/3 p-8 md:p-12 text-left">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Bonheur Irumva</h1>
        <p className="text-blue-600 font-bold tracking-wide uppercase text-sm">Student Pharmacist | AI & Cybersecurity Enthusiast</p>
      </div>

      <p className="text-slate-600 italic mb-8 border-l-4 border-slate-200 pl-4">
        Motivated Pharmacy student at INES Ruhengeri with a strong science background and a unique passion for the intersection of healthcare, AI, and technology. I bridge the gap between medical practice and digital innovation.
      </p>

      <div className="space-y-8">
        {/* Education */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">Education</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Bachelor of Pharmacy (BPharm)</span>
                <span className="text-slate-500 text-sm">Current</span>
              </div>
              <div className="text-blue-600 text-sm">INES Ruhengeri</div>
            </div>
            <div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>A-Level (MCB)</span>
                <span className="text-slate-500 text-sm">2023 – 2025</span>
              </div>
              <div className="text-blue-600 text-sm">G.S REMERA RUKOMA</div>
            </div>
            <div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>O-Level Education</span>
                <span className="text-slate-500 text-sm">2019 – 2022</span>
              </div>
              <div className="text-blue-600 text-sm">E.S Kanombe / EFOTEC</div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">Experience</h2>
          <div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>Anti-AIDS Club Assistant</span>
              <span className="text-slate-500 text-sm">2024</span>
            </div>
            <div className="text-blue-600 text-sm mb-2">École de Dieu</div>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
              <li>Assisted in health awareness and prevention activities regarding HIV/AIDS.</li>
              <li>Supported teamwork and student engagement programs.</li>
              <li>Facilitated peer communication for better health outcomes.</li>
            </ul>
          </div>
        </section>

        {/* References */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded">
              <div className="font-bold text-slate-900 text-sm">RUHIGANDE Aaron</div>
              <div className="text-xs text-slate-500 uppercase mb-1">Headmaster, G.S Remera Rukoma</div>
              <div className="text-sm">📞 0788410325</div>
            </div>
            <div className="bg-slate-50 p-3 rounded">
              <div className="font-bold text-slate-900 text-sm">TUMUKUNDE L. Monique</div>
              <div className="text-xs text-slate-500 uppercase mb-1">Headmistress, E.S Kanombe</div>
              <div className="text-sm">📧 eskanombe@gmail.com</div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-slate-200 flex justify-center no-print">
        <button onClick={() => window.print()} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold shadow-lg flex items-center gap-2">
          <span>🖨️</span> Print / Save PDF
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showCV, setShowCV] = useState(false); // New State for CV

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- DATA ---
  const projects = [
    {
      id: 1,
      title: "AI in Pharmacy",
      subtitle: "Machine Learning for Medication Safety",
      type: "research",
      desc: "Research exploring artificial intelligence in medication safety and clinical decision support.",
      abstract: "This study investigates the efficacy of Machine Learning algorithms in detecting potential drug-drug interactions (DDIs).",
      findings: ["Identified 15% more interactions than standard systems.", "Reduced alert fatigue.", "Implemented using Python."],
      tags: ["AI", "Research", "HealthTech"],
      color: "blue"
    },
    {
      id: 2,
      title: "Cybersecurity Lab",
      subtitle: "Penetration Testing & Network Security",
      type: "terminal",
      desc: "Interactive system security and ethical hacking environment. Click to access the terminal.",
      tags: ["Kali Linux", "Security", "Bash"],
      color: "green"
    },
    {
      id: 3,
      title: "Academic Research",
      subtitle: "Pharmaceutical Data Management",
      type: "research",
      desc: "Advanced literature review and citation management for pharmaceutical sciences.",
      abstract: "A comprehensive review of digital tools used in modern pharmaceutical research.",
      findings: ["Comparative analysis of Mendeley vs. Zotero.", "Automated citation formatting."],
      tags: ["Mendeley", "Writing", "Data"],
      color: "purple"
    }
  ];

  const certificates = [
    {
      title: "Google Cybersecurity Professional",
      issuer: "Coursera&DTP / Google",
      date: "2024",
      icon: "🛡️",
      file: "/cert1.jpg"
    },
    {
      title: "AI for Healthcare",
      issuer: "DeepLearning.AI",
      date: "2023",
      icon: "🤖",
      file: null
    },
    {
      title: "Certified Pharmacy Assistant",
      issuer: "National pharmacy council",
      date: "2025",
      icon: "💊",
      file: null
    }
  ];

  const Typewriter = ({ text, delay }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, delay, text]);
    return <span>{currentText}</span>;
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black ${(activeModal || showCV) ? 'overflow-hidden max-h-screen' : ''}`}>
      
      {/* --- MODALS --- */}
      
      {/* 1. Project Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl h-[80vh] relative animate-in zoom-in-95 duration-200">
            {activeModal.type === 'terminal' ? (
              <Terminal onClose={() => setActiveModal(null)} />
            ) : (
              <ResearchModal project={activeModal} onClose={() => setActiveModal(null)} />
            )}
          </div>
        </div>
      )}

      {/* 2. Live CV Modal */}
      {showCV && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-[850px] h-full md:h-[95vh] relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <CVModal onClose={() => setShowCV(false)} />
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[120px]"></div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div onClick={() => scrollToSection('home')} className="cursor-pointer font-bold text-xl tracking-tighter hover:text-cyan-400 transition duration-300">
              NDI <span className="text-cyan-500">GUCCI</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300">
                     <span className="text-cyan-500 opacity-50 mr-1">&lt;</span>{item}<span className="text-cyan-500 opacity-50 ml-1">/&gt;</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">☰</button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-white/5 hover:text-cyan-400 transition">{item}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-4 relative">
        <div className="max-w-6xl mx-auto z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl bg-black">
              <img src="/me.jpg" alt="Bonheur Profile" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"/>
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="inline-block mb-4 px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-mono tracking-wide">Welcome to my portfolio</div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">HI, I'M <br className="md:hidden" /><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">BONHEUR</span></h1>
            <div className="h-8 md:h-12 text-lg md:text-2xl text-gray-400 font-mono mb-8 flex justify-center md:justify-start items-center">
              <span className="text-cyan-500 mr-2">$</span>
              <Typewriter text="Pharmacy Student | AI Enthusiast" delay={55} />
              <span className="animate-pulse ml-1">_</span>
            </div>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0">I bridge the gap between <span className="text-white font-semibold">Healthcare</span> and <span className="text-white font-semibold">Technology</span>, building digital solutions that enhance safety and efficiency in Africa and beyond.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50">View Projects</button>
              
              {/* --- CV BUTTON (NOW OPENS LIVE CV MODAL) --- */}
              <button onClick={() => setShowCV(true)} className="px-8 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                <span>View CV</span>
                <span className="text-lg">👁️</span>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-24 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <span className="h-px flex-1 bg-gray-800"></span><h2 className="px-4 text-3xl md:text-4xl font-bold text-white tracking-tight">Technical Skills</h2><span className="h-px flex-1 bg-gray-800"></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition"><span className="text-2xl">💻</span></div>
              <h3 className="text-xl font-bold text-white mb-4">Tech & Cyber</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Linux (Kali)', 'AI Tools', 'Cybersecurity', 'Git'].map(skill => <span key={skill} className="text-xs font-mono px-2 py-1 bg-gray-800 text-cyan-400 rounded border border-gray-700">{skill}</span>)}
              </div>
            </div>
            <div className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-green-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition"><span className="text-2xl">💊</span></div>
              <h3 className="text-xl font-bold text-white mb-4">Healthcare</h3>
              <div className="flex flex-wrap gap-2">
                {['Pharmacy', 'Med Safety', 'Research', 'Patient Care'].map(skill => <span key={skill} className="text-xs font-mono px-2 py-1 bg-gray-800 text-green-400 rounded border border-gray-700">{skill}</span>)}
              </div>
            </div>
            <div className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-purple-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition"><span className="text-2xl">⚡️</span></div>
              <h3 className="text-xl font-bold text-white mb-4">Productivity</h3>
              <div className="flex flex-wrap gap-2">
                {['Mendeley', 'PowerPoint', 'Office 365', 'Digital Workflows'].map(skill => <span key={skill} className="text-xs font-mono px-2 py-1 bg-gray-800 text-purple-400 rounded border border-gray-700">{skill}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center"><span className="text-cyan-500 mr-3">VISIT.</span> My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} onClick={() => setActiveModal(project)} className="group relative bg-[#111] rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"><span className="text-xl">{project.type === 'terminal' ? '📟' : '📄'}</span></div>
                    <span className="text-gray-500 hover:text-white group-hover:translate-x-1 transition-transform">↗</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">{project.tags.map(tag => <span key={tag} className="text-xs text-gray-500 font-mono">#{tag}</span>)}</div>
                  <div className="mt-4 text-xs font-bold text-cyan-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">{project.type === 'terminal' ? '> Launch Terminal' : '> View Research'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CERTIFICATES SECTION --- */}
      <section id="certificates" className="py-24 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
            <span className="text-cyan-500 mr-3">03.</span> Certificates & Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-[#111] border border-gray-800 rounded-xl hover:border-cyan-500/30 transition-all hover:translate-x-2">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                  {cert.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{cert.title}</h3>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                  <p className="text-xs text-cyan-500 font-mono mt-1">{cert.date}</p>
                  
                  {cert.file && (
                    <a href={cert.file} target="_blank" rel="noreferrer" className="text-xs text-cyan-500 hover:text-cyan-300 mt-2 block flex items-center gap-1 font-bold">
                      View Certificate ↗
                    </a>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-gray-400 text-lg">Have a project in mind? Looking for a <span className="text-cyan-400">Security Analyst</span> or <span className="text-cyan-400">Researcher</span>? Send me a message directly.</p>
          </div>
          <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 relative z-10">
              {/* --- I RESTORED YOUR KEY HERE --- */}
              <input type="hidden" name="access_key" value="30457cd9-af59-4f98-8cf8-f970488fbd7e" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-cyan-500">Name</label>
                  <input type="text" name="name" required placeholder="Enter your name" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono text-cyan-500">Email</label>
                  <input type="email" name="email" required placeholder="name@example.com" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono text-cyan-500">Message</label>
                <textarea name="message" required rows="5" placeholder="Type your message here..." className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg transform hover:-translate-y-1">Get in Touch</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
        <p className="font-mono mb-2">Designed & Built by NDI GUCCI</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/ndigucci" className="hover:text-cyan-400 transition">GitHub</a>
          <a href="https://linkedin.com/in/ndigucci" className="hover:text-cyan-400 transition">LinkedIn</a>
          <a href="https://twitter.com/jyakuryama" className="hover:text-cyan-400 transition">Twitter</a>
          <a href="mailto:bonheurirumva43@gmail.com" className="hover:text-cyan-400 transition">Email</a>
          <a href="whatsapp:+250785008817" className="hover:text-cyan-400 transition">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}

export default App;