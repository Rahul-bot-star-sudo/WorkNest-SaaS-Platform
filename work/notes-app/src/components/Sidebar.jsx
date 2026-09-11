import { useState, useEffect } from 'react';
import { FiBook, FiFolder, FiFileText, FiSearch, FiRefreshCw, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { notesConfig, getSubjects, getTopics, getNotes } from '../data/notesConfig';
import '../styles/sidebar.css';

function Sidebar({ 
  selectedSubject, 
  setSelectedSubject, 
  selectedTopic, 
  setSelectedTopic, 
  selectedNote, 
  setSelectedNote,
  searchTerm,
  setSearchTerm
}) {
  const [expandedTopics, setExpandedTopics] = useState({});

  const subjects = getSubjects();
  const topics = getTopics(selectedSubject);
  const notes = getNotes(selectedSubject, selectedTopic);

  // Auto-expand current topic
  useEffect(() => {
    if (selectedTopic) {
      setExpandedTopics(prev => ({ ...prev, [selectedTopic]: true }));
    }
  }, [selectedTopic]);

  const toggleTopic = (topicKey) => {
    setExpandedTopics(prev => ({ ...prev, [topicKey]: !prev[topicKey] }));
  };

  const filteredNotes = notes.filter(note => 
    note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Highlight search term
  const highlightText = (text, search) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === search.toLowerCase() ? 
        <mark key={i} className="search-highlight">{part}</mark> : part
    );
  };

  // Handle subject selection
  const handleSubjectSelect = (sub) => {
    setSelectedSubject(sub);
    const firstTopic = Object.keys(notesConfig[sub].topics)[0];
    const firstNote = notesConfig[sub].topics[firstTopic]?.notes[0];
    setSelectedTopic(firstTopic);
    setSelectedNote(firstNote);
  };

  // Handle note selection
  const handleNoteSelect = (topicKey, note) => {
    setSelectedTopic(topicKey);
    setSelectedNote(note);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="sidebar-container">
      {/* Header Section */}
      <div className="sidebar-header">
        <FiBook className="sidebar-icon" />
        <h2>
          Notes<span className="highlight">Hub</span>
        </h2>
        <button 
          className="refresh-btn" 
          onClick={() => window.location.reload()} 
          title="Refresh"
          aria-label="Refresh page"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* Search Section */}
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search notes... (Ctrl+K)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search notes"
        />
        {searchTerm && (
          <button 
            className="search-clear" 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="search-results-info">
          Found {filteredNotes.length} note(s) matching "{searchTerm}"
        </div>
      )}

      {/* Subjects Section */}
      <div className="section">
        <h3 className="section-title">Subjects</h3>
        <div className="subjects-grid">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => handleSubjectSelect(sub)}
              className={`subject-btn ${selectedSubject === sub ? 'active' : ''}`}
              aria-label={`Select ${notesConfig[sub].name} subject`}
            >
              {notesConfig[sub].name}
            </button>
          ))}
        </div>
      </div>

      {/* Topics & Notes Section */}
      <div className="section">
        <h3 className="section-title">Topics & Notes</h3>
        <div className="topics-list">
          {Object.entries(topics).map(([topicKey, topicData]) => {
            const hasMatchingNotes = topicData.notes.some(note => 
              note.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (searchTerm && !hasMatchingNotes) return null;
            
            return (
              <div key={topicKey} className="topic-item">
                {/* Topic Header */}
                <button 
                  className="topic-header" 
                  onClick={() => toggleTopic(topicKey)}
                  aria-label={`Toggle ${topicData.name} topic`}
                >
                  {expandedTopics[topicKey] ? <FiChevronDown /> : <FiChevronRight />}
                  <FiFolder />
                  <span>{topicData.name}</span>
                  <span className="note-count">({topicData.notes.length})</span>
                </button>
                
                {/* Notes List (Collapsible) */}
                {expandedTopics[topicKey] && (
                  <div className="notes-list">
                    {topicData.notes
                      .filter(note => note.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((note) => (
                        <button
                          key={note}
                          onClick={() => handleNoteSelect(topicKey, note)}
                          className={`note-btn ${selectedTopic === topicKey && selectedNote === note ? 'active' : ''}`}
                          aria-label={`Select note: ${note}`}
                        >
                          <FiFileText />
                          <span>{highlightText(note, searchTerm)}</span>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;