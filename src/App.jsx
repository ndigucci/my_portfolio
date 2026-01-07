import React, { useState, useEffect, useRef } from 'react';
import Terminal from './components/Terminal'; 
import LoadingScreen from './components/LoadingScreen';

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
    if (ref.current) scrollObserver.observe(ref.current);
    return () => ref.current && scrollObserver.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      {children}
    </div>
  );
};

// --- DATA: PROJECTS ---
const projects = [
  {
    id: 1, 
    title: "AI in Pharmacy", 
    subtitle: "Machine Learning for Safety", 
    type: "research", 
    image: "/pharmai.jpg", 
    desc: "Research exploring AI in medication safety and drug interaction detection.", 
    tags: ["AI", "Research", "HealthTech"],
    abstract: "This study investigates the efficacy of Machine Learning algorithms in detecting potential drug-drug interactions (DDIs).", 
    findings: ["Identified 15% more interactions than standard systems.", "Reduced alert fatigue for pharmacists."]
  },
  {
    id: 2, 
    title: "Health Assistant CLI", 
    subtitle: "Guidance & Triage", 
    type: "terminal", 
    image: "/linus.jpg",
    desc: "Interactive command-line health assistant for triage and education. Click to try!", 
    tags: ["React", "Triage", "CLI"]
  },
  {
    id: 3, 
    title: "Academic Research", 
    subtitle: "Pharma Data", 
    type: "research", 
    image: "/academic.jpg",
    desc: "Advanced literature review and citation management for pharmaceutical sciences.", 
    tags: ["Mendeley", "Data", "Writing"],
    abstract: "A comprehensive review of digital tools used in modern pharmaceutical research.", 
    findings: ["Comparative analysis of Mendeley vs. Zotero.", "Automated citation formatting workflows."]
  }
];

// --- DATA: CERTIFICATES ---
const certificateCategories = [
  {
    title: "🛡️ Cybersecurity & Tech",
    items: [
      { title: "DTP BEGINNER AI & ML", 
        issuer: "Cornerstone", 
        date: "2024", 
        image: "/bignner.jpg", 
        link: "/biggner.jpg" 
      },
      { title: "DTP INTERMEDIATE AI&ML",
       issuer: "Cornerstone", 
       date: "2025", 
       image: "/cert2.jpg", 
       link: "/cert2.jpg" 
      },
      { title: "DTP ADVANCED AI&ML", 
        issuer: "Cornerstone", 
        date: "2025", 
        image: "/addv.jpg", 
        link: "/addv.jpg" 
      },
      { title: "CYBERSECURITY FUNDAMENTALS", 
        issuer: "IBM | Coursera", 
        date: "2025", 
        image: "/cyber.jpg", 
        link: "/cyber.jpg" 
      },
      { title: "INTRO TO AI", 
        issuer: "IBM | Coursera", 
        date: "2025", 
        image: "/intro.jpg", 
        link: "/intro.jpg" 
      },
      { title: "PYTHON FOR DATA SCIENCE", 
        issuer: "Google", 
        date: "2025", 
        image: "/pthon.jpg", 
        link: "/pthon.jpg" 
      },
      { title: "ICT ESSENTIALS", 
        issuer: "ICDL Africa", 
        date: "2025", 
        image: "/icdlo.jpg", 
        link: "/icdlo.jpg" 
      },
      { title: "ICDL COURSE PROOF", 
        issuer: "ICDL Africa", 
        date: "2025", 
        image: "/icdll.jpg", 
        link: "/icdll.jpg" 
      },
      {
        title: "COMPLETION OF AI IMPACTS ON SOCIETY AND GOVERNMENT",
        issuer: "apolitical | Google",
        date: "2026",
        image: "/apolitical.jpg",
        link: "/apolitical.jpg"
      }
    ]
  },
  {
    title: "💊 Healthcare & Research",
    items: [
      { title: "RESEARCH COMMUNICATION",
       issuer: "WHO | TDR",
      date: "2025", 
      image: "/image.jpg", 
      link: "/image.jpg"
    },
      { title: "Certified Pharmacy Researcher", 
        issuer: "NPC", 
        date: "2025", 
        image: "/pharm.jpg", 
        link: "/pharm.jpg" 
      },
      { title: "Problem Solving in Health", 
        issuer: "MINICT", 
        date: "2025", 
        image: "/prob.jpg", 
        link: "/prob.jpg" 
      },
      {
        title: "Embedding Health in climate negotiation",
        issuer: "apolical | WELLCOME",
        date: "2026",
        image: "/climate.jpg",
        link:"/climate.jpg"
      }
    ]
  },
  {
    title: "🤝OTHER CERTIFICATES",
    items: [
      {
        title: "",
        issuer: "",
        date: "",
        image: "/",
        link: "/"      
      }
    ]
  }
];

