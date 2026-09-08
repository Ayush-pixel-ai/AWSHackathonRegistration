import React from 'react';
import { EventProvider } from './context/EventContext';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { TrackSection } from './components/tracks/TrackSection';
import { RegistrationForm } from './components/registration/RegistrationForm';
import { Footer } from './components/common/Footer';
import { TicketModal } from './components/modals/TicketModal';
import { LookupModal } from './components/modals/LookupModal';
import { ToastContainer } from './components/common/ToastContainer';

export function App() {
  return (
    <EventProvider>
      <div className="bg-[#0b0f19] text-slate-100 min-h-screen relative selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
        
        {/* Background Glow Blobs */}
        <div className="glow-blob-1"></div>
        <div className="glow-blob-2"></div>

        {/* Global Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Main Section Content */}
        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-24 pb-24">
          <TrackSection />
          <RegistrationForm />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Overlay Portals */}
        <TicketModal />
        <LookupModal />
        <ToastContainer />

      </div>
    </EventProvider>
  );
}

export default App;
