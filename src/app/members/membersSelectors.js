export const selectAllMembers = (state) => state.members.members;

export const selectMembersById = (state, id) =>
  state.members.members.find((member) => member.id === id);
