import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from "@hooks/redux-hooks";

export function Protected() {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo)

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
