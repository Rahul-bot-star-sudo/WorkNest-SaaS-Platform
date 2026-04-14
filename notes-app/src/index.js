import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContextProvider from './context/ThemeContext';
import './styles/global.css';
import "./styles/theme.css";

import "./styles/themes/las-vegas.css";
import "./styles/themes/casino-royale.css";
import "./styles/themes/pokerNight.css";
import "./styles/themes/blue.css";
import "./styles/themes/dark.css";
import "./styles/themes/light.css";
import "./styles/themes/green.css";
import "./styles/themes/ocean.css";
import "./styles/themes/forest.css";
import "./styles/themes/peach.css";
import "./styles/themes/github.css";
import "./styles/themes/sunset.css";
import "./styles/themes/galaxy.css";
import "./styles/themes/zenith-dark.css";
import "./styles/themes/golden.css";
import "./styles/themes/lavender.css";
import "./styles/themes/vscode.css";


// Add this line
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);