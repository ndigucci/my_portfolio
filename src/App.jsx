import React, { useState, useEffect, useRef } from 'react';

// --- COMPONENT: SCROLL ANIMATION WRAPPER ---
const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        scrollObserver.unobserve(entry.target);
      }
    });

    if (ref.current) {
      scrollObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        scrollObserver.disconnect();
      }
    };
  }, []);

  const classes = `transition-all duration-1000 transform ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};

// --- COMPONENT: TERMINAL ---
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

// --- COMPONENT: BLOG MODAL ---
const BlogModal = ({ blog, onClose }) => (
  <div className="bg-zinc-900 w-full h-full p-8 rounded-lg border border-gray-700 overflow-y-auto relative text-left">
    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✖</button>
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 border-b border-gray-800 pb-8">
        <div className="text-cyan-500 font-mono text-xs mb-2">{blog.date} | {blog.category}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{blog.title}</h2>
        <div className="flex gap-2">
           {blog.tags.map(tag => <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">#{tag}</span>)}
        </div>
      </div>
      <div className="text-gray-300 leading-7 space-y-4 whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  </div>
);

// --- COMPONENT: CRYPTO / SUPPORT MODAL ---
const CryptoModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  
  // YOUR PRESERVED WALLET ADDRESS
  const walletAddress = "TTfGqg9vGLAbNXjdxsyL7xMnUjYN7jBtfU"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 w-full max-w-md p-8 rounded-2xl border border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)] text-center relative">
       <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✖</button>
       
       <div className="mb-6">
         <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
           <span className="text-3xl">₿</span>
         </div>
         <h2 className="text-2xl font-bold text-white">Support & Serious Offers</h2>
         <p className="text-gray-400 text-sm mt-2">Prioritize your request via Binance/USDT</p>
       </div>

       {/* QR Code Area */}
       <div className="bg-white p-2 rounded-xl w-48 h-48 mx-auto mb-6">
          <img src="/binance.jpg" alt="Binance QR" className="w-full h-full object-contain" />
       </div>

       {/* Address Area */}
       <div className="bg-black/50 border border-gray-700 rounded-lg p-3 mb-4 flex items-center justify-between">
         <div className="text-xs text-gray-400 font-mono truncate mr-2">{walletAddress}</div>
         <button onClick={handleCopy} className={`text-xs font-bold px-3 py-1 rounded transition ${copied ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            {copied ? 'COPIED!' : 'COPY'}
         </button>
       </div>

       <p className="text-xs text-gray-500">Network: Ensure you select the correct network (TRC20).</p>
       <p className="text-xs text-gray-500 mt-1">For inquiries, binance id:1089230952</p>
       <p className="text-xs text-gray-500 mt-1">Thank you for your support!</p>
    </div>
  );
};

