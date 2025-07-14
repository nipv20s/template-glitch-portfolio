import React, { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';

interface AchievementNotificationProps {
  message: string;
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  return (
    <div className={`fixed top-20 right-6 bg-gradient-to-r from-purple-900 to-cyan-900 border border-cyan-400 rounded-lg p-4 max-w-sm transform transition-all duration-300 z-50 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="flex items-start space-x-3">
        <div className="bg-yellow-400 text-black rounded-full p-2 flex-shrink-0">
          <Trophy size={16} />
        </div>
        <div className="flex-1">
          <h4 className="text-yellow-400 font-mono text-sm font-bold mb-1">SYSTEM NOTIFICATION</h4>
          <p className="text-white text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="text-cyan-400 hover:text-white transition-colors flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-cyan-400 rounded-full animate-shrink"
          style={{ animation: 'shrink 4s linear forwards' }}
        ></div>
      </div>
    </div>
  );
};

export default AchievementNotification;