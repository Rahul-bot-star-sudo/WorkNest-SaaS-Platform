import "./styles/Navbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [currentTheme, setCurrentTheme] = useState("");

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    if (theme === "") {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== "") {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <div className="navbar">
      <h2 className="navbar-title">My App</h2>

      <Link to="/create-company">Create Company</Link>

      <select 
        onChange={(e) => changeTheme(e.target.value)} 
        className="theme-selector" 
        value={currentTheme}
      >
        <optgroup label="🎯 VS CODE THEMES (Most Popular)">
          <option value="vscode">💻 VS Code Dark (Original)</option>
          <option value="vscode-plus">⚡ VS Code Dark+ (Enhanced)</option>
          <option value="vscode-light">☀️ VS Code Light (Classic)</option>
          <option value="vscode-blue">🔵 VS Code Blue (Alt)</option>
           <option value="casino-royale"> casino-royale</option>
 
        </optgroup>
        
        <optgroup label="Original Themes">
          <option value="">Default (Blue)</option>
          <option value="dark">🌑 Dark</option>
          <option value="green">🟢 Green</option>
          <option value="golden">🟡 Golden</option>
          <option value="sage">🌿 Sage</option>
        </optgroup>
        
        <optgroup label="🔥 MOST POPULAR THEMES">
          <option value="vscode">💻 VS Code Dark (70% Developers)</option>
          <option value="github">🐙 GitHub Dark (Modern Trend)</option>
          <option value="tailwind">🎨 Tailwind Pro (Clean UI)</option>
          <option value="zenith">⭐ Zenith Pro (Premium)</option>
        </optgroup>

        <optgroup label="Ocean Themes">
          <option value="ocean">🌊 Ocean Breeze</option>
          <option value="peach">🍑 Peach Blossom</option>
          <option value="forest">🌲 Forest Moss</option>
        </optgroup>
        
        <optgroup label="Premium Themes">
          <option value="lavender">💜 Lavender Dream</option>
          <option value="galaxy">🌙 Midnight Galaxy</option>
          <option value="royal">👑 Royal Purple</option>
          <option value="coffee">☕ Coffee Break</option>
        </optgroup>
        
        <optgroup label="Fun Themes">
          <option value="cotton">🎀 Cotton Candy</option>
          <option value="sunset">🌅 Sunset Orange</option>
        </optgroup>

        <optgroup label="⚡ ADDICTIVE THEMES (Use with caution!)">
          <option value="addicted">💀 Addicted (Neon Cyberpunk)</option>
          <option value="casino">🎰 Casino Royale (Glitter Gold)</option>
          <option value="gamer">🎮 Gamer Pro (RGB Gaming)</option>
          <option value="neon">🚀 Neon Dreams (Electric)</option>
        </optgroup>
        
        <optgroup label="🔥 PAGAL KAR DENE WALE THEMES">
          <option value="psychedelic">🌈 Psychedelic Trip (Pagal Level 1)</option>
          <option value="hypnotic">👁️ Hypnotic Eye (Pagal Level 2)</option>
          <option value="void">💀 Void Energy (Pagal Level 3)</option>
          <option value="godmode">🔥 God Mode (Pagal Level 4)</option>
          <option value="multidim">🎭 Multi Dimension (Pagal Level 5)</option>
          <option value="disco">🎪 Disco Party (Pagal Level 6)</option>
        </optgroup>
        
        <optgroup label="🏆 PROFESSIONAL THEMES (For Real Developers)">
          <option value="zenith">🎯 Zenith Pro (Light) - Recommended</option>
          <option value="zenith-dark">🌙 Zenith Pro (Dark) - Night Coding</option>
        </optgroup>
      </select>
    </div>
  );
}

export default Navbar;