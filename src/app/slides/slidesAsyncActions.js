import { createAsyncThunk } from "@reduxjs/toolkit";
import { slidesAPI } from "../../api/methods";

export const getSlides = createAsyncThunk("slides/getSlides", async () => {
  const response = await slidesAPI.getAll();
  return response.data.data;
});

export const createSlide = createAsyncThunk(
  "slides/createSlide",
  async (data) => {
    await slidesAPI.create(data);
    return data;
  }
);

export const editSlide = createAsyncThunk("slides/editSlide", async (data) => {
  await slidesAPI.update(data.slide.id, data.formData);
  return { data };
});

export const deleteSlide = createAsyncThunk(
  "slides/deleteSlide",
  async (id) => {
    await slidesAPI.delete(id);
    return id;
  }
);
