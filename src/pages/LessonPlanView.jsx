import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { worksheetsData } from '../data/worksheetsData';
import { ArrowLeft, Printer } from 'lucide-react';

export default function LessonPlanView() {
  const { id } = useParams();
  const data = worksheetsData.find(w => w.id === id);

  if (!data) return <div style={{ padding: '40px', textAlign: 'center' }}>Lesson Plan not found.</div>;

  return (
    <div className="app-container">
      <div className="no-print" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#666', fontWeight: 600 }}>
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <button 
          onClick={() => window.print()}
          style={{
            backgroundColor: '#fff',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
            padding: '8px 16px',
            fontSize: '1em',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Printer size={18} /> Print Lesson
        </button>
      </div>

      <div className="worksheet-container" style={{ maxWidth: '800px', backgroundColor: '#fffbe6' }}>
        <h1 style={{ marginBottom: '10px' }}>{data.title}</h1>
        <div style={{ color: '#666', marginBottom: '30px', fontWeight: 600, fontStyle: 'italic' }}>Teacher Guide • Grade {data.grade}</div>

        {data.content.map((block, index) => {
          if (block.type === 'markdown') {
            return (
              <div key={index} style={{ lineHeight: 1.8 }}>
                {block.text.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={i} style={{ marginTop: '20px' }}>{line.replace(/\*\*/g, '')}</h3>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} style={{ marginLeft: '20px' }}>{line.replace('- ', '')}</li>;
                  }
                  return <p key={i}>{line.replace(/\*\*/g, '')}</p>;
                })}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
