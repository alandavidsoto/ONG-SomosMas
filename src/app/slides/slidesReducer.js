import { createSlice } from "@reduxjs/toolkit";
import {
  getSlides,
  createSlide,
  editSlide,
  deleteSlide,
} from "./slidesAsyncActions";
const initialState = {
  slides: [],
  status: "idle",
  error: null,
};
export const slidesSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //getSlides
      .addCase(getSlides.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSlides.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.slides = state.slides.concat(payload);
      })
      .addCase(getSlides.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //createSlide
      .addCase(createSlide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSlide.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.slides = state.slides.concat(payload);
      })
      .addCase(createSlide.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //editSlide
      .addCase(editSlide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSlide.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.slides = state.slides.map((slide) => {
          return slide.id === payload.data.formData.id
            ? payload.data.formData
            : slide;
        });
      })
      .addCase(editSlide.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //deleteSlide
      .addCase(deleteSlide.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSlide.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.slides = state.slides.filter((slide) => slide.id !== payload);
      })
      .addCase(deleteSlide.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      });
  },
});

export default slidesSlice.reducer;
