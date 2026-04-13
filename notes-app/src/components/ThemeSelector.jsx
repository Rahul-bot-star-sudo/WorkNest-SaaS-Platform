import { useState } from 'react';
import { useTheme, themes } from '../context/ThemeContext';
import { FiChevronDown } from 'react-icons/fi';
import '../styles/themeselector.css';

function ThemeSelector() {
  const { themeName, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Group themes for better organization
  const themeGroups = {
    'Default': ['zenith', 'dark', 'light'],
    'Nature': ['green', 'forest', 'sage', 'ocean'],
    'Warm': ['golden', 'peach', 'sunset', 'coffee'],
    'Cool': ['galaxy', 'lavender', 'cotton', 'royal'],
    'VS Code': ['vscode', 'vscodePlus', 'vscodeLight', 'vscodeBlue'],
    'Special': ['github', 'tailwind', 'addicted', 'casino', 'gamer', 'neon', 'psychedelic', 'hypnotic', 'void', 'godmode', 'multidim', 'disco']
  };

  const themeList = Object.entries(themes).map(([key, value]) => ({
    id: key,
    name: value.name,
    icon: value.icon
  }));

  return (
    <div className="theme-selector">
      <button className="theme-selector-btn" onClick={() => setIsOpen(!isOpen)}>
        <span>{themes[themeName]?.icon}</span>
        <span>{themes[themeName]?.name}</span>
        <FiChevronDown />
      </button>

      {isOpen && (
        <>
          <div 
            className="theme-overlay" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="theme-dropdown">
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
                      >
                        <span className="theme-icon">{theme.icon}</span>
                        <span className="theme-name">{theme.name}</span>
                        {themeName === themeId && <span className="theme-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ThemeSelector;