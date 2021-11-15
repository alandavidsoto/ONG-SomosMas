import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActivities,
  createActivity,
  editActivity,
  deleteActivity,
} from "./activititiesAsyncActions.js";

const initialState = {
  activities: [],
  status: "idle", // status: "idle" | "loading" | "success" | "error"
  error: null, // error: null | string
};

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchActivities
      .addCase(fetchActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = "success";
        state.activities = [...state.activities, action.payload];
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // createActivity
      .addCase(createActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.status = "success";
        state.activities = [...state.activities, action.payload];
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // editActivity
      .addCase(editActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editActivity.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.activities = state.activities.map((activity) => {
          activity.id === payload.id ? payload.data : activity;
        });
      })
      .addCase(editActivity.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      // deleteActivity
      .addCase(deleteActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.status = "success";
        state.activities = state.activities.filter(
          (activity) => activity.id !== action.payload
        );
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default activitiesSlice.reducer;
