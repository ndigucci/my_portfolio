import React, { useState, useEffect, useRef } from 'react';
import Terminal from './components/Terminal'; 

// --- SCROLL ANIMATION WRAPPER ---
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
    image: "/project1.jpg", 
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
    image: "/project2.jpg",
    desc: "Interactive command-line health assistant for triage and education. Click to try!", 
    tags: ["React", "Triage", "CLI"]
  },
  {
    id: 3, 
    title: "Academic Research", 
    subtitle: "Pharma Data", 
    type: "research", 
    image: "/project3.jpg",
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
      { title: "DTP BEGINNER AI & ML", issuer: "Cornerstone", date: "2024", image: "/bignner.jpg", link: "/biggner.jpg" },
      { title: "DTP INTERMEDIATE AI&ML", issuer: "Cornerstone", date: "2025", image: "/cert2.jpg", link: "/cert2.jpg" },
      { title: "DTP ADVANCED AI&ML", issuer: "Cornerstone", date: "2025", image: "/addv.jpg", link: "/addv.jpg" },
      { title: "CYBERSECURITY FUNDAMENTALS", issuer: "IBM/Coursera", date: "2025", image: "/cyber.jpg", link: "/cyber.jpg" },
      { title: "INTRO TO AI", issuer: "IBM/Coursera", date: "2025", image: "/intro.jpg", link: "/intro.jpg" },
      { title: "PYTHON FOR DATA SCIENCE", issuer: "Google", date: "2025", image: "/pthon.jpg", link: "/pthon.jpg" }
    ]
  },
  {
    title: "💊 Healthcare & Research",
    items: [
      { title: "RESEARCH COMMUNICATION", issuer: "WHO/TDR", date: "2025", image: "/image.jpg", link: "/image.jpg" },
      { title: "Certified Pharmacy Researcher", issuer: "NPC", date: "2025", image: "/pharm.jpg", link: "/pharm.jpg" },
      { title: "Problem Solving in Health", issuer: "MINICT", date: "2025", image: "/prob.jpg", link: "/prob.jpg" }
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
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div className="bg-zinc-900 w-full max-w-4xl p-8 rounded-lg border border-gray-700 relative overflow-y-auto max-h-[90vh]">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl hover:text-red-500">✖</button>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {project.image && (
          <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden border border-gray-700">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
          <p className="text-cyan-400 font-mono text-sm mb-4">{project.subtitle}</p>
          <p className="text-gray-300 leading-relaxed">{project.desc}</p>
        </div>
      </div>

      {project.abstract && (
        <div className="bg-black/30 p-6 rounded border border-gray-800 mb-6">
          <h3 className="text-white font-bold mb-2 border-b border-gray-700 pb-2">ABSTRACT</h3>
          <p className="text-gray-400 italic">{project.abstract}</p>
        </div>
      )}
      
      {project.findings && (
        <div>
          <h3 className="text-white font-bold mb-2">KEY FINDINGS</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-1">
            {project.findings.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const CVModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-0 md:p-4">
    <div className="bg-white w-full h-full md:h-[95vh] md:max-w-[850px] relative overflow-y-auto p-8 text-black shadow-2xl">
      <button onClick={onClose} className="fixed top-6 right-6 bg-black text-white w-10 h-10 rounded-full hover:bg-red-600 transition z-50 flex items-center justify-center">✖</button>
      
      <div className="border-b-2 border-gray-100 pb-8 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
           <img src="/me.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Bonheur Irumva</h1>
          <p className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-4">Pharmacy Student | AI & Cybersecurity Enthusiast</p>
          <p className="text-slate-600 max-w-lg italic">"Bridging the gap between medical practice and digital innovation to improve healthcare safety."</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-blue-500 inline-block">Contact</h3>
            <p className="text-sm">📍 Rwanda</p>
            <p className="text-sm">📧 irumvabonheur@icloud.com</p>
            <p className="text-sm">🔗 ndigucci.vercel.app</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-blue-500 inline-block">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'React', 'Kali Linux', 'Pharmacy', 'Research', 'Git'].map(s => (
                <span key={s} className="bg-slate-100 px-2 py-1 rounded text-xs font-semibold text-slate-700">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="text-blue-600">🎓</span> Education</h2>
            <div className="mb-4">
              <h3 className="font-bold text-lg">Bachelor of Pharmacy (BPharm)</h3>
              <p className="text-slate-500 text-sm">INES Ruhengeri | Current</p>
            </div>
            <div className="mb-4">
              <h3 className="font-bold text-lg">A-Level (MCB)</h3>
              <p className="text-slate-500 text-sm">G.S REMERA RUKOMA | 2023 - 2025</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="text-blue-600">💼</span> Experience</h2>
            <div>
              <h3 className="font-bold text-lg">Anti-AIDS Club Assistant</h3>
              <p className="text-blue-600 text-sm mb-2">École de Dieu | 2024</p>
              <ul className="list-disc list-inside text-sm text-slate-600">
                <li>Assisted in health awareness campaigns.</li>
                <li>Facilitated peer communication for better health outcomes.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
);

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
         <button onClick={handleCopy} className={`text-xs font-bold px-3 py-1 rounded transition ${copied ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{copied ? 'COPIED!' : 'COPY'}</button>
       </div>
       <p className="text-xs text-gray-500">Network: Ensure you select the correct network (TRC20).</p>
       <p className="text-xs text-gray-500 mt-1">For inquiries, binance id:1089230952</p>
    </div>
  );
};

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [showCV, setShowCV] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* MODALS */}
      {activeModal?.type === 'terminal' && <Terminal onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'research' && <ResearchModal project={activeModal} onClose={() => setActiveModal(null)} />}
      {showCV && <CVModal onClose={() => setShowCV(false)} />}
      {showCrypto && <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"><CryptoModal onClose={() => setShowCrypto(false)} /></div>}

      {/* NAV */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl cursor-pointer" onClick={() => scrollTo('home')}>NDI <span className="text-cyan-500">GUCCI</span></div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'Skills', 'Projects', 'Certificates'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-cyan-400 text-sm font-medium">{item}</button>
            ))}
            <button onClick={() => scrollTo('contact')} className="bg-cyan-600 text-white px-4 py-1 rounded-full hover:bg-cyan-500 text-sm font-bold">HIRE ME</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl relative group">
            <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <img src="/me.jpg" alt="Bonheur" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-mono mb-4">
              Hello, World! 👋
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">BONHEUR</span></h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto md:mx-0">
              A 3rd Year Pharmacy Student & Tech Enthusiast based in Rwanda. I build digital solutions that make healthcare safer and smarter.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button onClick={() => scrollTo('projects')} className="bg-cyan-600 px-8 py-3 rounded-lg text-white font-bold hover:bg-cyan-500 transition shadow-lg shadow-cyan-500/25">View Projects</button>
              <button onClick={() => setShowCV(true)} className="border border-gray-700 px-8 py-3 rounded-lg hover:bg-white/5 transition flex items-center gap-2">
                View CV <span className="text-lg">📄</span>
              </button>
              <button onClick={() => setShowCrypto(true)} className="border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 px-8 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition">
                 ⚡ Sponsor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <RevealOnScroll>
        <section id="skills" className="py-24 px-4 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-cyan-500 pl-4">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Python', 'React', 'Kali Linux', 'Pharmacy', 'Research', 'Git', 'AI / ML', 'Web Dev'].map(skill => (
                <div key={skill} className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center hover:border-cyan-500/50 hover:-translate-y-1 transition duration-300">
                  <span className="text-gray-300 font-bold hover:text-cyan-400">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* PROJECTS */}
      <RevealOnScroll>
        <section id="projects" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-cyan-500 pl-4">My Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <div key={i} onClick={() => setActiveModal(p)} className="group bg-[#111] rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col h-full">
                  <div className="h-48 w-full bg-gray-900 relative overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-4xl">🚀</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-1 rounded border border-white/10 uppercase">{p.type}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                    <p className="text-cyan-600 text-xs font-bold uppercase mb-3">{p.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map(tag => <span key={tag} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded font-mono">#{tag}</span>)}
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

      {/* CERTIFICATES */}
      <RevealOnScroll>
        <section id="certificates" className="py-24 px-4 bg-white/5">
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-cyan-500 pl-4">Certificates</h2>
            {certificateCategories.map((cat, i) => (
              <div key={i} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl text-gray-300">{cat.title}</h3>
                   <span className="text-xs text-cyan-500 animate-pulse md:hidden">Swipe →</span>
                </div>
                <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                  {cat.items.map((cert, j) => (
                    <div key={j} className="min-w-[280px] h-[320px] bg-[#111] border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition group">
                      <div className="h-[180px] bg-gray-900 relative overflow-hidden">
                        {cert.image && <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />}
                      </div>
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm line-clamp-2 mb-1">{cert.title}</h4>
                          <p className="text-xs text-gray-500">{cert.issuer}</p>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2 border-t border-gray-800 pt-2">
                          <span>{cert.date}</span>
                          {cert.link && <a href={cert.link} target="_blank" rel="noreferrer" className="text-cyan-500 hover:text-white font-bold">View ↗</a>}
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

      {/* CONTACT */}
      <RevealOnScroll>
        <section id="contact" className="py-24 px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
          <div className="bg-[#111] max-w-2xl mx-auto p-8 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
             <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4 relative z-10">
               <input type="hidden" name="access_key" value="30457cd9-af59-4f98-8cf8-f970488fbd7e" />
               <input type="email" name="email" placeholder="Your Email" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition" required />
               <textarea name="message" rows="4" placeholder="How can I help you?" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition" required></textarea>
               <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-lg text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition transform hover:-translate-y-1">SEND MESSAGE</button>
             </form>
          </div>
        </section>
      </RevealOnScroll>

      {/* --- FOOTER (RESTORED WITH ICONS) --- */}
      <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
        <p className="font-mono mb-2">Designed & Built by NDI GUCCI</p>
        
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/ndigucci" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://linkedin.com/in/ndigucci" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://twitter.com/jyakuryama" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="mailto:bonheurirumva43@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.174l4.623 5.462zm12.008 9.071h-13.326l3.855-4.813 2.908 3.439 2.908-3.439 3.655 4.813zm-5.433-6.187l1.235-1.46 5.567 6.576v-11.026l-6.802 5.91zm.902-1.072l-2.091 2.472-2.108-2.472-5.902-5.228h15.986l-5.885 5.228z"/></svg>
          </a>
          <a href="https://wa.me/250785008817" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-transform hover:-translate-y-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;