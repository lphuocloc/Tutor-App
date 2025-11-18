import axios from 'axios';

// Cấu hình base URL cho API
// Sử dụng proxy của Vite, không cần full URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
console.log('API_BASE_URL', API_BASE_URL)

// Tạo axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 giây
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - thêm token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - xử lý lỗi chung
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Xử lý lỗi 401 - token hết hạn
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Lấy refresh token
                const refreshToken = localStorage.getItem('refreshToken');

                if (refreshToken) {
                    // Gọi API refresh token
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                        refreshToken,
                    });

                    const { accessToken } = response.data;

                    // Lưu token mới
                    localStorage.setItem('accessToken', accessToken);

                    // Thử lại request với token mới
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // Refresh token thất bại - đăng xuất
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Xử lý các lỗi khác
        if (error.response?.status === 403) {
            console.error('Không có quyền truy cập');
        } else if (error.response?.status === 404) {
            console.error('Không tìm thấy tài nguyên');
        } else if (error.response?.status >= 500) {
            console.error('Lỗi server');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
