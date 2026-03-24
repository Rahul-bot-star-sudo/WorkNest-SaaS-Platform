import React, { useState } from "react";
import { registerSuperAdmin } from "../services/api";

function RegisterSuperAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerSuperAdmin({
        email,
        password,
      });

      console.log("Success Response:", response);

      // ✅ print backend success response
      setMessage(JSON.stringify(response.data));
    } catch (error) {
      console.log("Error Response:", error);

      // ✅ print backend error response
      if (error.response) {
        setMessage(JSON.stringify(error.response.data));
      } else {
        setMessage("No response from server");
      }
    }
  };

  return (
    <div>
      <h2>Register Super Admin</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      {/* ✅ Print full response */}
      <pre>{message}</pre>
    </div>
  );
}

export default RegisterSuperAdmin;