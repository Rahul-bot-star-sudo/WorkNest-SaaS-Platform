import { useState, useEffect, useRef } from 'react';
import { useTheme, themes } from '../context/ThemeContext';
import { FiChevronDown, FiGrid, FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import '../styles/themeselector.css';

function ThemeSelector() {
  const { themeName, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Group themes
  const themeGroups = {
    'Default': ['blue', 'dark', 'light', 'green', 'ocean'],
    'Nature': ['forest', 'sage', 'lavender', 'peach'],
    'Warm': ['sunset', 'golden', 'coffee'],
    'Cool': ['galaxy', 'cotton', 'royal'],
    'Zenith': ['zenith', 'zenithDark'],
    'VS Code': ['vscode', 'vscodePlus', 'vscodeLight', 'vscodeBlue'],
    'Special': ['github', 'tailwind', 'addicted', 'casino', 'gamer', 'neon', 'psychedelic'],
    'Advanced': ['hypnotic', 'void', 'godmode', 'multidim', 'disco'],
    'Gambling': ['casinoRoyale', 'lasVegas', 'pokerNight', 'slotMachine', 'blackjack', 'roulette', 'vegasStrip']
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const getThemeIcon = (themeId) => {
    const theme = themes[themeId];
    return theme?.icon || '🎨';
  };

  const getThemeName = (themeId) => {
    const theme = themes[themeId];
    return theme?.name || themeId;
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
                    {groupThemes.map(themeId => {
                      const theme = themes[themeId];
                      if (!theme) return null;
                      return (
                        <button
                          key={themeId}
                          className={`theme-option ${themeName === themeId ? 'active' : ''}`}
                          onClick={() => {
                            changeTheme(themeId);
                            setIsOpen(false);
                          }}
                          aria-label={`Apply ${theme.name} theme`}
                        >
                          <span className="theme-icon">{theme.icon}</span>
                          <span className="theme-name">{theme.name}</span>
                          {themeName === themeId && (
                            <span className="theme-check">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="theme-dropdown-footer">
              <button 
                className="theme-reset-btn"
                onClick={() => {
                  changeTheme('default');
                  setIsOpen(false);
                }}
              >
                Reset to Default
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ThemeSelector;