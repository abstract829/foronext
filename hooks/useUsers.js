import { getFullUserById } from "../services/users";

export const useUsers = () => {
  const getUserById = async (id) => {
    const resp = await getFullUserById(id);
    if (resp.ok) {
      return resp.user;
    } else {
      return null;
    }
  };
  return {
    getUserById,
  };
};
