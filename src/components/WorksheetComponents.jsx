import React from 'react';

export const WorksheetHeader = ({ title, subtitle, scribble, name, setName, studentClass, setStudentClass, eyebrow }) => {
  return (
    <>
      <div className="worksheet-meta">
        <div className="meta-left">
          <span style={{ fontWeight: 700 }}>Digital Culture · SEK Budapest</span>
          <span>Mr. Mark · 2025/26</span>
        </div>
        <div className="meta-right">
          <div className="field-row">
            <span>Name</span>
            <input
              type="text"
              className="field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field-row">
            <span>Class</span>
            <input
              type="text"
              className="field-input"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            />
          </div>
        </div>
      </div>

      {eyebrow && <span className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</span>}
      <div className="title-row">
        <h1>{title}</h1>
        {scribble && <span className="scribble">{scribble}</span>}
      </div>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </>
  );
};

export const InfoBox = ({ kind = 'tip', children }) => (
  <div className={`info-box kind-${kind}`}>{children}</div>
);

export const RichText = ({ text }) => {
  // Render simple newline-separated paragraphs with **bold** support.
  const lines = text.split('\n');
  return (
    <div style={{ marginBottom: 28, lineHeight: 1.6 }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} style={{ margin: '0 0 8px 0' }}>
            {parts.map((p, j) =>
              p.startsWith('**') && p.endsWith('**') ? (
                <strong key={j}>{p.slice(2, -2)}</strong>
              ) : (
                <span key={j}>{p}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
};

export const QuestionBlock = ({ number, prompt, helper, children }) => (
  <div className="q-block">
    <div className="q-prompt">
      {number !== undefined && <span className="q-num">{number}</span>}
      {prompt}
    </div>
    {helper && <div className="q-helper">{helper}</div>}
    {children}
  </div>
);
