import { AuthContext } from "./AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
export const AuthProvider = ({ children }) => {
  const { logedUser, isValidUser, createUser, renovateToken } = useAuth();
  useEffect(() => {
    renovateToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        logedUser,
        isValidUser,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
