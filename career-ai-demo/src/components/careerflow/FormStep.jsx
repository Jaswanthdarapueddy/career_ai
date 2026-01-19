import React, { useState } from 'react';

export default function FormStep({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    education: '',
    skills: '',
    interests: '',
    experience: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <input name="name" required placeholder="Your Name" className="input" value={form.name} onChange={handleChange} />
      <input name="education" required placeholder="Education (e.g. B.Sc. Computer Science)" className="input" value={form.education} onChange={handleChange} />
      <input name="skills" required placeholder="Skills (comma-separated)" className="input" value={form.skills} onChange={handleChange} />
      <input name="interests" required placeholder="Interests (comma-separated)" className="input" value={form.interests} onChange={handleChange} />
      <input name="experience" placeholder="Experience (e.g. 2 years software dev)" className="input" value={form.experience} onChange={handleChange} />
      <button type="submit" className="btn-primary">Analyze Profile</button>
    </form>
  );
}
