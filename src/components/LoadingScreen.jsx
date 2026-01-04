import React, { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); 
          return 100;
        }
        return prev + 2; 
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center font-sans text-white bg-gradient-to-br from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      
      {/* 1. Circular Spinner (The Ring) */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>

      {/* 2. Name */}
      <h1 className="text-3xl font-bold mb-2 tracking-wide">NDI GUCCI</h1>

      {/* 3. Text & Progress Bar */}
      <div className="w-64">
        <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono">
          <span>Preparing Experience...</span>
          <span>{progress}%</span>
        </div>
        
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
};

export default LoadingScreen;