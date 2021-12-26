import Register from "../../components/Register/Register";
import { useEffect } from "react";
const register = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div>
      <Register />
    </div>
  );
};

export default register;
