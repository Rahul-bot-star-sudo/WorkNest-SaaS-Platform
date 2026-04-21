import { useState } from "react";

export default function CreateCompany() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/v1/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message); // success
      } else {
        setMessage(data.message); // error
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>Create Company</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>

      <p>{message}</p>
    </div>
  );
}