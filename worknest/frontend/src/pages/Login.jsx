import { useState } from "react";
import { loginApi } from "../services/authApi";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginApi({ email, password });

    saveAuth(res.data.accessToken, res.data.user);

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default Login;
