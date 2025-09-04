
import React, { useState, useMemo } from 'react';
import type { Section } from './types';
import Header from './components/Header';
import SoftwareSection from './components/SoftwareSection';
import ChatSection from './components/ChatSection';
import ImageSection from './components/ImageSection';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('dev');

  const renderSection = useMemo(() => {
    switch (activeSection) {
      case 'dev':
        return <SoftwareSection />;
      case 'chat':
        return <ChatSection />;
      case 'image':
        return <ImageSection />;
      default:
        return <SoftwareSection />;
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="w-full bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderSection}
      </main>
    </div>
  );
}

export default App;
