import React, { useState } from 'react';
import { FileText, Download, RefreshCw } from 'lucide-react';

interface ResumeViewerProps {
  onAchievement: (achievement: string) => void;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ onAchievement }) => {
  const [isCorrupted, setIsCorrupted] = useState(true);
  const [reconstructedSections, setReconstructedSections] = useState<Set<string>>(new Set());

  const resumeSections = [
    { id: 'header', label: 'IDENTITY_MATRIX', content: 'John Developer\nSenior Full-Stack Engineer\njohn@example.com | (555) 123-4567' },
    { id: 'experience', label: 'WORK_HISTORY', content: 'Senior Developer @ TechCorp (2020-2024)\n• Led team of 8 developers\n• Architected scalable microservices\n• 40% performance improvement' },
    { id: 'skills', label: 'SKILL_TREE', content: 'Languages: JavaScript, Python, Go, Rust\nFrameworks: React, Node.js, Django\nCloud: AWS, Docker, Kubernetes' },
    { id: 'education', label: 'ACADEMIC_LOG', content: 'M.S. Computer Science - MIT (2018)\nB.S. Software Engineering - Stanford (2016)' }
  ];

  const toggleSection = (sectionId: string) => {
    const newReconstructed = new Set(reconstructedSections);
    if (newReconstructed.has(sectionId)) {
      newReconstructed.delete(sectionId);
    } else {
      newReconstructed.add(sectionId);
      onAchievement(`Data Block Recovered: ${resumeSections.find(s => s.id === sectionId)?.label}`);
    }
    setReconstructedSections(newReconstructed);

    if (newReconstructed.size === resumeSections.length) {
      onAchievement('Achievement Unlocked: File Reconstruction Master');
    }
  };

  const handleReconstruct = () => {
    setIsCorrupted(false);
    onAchievement('Achievement Unlocked: Resume Decrypted');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="glitch-text">RESUME.CORRUPT</span>
        </h2>
      </div>

      {isCorrupted ? (
        <div className="max-w-4xl mx-auto bg-gray-900 border border-red-400 rounded-lg overflow-hidden">
          {/* Corrupted PDF Viewer Header */}
          <div className="bg-red-900 p-4 border-b border-red-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="text-red-400" size={20} />
                <span className="text-red-400 font-mono">ERROR: FILE_CORRUPTED</span>
              </div>
              <button
                onClick={handleReconstruct}
                className="flex items-center space-x-2 px-4 py-2 bg-red-400 text-black rounded hover:bg-red-300 transition-colors font-mono"
              >
                <RefreshCw size={16} />
                <span>RECONSTRUCT</span>
              </button>
            </div>
          </div>

          {/* Corrupted Content */}
          <div className="p-6 space-y-6">
            <div className="text-center text-red-400 mb-8">
              <p className="text-lg font-mono">CRITICAL SYSTEM ERROR</p>
              <p className="text-sm">Data corruption detected. Manual reconstruction required.</p>
            </div>

            {/* Reconstruction Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-black border border-gray-700 rounded-lg p-4 hover:border-cyan-400 transition-colors cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-cyan-400 font-mono text-sm">{section.label}</span>
                    <div className={`w-4 h-4 rounded border-2 ${
                      reconstructedSections.has(section.id) 
                        ? 'bg-green-400 border-green-400' 
                        : 'border-gray-600'
                    }`}>
                      {reconstructedSections.has(section.id) && (
                        <div className="text-black text-xs leading-none">✓</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    {reconstructedSections.has(section.id) ? (
                      <pre className="text-green-400 whitespace-pre-wrap">{section.content}</pre>
                    ) : (
                      <div className="space-y-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex space-x-1">
                            {Array.from({ length: 20 + Math.random() * 20 }).map((_, j) => (
                              <span key={j} className="text-red-400 opacity-50">
                                {Math.random() > 0.5 ? '█' : '▓'}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-gray-500 font-mono">
              RECONSTRUCTION PROGRESS: {reconstructedSections.size}/{resumeSections.length} BLOCKS RECOVERED
            </div>
          </div>
        </div>
      ) : (
        // Reconstructed Resume
        <div className="max-w-4xl mx-auto bg-white text-black rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-gray-100 p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText size={20} />
              <span className="font-mono">resume.pdf - RECONSTRUCTED</span>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors">
              <Download size={16} />
              <span>DOWNLOAD</span>
            </button>
          </div>

          <div className="p-8 space-y-6">
            {resumeSections.map((section) => (
              <div key={section.id} className="space-y-3">
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1">
                  {section.label.replace(/_/g, ' ')}
                </h3>
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {section.content}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeViewer;