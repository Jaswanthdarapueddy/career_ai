import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title animate-slide-up" style={{ animationDelay: '0.1s' }}>
        Build Your Career <br />
        With AI Precision
      </h1>
      <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.3s' }}>
        Smart career recommendations, professional resumes, <br />
        and guided skill roadmaps designed for real growth.
      </p>

      <div className="animate-slide-up" style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', animationDelay: '0.5s' }}>
        <button className="btn-primary" onClick={() => window.location.href = "#start"}>
          Generate Resume
        </button>
        <button className="btn-secondary" onClick={() => window.location.href = "#features"}>
          View Roadmap
        </button>
      </div>
    </section>
  );
}
