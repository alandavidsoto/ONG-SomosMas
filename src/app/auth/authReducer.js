import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authAsyncActions";

const initialState = {
  isAuthenticated: localStorage.getItem("authenticated") || false,
  status: "idle",
  error: null,
  data: JSON.parse(localStorage.getItem("dataUser")) || {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* refreshUserExample: (state) => {
      let user = JSON.parse(localStorage.getItem("dataUser"));
      if (Boolean(user) || user != null) {
        state.isAuthenticated = true;
        state.data = user;
      } else {
        state.isAuthenticated = false;
        state.data = {};
      }
    },*/
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.data = {};
      localStorage.clear();
    },
    loginExample: (state, action) => {
      state.isAuthenticated = true;
      state.data = action.payload;
      localStorage.setItem("dataUser", JSON.stringify(action.payload));
      localStorage.setItem("authenticated", JSON.stringify(true));
    },
    registerExample: (state, action) => {
      state.isAuthenticated = true;
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // register
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  logout,
  loginExample,
  registerExample,
  refreshUserExample,
  refreshLoginExample,
} = authSlice.actions;
export default authSlice.reducer;
