import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// All your themes
export const themes = {
  zenith: {
    name: 'Zenith',
    icon: '✨',
    dataTheme: 'zenith'
  },
  dark: {
    name: 'Dark',
    icon: '🌙',
    dataTheme: 'dark'
  },
  green: {
    name: 'Green',
    icon: '🟢',
    dataTheme: 'green'
  },
  golden: {
    name: 'Golden',
    icon: '🟡',
    dataTheme: 'golden'
  },
  sage: {
    name: 'Sage',
    icon: '🌿',
    dataTheme: 'sage'
  },
  ocean: {
    name: 'Ocean',
    icon: '🌊',
    dataTheme: 'ocean'
  },
  galaxy: {
    name: 'Galaxy',
    icon: '🌌',
    dataTheme: 'galaxy'
  },
  forest: {
    name: 'Forest',
    icon: '🌲',
    dataTheme: 'forest'
  },
  lavender: {
    name: 'Lavender',
    icon: '🪻',
    dataTheme: 'lavender'
  },
  peach: {
    name: 'Peach',
    icon: '🍑',
    dataTheme: 'peach'
  },
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    dataTheme: 'sunset'
  },
  cotton: {
    name: 'Cotton',
    icon: '🌸',
    dataTheme: 'cotton'
  },
  coffee: {
    name: 'Coffee',
    icon: '☕',
    dataTheme: 'coffee'
  },
  royal: {
    name: 'Royal',
    icon: '👑',
    dataTheme: 'royal'
  },
  github: {
    name: 'GitHub',
    icon: '🐙',
    dataTheme: 'github'
  },
  tailwind: {
    name: 'Tailwind',
    icon: '🎨',
    dataTheme: 'tailwind'
  },
  vscode: {
    name: 'VS Code',
    icon: '💻',
    dataTheme: 'vscode'
  },
  vscodePlus: {
    name: 'VS Code+',
    icon: '🚀',
    dataTheme: 'vscode-plus'
  },
  vscodeLight: {
    name: 'VS Code Light',
    icon: '☀️',
    dataTheme: 'vscode-light'
  },
  vscodeBlue: {
    name: 'VS Code Blue',
    icon: '🔵',
    dataTheme: 'vscode-blue'
  },
  addicted: {
    name: 'Addicted',
    icon: '💜',
    dataTheme: 'addicted'
  },
  casino: {
    name: 'Casino',
    icon: '🎰',
    dataTheme: 'casino'
  },
  gamer: {
    name: 'Gamer',
    icon: '🎮',
    dataTheme: 'gamer'
  },
  neon: {
    name: 'Neon',
    icon: '💚',
    dataTheme: 'neon'
  },
  psychedelic: {
    name: 'Psychedelic',
    icon: '🌈',
    dataTheme: 'psychedelic'
  },
  hypnotic: {
    name: 'Hypnotic',
    icon: '🌀',
    dataTheme: 'hypnotic'
  },
  void: {
    name: 'Void',
    icon: '🕳️',
    dataTheme: 'void'
  },
  godmode: {
    name: 'God Mode',
    icon: '⚡',
    dataTheme: 'godmode'
  },
  multidim: {
    name: 'MultiDim',
    icon: '🔮',
    dataTheme: 'multidim'
  },
  disco: {
    name: 'Disco',
    icon: '🪩',
    dataTheme: 'disco'
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const ThemeContextProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('notes-theme');
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (name) => {
    const theme = themes[name];
    if (theme && theme.dataTheme) {
      document.documentElement.setAttribute('data-theme', theme.dataTheme);
    }
  };

  const changeTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
      localStorage.setItem('notes-theme', name);
      applyTheme(name);
    }
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;