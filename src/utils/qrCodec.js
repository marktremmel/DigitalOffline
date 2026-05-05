// Smart, versioned QR codec for the worksheet system.
// The goal: keep payloads small enough to fit in a low-density QR (level L, ~256px).
//
// Payload shape:
//   {
//     v: 1,                    // schema version
//     w: "phish",              // short worksheet id
//     n: "MA",                 // student name
//     c: "7B",                 // class
//     t: 1714900000,           // submitted-at (seconds)
//     a: [ ... ]               // per-question compact answers, in order
//   }
//
// For each question, the answer is encoded based on its type:
//   mcq         -> integer  (selected index, or -1 if skipped)
//   multiselect -> integer  (bitmask of selected indices)
//   truefalse   -> 0 | 1 | -1
//   match       -> string   (digits of right-column ordering, e.g. "20413")
//   rank        -> string   (digits of ranked ordering)
//   tag         -> string   (digits of category index per item)
//   fillblanks  -> array of compressed strings (lz-string)
//   shorttext   -> compressed string (lz-string)
//   hotspot     -> integer  (bitmask of selected spans)
//   scenario    -> array    (per sub-question, recurses)
//
// Decoding requires the original worksheet definition because positions matter.

import LZString from 'lz-string';

export const SCHEMA_VERSION = 1;

const MAX_TEXT_CHARS = 240; // soft cap before truncating; keeps the QR scannable

function compressText(s) {
  if (!s) return '';
  const trimmed = s.length > MAX_TEXT_CHARS ? s.slice(0, MAX_TEXT_CHARS) : s;
  return LZString.compressToEncodedURIComponent(trimmed);
}

function decompressText(s) {
  if (!s) return '';
  const out = LZString.decompressFromEncodedURIComponent(s);
  return out || '';
}

function digitString(arr) {
  // For arrays of small ints (<10) we pack as a string of digits to save brackets/commas.
  return arr.map((n) => (n < 0 ? 'x' : String(n))).join('');
}

function digitParse(s) {
  return s.split('').map((c) => (c === 'x' ? -1 : parseInt(c, 10)));
}

function bitmaskFromArray(arr) {
  let mask = 0;
  for (const i of arr || []) mask |= 1 << i;
  return mask;
}

function arrayFromBitmask(mask, size) {
  const out = [];
  for (let i = 0; i < size; i++) if (mask & (1 << i)) out.push(i);
  return out;
}

export function encodeAnswer(question, value) {
  switch (question.type) {
    case 'mcq':
      return typeof value === 'number' ? value : -1;
    case 'multiselect':
      return bitmaskFromArray(value);
    case 'truefalse':
      return value === true ? 1 : value === false ? 0 : -1;
    case 'match':
    case 'rank':
      return digitString(value || []);
    case 'tag':
      // value is array of category indices, one per item
      return digitString(value || []);
    case 'fillblanks':
      return (value || []).map((s) => compressText(s || ''));
    case 'shorttext':
      return compressText(value || '');
    case 'hotspot':
      return bitmaskFromArray(value);
    case 'scenario':
      // scenario stores answers for each sub-question, in order
      return (question.questions || []).map((sub) => encodeAnswer(sub, (value || {})[sub.id]));
    case 'instruction':
    case 'richtext':
    case 'note':
      return null; // no answer
    default:
      return value ?? null;
  }
}

export function decodeAnswer(question, encoded) {
  switch (question.type) {
    case 'mcq':
      return typeof encoded === 'number' && encoded >= 0 ? encoded : null;
    case 'multiselect':
      return arrayFromBitmask(encoded || 0, (question.options || []).length);
    case 'truefalse':
      return encoded === 1 ? true : encoded === 0 ? false : null;
    case 'match':
    case 'rank':
    case 'tag':
      return digitParse(encoded || '');
    case 'fillblanks':
      return (encoded || []).map(decompressText);
    case 'shorttext':
      return decompressText(encoded || '');
    case 'hotspot':
      return arrayFromBitmask(encoded || 0, (question.spans || []).length);
    case 'scenario': {
      const out = {};
      (question.questions || []).forEach((sub, i) => {
        out[sub.id] = decodeAnswer(sub, (encoded || [])[i]);
      });
      return out;
    }
    default:
      return encoded;
  }
}

// Build the compact payload object.
export function buildPayload({ worksheet, name, studentClass, answers }) {
  const a = (worksheet.content || [])
    .filter((q) => !['instruction', 'richtext', 'note'].includes(q.type))
    .map((q) => encodeAnswer(q, answers[q.id]));
  return {
    v: SCHEMA_VERSION,
    w: worksheet.id,
    n: (name || '').slice(0, 24),
    c: (studentClass || '').slice(0, 12),
    t: Math.floor(Date.now() / 1000),
    a,
  };
}

export function payloadToString(payload) {
  return JSON.stringify(payload);
}

export function stringToPayload(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

// Decode the payload back into a friendly object the teacher can review.
export function decodePayload(payload, worksheet) {
  if (!payload || payload.w !== worksheet.id) return null;
  const answerableQuestions = (worksheet.content || []).filter(
    (q) => !['instruction', 'richtext', 'note'].includes(q.type)
  );
  const decoded = {};
  answerableQuestions.forEach((q, i) => {
    decoded[q.id] = decodeAnswer(q, (payload.a || [])[i]);
  });
  return {
    name: payload.n,
    studentClass: payload.c,
    submittedAt: payload.t ? new Date(payload.t * 1000) : null,
    worksheetId: payload.w,
    answers: decoded,
  };
}

// Compute a quick "auto-grade" summary for the objective questions.
export function autoGrade(worksheet, decodedAnswers) {
  const result = { totalGradable: 0, correct: 0, perQuestion: {} };
  const grade = (q, v) => {
    let correct = null;
    switch (q.type) {
      case 'mcq':
        if (typeof q.correct === 'number') {
          result.totalGradable++;
          correct = v === q.correct;
          if (correct) result.correct++;
        }
        break;
      case 'truefalse':
        if (typeof q.correct === 'boolean') {
          result.totalGradable++;
          correct = v === q.correct;
          if (correct) result.correct++;
        }
        break;
      case 'multiselect':
        if (Array.isArray(q.correct)) {
          result.totalGradable++;
          const a = new Set(v || []);
          const b = new Set(q.correct);
          correct = a.size === b.size && [...a].every((i) => b.has(i));
          if (correct) result.correct++;
        }
        break;
      case 'match':
      case 'rank':
        if (Array.isArray(q.correct)) {
          result.totalGradable++;
          correct =
            (v || []).length === q.correct.length &&
            (v || []).every((n, i) => n === q.correct[i]);
          if (correct) result.correct++;
        }
        break;
      case 'tag':
        if (Array.isArray(q.correct)) {
          result.totalGradable++;
          correct =
            (v || []).length === q.correct.length &&
            (v || []).every((n, i) => n === q.correct[i]);
          if (correct) result.correct++;
        }
        break;
      case 'hotspot':
        if (Array.isArray(q.correct)) {
          result.totalGradable++;
          const a = new Set(v || []);
          const b = new Set(q.correct);
          correct = a.size === b.size && [...a].every((i) => b.has(i));
          if (correct) result.correct++;
        }
        break;
      case 'scenario':
        for (const sub of q.questions || []) {
          grade(sub, (v || {})[sub.id]);
        }
        break;
      default:
        break;
    }
    if (correct !== null) result.perQuestion[q.id] = correct;
  };
  for (const q of worksheet.content || []) {
    grade(q, decodedAnswers[q.id]);
  }
  return result;
}
