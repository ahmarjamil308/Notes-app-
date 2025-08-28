const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PROJECT_ADD: "/project/add",
  PROJECT_LIST: "/project/list",
  PROJECT_VIEW: (id = ":id") => `/view/${id}`,
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADMIN_USERS: "/admin/users",
};

export default ROUTES; 
