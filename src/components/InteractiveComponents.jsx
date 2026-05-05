import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Send, RotateCcw } from 'lucide-react';
import { buildPayload, payloadToString } from '../utils/qrCodec';
import { QuestionBlock } from './WorksheetComponents';

/* ============================== MCQ ============================== */
export const MultipleChoice = ({ options, selectedValue, onChange }) => (
  <>
    <div className="option-stack no-print">
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={`option-card ${selectedValue === i ? 'selected' : ''}`}
        >
          <span className="option-bullet">{String.fromCharCode(65 + i)}</span>
          <span>{opt}</span>
        </button>
      ))}
    </div>
    <div className="print-only" style={{ display: 'none' }}>
      {options.map((opt, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #000', display: 'inline-block', flexShrink: 0, marginTop: 4 }} />
          <span>{opt}</span>
        </div>
      ))}
    </div>
  </>
);

/* ============================== Multi-select ============================== */
export const MultiSelect = ({ options, selectedValues = [], onChange }) => {
  const toggle = (i) => {
    if (selectedValues.includes(i)) onChange(selectedValues.filter((v) => v !== i));
    else onChange([...selectedValues, i].sort((a, b) => a - b));
  };
  return (
    <>
      <div className="option-stack no-print">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`option-card multi ${selectedValues.includes(i) ? 'selected' : ''}`}
          >
            <span className="option-bullet">{selectedValues.includes(i) ? '✓' : ''}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
      <div className="print-only" style={{ display: 'none' }}>
        {options.map((opt, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 14, height: 14, border: '1.5px solid #000', display: 'inline-block', flexShrink: 0, marginTop: 5 }} />
            <span>{opt}</span>
          </div>
        ))}
      </div>
    </>
  );
};

/* ============================== True / False ============================== */
export const TrueFalse = ({ value, onChange }) => (
  <>
    <div className="tf-row no-print">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`tf-btn t ${value === true ? 'selected t' : ''}`}
      >
        True
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`tf-btn f ${value === false ? 'selected f' : ''}`}
      >
        False
      </button>
    </div>
    <div className="print-only" style={{ display: 'none' }}>
      <span>◯ True ◯ False</span>
    </div>
  </>
);

/* ============================== Drag-Match (right col reorder) ============================== */
const SortableCell = ({ id, content, klass = 'match-cell drag' }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.85 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className={klass} {...attributes} {...listeners}>
      <span style={{ marginRight: 10, color: '#aaa', fontSize: '1.1rem' }}>≡</span>
      <span>{content}</span>
    </div>
  );
};

