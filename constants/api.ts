export const API_BASE_URL = "https://api.julitasuu.site/api";

export const ENDPOINTS = {
  AUTH:
  {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
    UPDATE_PASSWORD: `${API_BASE_URL}/password-update`,
  },
  USER: `${API_BASE_URL}/user`,
  WALLET: {
    BASE: `${API_BASE_URL}/wallet`,
    TOTAL: `${API_BASE_URL}/wallet/total`,
  },
  CATEGORY: {
    BASE: `${API_BASE_URL}/category`,
  },
  TRANSACTION: {
    BASE: `${API_BASE_URL}/transaction`,
    MONTHLY: `${API_BASE_URL}/transaction/monthly`,
  },
};