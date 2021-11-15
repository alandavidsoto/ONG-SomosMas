import { createAsyncThunk } from "@reduxjs/toolkit";
import { organizationAPI } from "../../api/methods";

export const getOrganization = createAsyncThunk(
  "organization/getOrganization",
  async () => {
    const response = await organizationAPI.getAll();
    return response.data.data;
  }
);
export const createOrganization = createAsyncThunk(
  "organization/createOrganization",
  async (data) => {
    await organizationAPI.create(data);
    return data;
  }
);
