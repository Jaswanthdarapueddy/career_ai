import React from 'react';

export default function LoaderStep() {
  return (
    <div className="loader-wrap animate-fade-in">
      <div className="loader" />
      <p className="loader-text">Analyzing your profile with Agentic AI...</p>
    </div>
  );
}
