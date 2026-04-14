import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContextProvider from './context/ThemeContext';
import './styles/global.css';

import "./styles/themes/las-vegas.css";
import "./styles/themes/casino-royale.css";
import "./styles/themes/pokerNight.css";
import "./styles/themes/blue.css";
import "./styles/themes/dark.css";
import "./styles/themes/light.css";
import "./styles/themes/green.css";
import "./styles/themes/ocean.css";
import "./styles/themes/theme.css";
import "./styles/themes/forest.css";
import "./styles/themes/peach.css";
import "./styles/themes/github.css";
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