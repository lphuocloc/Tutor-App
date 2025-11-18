import React from 'react';
import { useNavigate } from 'react-router-dom';

const TutorDashboard: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Gia sư';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Trang Gia Sư</h1>
                            <p className="text-gray-600 mt-2">Chào mừng, {userName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Lớp đang dạy</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Học sinh</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">23</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Giờ dạy tháng này</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">48</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Thu nhập tháng này</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">12M</p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Schedule */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Lịch dạy hôm nay</h2>
                        <div className="space-y-3">
                            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-800">Toán lớp 10 - Nguyễn Văn A</p>
                                        <p className="text-sm text-gray-600 mt-1">📍 123 Nguyễn Huệ, Q1, HCM</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">14:00 - 16:00</span>
                                </div>
                            </div>

                            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-800">Vật lý lớp 11 - Trần Thị B</p>
                                        <p className="text-sm text-gray-600 mt-1">📍 456 Lê Lợi, Q3, HCM</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">18:00 - 20:00</span>
                                </div>
                            </div>

                            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-800">Hóa học lớp 12 - Lê Văn C</p>
                                        <p className="text-sm text-gray-600 mt-1">📍 789 Trần Hưng Đạo, Q5, HCM</p>
                                    </div>
                                    <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full">20:00 - 22:00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Thao tác nhanh</h2>
                        <div className="space-y-3">
                            <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition font-medium">
                                📅 Xem lịch dạy
                            </button>
                            <button className="w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition font-medium">
                                📚 Tìm lớp mới
                            </button>
                            <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition font-medium">
                                💬 Tin nhắn
                            </button>
                            <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition font-medium">
                                ⭐ Đánh giá
                            </button>
                            <button className="w-full p-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition font-medium">
                                👤 Hồ sơ cá nhân
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Reviews */}
                <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Đánh giá gần đây</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center mb-2">
                                <div className="flex text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <span className="ml-2 text-sm text-gray-600">5.0</span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">"Giáo viên rất tận tâm và nhiệt tình!"</p>
                            <p className="text-xs text-gray-500">- Nguyễn Văn A • 2 ngày trước</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center mb-2">
                                <div className="flex text-yellow-400">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <span className="ml-2 text-sm text-gray-600">5.0</span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">"Con em học tiến bộ rất nhiều!"</p>
                            <p className="text-xs text-gray-500">- Trần Thị B • 1 tuần trước</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDashboard;
