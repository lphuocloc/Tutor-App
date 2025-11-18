import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Khách hàng';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Trang Khách Hàng</h1>
                            <p className="text-gray-600 mt-2">Xin chào, {userName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Lớp học của tôi</p>
                                <p className="text-3xl font-bold mt-2">3</p>
                            </div>
                            <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Gia sư đang dạy</p>
                                <p className="text-3xl font-bold mt-2">2</p>
                            </div>
                            <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Điểm thưởng</p>
                                <p className="text-3xl font-bold mt-2">450</p>
                            </div>
                            <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Main Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <button
                        onClick={() => navigate('/tao-bai-dang-tim-gia-su')}
                        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition group"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition mb-4">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Tìm gia sư</h3>
                            <p className="text-gray-600 text-sm">Đăng bài tìm gia sư phù hợp cho con bạn</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/bai-dang-gia-su-cu-the')}
                        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition group"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition mb-4">
                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Danh sách gia sư</h3>
                            <p className="text-gray-600 text-sm">Xem và chọn gia sư phù hợp</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/phong-chat')}
                        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition group"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition mb-4">
                                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Tin nhắn</h3>
                            <p className="text-gray-600 text-sm">Trò chuyện với gia sư</p>
                        </div>
                    </button>
                </div>

                {/* My Classes */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Lớp học của tôi</h2>
                    <div className="space-y-4">
                        <div className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold text-gray-800">Toán lớp 10</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Đang học</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">👨‍🏫 Thầy Nguyễn Văn A</p>
                                    <p className="text-sm text-gray-600">📅 Thứ 2, 4, 6 • 18:00 - 20:00</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm">
                                    Chi tiết
                                </button>
                            </div>
                        </div>

                        <div className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-bold text-gray-800">Tiếng Anh lớp 9</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Đang học</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">👩‍🏫 Cô Trần Thị B</p>
                                    <p className="text-sm text-gray-600">📅 Thứ 3, 5, 7 • 17:00 - 19:00</p>
                                </div>
                                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm">
                                    Chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Tính năng khác</h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/trang-ca-nhan')}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between"
                            >
                                <span className="font-semibold text-gray-700">👤 Trang cá nhân</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => navigate('/cho-tai-lieu')}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between"
                            >
                                <span className="font-semibold text-gray-700">📚 Kho tài liệu</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => navigate('/doi-diem-thuong')}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between"
                            >
                                <span className="font-semibold text-gray-700">🎁 Đổi điểm thưởng</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Thông báo mới</h2>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                                <p className="text-sm text-gray-800 font-medium">Lớp Toán có buổi học mới</p>
                                <p className="text-xs text-gray-600 mt-1">2 giờ trước</p>
                            </div>
                            <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                                <p className="text-sm text-gray-800 font-medium">Gia sư đã chấp nhận yêu cầu</p>
                                <p className="text-xs text-gray-600 mt-1">1 ngày trước</p>
                            </div>
                            <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                                <p className="text-sm text-gray-800 font-medium">Bạn nhận được 50 điểm thưởng</p>
                                <p className="text-xs text-gray-600 mt-1">3 ngày trước</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
