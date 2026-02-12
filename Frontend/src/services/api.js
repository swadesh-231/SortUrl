import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    refreshToken: () => api.post('/auth/refresh-token'),
};

// URL API
export const urlAPI = {
    createShortUrl: (originalUrl) => api.post('/urls/shorten', { originalUrl }),
    getMyUrls: () => api.get('/urls/my-urls'),
    deleteUrl: (shortUrl) => api.delete(`/urls/${shortUrl}`),
    getAnalytics: (shortUrl, startDate, endDate) =>
        api.get(`/urls/analytics/${shortUrl}`, {
            params: { startDate, endDate },
        }),
    getTotalClicks: (startDate, endDate) =>
        api.get('/urls/total-clicks', {
            params: { startDate, endDate },
        }),
};

export default api;
