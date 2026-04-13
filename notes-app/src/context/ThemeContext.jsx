import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// All your themes
export const themes = {
  blue: { name: 'Blue', icon: '🔵', dataTheme: 'blue' },
  light: { name: 'Light', icon: '☀️', dataTheme: 'light' },
  green: { name: 'Green', icon: '🟢', dataTheme: 'green' },
  ocean: { name: 'Ocean', icon: '🌊', dataTheme: 'ocean' },
  forest: { name: 'Forest', icon: '🌲', dataTheme: 'forest' },
  galaxy: { name: 'Galaxy', icon: '🌌', dataTheme: 'galaxy' },
  sunset: { name: 'Sunset', icon: '🌅', dataTheme: 'sunset' },
  golden: { name: 'Golden', icon: '🟡', dataTheme: 'golden' },
  lavender: { name: 'Lavender', icon: '🪻', dataTheme: 'lavender' },
  peach: { name: 'Peach', icon: '🍑', dataTheme: 'peach' },
  sage: { name: 'Sage', icon: '🌿', dataTheme: 'sage' },
  cotton: { name: 'Cotton', icon: '🌸', dataTheme: 'cotton' },
  coffee: { name: 'Coffee', icon: '☕', dataTheme: 'coffee' },
  royal: { name: 'Royal', icon: '👑', dataTheme: 'royal' },
  zenith: { name: 'Zenith', icon: '✨', dataTheme: 'zenith' },
  zenithDark: { name: 'Zenith Dark', icon: '🌙✨', dataTheme: 'zenith-dark' },
  github: { name: 'GitHub', icon: '🐙', dataTheme: 'github' },
  tailwind: { name: 'Tailwind', icon: '🎨', dataTheme: 'tailwind' },
  vscode: { name: 'VS Code', icon: '💻', dataTheme: 'vscode' },
  vscodePlus: { name: 'VS Code+', icon: '🚀', dataTheme: 'vscode-plus' },
  vscodeLight: { name: 'VS Code Light', icon: '☀️💻', dataTheme: 'vscode-light' },
  vscodeBlue: { name: 'VS Code Blue', icon: '🔵💻', dataTheme: 'vscode-blue' },
  addicted: { name: 'Addicted', icon: '💜', dataTheme: 'addicted' },
  casino: { name: 'Casino', icon: '🎰', dataTheme: 'casino' },
  gamer: { name: 'Gamer', icon: '🎮', dataTheme: 'gamer' },
  neon: { name: 'Neon', icon: '💚', dataTheme: 'neon' },
  psychedelic: { name: 'Psychedelic', icon: '🌈', dataTheme: 'psychedelic' },
  hypnotic: { name: 'Hypnotic', icon: '🌀', dataTheme: 'hypnotic' },
  void: { name: 'Void', icon: '🕳️', dataTheme: 'void' },
  godmode: { name: 'God Mode', icon: '⚡', dataTheme: 'godmode' },
  multidim: { name: 'MultiDim', icon: '🔮', dataTheme: 'multidim' },
  disco: { name: 'Disco', icon: '🪩', dataTheme: 'disco' },
  // Add these to your themes object
    
casinoRoyale: { name: 'Casino Royale', icon: '🎰', dataTheme: 'casino-royale' },
lasVegas: { name: 'Las Vegas', icon: '✨', dataTheme: 'las-vegas' },
pokerNight: { name: 'Poker Night', icon: '🃏', dataTheme: 'poker-night' },
slotMachine: { name: 'Slot Machine', icon: '🎰', dataTheme: 'slot-machine' },
blackjack: { name: 'Blackjack', icon: '🃏', dataTheme: 'blackjack' },
roulette: { name: 'Roulette', icon: '🎡', dataTheme: 'roulette' },
vegasStrip: { name: 'Vegas Strip', icon: '🌃', dataTheme: 'vegas-strip' },
  dark: { name: 'Dark', icon: '🌙', dataTheme: 'dark' },
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