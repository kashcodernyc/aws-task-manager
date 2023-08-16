import { Navigate, Outlet } from "react-router-dom";
import AccountContext from "../Context/AccountContext";
import { useContext } from "react";
import UserPool from "../State/UserPool";

const PrivateRoutes = () => {
  const user = UserPool.getCurrentUser();
  // console.log(user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
