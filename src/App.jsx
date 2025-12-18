import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      
      {/* Main Card */}
      <div className="max-w-4xl w-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col md:flex-row">
        
        {/* Left Side - Profile Picture & Name */}
        <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-purple-600 p-8 flex flex-col justify-between text-center md:text-left">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">NDI GUCCI</h1>
            <p className="text-blue-100 opacity-90">Bonheur Irumva</p>
          </div>
          
          {/* PHOTO SECTION */}
          <div className="my-8 md:my-0">
            <div className="w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl bg-black">
              {/* Make sure your file in 'public' is named 'me.jpg' */}
              <img 
                src="/me.jpg" 
                alt="Bonheur Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm text-blue-100 font-medium">
            <p>📍 Rwanda</p>
            <p>💊 Pharmacy & Tech</p>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="md:w-3/5 p-8 md:p-12 bg-zinc-900">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-200">About Me</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
          </div>

          <p className="text-gray-400 mb-8 leading-relaxed">
            I am a Pharmacy student passionate about <span className="text-blue-400 font-bold">Artificial Intelligence</span> and <span className="text-purple-400 font-bold">Cybersecurity</span>. I build digital tools that make healthcare safer and more efficient.
          </p>

          <h3 className="uppercase tracking-widest text-xs font-bold text-gray-500 mb-4">My Skills</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/50 p-3 rounded-lg border border-zinc-700">
              <div className="text-blue-400 font-bold">Healthcare</div>
              <div className="text-xs text-gray-500">Pharmacy, Med Safety</div>
            </div>
            <div className="bg-black/50 p-3 rounded-lg border border-zinc-700">
              <div className="text-purple-400 font-bold">Technology</div>
              <div className="text-xs text-gray-500">Python, Linux, AI</div>
            </div>
            <div className="bg-black/50 p-3 rounded-lg border border-zinc-700">
              <div className="text-green-400 font-bold">Research</div>
              <div className="text-xs text-gray-500">Mendeley, Writing</div>
            </div>
            <div className="bg-black/50 p-3 rounded-lg border border-zinc-700">
              <div className="text-yellow-400 font-bold">Tools</div>
              <div className="text-xs text-gray-500">Git, Office 365</div>
            </div>
          </div>

          <div className="flex gap-4">
             {/* EMAIL BUTTON */}
            <a 
              href="mailto:bonheurirumva43@gmail.com" 
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition duration-200 shadow-lg shadow-blue-900/20 text-center"
            >
              Contact Me
            </a>
            
            <button className="flex-1 py-3 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-gray-300 font-bold rounded-xl transition duration-200">
              CV
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;