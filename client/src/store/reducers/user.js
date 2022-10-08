import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { login_user, register_user } from "../../api/AuthApi";

const cookies_user = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;
const initialState = {
  user: cookies_user,
  loading: false,
  error: "",
};

export const loginUserAsync = createAsyncThunk(
  "user/loginAsync",
  async (userInfo) => {
    try {
      const { data } = await login_user(userInfo);
      Cookies.set("user", JSON.stringify(data), { expires: 1 });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const registerUserAsync = createAsyncThunk(
  "user/registerAsync",
  async (userInfo) => {
    try {
      const { data } = await register_user(userInfo);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.user = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.error = "";
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
