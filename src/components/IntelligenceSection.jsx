export default function IntelligenceSection() {
  const features = [
    {
      title: "Career Guidance",
      desc: "AI-driven career recommendations tailored to your profile."
    },
    {
      title: "One-Page Resume",
      desc: "Clean, ATS-friendly resumes ready for recruiters."
    },
    {
      title: "Skill Roadmap",
      desc: "Step-by-step learning paths with real-world relevance."
    }
  ];

  return (
    <section id="features" className="container section-spacing">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Featured Advantages</span>
      </div>
      <div className="grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="feature-card animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: '1rem', color: '#E3DAC9' }}>{f.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, fontSize: '0.95rem' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
