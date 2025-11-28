/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsContent from '../components/PostsContent';
import TutorPostsContent from '../components/TutorPostsContent';
import { message, Table, Modal, Button, Rate } from 'antd';
import { classAPI, chatAPI, bookingAPI, trackingAPI, bookingReviewAPI, userAPI } from '../api/endpoints';

type MenuType = 'dashboard' | 'posts' | 'createPost' | 'myPosts' | 'schedule' | 'students' | 'earnings' | 'profile' | 'messages' | 'bookings';

const TutorDashboard: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Gia sư';
    const [activeMenu, setActiveMenu] = useState<MenuType>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const menuItems = [
        { id: 'dashboard' as MenuType, label: 'Dashboard', icon: '📊' },
        { id: 'posts' as MenuType, label: 'Bài đăng phụ huynh', icon: '📝' },
        { id: 'createPost' as MenuType, label: 'Đăng bài tìm học sinh', icon: '✏️' },
        { id: 'myPosts' as MenuType, label: 'Bài đăng của tôi', icon: '📋' },
        { id: 'schedule' as MenuType, label: 'Lịch dạy', icon: '📅' },
        { id: 'students' as MenuType, label: 'Học sinh của tôi', icon: '👥' },
        { id: 'earnings' as MenuType, label: 'Thu nhập', icon: '💰' },
        { id: 'bookings' as MenuType, label: 'Booking', icon: '📆' },
        { id: 'messages' as MenuType, label: 'Tin nhắn', icon: '💬' },
        { id: 'profile' as MenuType, label: 'Hồ sơ cá nhân', icon: '👤' },
    ];

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <DashboardContent />;
            case 'posts':
                return <PostsContent />;
            case 'createPost':
                return <CreatePostContent />;
            case 'myPosts':
                return <TutorPostsContent />;
            case 'schedule':
                return <ScheduleContent />;
            case 'students':
                return <StudentsContent />;
            case 'earnings':
                return <EarningsContent />;
            case 'bookings':
                return <BookingsContent />;
            case 'profile':
                return <ProfileContent />;
            case 'messages':
                return <MessagesContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-br from-indigo-600 to-purple-600 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
                {/* Header with Toggle */}
                <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} border-b border-indigo-500`}>
                    {sidebarOpen && <h2 className="text-xl font-bold">Tutor Panel</h2>}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all"
                        title={sidebarOpen ? 'Thu gọn' : 'Mở rộng'}
                    >
                        <span className="text-lg font-bold">{sidebarOpen ? '◀' : '▶'}</span>
                    </button>
                </div>

                {/* Menu Items */}
                <nav className={`flex-1 ${sidebarOpen ? 'p-4' : 'p-2'} space-y-2 overflow-y-auto scrollbar-hide`}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveMenu(item.id)}
                            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-3 rounded-lg transition-all group relative ${activeMenu === item.id
                                ? 'bg-white text-indigo-600 shadow-lg scale-105'
                                : 'hover:bg-white/20 hover:scale-105'
                                }`}
                            title={!sidebarOpen ? item.label : ''}
                        >
                            <span className={`${sidebarOpen ? 'text-xl' : 'text-2xl'} flex-shrink-0`}>{item.icon}</span>
                            {sidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}

                            {/* Tooltip khi sidebar đóng */}
                            {!sidebarOpen && (
                                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Info & Logout */}
                <div className={`${sidebarOpen ? 'p-4' : 'p-2'} border-t border-indigo-500`}>
                    {sidebarOpen && (
                        <div className="mb-3 px-2">
                            <p className="text-sm text-indigo-200">Xin chào,</p>
                            <p className="font-semibold truncate">{userName}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-all hover:scale-105 group relative`}
                        title={!sidebarOpen ? 'Đăng xuất' : ''}
                    >
                        <span className={`${sidebarOpen ? 'text-xl' : 'text-2xl'} flex-shrink-0`}>🚪</span>
                        {sidebarOpen && <span className="font-medium">Đăng xuất</span>}

                        {/* Tooltip khi sidebar đóng */}
                        {!sidebarOpen && (
                            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                Đăng xuất
                            </div>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50">
                {renderContent()}
            </main>
        </div>
    );
};

const DashboardContent: React.FC = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Lớp đang dạy</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <span className="text-3xl">📚</span>
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
                        <span className="text-3xl">👥</span>
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
                        <span className="text-3xl">⏰</span>
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
                        <span className="text-3xl">💰</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <span className="text-2xl">📝</span>
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">Bài đăng mới từ phụ huynh Nguyễn Văn A</p>
                        <p className="text-sm text-gray-600">Cần gia sư Toán lớp 10 - 30 phút trước</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <span className="text-2xl">✅</span>
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">Hoàn thành buổi học với Trần Thị B</p>
                        <p className="text-sm text-gray-600">Vật lý lớp 11 - 2 giờ trước</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <span className="text-2xl">⭐</span>
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">Nhận đánh giá 5 sao từ Lê Văn C</p>
                        <p className="text-sm text-gray-600">Hóa học lớp 12 - 1 ngày trước</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ScheduleContent: React.FC = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lịch dạy của tôi</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600">Chức năng lịch dạy đang được phát triển...</p>
        </div>
    </div>
);

const StudentsContent: React.FC = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Học sinh của tôi</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600">Danh sách học sinh đang được phát triển...</p>
        </div>
    </div>
);

const EarningsContent: React.FC = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Thu nhập</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600">Thống kê thu nhập đang được phát triển...</p>
        </div>
    </div>
);

const ProfileContent: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await userAPI.getUserProfile(Number(userId));
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-xl">Đang tải hồ sơ...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-xl text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                    <p className="text-xl">Không có dữ liệu hồ sơ</p>
                </div>
            </div>
        );
    }

    // Construct address from street, ward, district, city
    const addressParts = [profile.street, profile.ward, profile.district, profile.city].filter(Boolean);
    const address = addressParts.join(', ');

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>

            {/* Profile Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                    <img
                        src="https://placehold.co/150x150/D1E7DD/000?text=User" // Placeholder for profile picture
                        alt={`Ảnh đại diện của ${profile.fullName}`}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-300 shadow-md mb-4 sm:mb-0 sm:mr-8"
                    />
                    <div className="flex-grow">
                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2">
                            {profile.fullName}
                        </h2>
                        <p className="text-lg text-gray-600 mb-4">Gia sư - {profile.role}</p>

                        {/* Points Section */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-sm mb-4">
                            <h3 className="text-lg font-bold mb-1">Điểm tích lũy của bạn:</h3>
                            <p className="text-2xl font-bold text-yellow-700">{profile.totalPoint} điểm</p>
                            <p className="text-sm mt-2">Sử dụng điểm để giảm giá các tài liệu và khóa học!</p>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <p className="mb-2"><span className="font-semibold">Email:</span> {profile.email}</p>
                                <p className="mb-2"><span className="font-semibold">Số điện thoại:</span> {profile.phone}</p>
                            </div>
                            <div>
                                <p className="mb-2"><span className="font-semibold">Địa chỉ:</span> {address || 'Chưa cập nhật'}</p>
                                <p><span className="font-semibold">Vai trò:</span> {profile.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info Section */}

        </div>
    );
};

const MessagesContent: React.FC = () => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const userId = Number(localStorage.getItem('userId') || 0);
            if (!userId) {
                message.error('Vui lòng đăng nhập để xem tin nhắn');
                return;
            }
            const resp = await chatAPI.getUserChatRooms(userId);
            setRooms(resp.data || []);
        } catch (err) {
            console.error('Error fetching chat rooms:', err);
            message.error('Không thể tải danh sách phòng chat');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tin nhắn</h1>
            <div className="bg-white rounded-xl shadow-md p-6">
                {loading ? (
                    <div className="text-center py-8">Đang tải...</div>
                ) : rooms.length === 0 ? (
                    <p className="text-gray-600">Bạn chưa có phòng chat nào.</p>
                ) : (
                    <div className="space-y-3">
                        {rooms.map((room: any) => (
                            <button
                                key={room.chatRoomId}
                                onClick={() => navigate(`/phongchat?roomId=${room.chatRoomId}&tutorPostId=${room.tutorPostId || ''}`)}
                                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-medium">Phòng #{room.chatRoomId}</div>
                                    <div className="text-sm text-gray-500">Bài đăng phụ huynh: {room.parentPostId} · Bài đăng gia sư: {room.tutorPostId}</div>
                                </div>
                                <div className="text-sm text-gray-400">{new Date(room.createdAt).toLocaleString()}</div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const BookingsContent: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [trackingModalVisible, setTrackingModalVisible] = useState(false);
    const [trackingBookingId, setTrackingBookingId] = useState<number | null>(null);
    const [trackingLocation, setTrackingLocation] = useState('');
    const [trackingSecurity, setTrackingSecurity] = useState('');
    const [trackingSubmitting, setTrackingSubmitting] = useState(false);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [reviewBookingId, setReviewBookingId] = useState<number | null>(null);
    const [reviewRating, setReviewRating] = useState<number>(5);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewSubmitting, setReviewSubmitting] = useState(false);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const userId = Number(localStorage.getItem('userId') || 0);
            if (!userId) {
                message.error('Vui lòng đăng nhập để xem đặt lịch');
                return;
            }
            const resp = await bookingAPI.getUserBookings(userId);
            setBookings(resp.data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            message.error('Không thể tải danh sách booking');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleShowSecurityCode = async (bookingId: number) => {
        try {
            setLoadingId(bookingId);
            const resp = await bookingAPI.getSecurityCode(bookingId);
            const code = resp?.data?.securityCode;
            if (code) {
                Modal.info({
                    title: 'Mã bảo mật',
                    content: (
                        <div>
                            <p>Mã bảo mật cho booking <strong>#{bookingId}</strong>:</p>
                            <p style={{ fontSize: 20, fontWeight: 700 }}>{code}</p>
                        </div>
                    ),
                });
            } else {
                message.error('Không nhận được mã bảo mật từ server');
            }
        } catch (err) {
            console.error('Error fetching security code:', err);
            message.error('Không thể lấy mã bảo mật. Vui lòng thử lại.');
        } finally {
            setLoadingId(null);
        }
    };

    const openTrackingModal = (bookingId: number) => {
        setTrackingBookingId(bookingId);
        setTrackingLocation('');
        setTrackingSecurity('');
        setTrackingModalVisible(true);
    };

    const openReviewModal = (bookingId: number) => {
        setReviewBookingId(bookingId);
        setReviewRating(5);
        setReviewComment('');
        setReviewModalVisible(true);
    };

    const closeReviewModal = () => {
        setReviewModalVisible(false);
        setReviewBookingId(null);
        setReviewRating(5);
        setReviewComment('');
    };

    const submitReview = async () => {
        if (!reviewBookingId) {
            message.error('Không tìm thấy bookingId');
            return;
        }
        try {
            setReviewSubmitting(true);
            const payload = { bookingId: reviewBookingId, rating: reviewRating, comment: reviewComment };
            const resp = await bookingReviewAPI.reviewBooking(payload);
            if (resp && (resp.status === 200 || resp.status === 201)) {
                message.success('Gửi đánh giá thành công');
                // mark booking as reviewed locally
                setBookings(prev => prev.map(b => b.bookingId === reviewBookingId ? { ...b, reviewed: true } : b));
                closeReviewModal();
            } else {
                console.warn('Unexpected review response', resp);
                message.error('Gửi đánh giá thất bại');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            message.error('Gửi đánh giá thất bại. Vui lòng thử lại.');
        } finally {
            setReviewSubmitting(false);
        }
    };

    const closeTrackingModal = () => {
        setTrackingModalVisible(false);
        setTrackingBookingId(null);
        setTrackingLocation('');
        setTrackingSecurity('');
    };

    const submitTracking = async () => {
        if (!trackingBookingId) {
            message.error('Không tìm thấy bookingId');
            return;
        }
        try {
            setTrackingSubmitting(true);
            const payload = {
                bookingId: trackingBookingId,
                action: 'arrived',
                location: trackingLocation,
                securityCodeUsed: trackingSecurity
            };
            const resp = await trackingAPI.createTracking(payload);
            if (resp && (resp.status === 200 || resp.status === 201)) {
                message.success('Ghi nhận tracking thành công');
                closeTrackingModal();
                // refresh bookings in case server updates status
                fetchBookings();
            } else {
                console.warn('Unexpected tracking response', resp);
                message.error('Ghi nhận tracking thất bại');
            }
        } catch (err) {
            console.error('Error creating tracking:', err);
            message.error('Ghi nhận tracking thất bại. Vui lòng thử lại.');
        } finally {
            setTrackingSubmitting(false);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'bookingId', key: 'bookingId' },
        { title: 'Phòng chat', dataIndex: 'chatRoomId', key: 'chatRoomId' },
        { title: 'Giá/Tiết', dataIndex: 'agreedPricePerSession', key: 'agreedPricePerSession', render: (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val) },
        { title: 'Buổi/tuần', dataIndex: 'sessionsPerWeek', key: 'sessionsPerWeek' },
        { title: 'Ngày dạy', dataIndex: 'agreedDays', key: 'agreedDays' },
        { title: 'Giờ dạy', dataIndex: 'agreedTime', key: 'agreedTime' },
        { title: 'Trạng thái', dataIndex: 'bookingStatus', key: 'bookingStatus' },
        { title: 'Tạo lúc', dataIndex: 'createdAt', key: 'createdAt', render: (val: string) => val ? new Date(val).toLocaleString() : '' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex items-center gap-2">
                    <Button type="primary" size="small" onClick={() => handleShowSecurityCode(record.bookingId)} loading={loadingId === record.bookingId}>
                        Xem mã
                    </Button>
                    <Button type="default" size="small" onClick={() => openTrackingModal(record.bookingId)}>
                        Tracking
                    </Button>
                    {!record.reviewed && (
                        <Button type="link" size="small" onClick={() => openReviewModal(record.bookingId)}>
                            Đánh giá
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Booking</h1>
            <div className="bg-white rounded-xl shadow-md p-6">
                {loading ? (
                    <div className="text-center py-8">Đang tải...</div>
                ) : bookings.length === 0 ? (
                    <p className="text-gray-600">Chưa có booking nào.</p>
                ) : (
                    <>
                        <Table dataSource={bookings} columns={columns} rowKey={(record: any) => record.bookingId} />

                        <Modal
                            title="Ghi nhận Tracking"
                            visible={trackingModalVisible}
                            onCancel={closeTrackingModal}
                            onOk={submitTracking}
                            confirmLoading={trackingSubmitting}
                        >
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hành động</label>
                                    <input type="text" value={'arrived'} disabled className="w-full mt-1 p-2 border rounded" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vị trí</label>
                                    <input type="text" value={trackingLocation} onChange={(e) => setTrackingLocation(e.target.value)} placeholder="Nhập vị trí (ví dụ: Hà Nội)" className="w-full mt-1 p-2 border rounded" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mã bảo mật đã dùng</label>
                                    <input type="text" value={trackingSecurity} onChange={(e) => setTrackingSecurity(e.target.value)} placeholder="Nhập mã bảo mật" className="w-full mt-1 p-2 border rounded" />
                                </div>
                            </div>
                        </Modal>

                        <Modal
                            title="Đánh giá booking"
                            visible={reviewModalVisible}
                            onCancel={closeReviewModal}
                            onOk={submitReview}
                            confirmLoading={reviewSubmitting}
                        >
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Đánh giá</label>
                                    <div className="mt-1">
                                        <Rate value={reviewRating} onChange={(val) => setReviewRating(val)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bình luận</label>
                                    <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="w-full mt-1 p-2 border rounded" rows={4} />
                                </div>
                            </div>
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
};

const CreatePostContent: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        postTitle: "",
        subject: "",
        grade: "",
        sessionsPerWeek: "",
        preferredDays: "",
        preferredTime: "",
        salaryPerSession: "",
        description: "",
    });

    const subjects = [
        { value: "", label: "Chọn môn học" },
        { value: "Toán", label: "Toán" },
        { value: "Văn", label: "Văn" },
        { value: "Tiếng Anh", label: "Tiếng Anh" },
        { value: "Vật lý", label: "Vật lý" },
        { value: "Hóa học", label: "Hóa học" },
        { value: "Sinh học", label: "Sinh học" },
        { value: "Lịch sử", label: "Lịch sử" },
        { value: "Địa lý", label: "Địa lý" },
        { value: "Tin học", label: "Tin học" },
    ];

    const grades = [
        { value: "", label: "Chọn lớp" },
        { value: "Lớp 1", label: "Lớp 1" },
        { value: "Lớp 2", label: "Lớp 2" },
        { value: "Lớp 3", label: "Lớp 3" },
        { value: "Lớp 4", label: "Lớp 4" },
        { value: "Lớp 5", label: "Lớp 5" },
        { value: "Lớp 6", label: "Lớp 6" },
        { value: "Lớp 7", label: "Lớp 7" },
        { value: "Lớp 8", label: "Lớp 8" },
        { value: "Lớp 9", label: "Lớp 9" },
        { value: "Lớp 10", label: "Lớp 10" },
        { value: "Lớp 11", label: "Lớp 11" },
        { value: "Lớp 12", label: "Lớp 12" },
        { value: "Khác", label: "Khác (Luyện thi, Giao tiếp...)" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        if (!userId) {
            message.error('Vui lòng đăng nhập để tạo bài đăng');
            navigate('/login');
            return;
        }

        try {
            setLoading(true);

            const postData = {
                creatorUserId: parseInt(userId),
                title: form.postTitle,
                subject: form.subject,
                studentGrade: form.grade,
                sessionsPerWeek: parseInt(form.sessionsPerWeek),
                preferredDays: form.preferredDays,
                preferredTime: form.preferredTime,
                pricePerSession: parseFloat(form.salaryPerSession),
                description: form.description || undefined
            };

            await classAPI.createPost(postData);

            message.success('Đăng bài tìm học sinh thành công!');

            // Reset form
            setForm({
                postTitle: "",
                subject: "",
                grade: "",
                sessionsPerWeek: "",
                preferredDays: "",
                preferredTime: "",
                salaryPerSession: "",
                description: "",
            });

        } catch (error) {
            console.error('Error creating post:', error);
            message.error('Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="bg-white rounded-xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Đăng bài tìm học sinh</h1>
                <p className="text-gray-600 mb-8">
                    Vui lòng điền đầy đủ thông tin về lớp học bạn muốn tìm học sinh.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Tiêu đề */}
                    <div>
                        <label htmlFor="postTitle" className="block text-gray-700 text-sm font-medium mb-2">
                            Tiêu đề bài đăng <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="postTitle"
                            value={form.postTitle}
                            onChange={handleChange}
                            placeholder="Ví dụ: Tìm học sinh học Toán lớp 9"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Môn học và Lớp */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">
                                Môn học <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="grade" className="block text-gray-700 text-sm font-medium mb-2">
                                Lớp <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="grade"
                                value={form.grade}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                {grades.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Số buổi/tuần */}
                    <div>
                        <label htmlFor="sessionsPerWeek" className="block text-gray-700 text-sm font-medium mb-2">
                            Số buổi/tuần <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="sessionsPerWeek"
                            value={form.sessionsPerWeek}
                            onChange={handleChange}
                            placeholder="Ví dụ: 3"
                            min="1"
                            max="7"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Ngày học */}
                    <div>
                        <label htmlFor="preferredDays" className="block text-gray-700 text-sm font-medium mb-2">
                            Ngày học trong tuần <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="preferredDays"
                            value={form.preferredDays}
                            onChange={handleChange}
                            placeholder="Ví dụ: Thứ 2, Thứ 4, Thứ 6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Thời gian */}
                    <div>
                        <label htmlFor="preferredTime" className="block text-gray-700 text-sm font-medium mb-2">
                            Thời gian học <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="preferredTime"
                            value={form.preferredTime}
                            onChange={handleChange}
                            placeholder="Ví dụ: 18:00 - 20:00"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Lương/buổi */}
                    <div>
                        <label htmlFor="salaryPerSession" className="block text-gray-700 text-sm font-medium mb-2">
                            Lương/buổi (VNĐ) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="salaryPerSession"
                            value={form.salaryPerSession}
                            onChange={handleChange}
                            placeholder="Ví dụ: 200000"
                            min="0"
                            step="10000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                            Mô tả thêm
                        </label>
                        <textarea
                            id="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Thêm mô tả chi tiết về yêu cầu..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Đang đăng...' : 'Đăng bài'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({
                                postTitle: "",
                                subject: "",
                                grade: "",
                                sessionsPerWeek: "",
                                preferredDays: "",
                                preferredTime: "",
                                salaryPerSession: "",
                                description: "",
                            })}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                        >
                            Làm mới
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TutorDashboard;
