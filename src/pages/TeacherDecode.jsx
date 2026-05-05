import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ScanLine } from 'lucide-react';
import { worksheetsData } from '../data/worksheetsData';
import { stringToPayload, decodePayload, autoGrade } from '../utils/qrCodec';

function findCorrectLabel(question, value) {
  if (value === null || value === undefined) return <em style={{ color: '#888' }}>—</em>;
  switch (question.type) {
    case 'mcq':
      return question.options[value];
    case 'multiselect':
      return (value || []).map((i) => question.options[i]).join(', ') || <em>—</em>;
    case 'truefalse':
      return value ? 'TRUE' : 'FALSE';
    case 'match':
      return (value || [])
        .map((idx, pos) => `${question.leftItems[pos]} → ${question.rightItems[idx]}`)
        .join('  •  ');
    case 'rank':
      return (value || []).map((idx, pos) => `${pos + 1}. ${question.items[idx]}`).join('  •  ');
    case 'tag':
      return (value || [])
        .map((cat, i) => `${question.items[i]} → ${cat >= 0 ? question.categories[cat] : '—'}`)
        .join('  •  ');
    case 'fillblanks':
      return (value || []).join(' / ');
    case 'shorttext':
      return value;
    case 'hotspot':
      return (value || []).map((i) => question.spans[i]).join('  •  ');
    case 'scenario':
      return null; // children render
    default:
      return JSON.stringify(value);
  }
}

function ReviewQuestion({ question, value, autoOk }) {
  const cls =
    autoOk === true ? 'review-question correct' : autoOk === false ? 'review-question wrong' : 'review-question';
  if (question.type === 'scenario') {
    return (
      <div className={cls}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{question.title || 'Scenario'}</div>
        <div style={{ fontSize: '0.86rem', color: '#41434a', marginBottom: 8 }}>{question.story}</div>
        {(question.questions || []).map((sub) => (
          <ReviewQuestion key={sub.id} question={sub} value={(value || {})[sub.id]} autoOk={null} />
        ))}
      </div>
    );
  }
  return (
    <div className={cls}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{question.label}</div>
      <div style={{ fontSize: '0.95rem' }}>
        <strong>Student answered:</strong> {findCorrectLabel(question, value)}
      </div>
      {question.correct !== undefined && (
        <div style={{ fontSize: '0.85rem', color: '#41434a', marginTop: 4 }}>
          <strong>Correct:</strong>{' '}
          {findCorrectLabel(
            question,
            typeof question.correct === 'number' || typeof question.correct === 'boolean'
              ? question.correct
              : question.correct
          )}
        </div>
      )}
      {autoOk !== null && (
        <div style={{ fontSize: '0.78rem', marginTop: 6, fontWeight: 700 }}>
          {autoOk ? '✓ Auto-graded correct' : '✗ Auto-graded wrong'}
        </div>
      )}
    </div>
  );
}

export default function TeacherDecode() {
  const [raw, setRaw] = useState('');

  const decoded = useMemo(() => {
    if (!raw.trim()) return null;
    const payload = stringToPayload(raw.trim());
    if (!payload) return { error: 'Could not parse JSON.' };
    const ws = worksheetsData.find((w) => w.id === payload.w);
    if (!ws) return { error: `Worksheet "${payload.w}" not found in this app.` };
    const decoded = decodePayload(payload, ws);
    const grade = autoGrade(ws, decoded.answers);
    return { worksheet: ws, decoded, grade };
  }, [raw]);

  return (
    <div className="app-container">
      <div className="topbar no-print">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Dashboard
        </Link>
        <span style={{ fontWeight: 600 }}>
          <ScanLine size={16} style={{ verticalAlign: 'middle' }} /> Teacher decoder
        </span>
      </div>

      <div className="dashboard-container">
        <h1>
          Teacher decoder <span className="scribble">paste the QR contents</span>
        </h1>
        <p className="dash-pitch" style={{ marginBottom: 20 }}>
          Scan the student's QR code with any phone QR app. It will give you a JSON string. Paste it below.
          The decoder will reconstruct their answers, show the originals side-by-side, and auto-grade the
          objective questions.
        </p>

        <div className="decoder-card" style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 6 }}>Paste QR payload:</label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder='{"v":1,"w":"phishing","n":"MA","c":"7B",…}'
          />
        </div>

        {decoded?.error && (
          <div className="decoder-card" style={{ background: '#ffefef' }}>
            <strong>Couldn't decode:</strong> {decoded.error}
          </div>
        )}

        {decoded?.worksheet && (
          <div>
            <div className="decoder-card" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#686a73', fontWeight: 700 }}>
                    {decoded.worksheet.eyebrow}
                  </div>
                  <h2 style={{ margin: '4px 0 0' }}>{decoded.worksheet.title}</h2>
                  <div style={{ marginTop: 8, fontSize: '0.92rem' }}>
                    <strong>Name:</strong> {decoded.decoded.name || '—'} ·{' '}
                    <strong>Class:</strong> {decoded.decoded.studentClass || '—'} ·{' '}
                    <strong>Submitted:</strong>{' '}
                    {decoded.decoded.submittedAt
                      ? decoded.decoded.submittedAt.toLocaleString()
                      : '—'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    className={`grade-pill ${
                      decoded.grade.totalGradable && decoded.grade.correct / decoded.grade.totalGradable < 0.5
                        ? 'bad'
                        : ''
                    }`}
                  >
                    {decoded.grade.correct} / {decoded.grade.totalGradable} auto-graded
                  </span>
                  <div style={{ marginTop: 6, fontSize: '0.8rem', color: '#686a73' }}>
                    Open-text answers need a human read.
                  </div>
                </div>
              </div>
            </div>

            {decoded.worksheet.content
              .filter((q) => !['instruction', 'note', 'richtext'].includes(q.type))
              .map((q) => (
                <ReviewQuestion
                  key={q.id}
                  question={q}
                  value={decoded.decoded.answers[q.id]}
                  autoOk={decoded.grade.perQuestion[q.id] ?? null}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
