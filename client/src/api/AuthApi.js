import axios from "axios";

const authUrl = `${process.env.REACT_APP_API_URL}`;

export const login_user = async (userInfo) => {
  try {
    const data = axios.post(`${authUrl}/login`, userInfo);
    return data;
  } catch (error) {
    return error.response.statusText;
  }
};
export const register_user = async (userInfo) => {
  try {
    const data = axios.post(`${authUrl}/register`, userInfo);
    return data;
  } catch (error) {
    return error.response.statusText;
  }
};
