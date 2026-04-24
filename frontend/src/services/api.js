import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.184.70.49:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token to every request
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
