import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("name", response.name);

      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>WorkNest Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
