import axios from "axios";

export const getPublicMethod = async (apiURL, id) => {
  return id ? await axios.get(`${apiURL}/${id}`) : await axios.get(apiURL);
};

export const postPublicMethod = async (apiURL, data) => {
  return await axios.post(apiURL, data);
};
