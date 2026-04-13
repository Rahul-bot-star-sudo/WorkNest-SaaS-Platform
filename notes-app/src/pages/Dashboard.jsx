import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteViewer from '../components/NoteViewer';
import ThemeSelector from '../components/ThemeSelector';
import MobileMenu from '../components/MobileMenu';
import { FiChevronRight } from 'react-icons/fi';

function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Close mobile menu when note is selected
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [selectedNote, isMobile]);

  // Keyboard shortcut: Ctrl+K to focus search
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Mobile Menu Button */}
      <MobileMenu isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      {/* Sidebar Overlay for Mobile */}
      {isMobile && isMobileMenuOpen && (
        <div className="sidebar-overlay open" onClick={closeMobileMenu} />
      )}
      
      <Sidebar
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={closeMobileMenu}
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