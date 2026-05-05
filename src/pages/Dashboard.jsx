import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { worksheetsData, GRADES, TOPICS } from '../data/worksheetsData';
import { ScanLine, Printer } from 'lucide-react';

export default function Dashboard() {
  const [grade, setGrade] = useState('all');
  const [topic, setTopic] = useState('all');

  const filtered = worksheetsData.filter((w) => {
    if (grade !== 'all' && w.grade !== grade) return false;
    if (topic !== 'all' && w.topic !== topic) return false;
    return true;
  });

  const countQuestions = (ws) =>
    (ws.content || []).filter((b) => !['instruction', 'note', 'richtext'].includes(b.type)).length;

  return (
    <div className="app-container">
      <div className="topbar no-print">
        <span className="brand">
          <span className="dot"></span> Digital Culture · Worksheets
        </span>
        <Link to="/teacher" className="back-link">
          <ScanLine size={18} /> Teacher decoder
        </Link>
      </div>

      <div className="dashboard-container">
        <div className="dash-hero">
          <div>
            <span className="eyebrow">Grades 5–8 · Mr. Mark · SEK Budapest</span>
            <h1 style={{ marginTop: 14 }}>
              Worksheets that bite back. <span className="scribble">in a good way</span>
            </h1>
            <p className="dash-pitch">
              A small system of media-literacy worksheets you can print on paper or run on a phone. Same content,
              same neat-funky look, two ways to submit: collect the paper, or collect a screenshot of a QR code
              that bakes the answers in.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <Link to="/substitute" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              <Printer size={18} /> Substitute teacher lead
            </Link>
            <Link to="/teacher" className="btn btn-ghost" style={{ textDecoration: 'none' }}>
              <ScanLine size={18} /> Decode a student QR
            </Link>
          </div>
        </div>

        <div className="filter-row">
          <span style={{ fontWeight: 700, marginRight: 6 }}>Grade:</span>
          <button className={`filter-chip ${grade === 'all' ? 'active' : ''}`} onClick={() => setGrade('all')}>All</button>
          {GRADES.map((g) => (
            <button
              key={g}
              className={`filter-chip ${grade === g ? 'active' : ''}`}
              onClick={() => setGrade(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <span style={{ fontWeight: 700, marginRight: 6 }}>Topic:</span>
          <button className={`filter-chip ${topic === 'all' ? 'active' : ''}`} onClick={() => setTopic('all')}>All</button>
          {TOPICS.map((t) => (
            <button
              key={t}
              className={`filter-chip ${topic === t ? 'active' : ''}`}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#686a73' }}>
            No worksheets match that filter.
          </div>
        )}

        <div className="card-grid">
          {filtered.map((ws) => (
            <Link key={ws.id} to={`/worksheet/${ws.id}`} className="ws-card">
              <span className="ws-grade">Grade {ws.grade}</span>
              <span className="ws-topic">{ws.topic}</span>
              <h3>{ws.title}</h3>
              <p>{ws.subtitle}</p>
              <div className="ws-foot">
                <span className="pill">{countQuestions(ws)} questions</span>
                <span className="pill">Print + QR</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
