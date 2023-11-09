import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log("1");
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
