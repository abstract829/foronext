import { useRouter } from "next/router";
import { useState } from "react";
import {
  validateAndCreateUser,
  verifyUser,
  refreshToken,
} from "../services/users";
export const useAuth = () => {
  const [logedUser, setLogedUser] = useState({});
  const router = useRouter();
  /* Validate user and log in */
  const isValidUser = async (email, password) => {
    const resp = await verifyUser(email, password);
    if (resp.ok) {
      setLogedUser(resp.user);
      localStorage.setItem("token", resp.token);
      return true;
    }
    return false;
  };
  const createUser = async (user) => {
    const resp = await validateAndCreateUser(user);
    if (resp.ok) {
      setLogedUser(resp.user);
      localStorage.setItem("token", resp.token);
      return true;
    } else {
      return false;
    }
  };
  const renovateToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await refreshToken(token);
      if (data.ok) {
        localStorage.setItem("token", data.token);
        setLogedUser(data.user);
      } else {
        console.log("token invalido");
        router.push("/auth/login");
      }
    } else {
      console.log("no tiene el token");
      router.push("/auth/login");
    }
  };
  return {
    isValidUser,
    logedUser,
    createUser,
    renovateToken,
  };
};
