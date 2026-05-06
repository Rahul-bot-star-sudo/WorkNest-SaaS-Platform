import { useEffect, useState } from "react";

function RoleDropdown() {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/roles")
            .then((response) => response.json())
            .then((data) => {
                setRoles(data);
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    }, []);

    return (
        <select>
            <option>Select Role</option>

            {roles.map((role, index) => (
                <option key={index}>
                    {role.name}
                </option>
            ))}
        </select>
    );
}

export default RoleDropdown;