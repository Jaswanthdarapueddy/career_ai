import React from 'react';
import { Sparkles, LayoutDashboard, UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar animate-fade-in">
      <div className="navbar-container">
        <div className="nav-brand">
          <span>CareerAI</span>
        </div>

        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#resume" className="nav-link">Resume</a>
          <a href="roadmap" className="nav-link">Roadmap</a>
        </div>

        <div className="nav-actions">
          <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>Get Started</button>
        </div>
      </div>
    </nav>
  );
}
