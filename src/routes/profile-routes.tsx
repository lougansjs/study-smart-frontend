import { Route } from "react-router-dom"
import { Profile } from "@/presentations"

export const profileRoutes = () => (
  <>
    <Route
      path="/profile"
      element={<Profile />}
    />
  </>
)