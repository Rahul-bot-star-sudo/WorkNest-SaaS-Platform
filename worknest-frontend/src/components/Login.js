import { useState } from "react";
import { loginApi } from "../api/authApi";
import "./styles/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await loginApi({ email, password });

      const { token, role } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setIsError(false);
      setMessage("Login successful ✅");

      onLogin(role);
    } catch (err) {
      setIsError(true);

      if (err.response) {
        setMessage(err.response.data.message || "Invalid credentials");
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        {message && (
          <p className={`login-message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;