import { useEffect } from "react";
import Login from "../../components/Login/Login";

const login = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default login;
