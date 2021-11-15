import { createSlice } from "@reduxjs/toolkit";
import { fetchNews, createNew, editNew, deleteNew } from "./newsAsyncActions";

const initialState = {
  news: [],
  status: "idle", // status: "idle" | "loading" | "success" | "error"
  error: null, // error: null | string
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchNews
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "success";
        state.news = [...state.news, action.payload];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // createNew
      .addCase(createNew.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNew.fulfilled, (state, action) => {
        state.status = "success";
        state.news = [...state.news, action.payload];
      })
      .addCase(createNew.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // editNew
      .addCase(editNew.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editNew.fulfilled, (state, action) => {
        state.status = "success";
        state.news = state.news.map((post) =>
          post.id === action.payload.id ? action.payload.newData : post
        );
      })
      .addCase(editNew.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // deleteNew
      .addCase(deleteNew.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNew.fulfilled, (state, action) => {
        state.status = "success";
        state.news = state.news.filter((post) => post.id !== action.payload);
      })
      .addCase(deleteNew.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
