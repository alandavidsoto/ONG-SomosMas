import PrivateApiService from "./privateApiService";

export const usersAPI = new PrivateApiService("users");
export const contactsAPI = new PrivateApiService(
  process.env.REACT_APP_CONTACTS
);
export const activitiesAPI = new PrivateApiService("activities");
export const slidesAPI = new PrivateApiService("slides");
export const newsAPI = new PrivateApiService("news");
export const categoriesAPI = new PrivateApiService(
  process.env.REACT_APP_CATEGORIES
);
export const membersAPI = new PrivateApiService("members");
export const organizationAPI = new PrivateApiService(
  process.env.REACT_APP_ORGANIZATION
);
export const testimonialsAPI = new PrivateApiService("testimonials");
export const registerAPI = new PrivateApiService("register");
export const loginAPI = new PrivateApiService("login");
