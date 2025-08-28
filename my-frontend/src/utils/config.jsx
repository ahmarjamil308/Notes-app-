const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const ENDPOINTS = {
  GET_ALL_USERS: `${API_BASE_URL}/users`,
  USER_BY_ID: (id) => `${API_BASE_URL}/user/${id}`,
  USER_SUBMIT: `${API_BASE_URL}/submit`,

  // auth
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  ME: `${API_BASE_URL}/auth/me`,
};
