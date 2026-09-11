import { useState } from "react";
import "./styles/CreateCompany.css";

export default function CreateCompany() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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
        setIsError(false);
        setMessage(data.message);
        setName(""); // reset input
      } else {
        setIsError(true);
        setMessage(data.message);
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server error");
    }
  };

  return (
    <div className="create-company-container">
      <div className="create-company-card">
        <h2 className="create-company-title">Create Company</h2>

        <form onSubmit={handleSubmit} className="create-company-form">
          <input
            type="text"
            placeholder="Company Name"
            className="create-company-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" className="create-company-button">
            Create
          </button>
        </form>

        {message && (
          <p
            className={`create-company-message ${
              isError ? "error" : "success"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}