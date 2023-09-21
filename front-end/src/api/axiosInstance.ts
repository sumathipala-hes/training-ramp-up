import axios from 'axios'
const axiosInstance = axios.create({
baseURL: 'http://localhost:4000',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && (error.response.status === 401) && error.response.data.error === 'Invalid access token' ) {
            try {
                const refreshedTokenResponse = await axiosInstance.post('/user/auth-token', {},
                {
                    headers: {'Content-Type': 'application/json',},
                        withCredentials: true,
                });
                if (refreshedTokenResponse.data.status === 200){
                    const authNewResponse: ResponseType =  await axiosInstance.post('/user/auth', {},
                    {
                        headers: {'Content-Type': 'application/json',},
                            withCredentials: true,
                    });
                    return authNewResponse;
                }else{
                    throw new Error('Failed to refresh access token');
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }else {
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;