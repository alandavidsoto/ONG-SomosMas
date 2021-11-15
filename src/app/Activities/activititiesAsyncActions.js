import { createAsyncThunk } from "@reduxjs/toolkit";
import { activitiesAPI } from "../../api/methods.js";
export const fetchActivities = createAsyncThunk(
  "activities/fetchActivities",
  async () => {
    const response = await activitiesAPI.getAll();
    return response.data.data;
  }
);
export const createActivity = createAsyncThunk(
  "activities/createActivity",
  async (activityData) => {
    await activitiesAPI.create(activityData);
    return activityData;
  }
);
export const editActivity = createAsyncThunk(
  "activities/editActivity",
  async (id, activityData) => {
    await activitiesAPI.update(id, activityData);
    return { id, activityData };
  }
);
export const deleteActivity = createAsyncThunk(
  "activities/deleteActivity",
  async (id) => {
    await activitiesAPI.delete(id);
    return id;
  }
);
