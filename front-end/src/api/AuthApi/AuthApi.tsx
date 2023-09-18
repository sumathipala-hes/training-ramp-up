import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export const registerApi = async (
  username: String,
  password: String,
  role: String,
) => {
  try {
    const response = await axiosInstance.post('/register', {
      username,
      password,
      role,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 400) {
      throw new Error('User already exists');
    } else {
      throw new Error((axiosError.message as any).message as string);
    }
  }
};

export const loginApi = async (username: String, password: String) => {
  try {
    const response = await axiosInstance.post('/login', {
      username,
      password,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 400) {
      throw new Error((axiosError.response.data as any).message as string);
    } else {
      throw new Error((axiosError.message as any).message as string);
    }
  }
};

export const authenticateApi = async () => {
  try {
    const response = await axiosInstance.get('/userAuth');
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const logoutApi = async () => {
  const response = await axiosInstance.post('/logout');
  return response.data;
};

export const getUserRoleApi = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response;
  } catch (error) {
    console.error('User Role API Error:', error);
    throw error;
  }
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.status === 401) {
    axiosInstance.get('/refresh');
    }
  return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  axiosInstance.get('/refresh');
  return Promise.reject(error);
});