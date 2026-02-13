import { useEffect, useState } from "react";
import { getDropdownRoles } from "../services/roleApi";
import { createUser } from "../services/user.api";


function CreateUserPage() {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_code: "",
  });

useEffect(() => {
  async function fetchRoles() {
    try {
      const result = await getDropdownRoles();
      console.log("FULL RESULT:", result);
      setRoles(result.data.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      setRoles([]);
    }
  }

  fetchRoles();
}, []);


 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.role_code) {
    alert("Please select a role");
    return;
  }

  try {
    const result = await createUser(formData);
if (result.data?.success) {
  alert("User created successfully");
}
    setFormData({
      name: "",
      email: "",
      password: "",
      role_code: "",
    });

  } catch (error) {

    const message =
      error.response?.data?.message || "Something went wrong";

    alert(message);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create New User</h2>
        <p className="auth-subtitle">
          Assign a role and create a new team member
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Select Role</label>
            <select
              value={formData.role_code}
              onChange={(e) =>
                setFormData({ ...formData, role_code: e.target.value })
              }
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.role_code}>
                  {role.role_code}
                </option>
              ))}
            </select>
          </div>
          


          <button className="btn-primary" type="submit">
            Create User
          </button>
        </form>
        
        
      </div>
    </div>
  );
}

export default CreateUserPage;
