import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/api";

type User = {
  email: string,
  password: string
}

type NewUser = User & {
  name: string,
  password_confirmation: string
}

type UserBasicInfo = {
  id: string,
  name: string,
  email: string
}

export type UserProfileData = {
  name: string,
  email: string
}

type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null
  userProfileData?: UserProfileData | null
  status: "idle" | "loading" | "failed"
  error: string | null
}
// (({name, email}) => ({name, email}))(JSON.parse(localStorage.getItem("userInfo") as string))
const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  userProfileData: undefined,
  status: "idle",
  error: null
}

export const login = createAsyncThunk("login", async (data: User) => {
  const response = await axiosInstance.post("/login", data)
  const resData = response.data

  localStorage.setItem("userInfo", JSON.stringify(resData))

  return resData
})

export const register = createAsyncThunk("register", async (data: NewUser) => {
  const response = await axiosInstance.post(
    "/users",
    data
  );
  const resData = response.data;

  localStorage.setItem("userInfo", JSON.stringify(resData));

  return resData;
});

export const logout = createAsyncThunk("logout", async () => {
  const response = await axiosInstance.delete("/logout", {});
  const resData = response.data;

  localStorage.removeItem("userInfo");

  return resData;
});

export const getUser = createAsyncThunk(
  "users/profile",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/users/${userId}`
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/update_profile",
  async ({userId, data}: { userId: string, data: UserProfileData }) => {
    const response = await axiosInstance.put(
      `/users/${userId}`, data
    )
    return response.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
          state.status = "idle";
          state.basicUserInfo = action.payload;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login falhou";
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
          state.status = "idle";
          state.basicUserInfo = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registro falhou";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.basicUserInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout falhou";
      })

      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProfileData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Busca pelos dados de perfil do usuário falhou";
      });
  },
});

export default authSlice.reducer