// --- COMPONENT: LIVE CV SHEET ---
const CVModal = ({ onClose }) => (
  <div className="bg-white w-full h-full text-slate-800 overflow-y-auto relative font-sans flex flex-col md:flex-row">
    <button onClick={onClose} className="fixed top-4 right-6 bg-black text-white w-10 h-10 rounded-full z-50 hover:bg-red-600 transition shadow-lg flex items-center justify-center">✖</button>
    
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

    <div className="w-full md:w-2/3 p-8 md:p-12 text-left">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Bonheur Irumva</h1>
        <p className="text-blue-600 font-bold tracking-wide uppercase text-sm">Student Pharmacist | AI & Cybersecurity Enthusiast</p>
      </div>

      <p className="text-slate-600 italic mb-8 border-l-4 border-slate-200 pl-4">
        Motivated Pharmacy student at INES Ruhengeri with a strong science background and a unique passion for the intersection of healthcare, AI, and technology. I bridge the gap between medical practice and digital innovation.
      </p>

      <div className="space-y-8">
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
  const [showCV, setShowCV] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- PROJECTS DATA ---
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

  // --- NEW: CATEGORIZED CERTIFICATES DATA ---
  const certificateCategories = [
    {
      title: "🛡️ Cybersecurity & Tech",
      items: [
        {
          title: "DTP BIGNNER AI&ML COMPLETION",
          issuer: "DTP program/ conerstone",
          date: "2024",
          image: "/bignner.jpg", 
          link: "/biggner.jpg"
        },
        {
          title: "DTP INTERMEDIATE AI&ML COMPLETION",
          issuer: "DTP Propgram/cornerstone",
          date: "2025",
          image: "/cert2.jpg",
          link: "/cert2.jpg"
        },
        {
          title: "DTP ADVANCED AI&ML COMPLETION",
          issuer: "DTP program/ cornerstone",
          date: "2025",
          image: "/addv.jpg",
          link: "/addv.jpg"
        },
        {
          title: "CYBERSECURITY FUNDAMENTALS",
          issuer: "IBM/Coursera",
          date: "2025",
          image:"/cyber.jpg",
          link:"/cyber.jpg"
        }
      ]
    },
    {
      title: "💊 Healthcare,Pharmacy & Research",
      items: [
        {
          title: "RESEARCH COMMUNICATION",
          issuer: "WHO Organization/TDR",
          date: "2025",
          image: "/image.jpg", 
          link: "/image.jpg"
        },
        {
          title: "Certified Pharmacy Researcher",
          issuer: "National Pharmacy Council",
          date: "2025",
          image: "/pharm.jpg",
          link: "/pharm.jpg"
        },
        {
          title: "Problem solving in both Health and Technology",
          issuer: "DTP program/cornerstone/MINICT",
          date: "2025",
          image: "/prob.jpg",
          link: "/prob.jpg" 
        }
      ]
    }
  ];

  // --- BLOG DATA ---
  const blogs = [
    {
      id: 1,
      title: "The Future of AI in African Healthcare",
      date: "Dec 18, 2025",
      category: "HealthTech",
      excerpt: "How Artificial Intelligence is bridging the gap in diagnostics and pharmacy supply chains across the continent.",
      content: `Artificial Intelligence is not just a buzzword; it's a lifeline for modernizing healthcare in Africa.
      
      In this article, I explore how machine learning models can predict malaria outbreaks and optimize drug supply chains to prevent stock-outs in rural pharmacies. 
      
      We are seeing a shift from reactive to proactive healthcare, driven by data. As a pharmacy student and tech enthusiast, I believe the integration of tools like Python-based analysis into our medical curriculum is essential.`,
      tags: ["AI", "Africa", "Innovation"]
    },
    {
      id: 2,
      title: "Securing Patient Data: A Pharmacist's Perspective",
      date: "Nov 10, 2025",
      category: "Cybersecurity",
      excerpt: "Why cybersecurity fundamentals are becoming mandatory for modern health professionals.",
      content: `With the rise of Electronic Health Records (EHRs), the attack surface for hospitals has widened. 
      
      It is no longer enough to just know pharmacology; we must understand data privacy. This post discusses the basics of securing patient data, the importance of strong passwords in hospital systems, and why every health professional should know the basics of social engineering defenses.`,
      tags: ["Security", "Privacy", "HealthData"]
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
    <div className={`min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black ${(activeModal || showCV || showCrypto || activeBlog) ? 'overflow-hidden max-h-screen' : ''}`}>
      
      {/* --- GO TO TOP BUTTON (PRESERVED SIZE w-4 h-4) --- */}
      {showScrollBtn && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-500 transition-all z-50 animate-bounce"
          aria-label="Scroll to top"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      )}

      {/* --- MODALS --- */}
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

      {activeBlog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl h-[80vh] relative animate-in zoom-in-95 duration-200">
             <BlogModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
          </div>
        </div>
      )}

      {showCV && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-[850px] h-full md:h-[95vh] relative animate-in zoom-in-95 duration-200 shadow-2xl">
            <CVModal onClose={() => setShowCV(false)} />
          </div>
        </div>
      )}

      {showCrypto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <CryptoModal onClose={() => setShowCrypto(false)} />
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
              <div className="ml-10 flex items-center space-x-8">
                {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Blog'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300">
                     <span className="text-cyan-500 opacity-50 mr-1">&lt;</span>{item}<span className="text-cyan-500 opacity-50 ml-1">/&gt;</span>
                  </button>
                ))}
                
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold rounded-full hover:shadow-[0_0_15px_rgba(8,145,178,0.5)] transition-all transform hover:-translate-y-0.5"
                >
                  HIRE ME
                </button>

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
              {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Blog', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-white/5 hover:text-cyan-400 transition">{item}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-4 relative">
        <div className="max-w-6xl mx-auto z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-shrink-0 relative group animate-in fade-in slide-in-from-left duration-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl bg-black">
              <img src="/me.jpg" alt="Bonheur Profile" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"/>
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1 animate-in fade-in slide-in-from-right duration-1000">
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
              
              <button onClick={() => setShowCV(true)} className="px-8 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                <span>View CV</span>
                <span className="text-lg">👁️</span>
              </button>

              <button onClick={() => setShowCrypto(true)} className="px-8 py-3 border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                 <span>Sponsor</span>
                 <span>⚡</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION (ANIMATED) --- */}
      <RevealOnScroll>
        <section id="skills" className="py-24 px-4 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-12">
              <span className="h-px flex-1 bg-gray-800"></span><h2 className="px-4 text-3xl md:text-4xl font-bold text-white tracking-tight">Technical Skills</h2><span className="h-px flex-1 bg-gray-800"></span>
            </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
      </RevealOnScroll>

      {/* --- PROJECTS SECTION (ANIMATED) --- */}
      <RevealOnScroll>
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
      </RevealOnScroll>

      {/* --- NEW: CATEGORIZED CERTIFICATES SECTION --- */}
      <RevealOnScroll>
        <section id="certificates" className="py-24 px-4 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
              <span className="text-cyan-500 mr-3">03.</span> Certificates & Awards
            </h2>
            
            {/* Category Loop */}
            {certificateCategories.map((category, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-300 mb-6 border-l-4 border-cyan-500 pl-4">{category.title}</h3>
                
                <div className="flex overflow-x-auto gap-4 pb-4 no scrollbar">
                  {category.items.map((cert, index) => (
                   <div key={index} className="min-w-[250px] md:min-w-[260px] group relative bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                      
                      {/* Thumbnail Preview Area */}
                      <div className="h-40 w-full bg-gray-900 overflow-hidden relative">
                        {/* If image exists, show it. If not, show pattern */}
                        {cert.image ? (
                          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600 text-4xl">📜</div>
                        )}
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-white font-bold bg-cyan-600 px-4 py-2 rounded-full text-xs">Preview</span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-white text-lg mb-1">{cert.title}</h3>
                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-xs text-cyan-500 font-mono">{cert.date}</p>
                          {cert.link && (
                            <a href={cert.link} target="_blank" rel="noreferrer" className="text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1">
                              View Full ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </section>
      </RevealOnScroll>

      {/* --- BLOG SECTION --- */}
      <RevealOnScroll>
        <section id="blog" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
              <span className="text-cyan-500 mr-3">04.</span> Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-gray-600 transition-colors group cursor-pointer" onClick={() => setActiveBlog(blog)}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-cyan-500 font-mono text-xs px-2 py-1 bg-cyan-500/10 rounded">{blog.category}</span>
                    <span className="text-gray-500 text-xs">{blog.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{blog.excerpt}</p>
                  <button className="text-sm font-bold text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Article <span className="text-cyan-500">→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* --- CONTACT SECTION (ANIMATED) --- */}
      <RevealOnScroll>
        <section id="contact" className="py-24 px-4 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Let's Connect</h2>
              <p className="text-gray-400 text-lg">Have a project in mind? Looking for a <span className="text-cyan-400">Security Analyst</span> or <span className="text-cyan-400">Researcher</span>? Send me a message directly.</p>
            </div>
            <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl relative">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 relative z-10">
                
                {/* RESTORED KEY */}
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
      </RevealOnScroll>

      <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
        <p className="font-mono mb-2">Designed & Built by NDI GUCCI</p>
        
        {/* Social Icons Container */}
        <div className="flex justify-center gap-6 mt-4">
          
          {/* GitHub Icon (PRESERVED SIZE w-4 h-4) */}
          <a href="https://github.com/ndigucci" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>

          {/* LinkedIn Icon (PRESERVED SIZE w-4 h-4) */}
          <a href="https://linkedin.com/in/ndigucci" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>

          {/* Twitter (X) Icon (PRESERVED SIZE w-4 h-4) */}
          <a href="https://twitter.com/jyakuryama" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>

          {/* Email Icon (PRESERVED SIZE w-4 h-4) */}
          <a href="mailto:bonheurirumva43@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm12.008 9.071h-13.326l3.855-4.813 2.908 3.439 2.908-3.439 3.655 4.813zm-5.433-6.187l1.235-1.46 5.567 6.576v-11.026l-6.802 5.91zm.902-1.072l-2.091 2.472-2.108-2.472-5.902-5.228h15.986l-5.885 5.228z"/></svg>
          </a>

          {/* WhatsApp Icon (PRESERVED SIZE w-4 h-4) */}
          <a href="https://wa.me/250785008817" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;