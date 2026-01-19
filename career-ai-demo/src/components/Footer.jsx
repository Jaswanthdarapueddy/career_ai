import React from 'react';
import { Linkedin, Twitter, Github, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(5, 5, 5, 0.95)',
            padding: '80px 0 40px',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '40px',
                    marginBottom: '60px'
                }}>
                    {/* Brand Column */}
                    <div style={{ paddingRight: '20px' }}>
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            marginBottom: '20px',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: 'var(--text-main)'
                        }}>
                            CareerAI
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            Empowering your professional journey with AI-driven insights and precision tools.
                        </p>
                    </div>

                    {/* Solution Column */}
                    <div>
                        <h4 style={{ marginBottom: '24px', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Solution</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><a href="#features" className="nav-link" style={{ fontSize: '0.95rem', textTransform: 'none', letterSpacing: '0' }}>Features</a></li>
                            <li><a href="#roadmap" className="nav-link" style={{ fontSize: '0.95rem', textTransform: 'none', letterSpacing: '0' }}>Roadmap</a></li>
                            <li><a href="#resume" className="nav-link" style={{ fontSize: '0.95rem', textTransform: 'none', letterSpacing: '0' }}>Resume Builder</a></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 style={{ marginBottom: '24px', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.95rem', textTransform: 'none', letterSpacing: '0' }}>About</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.95rem', textTransform: 'none', letterSpacing: '0' }}>Blog</a></li>
                            <li><a href="#" className="nav-link" style={{ fontSize: '0.95rem', textTransform: 'none', letterSpacing: '0' }}>Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h4 style={{ marginBottom: '24px', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><Github size={20} /></a>
                            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    textAlign: 'center'
                }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                        © 2026 CareerAI Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
