import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, useUser } from '../store';
import { useBooking, getAllBooking } from '../store/booking';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { userAPI } from '../api/endpoints';

interface User {
    userId: number;
    email: string;
    phone: string;
    fullName: string;
    street?: string;
    ward?: string;
    district: string;
    city: string;
    role: string;
}

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Admin';

    const users = useUser()



    const bookings = useBooking()
    // Filter tutors
    const tutorCount = users.filter(user => user.role === 'Tutor').length;

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [form] = Form.useForm();
    const [activeView, setActiveView] = useState<'dashboard' | 'users' | 'tutors' | 'bookings'>('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        form.setFieldsValue({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            street: user.street,
            ward: user.ward,
            district: user.district,
            city: user.city,
        });
        setEditModalVisible(true);
    };

    const handleUpdateUser = async () => {
        try {
            if (!selectedUser) return;
            const values = await form.validateFields();
            await userAPI.updateUser(selectedUser.userId, {
                ...values,
                dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : undefined,
            });
            message.success('Cập nhật thành công!');
            setEditModalVisible(false);
            getUser(); // Refresh users
        } catch (error) {
            message.error('Cập nhật thất bại!');
            console.error(error);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await userAPI.deleteUser(userId);
            message.success('Xóa người dùng thành công!');
            getUser(); // Refresh users
        } catch (error) {
            message.error('Xóa người dùng thất bại!');
            console.error(error);
        }
    };

    const filterAdmin = users.filter(user => user.role !== 'Admin');

    const columns: ColumnsType<User> = [
        {
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 80,
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },

        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'Customer', value: 'Customer' },
                { text: 'Tutor', value: 'Tutor' },
                { text: 'Staff', value: 'Staff' },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role: string) => {
                const colorMap: { [key: string]: string } = {
                    'Customer': 'blue',
                    'Tutor': 'purple',
                    'Staff': 'green',
                    'Admin': 'red',
                };
                return <Tag color={colorMap[role] || 'default'} className="font-medium px-3 py-1">{role}</Tag>;
            },
        },
        {
            title: 'Địa chỉ',
            key: 'address',
            render: (_, record) => {
                const parts = [record.street, record.ward, record.district, record.city].filter(Boolean);
                return parts.join(', ') || '-';
            },
        },
        {
            title: 'Hành động',
            key: 'actions',
            fixed: 'right',
            width: 200,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => handleEditUser(record)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 border-none hover:from-indigo-600 hover:to-purple-700 shadow-md"
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description="Bạn có chắc chắn muốn xóa người dùng này?"
                        onConfirm={() => handleDeleteUser(record.userId)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true, className: "hover:shadow-lg" }}
                    >
                        <Button danger size="small" className="shadow-md hover:shadow-lg">
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];


    useEffect(() => {
        // Fetch users on component mount
        getUser();
        getAllBooking();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-white to-indigo-50 rounded-3xl shadow-xl border border-indigo-100 p-8 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-2 text-lg">Xin chào, <span className="font-semibold text-indigo-600">{userName}</span> - Quản trị viên hệ thống</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div
                        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg hover:shadow-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 border border-blue-400 cursor-pointer"
                        onClick={() => setActiveView('users')}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-blue-100 text-sm">Tổng người dùng</p>
                                <p className="text-3xl font-bold mt-2">{filterAdmin.length}</p>
                                <p className="text-blue-100 text-xs mt-1">Tất cả người dùng trong hệ thống</p>
                            </div>
                            <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg hover:shadow-2xl p-6 text-white cursor-pointer hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 border border-emerald-400"
                        onClick={() => window.open('https://my.payos.vn/', '_blank')}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-green-100 text-sm">Quản lý Doanh thu</p>
                                <p className="text-xl font-semibold mt-2">Xem chi tiết tại PayOS</p>
                                <p className="text-green-100 text-xs mt-1">Nhấn để mở trang quản lý</p>
                            </div>
                            <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg hover:shadow-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 border border-purple-400 cursor-pointer"
                        onClick={() => setActiveView('tutors')}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-purple-100 text-sm">Gia sư</p>
                                <p className="text-3xl font-bold mt-2">{tutorCount}</p>
                                <p className="text-purple-100 text-xs mt-1">Số lượng gia sư đã đăng ký</p>
                            </div>
                            <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>

                    <div
                        className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg hover:shadow-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 border border-orange-400 cursor-pointer"
                        onClick={() => setActiveView('bookings')}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-orange-100 text-sm">Tổng booking</p>
                                <p className="text-3xl font-bold mt-2">{bookings.length}</p>
                                <p className="text-orange-100 text-xs mt-1">Tổng số lớp học đã đăng ký</p>
                            </div>
                            <svg className="w-12 h-12 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Management Sections */}
                <div className="grid grid-cols-1 gap-6">
                    {activeView !== 'dashboard' && (
                        <div className="mb-4">
                            <Button
                                onClick={() => setActiveView('dashboard')}
                                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-none hover:from-gray-600 hover:to-gray-700"
                            >
                                ← Quay lại Dashboard
                            </Button>
                        </div>
                    )}

                    {activeView === 'dashboard' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Welcome Card */}
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-3">Chào mừng đến với Admin Panel</h3>
                                        <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                                            Bạn đang sử dụng trang quản trị hệ thống Tutor App - nền tảng kết nối gia sư và phụ huynh hàng đầu.
                                            Tại đây, bạn có toàn quyền quản lý người dùng, theo dõi booking và giám sát hoạt động của hệ thống.
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                                                Quản lý toàn diện
                                            </span>
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                                                Bảo mật cao
                                            </span>
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                                                Theo dõi realtime
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* About Platform Card */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Về Tutor App</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            Tutor App là nền tảng kết nối thông minh giữa gia sư và phụ huynh, giúp tìm kiếm
                                            và quản lý lớp học hiệu quả. Hệ thống cung cấp đầy đủ tính năng từ đăng bài,
                                            tìm kiếm, thanh toán đến theo dõi tiến độ học tập.
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <div className="text-2xl font-bold text-blue-600">{filterAdmin.length}</div>
                                                <div className="text-xs text-gray-600 mt-1">Người dùng hoạt động</div>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-3">
                                                <div className="text-2xl font-bold text-purple-600">{tutorCount}</div>
                                                <div className="text-xs text-gray-600 mt-1">Gia sư chất lượng</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:col-span-2">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Hành động nhanh
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setActiveView('users')}
                                        className="p-4 border-2 border-indigo-100 rounded-xl hover:bg-indigo-50 transition-all text-left group"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-gray-700 group-hover:text-indigo-600">Quản lý Users</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Xem và chỉnh sửa thông tin người dùng</p>
                                    </button>

                                    <button
                                        onClick={() => setActiveView('tutors')}
                                        className="p-4 border-2 border-purple-100 rounded-xl hover:bg-purple-50 transition-all text-left group"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-gray-700 group-hover:text-purple-600">Quản lý Gia sư</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Theo dõi danh sách gia sư</p>
                                    </button>

                                    <button
                                        onClick={() => setActiveView('bookings')}
                                        className="p-4 border-2 border-orange-100 rounded-xl hover:bg-orange-50 transition-all text-left group"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-gray-700 group-hover:text-orange-600">Quản lý Booking</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Xem tất cả booking trong hệ thống</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeView === 'users' && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Quản lý người dùng</h2>
                                <p className="text-gray-500 text-sm">Quản lý và chỉnh sửa thông tin người dùng trong hệ thống</p>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={filterAdmin}
                                rowKey="userId"
                                scroll={{ x: 1200 }}
                                pagination={{
                                    pageSize: 10,
                                    showTotal: (total) => `Tổng ${total} người dùng`,
                                }}
                            />
                        </div>
                    )}

                    {activeView === 'tutors' && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Quản lý Gia sư</h2>
                                <p className="text-gray-500 text-sm">Danh sách tất cả gia sư đã đăng ký trong hệ thống</p>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={users.filter(user => user.role === 'Tutor')}
                                rowKey="userId"
                                scroll={{ x: 1200 }}
                                pagination={{
                                    pageSize: 10,
                                    showTotal: (total) => `Tổng ${total} gia sư`,
                                }}
                            />
                        </div>
                    )}

                    {activeView === 'bookings' && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">Quản lý Booking</h2>
                                <p className="text-gray-500 text-sm">Danh sách tất cả booking trong hệ thống</p>
                            </div>
                            <Table
                                columns={[
                                    { title: 'ID', dataIndex: 'bookingId', key: 'bookingId', width: 80 },
                                    { title: 'Chat Room', dataIndex: 'chatRoomId', key: 'chatRoomId', width: 100 },
                                    {
                                        title: 'Giá/Tiết',
                                        dataIndex: 'agreedPricePerSession',
                                        key: 'agreedPricePerSession',
                                        width: 130,
                                        render: (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
                                    },
                                    { title: 'Buổi/tuần', dataIndex: 'sessionsPerWeek', key: 'sessionsPerWeek', width: 100 },
                                    { title: 'Ngày dạy', dataIndex: 'agreedDays', key: 'agreedDays', width: 150 },
                                    { title: 'Giờ dạy', dataIndex: 'agreedTime', key: 'agreedTime', width: 100 },

                                    {
                                        title: 'Ngày tạo',
                                        dataIndex: 'createdAt',
                                        key: 'createdAt',
                                        width: 150,
                                        render: (val: string) => val ? new Date(val).toLocaleString('vi-VN') : ''
                                    },
                                ]}
                                dataSource={bookings}
                                rowKey="bookingId"
                                scroll={{ x: 1400 }}
                                pagination={{
                                    pageSize: 10,
                                    showTotal: (total) => `Tổng ${total} booking`,
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Edit User Modal */}
                <Modal
                    title={
                        <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Chỉnh sửa thông tin người dùng
                        </div>
                    }
                    open={editModalVisible}
                    onOk={handleUpdateUser}
                    onCancel={() => setEditModalVisible(false)}
                    okText="Cập nhật"
                    cancelText="Hủy"
                    width={650}
                    okButtonProps={{ className: "bg-gradient-to-r from-indigo-500 to-purple-600 border-none hover:from-indigo-600 hover:to-purple-700" }}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Họ tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>





                        <Form.Item label="Đường/Số nhà" name="street">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Phường/Xã" name="ward">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Quận/Huyện" name="district">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Tỉnh/Thành phố" name="city">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminDashboard;