// --- DATA: BLOGS ---
const blogs = [
  { id: 1, title: "AI in African Healthcare", date: "Dec 18, 2025", category: "HealthTech", excerpt: "How Artificial Intelligence is bridging the gap in diagnostics and pharmacy supply chains across the continent.", content: "Full article content here...", tags: ["AI", "Africa"] },
  { id: 2, title: "Securing Patient Data", date: "Nov 10, 2025", category: "Cybersecurity", excerpt: "Why cybersecurity fundamentals are becoming mandatory for modern health professionals.", content: "Full article content here...", tags: ["Security", "Privacy"] }
];

// --- MODALS ---
const ResearchModal = ({ project, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-zinc-900 w-full max-w-4xl h-[80vh] relative animate-in zoom-in-95 duration-200 p-8 rounded-lg border border-gray-700 overflow-y-auto">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✖</button>
      <div className="mb-6">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 bg-${project.color}-500/10 text-${project.color}-400 border border-${project.color}-500/20`}>
          {project.type === 'research' ? 'Academic Paper' : 'Project Details'}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
        <p className="text-gray-400 italic">{project.subtitle}</p>
      </div>
      
      {/* Show Project Image inside Modal too */}
      {project.image && (
        <div className="mb-6 w-full h-64 rounded-lg overflow-hidden border border-gray-700">
           <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

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
  </div>
);

const BlogModal = ({ blog, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-zinc-900 w-full max-w-3xl h-[80vh] relative animate-in zoom-in-95 duration-200 p-8 rounded-lg border border-gray-700 overflow-y-auto">
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
  </div>
);

// --- COMPONENT: LIVE CV SHEET ---
const CVModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-0 md:p-4">
    {/* Relative container to hold the absolute close button correctly */}
    <div className="bg-white w-full h-full md:h-[95vh] md:max-w-[850px] relative overflow-y-auto p-8 text-black shadow-2xl">
      
      {/* FIXED CLOSE BUTTON */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 bg-gray-200 text-gray-800 w-10 h-10 rounded-full hover:bg-red-500 hover:text-white transition flex items-center justify-center font-bold z-50 shadow-md"
      >
        ✖
      </button>
      
      <div className="w-full h-full flex flex-col md:flex-row">
        
        {/* LEFT COLUMN (SIDEBAR) */}
        <div className="w-full md:w-1/3 bg-slate-50 p-6 md:p-8 border-r border-slate-200 text-left">
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

        {/* RIGHT COLUMN (MAIN CONTENT) */}
        <div className="w-full md:w-2/3 p-6 md:p-12 text-left">
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
    </div>
  </div>
);

// --- COMPONENT: CRYPTO / SUPPORT MODAL ---
const CryptoModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
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
       <div className="bg-white p-2 rounded-xl w-48 h-48 mx-auto mb-6">
          <img src="/binance.jpg" alt="Binance QR" className="w-full h-full object-contain" />
       </div>
       <div className="bg-black/50 border border-gray-700 rounded-lg p-3 mb-4 flex items-center justify-between">
         <div className="text-xs text-gray-400 font-mono truncate mr-2">{walletAddress}</div>
         <button onClick={handleCopy} className={`text-xs font-bold px-3 py-1 rounded transition ${copied ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            {copied ? 'COPIED!' : 'COPY'}
         </button>
       </div>
       <p className="text-xs text-gray-500">Network: Ensure you select the correct network (TRC20).</p>
       <p className="text-xs text-gray-500 mt-1">For inquiries, binance id:1089230952</p>
    </div>
  );
};

// --- MAIN APP COMPONENT (WITH LIGHT/DARK MODE) ---
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showCV, setShowCV] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // DARK MODE STATE
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  // --- DYNAMIC THEME CLASSES ---
  const theme = {
    bg: isDarkMode ? "bg-[#0a0a0a]" : "bg-slate-50",
    text: isDarkMode ? "text-gray-200" : "text-slate-800",
    cardBg: isDarkMode ? "bg-[#111]" : "bg-white",
    cardBorder: isDarkMode ? "border-gray-800" : "border-slate-200",
    heading: isDarkMode ? "text-white" : "text-slate-900",
    subText: isDarkMode ? "text-gray-400" : "text-slate-600",
    navBg: isDarkMode ? "bg-[#0a0a0a]/60" : "bg-white/60"
  };

  return (
    <>
      {/* 1. LOADING SCREEN */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* 2. MAIN APP */}
      <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans transition-colors duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* --- MODALS --- */}
        {activeModal?.type === 'terminal' && <Terminal onClose={() => setActiveModal(null)} />}
        {activeModal?.type === 'research' && <ResearchModal project={activeModal} onClose={() => setActiveModal(null)} />}
        {showCV && <CVModal onClose={() => setShowCV(false)} />}
        {showCrypto && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"><CryptoModal onClose={() => setShowCrypto(false)} /></div>}
        {activeBlog && <BlogModal blog={activeBlog} onClose={() => setActiveBlog(null)} />}

        {/* --- NAV --- */}
        <nav className={`fixed w-full z-50 ${theme.navBg} backdrop-blur-md border-b ${theme.cardBorder} transition-colors duration-500`}>
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div onClick={() => scrollToSection('home')} className="font-bold text-xl cursor-pointer tracking-tighter hover:text-cyan-500 transition">
              NDI <span className="text-cyan-500">GUCCI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Skills', 'Projects', 'Certificates', 'Blog'].map(item => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`text-sm font-medium hover:text-cyan-500 transition-colors ${theme.subText}`}>
                   {item}
                </button>
              ))}
              
              {/* DARK MODE TOGGLE BUTTON */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className={`p-2 rounded-full border ${theme.cardBorder} hover:border-cyan-500 transition-all`}
                title="Toggle Theme"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              <button onClick={() => scrollToSection('contact')} className="bg-cyan-600 text-white px-4 py-1 rounded-full hover:bg-cyan-500 text-sm font-bold shadow-lg">HIRE ME</button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-xl">
                 {isDarkMode ? '☀️' : '🌙'}
               </button>
               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">☰</button>
            </div>
          </div>
        </nav>

        {/* --- HERO --- */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl relative group">
              <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <img src="/me.jpg" alt="Bonheur" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-sm font-mono mb-4">
                Welcome to my portfolio
              </div>
              <h1 className={`text-5xl md:text-7xl font-black ${theme.heading} mb-6 tracking-tight`}>HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BONHEUR</span></h1>
              <div className="h-8 md:h-12 text-lg md:text-2xl text-cyan-600 font-mono mb-8 flex justify-center md:justify-start items-center">
                <span className="mr-2">$</span>
                <Typewriter text="Pharmacy Student | AI Enthusiast" delay={55} />
                <span className="animate-pulse ml-1">_</span>
              </div>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0">
              I bridge the gap between <span className="text-white font-semibold">Healthcare</span> and <span className="text-white font-semibold">Technology</span>, building digital solutions that enhance safety and efficiency in Africa and beyond.
            </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <button onClick={() => scrollToSection('projects')} className="bg-cyan-600 px-8 py-3 rounded-lg text-white font-bold hover:bg-cyan-500 transition shadow-lg shadow-cyan-500/25">View Projects</button>
                <button onClick={() => setShowCV(true)} className={`border ${theme.cardBorder} px-8 py-3 rounded-lg hover:bg-gray-500/10 transition flex items-center gap-2`}>
                  View CV <span className="text-lg">📄</span>
                </button>
                <button onClick={() => setShowCrypto(true)} className="border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 px-8 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition">
                   ⚡ Sponsor
                </button>
              </div>
            </div>
          </div>
        </section>

       {/* --- SKILLS --- */}
        <RevealOnScroll>
          <section id="skills" className="py-24 px-4 bg-white/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-cyan-500 pl-4">Technical Skills</h2>
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
        {/* --- PROJECTS --- */}
        <RevealOnScroll>
          <section id="projects" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl font-bold ${theme.heading} mb-12 border-l-4 border-cyan-500 pl-4`}>My Projects</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {projects.map((p, i) => (
                  <div key={i} onClick={() => setActiveModal(p)} className={`group ${theme.cardBg} rounded-2xl border ${theme.cardBorder} hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col h-full shadow-lg`}>
                    <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                          <span className="text-4xl">🚀</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-1 rounded border border-white/10 uppercase">{p.type}</div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className={`text-xl font-bold ${theme.heading} mb-2 group-hover:text-cyan-500 transition-colors`}>{p.title}</h3>
                      <p className="text-cyan-600 text-xs font-bold uppercase mb-3">{p.subtitle}</p>
                      <p className={`${theme.subText} text-sm mb-4 flex-grow line-clamp-3`}>{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags.map(tag => <span key={tag} className="text-[10px] bg-cyan-500/10 text-cyan-600 px-2 py-1 rounded font-mono border border-cyan-500/20">#{tag}</span>)}
                      </div>
                      <div className="text-xs font-bold text-cyan-500 uppercase tracking-wider flex items-center gap-2 mt-auto">
                        {p.type === 'terminal' ? '> LAUNCH TERMINAL' : 'VIEW DETAILS'}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* --- CERTIFICATES --- */}
        <RevealOnScroll>
          <section id="certificates" className={`py-24 px-4 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl font-bold ${theme.heading} mb-12 border-l-4 border-cyan-500 pl-4`}>Certificates</h2>
              {certificateCategories.map((cat, i) => (
                <div key={i} className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className={`text-xl ${theme.subText}`}>{cat.title}</h3>
                     <div className="flex items-center gap-2 text-cyan-500 text-sm font-mono animate-pulse">
                       <span className="hidden md:inline">Scroll</span>
                       <span className="md:hidden">Swipe</span>
                       <span>→</span>
                     </div>
                  </div>
                  <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                    {cat.items.map((cert, j) => (
                      <div key={j} className={`min-w-[280px] w-[280px] h-[320px] flex-shrink-0 group relative ${theme.cardBg} border ${theme.cardBorder} rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition shadow-md`}>
                        <div className="h-[180px] bg-gray-200 relative overflow-hidden">
                          {cert.image && <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />}
                        </div>
                        <div className="p-4 flex flex-col flex-grow justify-between">
                          <div>
                            <h4 className={`font-bold ${theme.heading} text-sm line-clamp-2 mb-1`}>{cert.title}</h4>
                            <p className="text-xs text-gray-500">{cert.issuer}</p>
                          </div>
                          <div className={`flex justify-between text-xs text-gray-500 mt-2 border-t ${theme.cardBorder} pt-2`}>
                            <span>{cert.date}</span>
                            {cert.link && <a href={cert.link} target="_blank" rel="noreferrer" className="text-cyan-500 hover:text-cyan-600 font-bold">View ↗</a>}
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

        {/* --- BLOG --- */}
        <RevealOnScroll>
          <section id="blog" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold ${theme.heading} mb-12 flex items-center`}>
                <span className="text-cyan-500 mr-3">04.</span> Latest Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogs.map((blog) => (
                  <div key={blog.id} className={`${theme.cardBg} border ${theme.cardBorder} p-8 rounded-2xl hover:border-cyan-500/30 transition-colors group cursor-pointer shadow-sm`} onClick={() => setActiveBlog(blog)}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-cyan-600 font-mono text-xs px-2 py-1 bg-cyan-500/10 rounded">{blog.category}</span>
                      <span className="text-gray-500 text-xs">{blog.date}</span>
                    </div>
                    <h3 className={`text-2xl font-bold ${theme.heading} mb-3 group-hover:text-cyan-500 transition-colors`}>{blog.title}</h3>
                    <p className={`${theme.subText} text-sm mb-6 line-clamp-2`}>{blog.excerpt}</p>
                    <button className={`text-sm font-bold ${theme.heading} flex items-center gap-2 group-hover:gap-3 transition-all`}>
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
      {showScrollBtn && (
        <button onClick={scrollToTop} className="animated-bounce fixed bottom-8 right-8 bg-cyan-600 text-white p-4 circle h-12 w-12 flex items-center justify-center rounded-full shadow-lg hover:bg-cyan-500 transition-transform">
          ↑
        </button>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
        <p className="font-mono mb-2">Designed & Built by NDI GUCCI</p>
        
        {/* Social Icons Container */}
        <div className="flex justify-center gap-6 mt-4">
          
          {/* GitHub Icon */}
          <a href="https://github.com/ndigucci" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>

          {/* LinkedIn Icon */}
          <a href="https://linkedin.com/in/ndigucci" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>

          {/* Twitter (X) Icon */}
          <a href="https://twitter.com/jyakuryama" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
               <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
             </svg>
          </a>

          {/* Email Icon */}
          <a href="mailto:bonheurirumva43@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm12.008 9.071h-13.326l3.855-4.813 2.908 3.439 2.908-3.439 3.655 4.813zm-5.433-6.187l1.235-1.46 5.567 6.576v-11.026l-6.802 5.91zm.902-1.072l-2.091 2.472-2.108-2.472-5.902-5.228h15.986l-5.885 5.228z"/></svg>
          </a>

          {/* WhatsApp Icon */}
          <a href="https://wa.me/250785008817" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  </>
  );
} // <--- THIS BRACKET WAS MISSING

export default App;