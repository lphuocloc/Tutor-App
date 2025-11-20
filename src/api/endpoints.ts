/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axiosConfig';

// ==================== AUTH APIs ====================
export const authAPI = {
    // Đăng nhập
    // body: { identifier: string, password: string }
    login: (data: { identifier: string; password: string }) =>
        axiosInstance.post('/auth/login', data),

    // Đăng ký
    register: (data: {
        fullName: string;
        dateOfBirth: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
    }) => axiosInstance.post('/auth/register', data),

    // Đăng xuất
    logout: () => axiosInstance.post('/auth/logout'),

    // Refresh token
    refreshToken: (refreshToken: string) =>
        axiosInstance.post('/auth/refresh', { refreshToken }),

    // Xác thực OTP
    verifyOTP: (data: { email: string; otp: string }) =>
        axiosInstance.post('/auth/verify-otp', data),

    // Gửi lại OTP
    resendOTP: (email: string) =>
        axiosInstance.post('/auth/resend-otp', { email }),

    // Quên mật khẩu
    forgotPassword: (email: string) =>
        axiosInstance.post('/auth/forgot-password', { email }),

    // Đặt lại mật khẩu
    resetPassword: (data: { token: string; password: string }) =>
        axiosInstance.post('/auth/reset-password', data),
};

