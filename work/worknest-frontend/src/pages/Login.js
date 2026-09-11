import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import "./styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // ✅ basic validation
    if (!email.trim() || !password.trim()) {
      setIsError(true);
      setMessage("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await loginApi({
        email: email.trim(),
        password: password.trim(),
      });

      const { token, role, email: userEmail } = res.data;

      // ✅ store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", userEmail);

      setIsError(false);
      setMessage("Login successful ✅");

      // ✅ slight delay for UX
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setIsError(true);

      if (err.response) {
        setMessage(err.response.data.message || "Invalid credentials");
      } else {
        setMessage("Server not reachable");
      }

    } finally {
      setLoading(false);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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
