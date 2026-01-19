import React from 'react';
import { jsPDF } from 'jspdf';

export default function ResultStep({ userData, aiResult, onBack }) {
  if (!aiResult) return null;
  if (aiResult.error) {
    return (
      <div className="result-error">
        <div className="result-error-text">{aiResult.error}</div>
        <button className="btn-primary" onClick={onBack}>Back</button>
      </div>
    );
  }
  const { career_roles, missing_skills, certifications, projects, resume, roadmap } = aiResult;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const lineHeight = 6;
    let y = 20;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("CareerAI Resume", margin, y);
    y += 15;

    // Content
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    const resumeText = resume || "No resume generated.";
    const splitText = doc.splitTextToSize(resumeText, pageWidth - (margin * 2));

    splitText.forEach(line => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("career-ai-resume.pdf");
  };

  return (
    <div className="container animate-fade-in section-spacing">
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '2rem' }}>Your AI Career Plan</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={handleDownloadPDF}>Download PDF</button>
          <button className="btn-secondary" onClick={onBack}>Start Over</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>

        {/* Recommended Roles - Full Width */}
        <div className="glass-panel" style={{ gridColumn: 'span 12', padding: '32px' }}>
          <h3 style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>Recommended Career Paths</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {career_roles?.map((role, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '16px 24px',
                borderRadius: '99px',
                border: '1px solid rgba(255,255,255,0.1)',
                fontWeight: 600
              }}>
                {role}
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Certs - 2 Columns */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '32px' }}>
          <h4 style={{ marginBottom: '16px' }}>Missing Skills</h4>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            {missing_skills?.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>

        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '32px' }}>
          <h4 style={{ marginBottom: '16px' }}>Certifications</h4>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            {certifications?.map((cert, i) => <li key={i}>{cert}</li>)}
          </ul>
        </div>

        {/* Roadmap - Full Width */}
        <div id="roadmap" className="glass-panel" style={{ gridColumn: 'span 12', padding: '32px' }}>
          <h4 style={{ marginBottom: '24px' }}>Actionable Roadmap</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {roadmap?.map((step, i) => (
              <div key={i} style={{
                padding: '20px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                borderLeft: '4px solid var(--accent-primary)'
              }}>
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Projects - Full Width */}
        <div className="glass-panel" style={{ gridColumn: 'span 12', padding: '32px' }}>
          <h4 style={{ marginBottom: '16px' }}>Suggested Projects</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {projects?.map((proj, i) => (
              <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                {proj}
              </div>
            ))}
          </div>
        </div>

        {/* Resume - Full Width */}
        <div id="resume" className="glass-panel" style={{ gridColumn: 'span 12', padding: '40px', background: '#e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#111' }}>
            <h4 style={{ color: '#000' }}>Generated Resume Preview</h4>
          </div>
          <pre className="resume-paper">{resume}</pre>
        </div>

      </div>
    </div>
  );
}
