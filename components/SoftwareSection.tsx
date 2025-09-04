import React, { useState, useMemo } from 'react';
import { SOFTWARE_PROMPTS } from '../constants';
import PromptCard from './PromptCard';
import type { Prompt } from '../types';

const SoftwareSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(SOFTWARE_PROMPTS.map(p => p.category)))], []);

  const filteredPrompts = useMemo(() => {
    if (selectedCategory === 'All') {
      return SOFTWARE_PROMPTS;
    }
    return SOFTWARE_PROMPTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          Prompts para Desarrollo de Software
        </h2>
        <p className="mt-2 text-lg text-gray-400">
          Una colección curada de prompts para ayudar con codificación, depuración, pruebas y más.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt: Prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};

export default SoftwareSection;
