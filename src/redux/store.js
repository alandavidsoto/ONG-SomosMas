import { configureStore } from "@reduxjs/toolkit";
import activities from "../app/Activities/activityReducer";
import membersReducer from "../app/members/membersReducer";
import authReducer from "../app/auth/authReducer";
import usersReducer from "../app/users/usersReducer";
import slidesReducer from "../app/slides/slidesReducer";
import categoriesReducer from "../app/categories/categoriesReducer";
import organizationReducer from "../app/organization/organizationReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activities,
    members: membersReducer,
    users: usersReducer,
    slides: slidesReducer,
    categories: categoriesReducer,
    organization: organizationReducer,
  },
});

export default store;
