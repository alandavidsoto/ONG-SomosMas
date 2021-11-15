export default {
  post: jest.fn().mockResolvedValue({ data: {} }),
  patch: (id, data) => jest.fn().mockResolvedValue({ data: {} }),
};
