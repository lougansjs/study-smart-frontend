import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import userReducer from "./slices/user-slice";
import sidebarReducer from "./slices/sidebar-slice";
import profileMenuReducer from "./slices/profile-menu-slice";

export const store = configureStore({
  reducer: {
    'auth': authReducer,
    'user': userReducer,
    'sidebar': sidebarReducer,
    'profile-menu': profileMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
