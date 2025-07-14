import React, { useState, useEffect } from 'react';
import GlitchText from './GlitchText';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  
  const bootMessages = [
    'INITIALIZING PORTFOLIO MATRIX...',
    'LOADING PERSONALITY MODULES...',
    'SCANNING FOR CREATIVITY DRIVERS...',
    'MOUNTING /DEV/SKILLS...',
    'ESTABLISHING NEURAL NETWORK...',
    'GLITCH PROTOCOLS ACTIVE...',
    'SYSTEM READY. WELCOME TO THE MATRIX.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= bootMessages.length - 1) {
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div className="matrix-rain"></div>
      </div>
      
      <div className="z-10 text-center space-y-4 max-w-2xl">
        <div className="mb-8">
          <div className="text-4xl font-bold mb-2">
            <GlitchText text="BOOT SEQUENCE" className="text-green-400" />
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded mx-auto overflow-hidden">
            <div 
              className="h-full bg-green-400 transition-all duration-500 rounded"
              style={{ width: `${((currentLine + 1) / bootMessages.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-left space-y-2">
          {bootMessages.slice(0, currentLine + 1).map((message, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-green-500">[{(index + 1).toString().padStart(2, '0')}]</span>
              <span className={index === currentLine ? 'typing-animation' : ''}>
                {message}
              </span>
              {index === currentLine && <span className="animate-pulse">_</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;