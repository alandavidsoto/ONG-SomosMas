export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = (state, id) =>
  state.categories.categories.find((category) => category.id === id);
