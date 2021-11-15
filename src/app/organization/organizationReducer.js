import { createSlice } from "@reduxjs/toolkit";
import {
  getOrganization,
  createOrganization,
} from "./organizationAsyncActions";

const initialState = {
  organization: [],
  status: "idle",
  error: null,
};
export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //getOrganization
      .addCase(getOrganization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrganization.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.organization = state.organization.concat(payload);
      })
      .addCase(getOrganization.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //createOrganization
      .addCase(createOrganization.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrganization.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.organization = state.organization.concat(payload);
      })
      .addCase(createOrganization.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      });
  },
});

export default organizationSlice.reducer;
