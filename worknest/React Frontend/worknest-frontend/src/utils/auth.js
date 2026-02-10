// Save auth data
export const saveAuth = (token, user) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Get logged-in user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get access token
export const getToken = () => {
  return localStorage.getItem("accessToken");
};

// Logout user
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login"; // force redirect
};
