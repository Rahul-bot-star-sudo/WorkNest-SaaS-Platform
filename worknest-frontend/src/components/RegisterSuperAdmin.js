import React, { useState } from "react";
import { registerSuperAdmin } from "../services/api";
import "./styles/Register.css";

function RegisterSuperAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const response = await registerSuperAdmin({ email, password });
      setMessage(JSON.stringify(response.data, null, 2));
      setIsError(false);
      
      // Clear form on success
      setEmail("");
      setPassword("");
    } catch (error) {
      setIsError(true);
      if (error.response) {
        setMessage(JSON.stringify(error.response.data, null, 2));
      } else {
        setMessage("No response from server");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register Super Admin</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {message && (
          <pre className={`register-message ${isError ? "error" : "success"}`}>
            {message}
          </pre>
        )}
      </div>
    </div>
  );
}

export default RegisterSuperAdmin;