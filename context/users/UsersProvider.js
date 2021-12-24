import { useUsers } from "../../hooks/useUsers";
import { UsersContext } from "./UsersContext";

export const UsersProvider = ({ children }) => {
  const { getUserById } = useUsers();
  return (
    <UsersContext.Provider
      value={{
        getUserById,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
