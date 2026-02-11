export const getUsers = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch("http://localhost:4000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  return data.data;
};
