import axios from 'axios'
const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API, // Replace with your API base URL
baseURL: 'http://localhost:4000',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401 && error.response.data.error === 'Invalid access token') {
            try {
                const refreshedTokenResponse = await axiosInstance.post('/user/auth-token', {},
                {
                    headers: {'Content-Type': 'application/json',},
                        withCredentials: true,
                });
                return refreshedTokenResponse;
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }else {
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;