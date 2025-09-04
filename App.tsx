
import React, { useState, useMemo, Suspense, lazy } from 'react';
import type { Section } from './types';
import Header from './components/Header';
import Spinner from './components/common/Spinner';

// Lazy loading de componentes para mejorar el rendimiento
const SoftwareSection = lazy(() => import('./components/SoftwareSection'));
const ChatSection = lazy(() => import('./components/ChatSection'));
const ImageSection = lazy(() => import('./components/ImageSection'));

function App() {
  const [activeSection, setActiveSection] = useState<Section>('dev');

  const renderSection = useMemo(() => {
    switch (activeSection) {
      case 'dev':
        return (
          <Suspense fallback={<Spinner />}>
            <SoftwareSection />
          </Suspense>
        );
      case 'chat':
        return (
          <Suspense fallback={<Spinner />}>
            <ChatSection />
          </Suspense>
        );
      case 'image':
        return (
          <Suspense fallback={<Spinner />}>
            <ImageSection />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<Spinner />}>
            <SoftwareSection />
          </Suspense>
        );
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
