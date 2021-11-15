import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsAPI } from "../../api/methods";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await newsAPI.getAll();
  return response.data.data;
});

export const createNew = createAsyncThunk("news/createNew", async (newData) => {
  await newsAPI.create(newData);
  return newData;
});

export const editNew = createAsyncThunk("news/editNew", async (id, newData) => {
  await newsAPI.update(id, newData);
  return { id, newData };
});

export const deleteNew = createAsyncThunk("news/deleteNew", async (id) => {
  await newsAPI.delete(id);
  return id;
});
