import React, { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress bar from 0 to 100% over ~2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200); // Wait a tiny bit at 100% before closing
          return 100;
        }
        // Randomize speed to make it look realistic (like "loading assets")
        const increment = Math.random() * 15; 
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-black text-white flex flex-col items-center justify-center font-mono">
      
      {/* 1. The Blinking Text / Name */}
      <div className="mb-4 text-2xl md:text-4xl font-bold flex items-center gap-2">
        <span className="text-cyan-500">&lt;</span> 
        NDI GUCCI 
        <span className="text-cyan-500">/&gt;</span>
        <span className="animate-pulse w-3 h-8 bg-cyan-500 block ml-1"></span>
      </div>

      {/* 2. The Progress Bar Container */}
      <div className="w-[200px] md:w-[300px] h-[2px] bg-gray-800 rounded-full relative overflow-hidden">
        {/* The Moving Blue Bar */}
        <div 
          className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 3. Percentage Text */}
      <div className="mt-2 text-xs text-gray-500 font-mono">
        {Math.round(progress)}% - {progress < 100 ? "Initializing..." : "Welcome."}
      </div>

    </div>
  );
};

export default LoadingScreen;