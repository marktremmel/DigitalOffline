import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';

export default function SubstituteLead() {
  return (
    <div className="app-container">
      <div className="topbar no-print">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Dashboard
        </Link>
        <button onClick={() => window.print()} className="btn btn-ghost">
          <Printer size={16} /> Print this guide
        </button>
      </div>

      <div className="worksheet-container">
        <span className="eyebrow">For the substitute</span>
        <h1 style={{ marginTop: 14 }}>
          Hi! Here's the plan. <span className="scribble">it's easy, promise.</span>
        </h1>

        <p>
          The students are working on <strong>Media Literacy & Critical Thinking</strong>. Each worksheet can be
          done <strong>on paper</strong> or <strong>on a device</strong> — same questions, same content. Pick
          whichever works for the room you walk into.
        </p>

        <h2>1. What to hand out</h2>
        <p>
          On the dashboard, find the worksheet that matches the grade you have. Click it. You can:
        </p>
        <ul>
          <li>Print it (the Print button at the bottom — it formats cleanly for paper).</li>
          <li>Or share the link with students on their devices.</li>
        </ul>

        <h2>2. If they're on paper</h2>
        <ul>
          <li>Names + class go at the top.</li>
          <li>Multiple-choice questions become circles to fill in. Drag-and-match becomes "draw a line." Fill-in-the-blanks is fill-in-the-blanks.</li>
          <li>Collect the papers at the end. That's it.</li>
        </ul>

        <h2>3. If they're on devices</h2>
        <ul>
          <li>They go to the link on their phone or laptop and answer right on the page.</li>
          <li>
            When they finish, they tap <strong>Submit & Generate QR</strong> at the bottom. A QR code appears
            with their answers baked in.
          </li>
          <li>
            Students take a screenshot of the QR (the whole code must be in frame) and submit it the way they
            usually do — Google Classroom, Teams, email, etc.
          </li>
          <li>If a student loses the screenshot before sending it, that's fine — they can re-open the page and re-submit.</li>
        </ul>

        <div className="info-box kind-tip">
          <strong>It's totally OK</strong> if students Google a word they don't know — this is a media-literacy
          class, not a memory test. If they ask "is it OK to look this up," the answer is yes.
        </div>

        <h2>4. If a student finishes early</h2>
        <ul>
          <li>Pair them with a neighbour to compare answers — quietly.</li>
          <li>Ask them to write a 5-line "what surprised me?" reflection.</li>
          <li>If the worksheet has a creative bit (sketching, writing a fake headline, etc.), encourage them to go further.</li>
        </ul>

        <h2>5. What I (Mr. Tremmel) need from you at the end</h2>
        <ul>
          <li>Paper: leave the stack on my desk.</li>
          <li>Devices: students sent me their QR screenshots — nothing for you to collect.</li>
          <li>If anything broke, drop a note and I'll fix it on Monday.</li>
        </ul>

        <p style={{ marginTop: 32 }}>Thanks again — really appreciate it.<br />— Mark</p>
      </div>
    </div>
  );
}