export const DragAndMatch = ({ leftItems, rightItems, order, setOrder }) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id);
    const newIndex = order.indexOf(over.id);
    setOrder(arrayMove(order, oldIndex, newIndex));
  };
  return (
    <>
      <div className="match-grid no-print">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {leftItems.map((item, i) => (
            <div key={i} className="match-cell fixed">{item}</div>
          ))}
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {order.map((id) => (
                <SortableCell key={id} id={id} content={rightItems[id]} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <div className="print-only" style={{ display: 'none' }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Draw a line from each item on the left to its match on the right.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 30 }}>
          <div style={{ flex: 1 }}>
            {leftItems.map((item, i) => (
              <div key={i} style={{ marginBottom: 14, padding: 8, border: '1px solid #000' }}>{item}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            {rightItems.map((item, i) => (
              <div key={i} style={{ marginBottom: 14, padding: 8, border: '1px solid #000' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* ============================== Rank Order ============================== */
const RankCell = ({ id, position, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.85 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="rank-item" {...attributes} {...listeners}>
      <span className="rank-rank">{position}</span>
      <span style={{ flex: 1 }}>{content}</span>
      <span style={{ color: '#aaa' }}>≡</span>
    </div>
  );
};

export const RankOrder = ({ items, order, setOrder, topLabel = 'Top', bottomLabel = 'Bottom' }) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id);
    const newIndex = order.indexOf(over.id);
    setOrder(arrayMove(order, oldIndex, newIndex));
  };
  return (
    <>
      <div className="no-print">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, color: '#686a73', fontWeight: 700 }}>
          <span>↑ {topLabel}</span>
          <span>{bottomLabel} ↓</span>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="rank-list">
              {order.map((id, idx) => (
                <RankCell key={id} id={id} position={idx + 1} content={items[id]} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <div className="print-only" style={{ display: 'none' }}>
        <p style={{ fontStyle: 'italic' }}>Number each item from 1 (top: {topLabel}) to {items.length} ({bottomLabel}):</p>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <span style={{ display: 'inline-block', width: 26, height: 26, border: '1.5px solid #000', textAlign: 'center', lineHeight: '24px' }}> </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </>
  );
};

/* ============================== Tag From Bank ============================== */
export const TagFromBank = ({ items, categories, value = [], onChange }) => {
  // value is array of category-indices, one per item; -1 means unset.
  const ensure = (arr) => items.map((_, i) => (arr[i] !== undefined ? arr[i] : -1));
  const current = ensure(value);
  const setAt = (idx, catIdx) => {
    const next = [...current];
    next[idx] = next[idx] === catIdx ? -1 : catIdx;
    onChange(next);
  };
  return (
    <>
      <div className="tag-row no-print">
        {items.map((item, i) => (
          <div key={i} className="tag-item">
            <div className="tag-item-text">{item}</div>
            <div className="tag-options">
              {categories.map((cat, ci) => (
                <button
                  key={ci}
                  type="button"
                  onClick={() => setAt(i, ci)}
                  className={`tag-chip cat-${ci} ${current[i] === ci ? 'selected' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="print-only" style={{ display: 'none' }}>
        <p style={{ fontStyle: 'italic' }}>For each item, circle the matching category: {categories.join(' / ')}.</p>
        {items.map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 600 }}>{item}</div>
            <div style={{ marginLeft: 14 }}>
              {categories.map((cat, ci) => (
                <span key={ci} style={{ marginRight: 14 }}>◯ {cat}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

/* ============================== Fill in Blanks ============================== */
export const FillBlanks = ({ template, value = [], onChange }) => {
  // Template is a string with `___` markers as blanks.
  const parts = template.split('___');
  const setAt = (i, val) => {
    const next = [...value];
    while (next.length < parts.length - 1) next.push('');
    next[i] = val;
    onChange(next);
  };
  return (
    <>
      <div className="cloze no-print">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <span>{part}</span>
            {i < parts.length - 1 && (
              <input
                className="cloze-blank"
                type="text"
                value={value[i] || ''}
                onChange={(e) => setAt(i, e.target.value)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="print-only" style={{ display: 'none' }}>
        <span>{template.replace(/___/g, '_____________')}</span>
      </div>
    </>
  );
};

/* ============================== Hotspot ============================== */
export const Hotspot = ({ passage, spans, value = [], onChange, helper }) => {
  // Passage is rendered with span markers like {{0}}, {{1}}, ... that map to spans[i].
  // value is an array of indices the student has flagged.
  const flagged = new Set(value);
  const toggle = (i) => {
    if (flagged.has(i)) onChange([...flagged].filter((v) => v !== i).sort((a, b) => a - b));
    else onChange([...flagged, i].sort((a, b) => a - b));
  };
  // split passage into segments based on {{n}} markers
  const tokenRe = /\{\{(\d+)\}\}/g;
  const segments = [];
  let lastIdx = 0;
  let m;
  while ((m = tokenRe.exec(passage)) !== null) {
    if (m.index > lastIdx) segments.push({ kind: 'text', text: passage.slice(lastIdx, m.index) });
    segments.push({ kind: 'token', idx: parseInt(m[1], 10) });
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < passage.length) segments.push({ kind: 'text', text: passage.slice(lastIdx) });

  return (
    <>
      <div className="no-print">
        {helper && <div className="q-helper">{helper}</div>}
        <div className="hotspot-passage">
          {segments.map((seg, i) =>
            seg.kind === 'text' ? (
              <span key={i}>{seg.text}</span>
            ) : (
              <span
                key={i}
                onClick={() => toggle(seg.idx)}
                className={`hotspot-token ${flagged.has(seg.idx) ? 'flagged' : ''}`}
                title={spans[seg.idx]}
              >
                {spans[seg.idx]}
              </span>
            )
          )}
        </div>
      </div>
      <div className="print-only" style={{ display: 'none' }}>
        <p style={{ fontStyle: 'italic' }}>Underline or circle every part of the passage you think is suspicious:</p>
        <div className="hotspot-passage" style={{ background: '#fff' }}>
          {segments.map((seg, i) =>
            seg.kind === 'text' ? <span key={i}>{seg.text}</span> : <u key={i}>{spans[seg.idx]}</u>
          )}
        </div>
      </div>
    </>
  );
};

/* ============================== Short Text ============================== */
export const ShortText = ({ value = '', onChange, rows = 3, placeholder }) => (
  <textarea
    className="lined-textarea"
    rows={rows}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder || 'Write your answer here…'}
    maxLength={400}
  />
);

/* ============================== Question Dispatcher ============================== */
export const Question = ({ block, number, value, setValue }) => {
  switch (block.type) {
    case 'mcq':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper}>
          <MultipleChoice options={block.options} selectedValue={value} onChange={setValue} />
        </QuestionBlock>
      );
    case 'multiselect':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper || 'Pick all that apply.'}>
          <MultiSelect options={block.options} selectedValues={value || []} onChange={setValue} />
        </QuestionBlock>
      );
    case 'truefalse':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper}>
          <TrueFalse value={value === undefined ? null : value} onChange={setValue} />
        </QuestionBlock>
      );
    case 'match':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper || 'Drag the cards on the right to match the items on the left.'}>
          <DragAndMatch
            leftItems={block.leftItems}
            rightItems={block.rightItems}
            order={value || block.rightItems.map((_, i) => i)}
            setOrder={setValue}
          />
        </QuestionBlock>
      );
    case 'rank':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper || 'Drag to reorder. Top = most. Bottom = least.'}>
          <RankOrder
            items={block.items}
            order={value || block.items.map((_, i) => i)}
            setOrder={setValue}
            topLabel={block.topLabel}
            bottomLabel={block.bottomLabel}
          />
        </QuestionBlock>
      );
    case 'tag':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper || 'Tap a tag to apply it.'}>
          <TagFromBank items={block.items} categories={block.categories} value={value || []} onChange={setValue} />
        </QuestionBlock>
      );
    case 'fillblanks':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper}>
          <FillBlanks template={block.template} value={value || []} onChange={setValue} />
        </QuestionBlock>
      );
    case 'hotspot':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper}>
          <Hotspot passage={block.passage} spans={block.spans} value={value || []} onChange={setValue} />
        </QuestionBlock>
      );
    case 'shorttext':
      return (
        <QuestionBlock number={number} prompt={block.label} helper={block.helper}>
          <ShortText value={value || ''} onChange={setValue} rows={block.rows || 3} placeholder={block.placeholder} />
        </QuestionBlock>
      );
    case 'scenario': {
      const subAnswers = value || {};
      const setSub = (subId, val) => setValue({ ...subAnswers, [subId]: val });
      return (
        <div className="q-block">
          <div className="scenario-card">
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', marginBottom: 8 }}>
              {block.title || 'Scenario'}
            </div>
            <div style={{ lineHeight: 1.55 }}>{block.story}</div>
          </div>
          {(block.questions || []).map((sub, i) => (
            <Question
              key={sub.id}
              block={sub}
              number={`${number}.${i + 1}`}
              value={subAnswers[sub.id]}
              setValue={(val) => setSub(sub.id, val)}
            />
          ))}
        </div>
      );
    }
    default:
      return null;
  }
};

/* ============================== Smart QR Submit ============================== */
export const SmartQRSubmit = ({ worksheet, name, studentClass, answers, onReset }) => {
  const [qrValue, setQrValue] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generate = () => {
    const payload = buildPayload({ worksheet, name, studentClass, answers });
    const str = payloadToString(payload);
    setQrValue(str);
    setShowQR(true);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 80);
  };

  return (
    <div className="submit-bar no-print">
      <div className="btn-row">
        <button type="button" onClick={generate} className="btn btn-primary">
          <Send size={18} /> Submit & Generate QR
        </button>
        <button type="button" onClick={() => window.print()} className="btn btn-secondary">
          <Printer size={18} /> Print this page
        </button>
        {onReset && (
          <button type="button" onClick={onReset} className="btn btn-ghost">
            <RotateCcw size={18} /> Reset answers
          </button>
        )}
      </div>
      {showQR && (
        <div className="qr-result">
          <h3 style={{ marginTop: 0 }}>Screenshot this QR ✦</h3>
          <p style={{ marginTop: 0, fontSize: '0.9rem', color: '#41434a' }}>
            Send the screenshot in <em>Google Classroom</em> or to Mr. Tremmel directly. Your name + class are baked in.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', padding: 14 }}>
            <QRCodeSVG value={qrValue} size={240} level="M" includeMargin={false} />
          </div>
          <details style={{ fontSize: '0.78rem', marginTop: 8 }}>
            <summary style={{ cursor: 'pointer', color: '#686a73' }}>Show raw payload ({qrValue.length} chars)</summary>
            <code>{qrValue}</code>
          </details>
        </div>
      )}
    </div>
  );
};
