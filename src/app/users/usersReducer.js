import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  createUser,
  editUser,
  deleteUser,
} from "./usersAsyncActions";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //getUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.users = state.users.concat(payload);
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })

      //createUser
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.users = state.users.concat(payload);
      })
      .addCase(createUser.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })

      //editUser
      .addCase(editUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.users = state.users.map((user) => {
          user.id === payload.id ? payload.data : user;
        });
      })
      .addCase(editUser.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })

      //deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.users = state.users.filter((user) => user.id !== payload);
      })
      .addCase(deleteUser.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      });
  },
});

export default usersSlice.reducer;
