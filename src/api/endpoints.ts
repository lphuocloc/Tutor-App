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
    getProfile: (userId: number) => axiosInstance.get(`/users/${userId}/profile`),

    getAllUsers: () => axiosInstance.get('/users'),

    // Lấy thông tin user detail theo userId
    getUserProfile: () => axiosInstance.get("/users"),

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

// ==================== BANK ACCOUNT APIs ====================
export const bankAccountAPI = {
    // Thêm tài khoản ngân hàng
    addBankAccount: (data: { bankName: string; accountNumber: string; accountHolder: string }) =>
        axiosInstance.post('/BankAccount', data),

    // Lấy danh sách tài khoản ngân hàng của user hiện tại
    getMyBankAccounts: () => axiosInstance.get('/BankAccount/me'),

    // Xóa tài khoản ngân hàng
    deleteBankAccount: (id: number) => axiosInstance.delete(`/BankAccount/${id}`),
};

// ==================== WALLET APIs ====================
export const walletAPI = {
    // Lấy thông tin ví của user hiện tại
    getMyWallet: () => axiosInstance.get('/Wallet/me'),

    // Nạp tiền vào ví
    topUpWallet: (data: { amount: number; redirectUrl: string }) =>
        axiosInstance.post('/Wallet/top-up', data),

    // Xác nhận nạp tiền
    confirmTopUp: (data: { orderCode: number }) =>
        axiosInstance.post('/Wallet/confirm-top-up', data),

    // Hoàn tiền
    addFunds: (data: { userId: number; amount: number }) =>
        axiosInstance.post('/Wallet/add-funds', data),

    // Thanh toán bằng ví
    pay: (data: { amount: number; description: string }) =>
        axiosInstance.post('/Wallet/pay', data),
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
        axiosInstance.get(`/tutor-profiles/profile/${id}`),

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

    // Lấy danh sách bài đăng của Tutor
    getTutorPosts: (params?: {
        sortOrder?: 'asc' | 'desc';
        page?: number;
        pageSize?: number;
    }) => axiosInstance.get('/posts/tutor-posts', { params }),

    // Xóa bài đăng
    deletePost: (id: number) => axiosInstance.delete(`/posts/${id}`),

    // Lấy chi tiết bài đăng
    getPostDetail: (id: number) => axiosInstance.get(`/posts/${id}`),

    // Tìm gia sư phù hợp với bài đăng
    findMatchingTutors: (postId: number, params?: {
        page?: number;
        pageSize?: number;
    }) => axiosInstance.get(`/posts/${postId}/matches`, { params }),

    // Lấy bài đăng của user theo userId
    getUserPosts: (userId: number, params?: {
        page?: number;
        pageSize?: number;
    }) => axiosInstance.get(`/posts/user/${userId}`, { params }),

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

// ==================== PAYMENT APIs ====================
export const paymentAPI = {
    // Tạo yêu cầu thanh toán (deposit)
    // body: { orderCode, amount, description, cancelUrl, returnUrl, buyerName, buyerEmail }
    createPayment: (data: any) => axiosInstance.post('/Payment/create', data),
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

    // Lấy danh sách phòng chat cho 1 user (theo yêu cầu API: /ChatRoom/user?userId=...)
    getUserChatRooms: (userId: number) =>
        axiosInstance.get('/ChatRoom/user', { params: { userId } }),

    // Tạo phòng chat
    createRoom: (data: { participantIds: string[] }) =>
        axiosInstance.post('/chat/room/create', data),
    // Alias for backend ChatRoom endpoint used by frontend flow
    createChatRoom: (data: any) => axiosInstance.post('/ChatRoom', data),
};

// ==================== BOOKING APIs ====================
export const bookingAPI = {
    // Tạo booking từ chat
    // body: { chatRoomId, agreedPricePerSession, sessionsPerWeek, agreedDays, agreedTime }
    createBooking: (data: {
        chatRoomId: number;
        agreedPricePerSession: number;
        sessionsPerWeek: number;
        agreedDays: string;
        agreedTime: string;
    }) => axiosInstance.post('/Booking', data),
    // Lấy booking theo user
    // GET /Booking/user?userId=...
    getUserBookings: (userId: number) => axiosInstance.get('/Booking/user', { params: { userId } }),
    // Lấy security code cho booking
    // GET /Booking/{bookingId}/security-code
    getSecurityCode: (bookingId: number) => axiosInstance.get(`/Booking/${bookingId}/security-code`),
    // Lấy tất cả booking (staff)
    // GET /Booking
    getAllBookings: () => axiosInstance.get('/Booking'),
};

// ==================== TRACKING APIs ====================
export const trackingAPI = {
    // Tạo tracking cho booking
    // body: { bookingId, action, location, securityCodeUsed }
    createTracking: (data: { bookingId: number; action: string; location: string; securityCodeUsed?: string }) =>
        axiosInstance.post('/Tracking', data),
    // Lấy tracking theo bookingId
    // GET /Tracking/booking/{bookingId}
    getTrackingByBooking: (bookingId: number) => axiosInstance.get(`/Tracking/booking/${bookingId}`),
    // Lấy tất cả tracking
    // GET /Tracking
    getAllTracking: () => axiosInstance.get('/Tracking'),

    getAllTrackingByTutor: (tutorUserId: number) =>
        axiosInstance.get(`/Tracking/user/${tutorUserId}`),
};

// ==================== REVIEW APIs ====================
export const bookingReviewAPI = {
    // Review a booking
    // POST /Review { bookingId, rating, comment }
    reviewBooking: (data: { bookingId: number; rating: number; comment?: string }) => axiosInstance.post('/Review', data),
};


// ==================== PAYMENT APIs ====================
// export const paymentAPI = {
//     // Tạo giao dịch đặt cọc
//     createDeposit: (data: { classId: string; amount: number }) =>
//         axiosInstance.post('/payment/deposit', data),

//     // Xác nhận thanh toán
//     confirmPayment: (transactionId: string) =>
//         axiosInstance.post(`/payment/${transactionId}/confirm`),

//     // Lấy lịch sử giao dịch 
//     getHistory: (params?: any) =>
//         axiosInstance.get('/payment/history', { params }),

//     // Đổi điểm thưởng
//     redeemPoints: (data: { points: number; rewardId: string }) =>
//         axiosInstance.post('/payment/redeem-points', data),
// };

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
    getAllReviews: () =>
        axiosInstance.get('/Review')
}
