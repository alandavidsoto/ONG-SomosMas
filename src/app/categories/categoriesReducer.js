import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
} from "./categoriesAsyncActions";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //getCategories
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.categories = state.categories.concat(payload);
      })
      .addCase(getCategories.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //createMember
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.categories = state.categories.concat(payload);
      })
      .addCase(createCategory.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //editCategory
      .addCase(editCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCategory.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.categories = state.categories.map((category) => {
          return category.id === payload.data.formData.id
            ? payload.data.formData
            : category;
        });
      })
      .addCase(editCategory.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      })
      //deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.categories = state.categories.filter(
          (category) => category.id !== payload
        );
      })
      .addCase(deleteCategory.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error.message;
      });
  },
});

export default categoriesSlice.reducer;
