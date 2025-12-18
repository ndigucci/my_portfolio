import React, { useState, useEffect } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typewriter Effect Component
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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[120px]"></div>
      </div>

      {/* --- NAVIGATION BAR --- */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              onClick={() => scrollToSection('home')} 
              className="cursor-pointer font-bold text-xl tracking-tighter hover:text-cyan-400 transition duration-300"
            >
              NDI <span className="text-cyan-500">GUCCI</span>
            </div>
            
            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300 relative group"
                  >
                    <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">&lt;</span>
                    {item}
                    <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1">/&gt;</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium hover:bg-white/5 hover:text-cyan-400 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (MODIFIED FOR PHOTO ASIDE) --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-4 relative">
        <div className="max-w-6xl mx-auto z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* 1. LEFT SIDE: PHOTO */}
          <div className="flex-shrink-0 relative group">
            {/* Glowing effect behind photo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="w-60 h-60 md:w-70 md:h-70 relative rounded-full overflow-hidden border-4 border-cyan-500/50 shadow-2xl bg-black">
              <img 
                src="/me.jpg" 
                alt="Bonheur Profile" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* 2. RIGHT SIDE: CONTENT */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-block mb-4 px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-mono tracking-wide">
              Welcome to my portfolio
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              HI, I'M <br className="md:hidden" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                BONHEUR
              </span>
            </h1>
            
            <div className="h-8 md:h-12 text-lg md:text-2xl text-gray-400 font-mono mb-8 flex justify-center md:justify-start items-center">
              <span className="text-cyan-500 mr-2">$</span>
              <Typewriter text="Pharmacy Student | AI Enthusiast" delay={55} />
              <span className="animate-pulse ml-1">_</span>
            </div>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0">
              I bridge the gap between <span className="text-white font-semibold">Healthcare</span> and <span className="text-white font-semibold">Technology</span>, building digital solutions that enhance safety and efficiency in Africa and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)]"
              >
                View Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-lg transition-all"
              >
                Contact Me
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-24 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <span className="h-px flex-1 bg-gray-800"></span>
            <h2 className="px-4 text-3xl md:text-4xl font-bold text-white tracking-tight">Technical skills</h2>
            <span className="h-px flex-1 bg-gray-800"></span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tech Card */}
            <div className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Tech & Cyber</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Linux (Kali)', 'AI Tools', 'Cybersecurity', 'Git'].map(skill => (
                  <span key={skill} className="text-xs font-mono px-2 py-1 bg-gray-800 text-cyan-400 rounded border border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Health Card */}
            <div className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-green-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Healthcare</h3>
              <div className="flex flex-wrap gap-2">
                {['Pharmacy', 'Med Safety', 'Research', 'Patient Care'].map(skill => (
                  <span key={skill} className="text-xs font-mono px-2 py-1 bg-gray-800 text-green-400 rounded border border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools Card */}
            <div className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-purple-500/50 transition-colors duration-300 group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition">
                <span className="text-2xl">⚡️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Productivity</h3>
              <div className="flex flex-wrap gap-2">
                {['Mendeley', 'PowerPoint', 'Office 365', 'Digital Workflows','Power bi'].map(skill => (
                  <span key={skill} className="text-xs font-mono px-2 py-1 bg-gray-800 text-purple-400 rounded border border-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center">
            <span className="text-cyan-500 mr-3">02.</span> Selected Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI in Pharmacy",
                desc: "Research exploring artificial intelligence in medication safety and clinical decision support.",
                tags: ["AI", "Research", "HealthTech"],
                color: "blue"
              },
              {
                title: "Cybersecurity Lab",
                desc: "Hands-on system security and ethical hacking practice using Kali Linux environments.",
                tags: ["Kali Linux", "Security", "Bash"],
                color: "green"
              },
              {
                title: "Academic Research",
                desc: "Advanced literature review and citation management for pharmaceutical sciences.",
                tags: ["Mendeley", "Writing", "Data"],
                color: "purple"
              }
            ].map((project, index) => (
              <div key={index} className="group relative bg-[#111] rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-xl">📁</span>
                    </div>
                    <span className="text-gray-500 hover:text-white cursor-pointer">↗</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-500 font-mono">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-4 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Lets work together🤝</h2>
          <p className="text-gray-400 text-lg mb-10">
            I am currently looking for opportunities to apply my skills in <span className="text-cyan-400">Digital Health</span> and <span className="text-cyan-400">Cybersecurity</span>.
          </p>
          <a 
            href="mailto:irumvabonheur@icloud.com"
            className="px-8 py-3 bg-transparent border-2 border-white/20 hover:bg-white/10 text-white font-bold rounded-xl transition duration-200 text-center"
          >
            contact me
          </a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
        <p className="font-mono mb-2">Designed & Built by NDI GUCCI</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/ndigucci" className="hover:text-cyan-400 transition">GitHub</a>
          <a href="#" className="hover:text-cyan-400 transition">LinkedIn</a>
          <a href="#" className="hover:text-cyan-400 transition">Twitter</a>
        </div>
      </footer>

    </div>
  );
}

export default App;