import React from 'react';
import { X, ExternalLink, Github, Terminal } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-cyan-400 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-400 bg-black">
          <div className="flex items-center space-x-2">
            <Terminal size={16} className="text-cyan-400" />
            <span className="text-cyan-400 font-mono text-sm">{project.title.toLowerCase().replace(/\s+/g, '_')}.exe</span>
          </div>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-700">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <p className="text-cyan-400 leading-relaxed">{project.description}</p>
              
              {/* Tech stack */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-cyan-400 text-black text-sm rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-4 pt-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-400 text-black rounded hover:bg-cyan-300 transition-colors font-mono"
                  >
                    <ExternalLink size={18} />
                    <span>DEMO</span>
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors font-mono"
                  >
                    <Github size={18} />
                    <span>CODE</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Additional details */}
          <div className="mt-8 p-4 bg-black rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">System Logs</h3>
            <div className="space-y-1 text-sm font-mono">
              <p className="text-green-400">[INFO] Project initialized successfully</p>
              <p className="text-cyan-400">[DEBUG] All dependencies resolved</p>
              <p className="text-yellow-400">[WARN] This project contains high levels of awesome</p>
              <p className="text-green-400">[INFO] Ready for deployment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;