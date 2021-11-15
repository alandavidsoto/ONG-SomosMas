export const selectAllNews = (state) => state.news.news;
export const selectNewById = (state, id) =>
  state.news.news.find((n) => n.id === id);
