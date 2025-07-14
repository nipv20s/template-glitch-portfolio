import React, { useState } from 'react';
import ProjectThumbnail from './ProjectThumbnail';
import ProjectModal from './ProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  codeUrl?: string;
}

interface ProjectGridProps {
  onAchievement: (achievement: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ onAchievement }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [discoveredProjects, setDiscoveredProjects] = useState<Set<string>>(new Set());

  const projects: Project[] = [
    {
      id: 'neural-network',
      title: 'Neural Network Visualizer',
      description: 'Interactive deep learning visualization tool built with React and D3.js. Features real-time neural network training visualization.',
      tech: ['React', 'D3.js', 'TensorFlow.js', 'WebGL'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      id: 'blockchain-explorer',
      title: 'Blockchain Explorer',
      description: 'Decentralized application for exploring blockchain transactions with real-time data visualization and smart contract interaction.',
      tech: ['Web3.js', 'Solidity', 'React', 'Node.js'],
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      id: 'ai-chatbot',
      title: 'AI Conversation Engine',
      description: 'Advanced chatbot with natural language processing, context awareness, and personality adaptation using GPT integration.',
      tech: ['Python', 'OpenAI', 'FastAPI', 'PostgreSQL'],
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      id: 'quantum-simulator',
      title: 'Quantum Circuit Simulator',
      description: 'Browser-based quantum computing simulator with visual circuit designer and quantum algorithm implementations.',
      tech: ['TypeScript', 'WebAssembly', 'React', 'Python'],
      image: 'https://images.pexels.com/photos/2148222/pexels-photo-2148222.jpeg?auto=compress&cs=tinysrgb&w=600',
      demoUrl: '#',
      codeUrl: '#'
    }
  ];

  const handleProjectReveal = (projectId: string) => {
    if (!discoveredProjects.has(projectId)) {
      setDiscoveredProjects(prev => new Set([...prev, projectId]));
      onAchievement(`Project Discovered: ${projects.find(p => p.id === projectId)?.title}`);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onAchievement('Achievement Unlocked: Deep Dive Initiated');
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="glitch-text">PROJECT_ARCHIVES.DIR</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectThumbnail
            key={project.id}
            project={project}
            onReveal={() => handleProjectReveal(project.id)}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectGrid;