import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the Authorization token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Axios interceptor for handling token expiration and refreshing
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Token expired'
    ) {
      console.log('Token expired, attempting to refresh...');

      try {
        const { data } = await axiosInstance.post('/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        // Update tokens
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
        originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

        console.log('Token refreshed, retrying original request...');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
