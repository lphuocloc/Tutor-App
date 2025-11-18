import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Admin';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-2">Xin chào, {userName} - Quản trị viên hệ thống</p>
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
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 text-sm">Tổng người dùng</p>
                                <p className="text-3xl font-bold mt-2">5,678</p>
                                <p className="text-blue-100 text-xs mt-1">+12% so với tháng trước</p>
                            </div>
                            <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-green-100 text-sm">Doanh thu</p>
                                <p className="text-3xl font-bold mt-2">$45,678</p>
                                <p className="text-green-100 text-xs mt-1">+8% so với tháng trước</p>
                            </div>
                            <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-purple-100 text-sm">Gia sư</p>
                                <p className="text-3xl font-bold mt-2">342</p>
                                <p className="text-purple-100 text-xs mt-1">+15 gia sư mới</p>
                            </div>
                            <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-orange-100 text-sm">Lớp học</p>
                                <p className="text-3xl font-bold mt-2">156</p>
                                <p className="text-orange-100 text-xs mt-1">89 đang hoạt động</p>
                            </div>
                            <svg className="w-12 h-12 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Management Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Quản lý hệ thống</h2>
                        <div className="space-y-3">
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Quản lý người dùng</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Quản lý gia sư</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Quản lý lớp học</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Quản lý giao dịch</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Cấu hình & Báo cáo</h2>
                        <div className="space-y-3">
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Cài đặt hệ thống</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Báo cáo doanh thu</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Thống kê hệ thống</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="w-full p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between">
                                <span className="font-semibold text-gray-700">Phân quyền</span>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
