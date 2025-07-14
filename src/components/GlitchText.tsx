import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerGlitch?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', triggerGlitch = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

  const glitchEffect = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return text[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      iterations += 1/3;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 50);
  };

  useEffect(() => {
    if (triggerGlitch) {
      glitchEffect();
    }
  }, [triggerGlitch]);

  return (
    <span 
      className={`glitch-text ${className}`}
      onMouseEnter={() => Math.random() > 0.7 && glitchEffect()}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;