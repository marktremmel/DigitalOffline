import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard';
import WorksheetView from './pages/WorksheetView';
import TeacherDecode from './pages/TeacherDecode';
import SubstituteLead from './pages/SubstituteLead';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/worksheet/:id" element={<WorksheetView />} />
        <Route path="/teacher" element={<TeacherDecode />} />
        <Route path="/substitute" element={<SubstituteLead />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
