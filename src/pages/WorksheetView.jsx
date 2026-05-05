import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { worksheetsData } from '../data/worksheetsData';
import { WorksheetHeader, InfoBox, RichText } from '../components/WorksheetComponents';
import { Question, SmartQRSubmit } from '../components/InteractiveComponents';
import { ArrowLeft } from 'lucide-react';

// Mulberry32 - tiny seedable PRNG for deterministic shuffles per worksheet/question.
function rngFromString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return function () {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIdx(n, seed) {
  const arr = Array.from({ length: n }, (_, i) => i);
  const rand = rngFromString(seed);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Avoid the (very rare) case where the shuffle returns identity for short arrays.
  if (n > 1 && arr.every((v, i) => v === i)) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

function defaultAnswerFor(block, worksheetId = '') {
  const seed = `${worksheetId}::${block.id || ''}`;
  switch (block.type) {
    case 'match':
      return shuffledIdx(block.rightItems.length, seed);
    case 'rank':
      return shuffledIdx(block.items.length, seed);
    case 'tag':
      return block.items.map(() => -1);
    case 'multiselect':
    case 'hotspot':
      return [];
    case 'fillblanks':
      return [];
    case 'shorttext':
      return '';
    case 'scenario':
      return (block.questions || []).reduce((acc, q) => {
        acc[q.id] = defaultAnswerFor(q, worksheetId);
        return acc;
      }, {});
    default:
      return undefined;
  }
}

export default function WorksheetView() {
  const { id } = useParams();
  const data = worksheetsData.find((w) => w.id === id);

  const initialAnswers = useMemo(() => {
    const out = {};
    if (!data) return out;
    for (const block of data.content) {
      if (block.id) out[block.id] = defaultAnswerFor(block, data.id);
    }
    return out;
  }, [data]);

  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [answers, setAnswers] = useState(initialAnswers);

  if (!data) {
    return (
      <div style={{ padding: 60, textAlign: 'center' }}>
        <h2>Worksheet not found</h2>
        <Link to="/" className="back-link">← Back to dashboard</Link>
      </div>
    );
  }

  const setAnswer = (qid, val) => setAnswers((prev) => ({ ...prev, [qid]: val }));

  const reset = () => setAnswers(initialAnswers);

  let qNumber = 0;
  return (
    <div className="app-container">
      <div className="topbar no-print">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to dashboard
        </Link>
        <span style={{ fontSize: '0.85rem', color: '#686a73' }}>
          Grade {data.grade} · {data.topic}
        </span>
      </div>

      <div className="worksheet-container">
        <WorksheetHeader
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
          scribble={data.scribble}
          name={name}
          setName={setName}
          studentClass={studentClass}
          setStudentClass={setStudentClass}
        />

        {data.content.map((block, idx) => {
          if (block.type === 'instruction' || block.type === 'note') {
            return (
              <InfoBox key={idx} kind={block.kind || 'tip'}>
                {block.text.split('\n').map((l, i) => <p key={i} style={{ margin: '0 0 6px 0' }}>{l}</p>)}
              </InfoBox>
            );
          }
          if (block.type === 'richtext') {
            return <RichText key={idx} text={block.text} />;
          }
          qNumber += 1;
          return (
            <Question
              key={block.id || idx}
              block={block}
              number={qNumber}
              value={answers[block.id]}
              setValue={(val) => setAnswer(block.id, val)}
            />
          );
        })}

        <SmartQRSubmit
          worksheet={data}
          name={name}
          studentClass={studentClass}
          answers={answers}
          onReset={reset}
        />
      </div>
    </div>
  );
}
