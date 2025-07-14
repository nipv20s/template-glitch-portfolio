import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

interface ProjectThumbnailProps {
  project: Project;
  onReveal: () => void;
  onClick: () => void;
}

const ProjectThumbnail: React.FC<ProjectThumbnailProps> = ({ project, onReveal, onClick }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isRevealed) {
      setTimeout(() => {
        setIsRevealed(true);
        onReveal();
      }, 500);
    }
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-900 border border-cyan-400 rounded-lg overflow-hidden relative">
        {!isRevealed ? (
          // Glitched state
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-cyan-900 relative">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-cyan-400 glitch-text">
                {`[${project.id.toUpperCase().slice(0, 8)}]`}
              </div>
            </div>
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-cyan-400 opacity-20 ${Math.random() > 0.7 ? 'animate-pulse' : ''}`}
                  style={{
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: Math.random() * 0.5
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          // Revealed state
          <div className={`transition-all duration-500 ${isHovered ? 'transform scale-105' : ''}`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-cyan-400 mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs bg-cyan-400 text-black px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                {project.demoUrl && (
                  <button className="p-1 bg-cyan-400 text-black rounded hover:bg-cyan-300 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                )}
                {project.codeUrl && (
                  <button className="p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                    <Github size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Glitch overlay effect */}
        {isHovered && !isRevealed && (
          <div className="absolute inset-0 bg-cyan-400 opacity-10 animate-pulse"></div>
        )}
      </div>

      {/* Terminal tooltip */}
      <div className="absolute -bottom-8 left-0 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isRevealed ? `echo ${project.id}.decrypt` : `./run ${project.title.toLowerCase().replace(/\s+/g, '_')}`}
      </div>
    </div>
  );
};

export default ProjectThumbnail;