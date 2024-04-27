import { Route } from "react-router-dom"
import { Profile } from "@/pages"

export const profileRoutes = () => (
  <>
    <Route
      path="/profile"
      element={<Profile />}
    />
  </>
)