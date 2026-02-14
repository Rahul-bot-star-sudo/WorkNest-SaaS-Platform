import { useEffect, useState } from "react";
import { getUsersApi } from "../services/user.api";

function UsersTable({ refreshTrigger }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersApi();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [refreshTrigger]); // 👈 refresh when user created

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Existing Users</h3>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersTable;
