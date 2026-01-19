import React, { useState } from 'react';
import ResultStep from './careerflow/ResultStep';

export default function CareerFlow() {
  const [step, setStep] = useState('input'); // Changed 'form' to 'input'
  const [userData, setUserData] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  // New state for form data
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    skills: '',
    interests: '',
    experience: '',
  });

  // New handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // New handleSubmit function (replaces handleFormSubmit)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setUserData(formData); // Use the new formData
    setStep('loading');
    try {
      const res = await fetch('/api/process-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Use the new formData
      });
      const result = await res.json();
      setAiResult(result);
      setStep('result');
    } catch (err) {
      console.error(err);
      setAiResult({ error: err.message || 'Failed to process. Try again.' });
      setStep('result');
    }
  };

  if (step === 'input') {
    return (
      <section id="start" className="container section-spacing" style={{ paddingTop: 0 }}>
        <div className="glass-panel form-card animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Start Your Journey</h2>
            <p style={{ color: 'var(--text-muted)' }}>Fill in your details to generate your personalized career plan.</p>
          </div>

          <form onSubmit={handleSubmit} className="form-stack">
            <div className="input-group">
              <label className="label">Full Name</label>
              <input
                className="input"
                name="name"
                placeholder="e.g. Alex Chen"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Education</label>
              <input
                className="input"
                name="education"
                placeholder="e.g. B.Tech in Computer Science"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="label">Key Skills</label>
              <textarea
                className="input"
                name="skills"
                placeholder="e.g. Python, React, Problem Solving..."
                value={formData.skills}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="input-group">
              <label className="label">Interests</label>
              <textarea
                className="input"
                name="interests"
                placeholder="e.g. AI, Web Design, Finance..."
                value={formData.interests}
                onChange={handleChange}
                required
                rows={2}
              />
            </div>

            <div className="input-group">
              <label className="label">Experience (Optional)</label>
              <textarea
                className="input"
                name="experience"
                placeholder="Briefly describe your past roles or internships..."
                value={formData.experience}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Generate Career Plan
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (step === 'loading') {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader-wrap">
          <div className="loader-spinner"></div>
          <p className="loader-text">Analyzing your profile...</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>This might take a moment.</p>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <section id="career-flow" className="career-flow">
        <div className="glass-card career-flow-card">
          <ResultStep userData={userData} aiResult={aiResult} onBack={() => setStep('input')} /> {/* Changed 'form' to 'input' */}
        </div>
      </section>
    );
  }

  return null; // Should not happen, but good for exhaustive checks
}
