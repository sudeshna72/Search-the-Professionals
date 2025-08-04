import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    ( response ) => response,
    (error) => {
        if (error.response?.status === 401) {
            alert("Unauthorized. Please log in again");
            localStorage.clear();
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;