// ==================== USER APIs ====================
export const userAPI = {
    // Lấy thông tin profile
    getProfile: () => axiosInstance.get('/user/profile'),

    // Cập nhật profile
    updateProfile: (data: any) =>
        axiosInstance.put('/user/profile', data),

    // Upload avatar
    uploadAvatar: (formData: FormData) =>
        axiosInstance.post('/user/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),

    // Đổi mật khẩu
    changePassword: (data: { oldPassword: string; newPassword: string }) =>
        axiosInstance.put('/user/change-password', data),
};

// ==================== TUTOR APIs ====================
export const tutorAPI = {
    // Đăng ký làm gia sư (tutor profile với upload files)
    registerProfile: (formData: FormData) =>
        axiosInstance.post('/tutor-profiles', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),

    // Lấy danh sách tutor profiles
    getTutorProfiles: (params?: {
        sortOrder?: 'asc' | 'desc';
        page?: number;
        pageSize?: number;
    }) =>
        axiosInstance.get('/tutor-profiles', { params }),

    // Lấy chi tiết tutor profile để review
    getTutorProfileDetail: (id: number) =>
        axiosInstance.get(`/tutor-profiles/profile/${id}/review`),

    // Review tutor profile (Approve/Reject/Suspend)
    reviewTutorProfile: (data: {
        TutorProfileId: number;
        ReviewerBy: number;
        status: 'Approved' | 'Rejected' | 'Suspended';
        Reason?: string;
    }) =>
        axiosInstance.put('/tutor-profiles/review', data),

    // Lấy danh sách gia sư
    getList: (params?: any) =>
        axiosInstance.get('/tutor/list', { params }),

    // Lấy chi tiết gia sư
    getDetail: (id: string) =>
        axiosInstance.get(`/tutor/${id}`),

    // Cập nhật thông tin gia sư
    updateInfo: (data: any) =>
        axiosInstance.put('/tutor/update', data),

    // Lấy lịch dạy
    getSchedule: () =>
        axiosInstance.get('/tutor/schedule'),

    // Đánh giá gia sư
    review: (tutorId: string, data: { rating: number; comment: string }) =>
        axiosInstance.post(`/tutor/${tutorId}/review`, data),
};

// ==================== CLASS APIs ====================
export const classAPI = {
    // Tạo bài đăng tìm gia sư
    createPost: (data: {
        creatorUserId: number;
        title: string;
        subject: string;
        studentGrade: string;
        sessionsPerWeek: number;
        preferredDays: string;
        preferredTime: string;
        pricePerSession: number;
        description?: string;
    }) => axiosInstance.post('/posts', data),

    // Lấy danh sách bài đăng của Customer
    getCustomerPosts: (params?: {
        sortOrder?: 'asc' | 'desc';
        page?: number;
        pageSize?: number;
    }) => axiosInstance.get('/posts/cus-posts', { params }),

    // Lấy danh sách lớp học
    getList: (params?: any) =>
        axiosInstance.get('/class/list', { params }),

    // Lấy chi tiết lớp học
    getDetail: (id: string) =>
        axiosInstance.get(`/class/${id}`),

    // Cập nhật lớp học
    update: (id: string, data: any) =>
        axiosInstance.put(`/class/${id}`, data),

    // Xóa lớp học
    delete: (id: string) =>
        axiosInstance.delete(`/class/${id}`),

    // Đăng ký dạy lớp
    register: (classId: string) =>
        axiosInstance.post(`/class/${classId}/register`),

    // Xác nhận gia sư
    confirmTutor: (classId: string, tutorId: string) =>
        axiosInstance.post(`/class/${classId}/confirm-tutor`, { tutorId }),
};

// ==================== DOCUMENT APIs ====================
export const documentAPI = {
    // Upload tài liệu
    upload: (formData: FormData) =>
        axiosInstance.post('/document/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),

    // Lấy danh sách tài liệu
    getList: (params?: any) =>
        axiosInstance.get('/document/list', { params }),

    // Tải xuống tài liệu
    download: (id: string) =>
        axiosInstance.get(`/document/${id}/download`, {
            responseType: 'blob'
        }),

    // Xóa tài liệu
    delete: (id: string) =>
        axiosInstance.delete(`/document/${id}`),
};

// ==================== CHAT APIs ====================
export const chatAPI = {
    // Lấy danh sách tin nhắn
    getMessages: (roomId: string, params?: any) =>
        axiosInstance.get(`/chat/${roomId}/messages`, { params }),

    // Gửi tin nhắn
    sendMessage: (roomId: string, data: { content: string; type?: string }) =>
        axiosInstance.post(`/chat/${roomId}/send`, data),

    // Lấy danh sách phòng chat
    getRooms: () =>
        axiosInstance.get('/chat/rooms'),

    // Tạo phòng chat
    createRoom: (data: { participantIds: string[] }) =>
        axiosInstance.post('/chat/room/create', data),
};

// ==================== PAYMENT APIs ====================
export const paymentAPI = {
    // Tạo giao dịch đặt cọc
    createDeposit: (data: { classId: string; amount: number }) =>
        axiosInstance.post('/payment/deposit', data),

    // Xác nhận thanh toán
    confirmPayment: (transactionId: string) =>
        axiosInstance.post(`/payment/${transactionId}/confirm`),

    // Lấy lịch sử giao dịch
    getHistory: (params?: any) =>
        axiosInstance.get('/payment/history', { params }),

    // Đổi điểm thưởng
    redeemPoints: (data: { points: number; rewardId: string }) =>
        axiosInstance.post('/payment/redeem-points', data),
};

// ==================== NOTIFICATION APIs ====================
export const notificationAPI = {
    // Lấy danh sách thông báo
    getList: (params?: any) =>
        axiosInstance.get('/notification/list', { params }),

    // Đánh dấu đã đọc
    markAsRead: (id: string) =>
        axiosInstance.put(`/notification/${id}/read`),

    // Đánh dấu tất cả đã đọc
    markAllAsRead: () =>
        axiosInstance.put('/notification/read-all'),

    // Xóa thông báo
    delete: (id: string) =>
        axiosInstance.delete(`/notification/${id}`),
};

// ==================== REVIEW APIs ====================
export const reviewAPI = {
    // Đánh giá gia sư
    reviewTutor: (data: { tutorId: string; rating: number; comment: string }) =>
        axiosInstance.post('/review/tutor', data),

    // Đánh giá phụ huynh
    reviewParent: (data: { parentId: string; rating: number; comment: string }) =>
        axiosInstance.post('/review/parent', data),

    // Lấy đánh giá của gia sư
    getTutorReviews: (tutorId: string, params?: any) =>
        axiosInstance.get(`/review/tutor/${tutorId}`, { params }),

    // Lấy đánh giá của phụ huynh
    getParentReviews: (parentId: string, params?: any) =>
        axiosInstance.get(`/review/parent/${parentId}`, { params }),
};
