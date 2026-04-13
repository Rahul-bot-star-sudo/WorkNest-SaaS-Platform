import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import ThemeSelector from '../components/ThemeSelector';
import { FiChevronRight, FiMenu, FiX } from 'react-icons/fi';

function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check screen size
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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

  // Close sidebar when note selected on mobile
  useEffect(() => {
    if (isMobile && selectedNote) {
      setSidebarOpen(false);
    }
  }, [selectedNote, isMobile]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        searchInput?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      {/* Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      
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
          <NoteViewer 
            subject={selectedSubject} 
            topic={selectedTopic} 
            note={selectedNote}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;