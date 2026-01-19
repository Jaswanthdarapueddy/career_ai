import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntelligenceSection from './components/IntelligenceSection';
import CareerFlow from './components/CareerFlow';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <div className="background-gradient"></div>
      <Navbar />
      <main>
        <Hero />
        <IntelligenceSection />
        <section id="output">
          <CareerFlow />
        </section>
      </main>
      <Footer />
    </>
  );
}
