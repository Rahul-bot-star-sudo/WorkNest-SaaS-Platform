import { useState, useEffect } from 'react';
import { FiBook, FiFolder, FiFileText, FiSearch, FiRefreshCw, FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { scanNotesStructure } from '../utils/autoScanner';
import '../styles/sidebar.css';

function AutoSidebar({ 
  selectedSubject, 
  setSelectedSubject, 
  selectedTopic, 
  setSelectedTopic, 
  selectedNote, 
  setSelectedNote 
}) {
  const [structure, setStructure] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTopics, setExpandedTopics] = useState({});

  // Load structure on mount
  const loadStructure = async () => {
    setLoading(true);
    const scannedStructure = await scanNotesStructure();
    setStructure(scannedStructure);
    
    // Auto-select first subject if nothing selected
    const subjects = Object.keys(scannedStructure);
    if (subjects.length > 0 && !selectedSubject) {
      setSelectedSubject(subjects[0]);
      const firstTopic = Object.keys(scannedStructure[subjects[0]].topics)[0];
      const firstNote = scannedStructure[subjects[0]].topics[firstTopic]?.notes[0];
      setSelectedTopic(firstTopic);
      setSelectedNote(firstNote);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStructure();
  }, []);

  // Auto-expand current topic
  useEffect(() => {
    if (selectedTopic) {
      setExpandedTopics(prev => ({
        ...prev,
        [selectedTopic]: true
      }));
    }
  }, [selectedSubject, selectedTopic]);

  const toggleTopic = (topicKey) => {
    setExpandedTopics(prev => ({ ...prev, [topicKey]: !prev[topicKey] }));
  };

  const subjects = Object.keys(structure);
  const currentTopics = structure[selectedSubject]?.topics || {};

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <FiBook className="sidebar-icon" />
          <h2>Notes<span className="highlight">Hub</span></h2>
        </div>
        <div className="loading-container" style={{ padding: 40 }}>
          <div className="loading-spinner"></div>
          <p>Scanning notes folder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FiBook className="sidebar-icon" />
        <h2>Notes<span className="highlight">Hub</span></h2>
        <button className="refresh-btn" onClick={loadStructure} title="Refresh">
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
                const firstTopic = Object.keys(structure[sub].topics)[0];
                const firstNote = structure[sub].topics[firstTopic]?.notes[0];
                setSelectedTopic(firstTopic);
                setSelectedNote(firstNote);
              }}
              className={`subject-btn ${selectedSubject === sub ? 'active' : ''}`}
            >
              {structure[sub].name}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Topics & Notes</h3>
        <div className="topics-list">
          {Object.entries(currentTopics).map(([topicKey, topicData]) => {
            // Filter notes based on search
            const filteredNotes = topicData.notes.filter(note =>
              note.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (filteredNotes.length === 0 && searchTerm) return null;
            
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AutoSidebar;
