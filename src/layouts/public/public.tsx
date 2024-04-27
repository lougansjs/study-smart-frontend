import { Outlet } from "react-router-dom";
import { useAppSelector } from "@hooks";
import { Navigate } from "react-router-dom";

export function Public() {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (basicUserInfo) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
