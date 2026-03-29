import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const token = await response.text();

      console.log("JWT:", token);

      // store token
      localStorage.setItem("token", token);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;