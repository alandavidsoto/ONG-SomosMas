import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/methods.js";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await usersAPI.getAll();
  return response.data.data;
});
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    await usersAPI.create(userData);
    return userData;
  }
);
export const editUser = createAsyncThunk(
  "users/editUser",
  async (id, userData) => {
    await usersAPI.update(id, userData);
    return { id, userData };
  }
);
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await usersAPI.delete(id);
  return id;
});
