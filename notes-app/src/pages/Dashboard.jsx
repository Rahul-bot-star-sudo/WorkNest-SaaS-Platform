import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import ThemeSelector from '../components/ThemeSelector';
import { FiChevronRight } from 'react-icons/fi';

function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  // Load saved state
  useEffect(() => {
    const savedSubject = localStorage.getItem('lastSubject');
    const savedTopic = localStorage.getItem('lastTopic');
    const savedNote = localStorage.getItem('lastNote');
    if (savedSubject) setSelectedSubject(savedSubject);
    if (savedTopic) setSelectedTopic(savedTopic);
    if (savedNote) setSelectedNote(savedNote);
  }, []);

  // Save state
  useEffect(() => {
    if (selectedSubject) localStorage.setItem('lastSubject', selectedSubject);
    if (selectedTopic) localStorage.setItem('lastTopic', selectedTopic);
    if (selectedNote) localStorage.setItem('lastNote', selectedNote);
  }, [selectedSubject, selectedTopic, selectedNote]);

  return (
    <div className="app">
      <Sidebar
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      />
      
      <div className="main-content">
        <div className="content-header">
          <div className="breadcrumb">
            <span className="breadcrumb-item">{selectedSubject || 'Select'}</span>
            <FiChevronRight className="breadcrumb-sep" />
            <span className="breadcrumb-item">{selectedTopic || 'a'}</span>
            <FiChevronRight className="breadcrumb-sep" />
            <span className="breadcrumb-item active">{selectedNote || 'note'}</span>
          </div>
          <ThemeSelector />
        </div>
        
        <div className="content-body">
          <NoteViewer subject={selectedSubject} topic={selectedTopic} note={selectedNote} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;