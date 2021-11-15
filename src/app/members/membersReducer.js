import { createSlice } from "@reduxjs/toolkit";
import {
  getMembers,
  createMember,
  editMember,
  deleteMember,
} from "./membersAsyncActions";

const initialState = {
  members: [],
  status: "idle",
  error: null,
};

export const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //getMember
      .addCase(getMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMembers.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.members = state.members.concat(payload);
      })
      .addCase(getMembers.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //createMember
      .addCase(createMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMember.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.members = state.members.concat(payload);
      })
      .addCase(createMember.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //editMember
      .addCase(editMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editMember.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.members = state.members.map((member) => {
          member.id === payload.id ? payload.data : member;
        });
      })
      .addCase(editMember.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //deleteMember
      .addCase(deleteMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMember.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.members = state.members.filter((member) => member.id !== payload);
      })
      .addCase(deleteMember.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      });
  },
});

export default membersSlice.reducer;
