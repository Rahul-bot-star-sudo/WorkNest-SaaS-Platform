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
  setSearchTerm,
  isMobileOpen,
  onMobileClose
})  {
  
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

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FiBook className="sidebar-icon" />
        <h2>Notes<span className="highlight">Hub</span></h2>
        <button 
          className="refresh-btn" 
          onClick={() => window.location.reload()} 
          title="Refresh"
        >
          <FiRefreshCw />
        </button>
      </div>

      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="section">
        <h3 className="section-title">Subjects</h3>
        <div className="subjects-grid">
          {subjects.map(sub => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                const firstTopic = Object.keys(notesConfig[sub].topics)[0];
                const firstNote = notesConfig[sub].topics[firstTopic]?.notes[0];
                setSelectedTopic(firstTopic);
                setSelectedNote(firstNote);
              }}
              className={`subject-btn ${selectedSubject === sub ? 'active' : ''}`}
            >
              {notesConfig[sub].name}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Topics & Notes</h3>
        <div className="topics-list">
          {Object.entries(topics).map(([topicKey, topicData]) => (
            <div key={topicKey} className="topic-item">
              <button className="topic-header" onClick={() => toggleTopic(topicKey)}>
                {expandedTopics[topicKey] ? <FiChevronDown /> : <FiChevronRight />}
                <FiFolder />
                <span>{topicData.name}</span>
                <span className="note-count">({topicData.notes.length})</span>
              </button>
              
              {expandedTopics[topicKey] && (
                <div className="notes-list">
                  {filteredNotes.map(note => (
                    <button
                      key={note}
                      onClick={() => {
                        setSelectedTopic(topicKey);
                        setSelectedNote(note);
                      }}
                      className={`note-btn ${selectedTopic === topicKey && selectedNote === note ? 'active' : ''}`}
                    >
                      <FiFileText />
                      <span>{note}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;