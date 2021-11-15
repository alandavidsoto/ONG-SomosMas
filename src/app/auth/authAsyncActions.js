import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "../../api/methods";

export const register = createAsyncThunk("register", async (data) => {
  const response = await registerAPI.post(data);
  return response.data.data;
});

export const login = createAsyncThunk("login", async (data) => {
  const response = await loginAPI.post(data);
  return response.data.data;
});
