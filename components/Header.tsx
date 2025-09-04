import React from 'react';
import type { Section } from '../types';
import { Icon } from './icons';

interface HeaderProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const NavButton: React.FC<{
  label: string;
  iconName: 'code' | 'chat' | 'image';
  isActive: boolean;
  onClick: () => void;
}> = ({ label, iconName, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-purple-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon name={iconName} className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="container mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Icon name="sparkles" className="w-8 h-8 text-purple-400"/>
        <h1 className="text-xl md:text-2xl font-bold text-white">AI Prompt Library</h1>
      </div>
      <nav className="flex items-center gap-2 md:gap-4 p-1 bg-gray-800 rounded-lg">
        <NavButton
          label="Desarrollo"
          iconName="code"
          isActive={activeSection === 'dev'}
          onClick={() => setActiveSection('dev')}
        />
        <NavButton
          label="Chat"
          iconName="chat"
          isActive={activeSection === 'chat'}
          onClick={() => setActiveSection('chat')}
        />
        <NavButton
          label="Imágenes"
          iconName="image"
          isActive={activeSection === 'image'}
          onClick={() => setActiveSection('image')}
        />
      </nav>
    </header>
  );
};

export default Header;
