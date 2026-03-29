import { useState } from "react";

function CreateSuperAdmin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/create-super-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.text();
      console.log(data);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Create Super Admin</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="email"
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

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}

export default CreateSuperAdmin;