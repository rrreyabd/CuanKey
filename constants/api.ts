export const API_BASE_URL = "https://api.julitasuu.site/api";

export const ENDPOINTS = {
  AUTH:
  {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
  },
  USER: `${API_BASE_URL}/user`,
  WALLET: {
    BASE: `${API_BASE_URL}/wallet`,
    TOTAL: `${API_BASE_URL}/wallet/total`,
  },
};