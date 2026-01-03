import React, { useState, useEffect, useRef } from 'react';
import Terminal from './components/Terminal'; // Importing our new component!

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
    id: 1, title: "AI in Pharmacy", subtitle: "Machine Learning for Safety", type: "research", color: "blue",
    desc: "Research exploring AI in medication safety.", tags: ["AI", "Research", "HealthTech"],
    abstract: "Investigating ML algorithms for detecting drug interactions.", findings: ["15% better detection", "Reduced fatigue"]
  },
  {
    id: 2, title: "Health Assistant CLI", subtitle: "Guidance & Triage", type: "terminal", color: "green",
    desc: "Interactive command-line health assistant with AI typing effects.", tags: ["React", "Triage", "CLI"]
  },
  {
    id: 3, title: "Academic Research", subtitle: "Pharma Data", type: "research", color: "purple",
    desc: "Digital tools review for pharma research.", tags: ["Mendeley", "Data"],
    abstract: "Review of digital tools in pharma.", findings: ["Mendeley vs Zotero analysis"]
  }
];

// --- DATA: CERTIFICATES ---
const certificateCategories = [
  {
    title: "🛡️ Cybersecurity & Tech",
    items: [
      { title: "DTP BEGINNER AI & ML", issuer: "Cornerstone", date: "2024", image: "/bignner.jpg", link: "/biggner.jpg" },
      { title: "CYBERSECURITY FUNDAMENTALS", issuer: "IBM/Coursera", date: "2025", image: "/cyber.jpg", link: "/cyber.jpg" },
      { title: "PYTHON FOR DATA SCIENCE", issuer: "Google", date: "2025", image: "/pthon.jpg", link: "/pthon.jpg" }
    ]
  },
  {
    title: "💊 Healthcare & Research",
    items: [
      { title: "RESEARCH COMMUNICATION", issuer: "WHO/TDR", date: "2025", image: "/image.jpg", link: "/image.jpg" },
      { title: "Certified Pharmacy Researcher", issuer: "NPC", date: "2025", image: "/pharm.jpg", link: "/pharm.jpg" }
    ]
  }
];

// --- DATA: BLOGS ---
const blogs = [
  { id: 1, title: "AI in African Healthcare", date: "Dec 18, 2025", category: "HealthTech", excerpt: "Using AI for malaria prediction.", content: "Full article content here...", tags: ["AI", "Africa"] },
  { id: 2, title: "Securing Patient Data", date: "Nov 10, 2025", category: "Cybersecurity", excerpt: "Why cybersecurity matters in pharma.", content: "Full article content here...", tags: ["Security", "Privacy"] }
];

// --- SIMPLE MODALS (Keep these simple for now) ---
const ResearchModal = ({ project, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div className="bg-zinc-900 w-full max-w-4xl p-8 rounded-lg border border-gray-700 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">✖</button>
      <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
      <p className="text-gray-400 mb-4">{project.desc}</p>
      <div className="bg-black/30 p-4 rounded"><h3 className="text-white font-bold">Abstract</h3><p className="text-gray-300">{project.abstract}</p></div>
    </div>
  </div>
);

const CVModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-0 md:p-4">
    <div className="bg-white w-full h-full md:h-[95vh] md:max-w-[850px] relative overflow-y-auto p-8 text-black">
      <button onClick={onClose} className="fixed top-6 right-6 bg-black text-white w-10 h-10 rounded-full">✖</button>
      <h1 className="text-4xl font-bold mb-2">Bonheur Irumva</h1>
      <p className="text-blue-600 font-bold uppercase mb-8">Pharmacy Student | AI Enthusiast</p>
      <p className="mb-8 border-l-4 border-gray-200 pl-4 italic">Bridging healthcare and technology.</p>
      <h2 className="font-bold border-b pb-2 mb-4">EDUCATION</h2>
      <p><strong>Bachelor of Pharmacy</strong> - INES Ruhengeri (Current)</p>
    </div>
  </div>
);

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [showCV, setShowCV] = useState(false);

  // Scroll to section helper
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* MODALS */}
      {activeModal?.type === 'terminal' && <Terminal onClose={() => setActiveModal(null)} />}
      {activeModal?.type === 'research' && <ResearchModal project={activeModal} onClose={() => setActiveModal(null)} />}
      {showCV && <CVModal onClose={() => setShowCV(false)} />}

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
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl">
            <img src="/me.jpg" alt="Bonheur" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">HI, I'M <span className="text-cyan-400">BONHEUR</span></h1>
            <p className="text-gray-400 text-lg mb-8">Pharmacy Student | AI Enthusiast | Web Developer</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button onClick={() => scrollTo('projects')} className="bg-cyan-600 px-8 py-3 rounded-lg text-white font-bold hover:bg-cyan-500">View Projects</button>
              <button onClick={() => setShowCV(true)} className="border border-gray-700 px-8 py-3 rounded-lg hover:bg-white/10">View CV</button>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <RevealOnScroll>
        <section id="skills" className="py-24 px-4 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 border-l-4 border-cyan-500 pl-4">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {['Python', 'React', 'Kali Linux', 'Pharmacy', 'Research', 'Git'].map(skill => (
                <div key={skill} className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center hover:border-cyan-500 transition">
                  <span className="text-cyan-400 font-bold">{skill}</span>
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
                <div key={i} onClick={() => setActiveModal(p)} className="bg-[#111] p-6 rounded-2xl border border-gray-800 hover:-translate-y-2 transition cursor-pointer group">
                  <div className="flex justify-between mb-4">
                    <span className={`w-3 h-3 rounded-full bg-${p.color}-500`}></span>
                    <span className="text-gray-500 group-hover:text-white">↗</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{p.subtitle}</p>
                  <div className="text-xs font-bold text-cyan-500 uppercase">{p.type === 'terminal' ? '> LAUNCH TERMINAL' : '> VIEW DETAILS'}</div>
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
                <h3 className="text-xl text-gray-300 mb-6">{cat.title}</h3>
                <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                  {cat.items.map((cert, j) => (
                    <div key={j} className="min-w-[280px] h-[320px] bg-[#111] border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition">
                      <div className="h-[180px] bg-gray-900 relative">
                        {cert.image && <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />}
                      </div>
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <h4 className="font-bold text-white text-sm line-clamp-2">{cert.title}</h4>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>{cert.date}</span>
                          {cert.link && <a href={cert.link} target="_blank" rel="noreferrer" className="text-cyan-500 hover:text-white">View ↗</a>}
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
          <div className="bg-[#111] max-w-2xl mx-auto p-8 rounded-3xl border border-gray-800">
             <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
               <input type="hidden" name="access_key" value="30457cd9-af59-4f98-8cf8-f970488fbd7e" />
               <input type="email" name="email" placeholder="Your Email" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white" required />
               <textarea name="message" rows="4" placeholder="Message" className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white" required></textarea>
               <button className="w-full bg-cyan-600 py-3 rounded-lg text-white font-bold hover:bg-cyan-500">SEND MESSAGE</button>
             </form>
          </div>
        </section>
      </RevealOnScroll>

    </div>
  );
}

export default App;