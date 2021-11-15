export const selectAllActivities = (state) => state.activities.activities;
export const selectActivityById = (state, id) =>
  state.activities.activities.find((n) => n.id === id);
