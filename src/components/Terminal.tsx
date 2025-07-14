import React, { useState, useEffect, useRef } from 'react';
import { terminalCommands } from '../utils/terminalCommands';

interface TerminalProps {
  onAchievement: (achievement: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onAchievement }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string[] }>>([
    { command: '', output: ['Type "help" to see available commands', 'Try: whoami, skills, projects, contact, or surprise me'] }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [uptime, setUptime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim().toLowerCase();
    const output = terminalCommands[command] || [`Command not found: ${input}`, 'Type "help" for available commands'];
    
    setHistory(prev => [...prev, { command: input, output }]);
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');

    // Trigger achievements
    if (command === 'whoami') {
      onAchievement('Achievement Unlocked: Identity Revealed');
    } else if (command === 'skills') {
      onAchievement('Achievement Unlocked: Skill Tree Accessed');
    } else if (command === 'sudo make me a sandwich') {
      onAchievement('Achievement Unlocked: XKCD Reference Master');
    } else if (command === 'matrix') {
      onAchievement('Achievement Unlocked: Red Pill Taken');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="h-full bg-black border-cyan-400 flex flex-col">
      <div className="flex items-center justify-between px-4 py-1 bg-gray-900 border-b border-cyan-400">
        <span className="text-xs">Terminal - zsh</span>
        <span className="text-xs">Uptime: {formatUptime(uptime)}</span>
      </div>
      
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            {entry.command && (
              <div className="flex items-center space-x-2">
                <span className="text-green-400">user@portfolio:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-cyan-400 pl-4">
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-400">
        <div className="flex items-center space-x-2">
          <span className="text-green-400">user@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;