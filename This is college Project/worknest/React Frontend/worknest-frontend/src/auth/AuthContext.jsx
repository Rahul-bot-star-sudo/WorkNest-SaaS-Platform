import { createContext, useState } from "react";
import { getToken, getUser } from "../utils/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const login = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
