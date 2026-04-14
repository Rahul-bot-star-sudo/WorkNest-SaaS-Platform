import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthWrapper from "./components/AuthWrapper";
import "./App.css";

function App() {

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <AuthWrapper />
      </main>
    </div>
  );
}

export default App;