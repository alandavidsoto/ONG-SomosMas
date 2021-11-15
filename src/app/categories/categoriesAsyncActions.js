import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesAPI } from "../../api/methods";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await categoriesAPI.getAll();
    return response.data.data;
  }
);
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (data) => {
    await categoriesAPI.create(data);
    return data;
  }
);
export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (data) => {
    await categoriesAPI.update(data.category.id, data.formData);
    return { data };
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    await categoriesAPI.delete(id);
    return id;
  }
);
