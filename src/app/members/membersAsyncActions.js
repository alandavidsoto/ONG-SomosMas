import { createAsyncThunk } from "@reduxjs/toolkit";
import { membersAPI } from "../../api/methods";

export const getMembers = createAsyncThunk("members/getMembers", async () => {
  const response = await membersAPI.getAll();
  return response.data.data;
});

export const createMember = createAsyncThunk(
  "members/createMember",
  async (data) => {
    await membersAPI.create(data);
    return data;
  }
);

export const editMember = createAsyncThunk(
  "members/editMember",
  async (id, data) => {
    await membersAPI.update(id, data);
    return { id, data };
  }
);

export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id) => {
    await membersAPI.delete(id);
    return id;
  }
);
