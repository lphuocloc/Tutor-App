/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsContent from '../components/PostsContent';
import TutorPostsContent from '../components/TutorPostsContent';
import {
    message,
    Table,
    Modal,
    Button,
    Rate,
    Form,
    Input,
    Select,
    InputNumber,
    Card,
    Space,
    Typography,
    Divider,
    Row,
    Col,
    Alert
} from 'antd';
import { classAPI, chatAPI, bookingAPI, trackingAPI, bookingReviewAPI, userAPI } from '../api/endpoints';
import { fetchProfile, getUserNameByIdFromStore, useProfile } from '../store/profile';

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
        { id: 'posts' as MenuType, label: 'Bài đăng phụ huynh', icon: '📝' },
        { id: 'createPost' as MenuType, label: 'Đăng bài tìm học sinh', icon: '✏️' },
        { id: 'myPosts' as MenuType, label: 'Bài đăng của tôi', icon: '📋' },
        // { id: 'schedule' as MenuType, label: 'Lịch dạy', icon: '📅' },
        // { id: 'students' as MenuType, label: 'Học sinh của tôi', icon: '👥' },
        // { id: 'earnings' as MenuType, label: 'Thu nhập', icon: '💰' },
        { id: 'bookings' as MenuType, label: 'Booking', icon: '📆' },
        { id: 'messages' as MenuType, label: 'Tin nhắn', icon: '💬' },
        { id: 'profile' as MenuType, label: 'Hồ sơ cá nhân', icon: '👤' },
    ];

    const renderContent = () => {
        switch (activeMenu) {
            case 'posts':
                return <PostsContent />;
            case 'createPost':
                return <CreatePostContent />;
            case 'myPosts':
                return <TutorPostsContent />;
            case 'bookings':
                return <BookingsContent />;
            case 'profile':
                return <ProfileContent />;
            case 'messages':
                return <MessagesContent />;
            default:
                return <PostsContent />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-br from-indigo-600 to-purple-600 text-white transition-all duration-300 flex flex-col shadow-lg`}>
                {/* Header with Toggle */}
                <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} border-b border-indigo-500`}>
                    {sidebarOpen && <h2 className="text-lg font-bold">Tutor Panel</h2>}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all"
                        title={sidebarOpen ? 'Thu gọn' : 'Mở rộng'}
                    >
                        <span className="text-base font-bold">{sidebarOpen ? '◀' : '▶'}</span>
                    </button>
                </div>

                {/* Menu Items */}
                <nav className={`flex-1 ${sidebarOpen ? 'p-4' : 'p-2'} space-y-2 overflow-y-auto scrollbar-hide`}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveMenu(item.id)}
                            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-3 rounded-lg transition-all group relative ${activeMenu === item.id
                                ? 'bg-white text-indigo-600 shadow-md scale-105'
                                : 'hover:bg-white/20 hover:scale-105'
                                }`}
                            title={!sidebarOpen ? item.label : ''}
                        >
                            <span className={`${sidebarOpen ? 'text-lg' : 'text-xl'} flex-shrink-0`}>{item.icon}</span>
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
                        <span className={`${sidebarOpen ? 'text-lg' : 'text-xl'} flex-shrink-0`}>🚪</span>
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
                const userId = localStorage.getItem('userId');
                const response = await userAPI.getProfile(Number(userId));
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
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                    <p className="text-xl">Đang tải hồ sơ...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                    <p className="text-xl text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                    <p className="text-xl">Không có dữ liệu hồ sơ</p>
                </div>
            </div>
        );
    }

    // Construct address from street, ward, district, city
    const addressParts = [profile.street, profile.ward, profile.district, profile.city].filter(Boolean);
    const address = addressParts.join(', ');

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>

            {/* Profile Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4 sm:mb-0 sm:mr-8">
                        Gia Sư
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2">
                            {profile.fullName}
                        </h2>
                        <p className="text-base text-gray-600 mb-4">Gia sư - {profile.role}</p>

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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                    <div className="text-3xl">👋</div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-blue-800 mb-2">Chào mừng bạn đến với Tutor Panel!</h3>
                        <p className="text-blue-700 mb-4">
                            Cảm ơn bạn đã tham gia nền tảng của chúng tôi. Hãy bắt đầu hành trình dạy học bổ ích!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/60 rounded-lg p-3">
                                <h4 className="font-semibold text-blue-800 mb-1">💡 Mẹo cho gia sư</h4>
                                <ul className="text-blue-700 space-y-1">
                                    <li>• Tạo bài đăng chi tiết, rõ ràng</li>
                                    <li>• Phản hồi tin nhắn kịp thời</li>
                                    <li>• Chuẩn bị kỹ cho mỗi buổi học</li>
                                </ul>
                            </div>

                            <div className="bg-white/60 rounded-lg p-3">
                                <h4 className="font-semibold text-blue-800 mb-1">📋 Lưu ý quan trọng</h4>
                                <ul className="text-blue-700 space-y-1">
                                    <li>• Tuân thủ lịch học đã thỏa thuận</li>
                                    <li>• Báo cáo vấn đề kịp thời</li>
                                    <li>• Duy trì thái độ chuyên nghiệp</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Quick Actions */}


        </div>
    );
};

const MessagesContent: React.FC = () => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const users = useProfile();

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
        fetchProfile();
        // Set up polling to refresh chat rooms every 5 seconds
        const intervalId = setInterval(() => {
            fetchRooms();
        }, 5000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Tin nhắn</h1>
            <div className="bg-white rounded-xl shadow-sm p-6">
                {loading ? (
                    <div className="text-center py-8">Đang tải...</div>
                ) : rooms.length === 0 ? (
                    <p className="text-gray-600">Bạn chưa có phòng chat nào.</p>
                ) : (
                    <div className="space-y-3">
                        {rooms.map((room: any) => (
                            <button
                                key={room.chatRoomId}
                                onClick={() => navigate(`/phongchat?roomId=${room.chatRoomId}&parentPostId=${room.parentPostId || ''}&parentUserId=${room.parentUserId || ''}&tutorUserId=${room.tutorUserId || ''}`)}
                                className="w-full text-left p-3  rounded-lg hover:bg-gray-50 flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-medium">Phòng #{room.chatRoomId}</div>
                                    <div className="text-sm text-gray-500">Phụ huynh: {getUserNameByIdFromStore(users, room.parentUserId)} · Gia sư: {getUserNameByIdFromStore(users, room.tutorUserId)}</div>
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
    const [trackingModalVisible, setTrackingModalVisible] = useState(false);
    const [trackingBookingId, setTrackingBookingId] = useState<number | null>(null);
    const [trackingAction, setTrackingAction] = useState<string>('arrived');
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
            const bookingsData = resp.data || [];

            // Fetch security code for each booking
            const bookingsWithSecurity = await Promise.all(
                bookingsData.map(async (booking: any) => {
                    try {
                        const secResp = await bookingAPI.getSecurityCode(booking.bookingId);
                        return {
                            ...booking,
                            securityCode: secResp?.data?.securityCode || 'Chưa có'
                        };
                    } catch (err) {
                        console.error(`Error fetching security code for booking ${booking.bookingId}:`, err);
                        return {
                            ...booking,
                            securityCode: 'Không lấy được'
                        };
                    }
                })
            );

            setBookings(bookingsWithSecurity);
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

    const openTrackingModal = (bookingId: number) => {
        setTrackingBookingId(bookingId);
        setTrackingAction('arrived');
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
        setTrackingAction('arrived');
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
                action: trackingAction,
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
        { title: 'Địa chỉ', dataIndex: 'securityCode', key: 'securityCode', render: (val: string) => val || 'Chưa có' },
        { title: 'Tạo lúc', dataIndex: 'createdAt', key: 'createdAt', render: (val: string) => val ? new Date(val).toLocaleString() : '' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: any) => (
                <div className="flex items-center gap-2">
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Booking</h1>
            <div className="bg-white rounded-xl shadow-sm p-6">
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
                                    <select
                                        value={trackingAction}
                                        onChange={(e) => setTrackingAction(e.target.value)}
                                        className="w-full mt-1 p-2 border rounded"
                                    >
                                        <option value="arrived">Arrived (Đã đến)</option>
                                        <option value="Completed">Completed (Hoàn thành)</option>
                                    </select>
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
    const [form] = Form.useForm();

    const subjects = [
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

    const handleSubmit = async (values: {
        postTitle: string;
        subject: string;
        grade: string[] | string;
        sessionsPerWeek: number;
        preferredDays: string;
        preferredTime: string;
        salaryPerSession: number;
        description?: string;
    }) => {
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
                title: values.postTitle,
                subject: values.subject,
                studentGrade: Array.isArray(values.grade) ? values.grade.join(', ') : values.grade,
                sessionsPerWeek: values.sessionsPerWeek,
                preferredDays: values.preferredDays,
                preferredTime: values.preferredTime,
                pricePerSession: values.salaryPerSession,
                description: values.description || undefined
            };

            await classAPI.createPost(postData);

            message.success('Đăng bài tìm học sinh thành công!');
            form.resetFields();

        } catch (error) {
            console.error('Error creating post:', error);
            message.error('Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
            <div className="max-w-3xl mx-auto">
                <Card className="shadow-sm">
                    <Space direction="vertical" size="middle" className="w-full">
                        <div className="text-center">
                            <Typography.Title level={3} className="mb-2">
                                Đăng bài tìm học sinh
                            </Typography.Title>
                            <Typography.Text type="secondary">
                                Vui lòng điền đầy đủ thông tin về lớp học bạn muốn tìm học sinh.
                            </Typography.Text>
                        </div>

                        <Alert
                            message="Lưu ý quan trọng"
                            description="Hãy điền đầy đủ và chính xác thông tin để thu hút học sinh phù hợp nhất."
                            type="info"
                            showIcon
                        />

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            size="middle"
                        >
                            <Row gutter={12}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Tiêu đề bài đăng"
                                        name="postTitle"
                                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài đăng!' }]}
                                    >
                                        <Input
                                            placeholder="Ví dụ: Tìm học sinh học Toán lớp 9"
                                            maxLength={100}
                                            showCount
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Môn học"
                                        name="subject"
                                        rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}
                                    >
                                        <Select placeholder="Chọn môn học">
                                            {subjects.map(subject => (
                                                <Select.Option key={subject.value} value={subject.value}>
                                                    {subject.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Lớp học (có thể chọn nhiều)"
                                        name="grade"
                                        rules={[{ required: true, message: 'Vui lòng chọn ít nhất một lớp!' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Chọn lớp học"
                                            maxTagCount={3}
                                            allowClear
                                        >
                                            {grades.map(grade => (
                                                <Select.Option key={grade.value} value={grade.value}>
                                                    {grade.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Số buổi/tuần"
                                        name="sessionsPerWeek"
                                        rules={[{ required: true, message: 'Vui lòng nhập số buổi!' }]}
                                    >
                                        <InputNumber
                                            min={1}
                                            max={7}
                                            placeholder="Ví dụ: 3"
                                            className="w-full"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Lương/buổi (VNĐ)"
                                        name="salaryPerSession"
                                        rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            step={10000}
                                            placeholder="Ví dụ: 200000"
                                            className="w-full"
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Thời gian học"
                                        name="preferredTime"
                                        rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                                    >
                                        <Input placeholder="Ví dụ: 18:00 - 20:00" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Ngày học trong tuần"
                                        name="preferredDays"
                                        rules={[{ required: true, message: 'Vui lòng nhập ngày học!' }]}
                                    >
                                        <Input placeholder="Ví dụ: Thứ 2, Thứ 4, Thứ 6" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Mô tả thêm"
                                        name="description"
                                    >
                                        <Input.TextArea
                                            rows={3}
                                            placeholder="Thêm mô tả chi tiết về yêu cầu, kinh nghiệm cần thiết, hoặc thông tin khác..."
                                            maxLength={500}
                                            showCount
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider />

                            <Row gutter={12}>
                                <Col span={24}>
                                    <Space className="w-full justify-end">
                                        <Button
                                            onClick={() => form.resetFields()}
                                            size="middle"
                                        >
                                            Làm mới
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={loading}
                                            size="middle"
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            {loading ? 'Đang đăng...' : 'Đăng bài'}
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Form>
                    </Space>
                </Card>
            </div>
        </div>
    );
};

export default TutorDashboard;
