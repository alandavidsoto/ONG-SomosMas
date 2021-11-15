export const selectAllUSers = (state) => state.users.users;

export const selectUsersById = (state, id) =>
  state.users.users.find((user) => user.id === id);
