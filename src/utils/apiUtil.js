import axios from "axios";

const API_URL = process.env.REACT_APP_API_END_POINT;
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = API_URL;
axiosInstance.interceptors.request.use((request) => {
  request.headers["Content-Type"] = "application/json";
  request.headers["x-auth-token"] = `Bearer ${localStorage.getItem("token")}`;
  return request;
}, null);

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export const _post = (url, payload) => {
  return axiosInstance.post(`/${url}`, payload).then((response) => {
    return response;
  });
};

export const _delete = (url) => {
  return axiosInstance.delete(`/${url}`).then((response) => {
    return response;
  });
};

export const _get = (url) => {
  return axiosInstance.get(`/${url}`).then((response) => {
    return response;
  });
};

export const _patch = (url, payload) => {
  return axiosInstance.patch(`/${url}`, payload).then((response) => {
    return response;
  });
};
