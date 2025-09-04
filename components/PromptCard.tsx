import React, { useState } from 'react';
import type { Prompt } from '../types';
import { Icon } from './icons';

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 flex flex-col h-full transition-transform transform hover:scale-105 hover:border-purple-500">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-purple-400 mb-2">{prompt.title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{prompt.description}</p>
        <div className="bg-gray-900 rounded-md p-4 mb-4">
          <code className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
            {prompt.prompt}
          </code>
        </div>
      </div>
      <div className="flex justify-end items-center mt-auto">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
          {copied ? '¡Copiado!' : 'Copiar Prompt'}
        </button>
      </div>
    </div>
  );
};

export default PromptCard;
