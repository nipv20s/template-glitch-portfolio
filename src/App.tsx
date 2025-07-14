import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import ProjectGrid from './components/ProjectGrid';
import ResumeViewer from './components/ResumeViewer';
import AchievementNotification from './components/AchievementNotification';
import GlitchText from './components/GlitchText';
import BootSequence from './components/BootSequence';
import { Monitor, Wifi, Battery, Volume2 } from 'lucide-react';

function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bootTimer = setTimeout(() => setShowBoot(false), 4000);
    return () => clearTimeout(bootTimer);
  }, []);

  const addAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
    }
  };

  if (showBoot) {
    return <BootSequence onComplete={() => setShowBoot(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono overflow-hidden relative">
      {/* VHS Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="scanlines"></div>
        <div className="static-noise"></div>
      </div>

      {/* Desktop Header */}
      <div className="h-8 bg-gray-900 border-b border-cyan-400 flex items-center justify-between px-4 relative z-10">
        <div className="flex items-center space-x-2">
          <Monitor size={16} />
          <GlitchText text="404: Identity Not Found" className="text-xs" />
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <Wifi size={12} />
            <span>CONNECTED</span>
          </div>
          <div className="flex items-center space-x-1">
            <Battery size={12} />
            <span>89%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Volume2 size={12} />
          </div>
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Main Desktop Area */}
      <div className="h-[calc(100vh-2rem)] flex flex-col relative">
        {/* Center Content Area */}
        <div className="flex-1 p-8 relative">
          <div className="max-w-6xl mx-auto">
            {/* Glitched Welcome */}
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <GlitchText text="PORTFOLIO.EXE" className="glitch-large" />
              </h1>
              <p className="text-lg opacity-70">
                <GlitchText text="~ Digital Architect | System Designer | Code Conjurer ~" />
              </p>
            </div>

            {/* Project Grid */}
            <ProjectGrid onAchievement={addAchievement} />

            {/* Resume Section */}
            <div className="mt-16">
              <ResumeViewer onAchievement={addAchievement} />
            </div>
          </div>
        </div>

        {/* Terminal at bottom */}
        <div className="h-48 border-t border-cyan-400">
          <Terminal onAchievement={addAchievement} />
        </div>
      </div>

      {/* Achievement Notifications */}
      {achievements.map((achievement, index) => (
        <AchievementNotification
          key={`${achievement}-${index}`}
          message={achievement}
          onClose={() => setAchievements(prev => prev.filter((_, i) => i !== index))}
        />
      ))}
    </div>
  );
}

export default App;