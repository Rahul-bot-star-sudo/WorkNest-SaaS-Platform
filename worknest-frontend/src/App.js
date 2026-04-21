import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthWrapper from "./components/AuthWrapper";
import CreateCompany from "./pages/CreateCompany";

import "./App.css";

function App() {

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<AuthWrapper />} />
            <Route path="/create-company" element={<CreateCompany />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;