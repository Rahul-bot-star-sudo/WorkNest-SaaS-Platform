import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiChevronDown } from 'react-icons/fi';
import '../styles/themeselector.css';

function ThemeSelector() {
  const { themeName, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Group themes - USE CORRECT IDs from ThemeContext
  const themeGroups = {
    'Default & Light': ['blue', 'light', 'peach', 'sunset', 'golden', 'lavender'],
    'Dark & Premium': ['dark', 'zenithDark', 'vscode', 'github', 'galaxy'],
    'Casino & Gaming': ['casinoRoyale', 'lasVegas', 'pokerNight', 'slotMachine', 'blackjack', 'roulette', 'vegasStrip'],
    'Nature': ['green', 'forest', 'ocean', 'sage'],
    'Special': ['cotton', 'coffee', 'royal', 'zenith', 'tailwind', 'addicted', 'gamer', 'neon', 'psychedelic', 'hypnotic', 'void', 'godmode', 'multidim', 'disco'],
    'VS Code': ['vscodePlus', 'vscodeLight', 'vscodeBlue']
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Lock body scroll when mobile dropdown is open
  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && 
          dropdownRef.current && 
          !dropdownRef.current.contains(e.target) &&
          !buttonRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Handle touch swipe to close
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart || !isOpen) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStart;
    
    if (diff > 50 && window.innerWidth <= 768) {
      setIsOpen(false);
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  // Icon lookup - MATCH ThemeContext IDs
  const getThemeIcon = (themeId) => {
    const icons = {
      'blue': '🔵', 'light': '☀️', 'dark': '🌙', 'zenithDark': '⚡',
      'vscode': '💻', 'golden': '👑', 'lavender': '🌸', 'green': '🌿',
      'forest': '🌲', 'ocean': '🌊', 'peach': '🍑', 'sunset': '🌅',
      'github': '🐙', 'galaxy': '🌌', 'casinoRoyale': '🎰',
      'lasVegas': '✨', 'pokerNight': '🃏', 'slotMachine': '🎰',
      'blackjack': '🃏', 'roulette': '🎡', 'vegasStrip': '🌃',
      'sage': '🌿', 'cotton': '🌸', 'coffee': '☕', 'royal': '👑',
      'zenith': '✨', 'tailwind': '🎨', 'addicted': '💜', 'gamer': '🎮',
      'neon': '💚', 'psychedelic': '🌈', 'hypnotic': '🌀', 'void': '🕳️',
      'godmode': '⚡', 'multidim': '🔮', 'disco': '🪩',
      'vscodePlus': '🚀', 'vscodeLight': '☀️💻', 'vscodeBlue': '🔵💻'
    };
    return icons[themeId] || '🎨';
  };

  // Name lookup - MATCH ThemeContext IDs
  const getThemeName = (themeId) => {
    const names = {
      'blue': 'Default Blue', 'light': 'Light Mode', 'dark': 'Dark Mode',
      'zenithDark': 'Zenith Dark', 'vscode': 'VS Code', 'golden': 'Golden',
      'lavender': 'Lavender', 'green': 'Green', 'forest': 'Forest',
      'ocean': 'Ocean', 'peach': 'Peach', 'sunset': 'Sunset',
      'github': 'GitHub', 'galaxy': 'Galaxy', 'casinoRoyale': 'Casino Royale',
      'lasVegas': 'Las Vegas', 'pokerNight': 'Poker Night', 'slotMachine': 'Slot Machine',
      'blackjack': 'Blackjack', 'roulette': 'Roulette', 'vegasStrip': 'Vegas Strip',
      'sage': 'Sage', 'cotton': 'Cotton', 'coffee': 'Coffee', 'royal': 'Royal',
      'zenith': 'Zenith', 'tailwind': 'Tailwind', 'addicted': 'Addicted', 'gamer': 'Gamer',
      'neon': 'Neon', 'psychedelic': 'Psychedelic', 'hypnotic': 'Hypnotic', 'void': 'Void',
      'godmode': 'God Mode', 'multidim': 'MultiDim', 'disco': 'Disco',
      'vscodePlus': 'VS Code+', 'vscodeLight': 'VS Code Light', 'vscodeBlue': 'VS Code Blue'
    };
    return names[themeId] || themeId;
  };

  const handleThemeChange = (themeId) => {
    console.log('Changing theme to:', themeId);
    changeTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector">
      <button
        ref={buttonRef}
        className={`theme-selector-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open theme selector"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="theme-btn-icon">{getThemeIcon(themeName)}</span>
        <span className="theme-btn-name">{getThemeName(themeName)}</span>
        <FiChevronDown className={`theme-btn-arrow ${isOpen ? 'rotated' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="theme-overlay" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div 
            ref={dropdownRef}
            className="theme-dropdown"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-label="Theme selection menu"
          >
            <div className="theme-dropdown-header">
              <h3>Choose Theme</h3>
              <button 
                className="theme-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            
            <div className="theme-dropdown-content">
              {Object.entries(themeGroups).map(([groupName, groupThemes]) => (
                <div key={groupName} className="theme-group">
                  <div className="theme-group-title">{groupName}</div>
                  <div className="theme-group-grid">
                    {groupThemes.map(themeId => (
                      <button
                        key={themeId}
                        className={`theme-option ${themeName === themeId ? 'active' : ''}`}
                        onClick={() => handleThemeChange(themeId)}
                        aria-label={`Apply ${getThemeName(themeId)} theme`}
                      >
                        <span className="theme-icon">{getThemeIcon(themeId)}</span>
                        <span className="theme-name">{getThemeName(themeId)}</span>
                        {themeName === themeId && (
                          <span className="theme-check">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="theme-dropdown-footer">
              <button 
                className="theme-reset-btn"
                onClick={() => handleThemeChange('dark')}
              >
                Reset to Dark
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ThemeSelector;