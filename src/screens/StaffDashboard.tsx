/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Button, Space, Modal, Descriptions, Image, Spin, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    useTutorProfiles,
    useLoading,
    getAllTutorProfiles
} from '../store/tutorProfiles';
import type { TutorProfile } from '../types/tutorProfile';
import { tutorAPI, bookingAPI, trackingAPI } from '../api/endpoints';
import { fetchAllTracking, useTracking, useTrackingLoading } from '../store/tracking';
import { fetchAllReviews, useReview, useReviewLoading } from '../store/review';

type SectionType = 'profiles' | 'bookings' | 'tracking' | 'reviews';

const StaffDashboard: React.FC = () => {
    const navigate = useNavigate();
    const allTracking = useTracking();
    const allTrackingLoading = useTrackingLoading();
    const userName = localStorage.getItem('userName') || 'Staff';

    const profiles = useTutorProfiles();
    const loading = useLoading();

    const feedBack = useReview();
    const feedBackLoading = useReviewLoading();

    const [activeSection, setActiveSection] = useState<SectionType>('profiles');
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<TutorProfile | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [pendingApprovalId, setPendingApprovalId] = useState<number | null>(null);
    const [reviewConfirmVisible, setReviewConfirmVisible] = useState(false);
    const [pendingReviewStatus, setPendingReviewStatus] = useState<'Approved' | 'Rejected' | 'Suspended' | null>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [trackingModalVisible, setTrackingModalVisible] = useState(false);
    const [trackingEntries, setTrackingEntries] = useState<any[]>([]);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [selectedTrackingBookingId, setSelectedTrackingBookingId] = useState<number | null>(null);
    const [tutorTrackingModalVisible, setTutorTrackingModalVisible] = useState(false);
    const [tutorTrackingEntries, setTutorTrackingEntries] = useState<any[]>([]);
    const [tutorTrackingLoading, setTutorTrackingLoading] = useState(false);
    const [selectedTutorUserId, setSelectedTutorUserId] = useState<number | null>(null);

    useEffect(() => {
        getAllTutorProfiles();
        fetchBookings();
        fetchAllTracking();
        fetchAllReviews();
    }, []);




    const fetchBookings = async () => {
        setBookingsLoading(true);
        try {
            const res = await bookingAPI.getAllBookings();
            console.log('Bookings:', res.data);
            setBookings(res.data || []);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách booking:', error);
            setBookings([]);
        } finally {
            setBookingsLoading(false);
        }
    };

    const fetchTrackingForBooking = async (bookingId: number) => {
        setSelectedTrackingBookingId(bookingId);
        setTrackingLoading(true);
        setTrackingModalVisible(true);
        try {
            const res = await trackingAPI.getTrackingByBooking(bookingId);
            console.log('Tracking for booking', bookingId, ':', res.data);
            setTrackingEntries(res.data || []);
        } catch (error) {
            console.error('Error fetching tracking:', error);
            setTrackingEntries([]);
            message.error('Không thể lấy thông tin tracking');
        } finally {
            setTrackingLoading(false);
        }
    };

    const fetchTrackingByTutor = async (tutorUserId: number) => {
        setSelectedTutorUserId(tutorUserId);
        setTutorTrackingLoading(true);
        setTutorTrackingModalVisible(true);
        try {
            const res = await trackingAPI.getAllTrackingByTutor(tutorUserId);
            console.log('Tracking for tutor', tutorUserId, ':', res.data);
            setTutorTrackingEntries(res.data || []);
        } catch (error) {
            console.error('Error fetching tutor tracking:', error);
            setTutorTrackingEntries([]);
            message.error('Không thể lấy thông tin tracking của gia sư');
        } finally {
            setTutorTrackingLoading(false);
        }
    };

    const handleViewDetail = async (tutorProfileId: number) => {
        setDetailLoading(true);
        setDetailModalVisible(true);
        try {
            const res = await tutorAPI.getTutorProfileDetail(tutorProfileId);
            console.log('Profile detail:', res.data);
            setSelectedProfile(res.data);
        } catch (error) {
            console.error('Error fetching profile detail:', error);
            message.error('Không thể tải thông tin chi tiết hồ sơ');
        } finally {
            setDetailLoading(false);
        }
    };

    const handleQuickApprove = (tutorProfileId: number) => {
        setPendingApprovalId(tutorProfileId);
        setConfirmModalVisible(true);
    };

    const executeQuickApprove = async () => {
        if (pendingApprovalId === null) return;

        setReviewLoading(true);
        setConfirmModalVisible(false);

        const userId = Number(localStorage.getItem('userId')) || 0;

        try {
            await tutorAPI.reviewTutorProfile({
                TutorProfileId: pendingApprovalId,
                ReviewerBy: userId,
                status: 'Approved',
                Reason: undefined
            });
            message.success('Đã phê duyệt hồ sơ thành công!');
            setPendingApprovalId(null);
            getAllTutorProfiles();
        } catch (error: any) {
            console.error('Error approving:', error);
            message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi phê duyệt');
        } finally {
            setReviewLoading(false);
        }
    };

    const handleReview = async (status: 'Approved' | 'Rejected' | 'Suspended') => {
        if (status === 'Rejected' || status === 'Suspended') {
            if (!rejectReason.trim()) {
                message.error('Vui lòng nhập lý do từ chối/đình chỉ');
                return;
            }
        }

        setPendingReviewStatus(status);
        setReviewConfirmVisible(true);
    };

    const executeReview = async () => {
        if (!selectedProfile || !pendingReviewStatus) return;

        setReviewLoading(true);
        setReviewConfirmVisible(false);

        const userId = Number(localStorage.getItem('userId')) || 0;

        try {
            await tutorAPI.reviewTutorProfile({
                TutorProfileId: selectedProfile.tutorProfileId,
                ReviewerBy: userId,
                status: pendingReviewStatus,
                Reason: (pendingReviewStatus === 'Rejected' || pendingReviewStatus === 'Suspended') ? rejectReason : undefined
            });

            message.success(`Đã ${pendingReviewStatus === 'Approved' ? 'phê duyệt' : pendingReviewStatus === 'Rejected' ? 'từ chối' : 'đình chỉ'} hồ sơ thành công!`);

            setDetailModalVisible(false);
            setSelectedProfile(null);
            setRejectReason('');
            setPendingReviewStatus(null);

            getAllTutorProfiles();
        } catch (error: any) {
            console.error('Error reviewing profile:', error);
            console.error('Error response:', error?.response);
            message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi xử lý hồ sơ');
        } finally {
            setReviewLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const eduMap: Record<string, string> = {
        'HighSchoolGraduate': 'Tốt nghiệp THPT',
        'CollegeStudent': 'Sinh viên Cao đẳng',
        'UniversityStudent': 'Sinh viên Đại học',
        'CollegeGraduate': 'Tốt nghiệp Cao đẳng',
        'UniversityGraduate': 'Tốt nghiệp Đại học',
        'Postgraduate': 'Sau Đại học'
    };

    const columns: ColumnsType<TutorProfile> = [
        {
            title: 'ID',
            dataIndex: 'tutorProfileId',
            key: 'tutorProfileId',
            width: 80,
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 100,
        },
        {
            title: 'Trình độ',
            dataIndex: 'education',
            key: 'education',
            width: 150,
            render: (education: string) => eduMap[education] || education,
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experienceYears',
            key: 'experienceYears',
            width: 120,
            render: (years: number) => `${years} năm`,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status: string) => {
                const statusConfig: Record<string, { color: string; text: string }> = {
                    'Pending': { color: 'gold', text: 'Chờ duyệt' },
                    'Approved': { color: 'green', text: 'Đã duyệt' },
                    'Rejected': { color: 'red', text: 'Từ chối' }
                };
                const config = statusConfig[status] || { color: 'default', text: status };
                return <Tag color={config.color}>{config.text}</Tag>;
            }
        },
        {
            title: 'Chứng chỉ',
            key: 'certifications',
            width: 100,
            render: (_, record) => record.certifications.length,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        onClick={() => handleViewDetail(record.tutorProfileId)}
                    >
                        Xem
                    </Button>
                    {record.status === 'Pending' && (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleQuickApprove(record.tutorProfileId)}
                        >
                            Duyệt
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const renderProfilesSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Danh sách hồ sơ gia sư
            </h2>
            <Table
                columns={columns}
                dataSource={profiles}
                loading={loading}
                rowKey="tutorProfileId"
                pagination={{
                    pageSize: 10,
                    showTotal: (total) => `Tổng ${total} hồ sơ`,
                    showSizeChanger: true,
                }}
                scroll={{ x: 1200 }}
            />
        </div>
    );

    const renderBookingsSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Danh sách Booking
            </h2>
            <Table
                columns={[
                    { title: 'ID', dataIndex: 'bookingId', key: 'bookingId', width: 80 },
                    { title: 'ChatRoom', dataIndex: 'chatRoomId', key: 'chatRoomId', width: 100 },
                    {
                        title: 'Giá/Tiết',
                        dataIndex: 'agreedPricePerSession',
                        key: 'agreedPricePerSession',
                        width: 120,
                        render: (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
                    },
                    { title: 'Buổi/tuần', dataIndex: 'sessionsPerWeek', key: 'sessionsPerWeek', width: 100 },
                    { title: 'Ngày dạy', dataIndex: 'agreedDays', key: 'agreedDays', width: 150 },
                    { title: 'Giờ dạy', dataIndex: 'agreedTime', key: 'agreedTime', width: 100 },
                    { title: 'Từ ngày', dataIndex: 'startDate', key: 'startDate', width: 120 },
                    { title: 'Đến ngày', dataIndex: 'endDate', key: 'endDate', width: 120 },
                    { title: 'Trạng thái', dataIndex: 'bookingStatus', key: 'bookingStatus', width: 120 },
                    {
                        title: 'Tạo lúc',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        width: 150,
                        render: (val: string) => val ? new Date(val).toLocaleString('vi-VN') : ''
                    },
                    {
                        title: 'Hành động',
                        key: 'action',
                        width: 120,
                        render: (_: any, record: any) => (
                            <Button type="link" onClick={() => fetchTrackingForBooking(record.bookingId)}>
                                Xem tracking
                            </Button>
                        )

                    }
                ]}
                dataSource={bookings}
                loading={bookingsLoading}
                rowKey="bookingId"
                pagination={{
                    pageSize: 10,
                    showTotal: (total) => `Tổng ${total} booking`,
                    showSizeChanger: true,
                }}
                scroll={{ x: 1400 }}
            />
        </div>
    );

    const renderTrackingSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Quản lý Tracking
                </h2>
                <Button
                    type="primary"
                    onClick={fetchAllTracking}
                    loading={allTrackingLoading}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 border-0"
                >
                    🔄 Làm mới
                </Button>
            </div>
            <Table
                columns={[
                    { title: 'ID', dataIndex: 'trackingId', key: 'trackingId', width: 80 },
                    { title: 'Booking ID', dataIndex: 'bookingId', key: 'bookingId', width: 100 },
                    {
                        title: "Gia sư",
                        dataIndex: "tutorUserName",
                        key: "tutorUserName",
                        width: 150,
                        render: (name: string, record: any) => (
                            <Button
                                type="link"
                                onClick={() => fetchTrackingByTutor(record.tutorUserId)}
                            >
                                {name}
                            </Button>
                        )
                    },
                    { title: 'Hành động', dataIndex: 'action', key: 'action', width: 120 },
                    {
                        title: 'Thời gian',
                        dataIndex: 'actionAt',
                        key: 'actionAt',
                        width: 180,
                        render: (val: string) => val ? new Date(val).toLocaleString('vi-VN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        }) : ''
                    },
                    { title: 'Location', dataIndex: 'location', key: 'location', width: 150 },
                ]}
                dataSource={allTracking}
                loading={allTrackingLoading}
                rowKey="trackingId"
                pagination={{
                    pageSize: 15,
                    showTotal: (total) => `Tổng ${total} bản ghi tracking`,
                    showSizeChanger: true,
                }}
                scroll={{ x: 1200 }}
            />
        </div>
    );

    const renderReviewsSection = () => (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Quản lý Đánh giá
                </h2>
                <Button
                    type="primary"
                    onClick={fetchAllReviews}
                    loading={feedBackLoading}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 border-0"
                >
                    🔄 Làm mới
                </Button>
            </div>
            <Table
                columns={[
                    { title: 'ID', dataIndex: 'reviewId', key: 'reviewId', width: 80 },
                    { title: 'Booking ID', dataIndex: 'bookingId', key: 'bookingId', width: 100 },
                    { title: 'Từ người dùng', dataIndex: 'fromUserName', key: 'fromUserName', width: 150 },
                    { title: 'Đến người dùng', dataIndex: 'toUserName', key: 'toUserName', width: 150 },
                    {
                        title: 'Đánh giá',
                        dataIndex: 'rating',
                        key: 'rating',
                        width: 120,
                        render: (val: number) => '⭐'.repeat(val)
                    },
                    { title: 'Nhận xét', dataIndex: 'comment', key: 'comment', ellipsis: true },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        width: 180,
                        render: (val: string) => val ? new Date(val).toLocaleString('vi-VN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        }) : ''
                    },
                ]}
                dataSource={feedBack || []}
                loading={feedBackLoading}
                rowKey="reviewId"
                pagination={{
                    pageSize: 15,
                    showTotal: (total) => `Tổng ${total} đánh giá`,
                    showSizeChanger: true,
                }}
                scroll={{ x: 1200 }}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex flex-col shadow-lg">
                {/* Header */}
                <div className="p-6 border-b border-blue-500">
                    <h2 className="text-xl font-bold">Staff Panel</h2>
                    <p className="text-blue-100 text-sm mt-1">{userName}</p>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button
                        onClick={() => setActiveSection('profiles')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${activeSection === 'profiles'
                            ? 'bg-white text-blue-600 shadow-md scale-105'
                            : 'hover:bg-white/20 hover:scale-105'
                            }`}
                    >
                        <span className="text-xl">📋</span>
                        <span className="font-medium"> Hồ sơ gia sư</span>
                    </button>

                    <button
                        onClick={() => setActiveSection('bookings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${activeSection === 'bookings'
                            ? 'bg-white text-blue-600 shadow-md scale-105'
                            : 'hover:bg-white/20 hover:scale-105'
                            }`}
                    >
                        <span className="text-xl">📚</span>
                        <span className="font-medium">Booking</span>
                    </button>

                    <button
                        onClick={() => setActiveSection('tracking')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${activeSection === 'tracking'
                            ? 'bg-white text-blue-600 shadow-md scale-105'
                            : 'hover:bg-white/20 hover:scale-105'
                            }`}
                    >
                        <span className="text-xl">🔍</span>
                        <span className="font-medium">Tracking</span>
                    </button>

                    <button
                        onClick={() => setActiveSection('reviews')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${activeSection === 'reviews'
                            ? 'bg-white text-blue-600 shadow-md scale-105'
                            : 'hover:bg-white/20 hover:scale-105'
                            }`}
                    >
                        <span className="text-xl">⭐</span>
                        <span className="font-medium">Đánh giá</span>
                    </button>
                </nav>

                {/* Footer - Logout */}
                <div className="p-4 border-t border-blue-500">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
                    >
                        <span className="text-xl">🚪</span>
                        <span className="font-medium">Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}


                {/* Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {activeSection === 'profiles' && renderProfilesSection()}
                    {activeSection === 'bookings' && renderBookingsSection()}
                    {activeSection === 'tracking' && renderTrackingSection()}
                    {activeSection === 'reviews' && renderReviewsSection()}
                </div>
            </div>

            {/* Tracking Modal (from Bookings section) */}
            <Modal
                title={selectedTrackingBookingId ? `Lịch sử Tracking #${selectedTrackingBookingId}` : 'Lịch sử Tracking'}
                open={trackingModalVisible}
                onCancel={() => setTrackingModalVisible(false)}
                footer={null}
                width={800}
            >
                {trackingLoading ? (
                    <div className="text-center py-8"><Spin /></div>
                ) : trackingEntries.length === 0 ? (
                    <p>Không có tracking nào.</p>
                ) : (
                    <Table
                        dataSource={trackingEntries}
                        rowKey={(rec: any) => rec.trackingId}
                        pagination={false}
                        columns={[
                            { title: 'ID', dataIndex: 'trackingId', key: 'trackingId' },
                            { title: 'Gia sư', dataIndex: 'tutorUserName', key: 'trackingId' },
                            { title: 'Thời gian', dataIndex: 'actionAt', key: 'timestamp', render: (val: string) => val ? new Date(val).toLocaleString('vi-VN') : '' },
                            { title: 'Loại', dataIndex: 'action', key: 'type' },
                            { title: 'Vị trí', dataIndex: 'location', key: 'location' },
                        ]}
                    />
                )}
            </Modal>

            {/* Tutor Tracking Modal */}
            <Modal
                title={selectedTutorUserId ? `Tracking của gia sư #${selectedTutorUserId}` : 'Tracking của gia sư'}
                open={tutorTrackingModalVisible}
                onCancel={() => setTutorTrackingModalVisible(false)}
                footer={null}
                width={1000}
            >
                {tutorTrackingLoading ? (
                    <div className="text-center py-8"><Spin /></div>
                ) : tutorTrackingEntries.length === 0 ? (
                    <p>Không có tracking nào cho gia sư này.</p>
                ) : (
                    <Table
                        dataSource={tutorTrackingEntries}
                        rowKey={(rec: any) => rec.trackingId}
                        pagination={{ pageSize: 10 }}
                        columns={[
                            { title: 'ID', dataIndex: 'trackingId', key: 'trackingId', width: 80 },
                            { title: 'Booking ID', dataIndex: 'bookingId', key: 'bookingId', width: 100 },
                            { title: 'Hành động', dataIndex: 'action', key: 'action', width: 120 },
                            {
                                title: 'Thời gian',
                                dataIndex: 'actionAt',
                                key: 'actionAt',
                                width: 180,
                                render: (val: string) => val ? new Date(val).toLocaleString('vi-VN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                }) : ''
                            },
                            { title: 'Vị trí', dataIndex: 'location', key: 'location', width: 150 },
                        ]}
                    />
                )}
            </Modal>

            {/* Detail Modal */}
            <Modal
                title="Chi tiết hồ sơ gia sư"
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setDetailModalVisible(false)}>
                        Đóng
                    </Button>,
                    ...(selectedProfile?.status === 'Pending' ? [
                        <Button
                            key="approve"
                            type="primary"
                            loading={reviewLoading}
                            onClick={() => handleReview('Approved')}
                        >
                            Phê duyệt
                        </Button>,
                        <Button
                            key="reject"
                            danger
                            loading={reviewLoading}
                            onClick={() => handleReview('Rejected')}
                        >
                            Từ chối
                        </Button>,
                        <Button
                            key="suspend"
                            danger
                            type="default"
                            loading={reviewLoading}
                            onClick={() => handleReview('Suspended')}
                        >
                            Đình chỉ
                        </Button>
                    ] : [])
                ]}
                width={800}
            >
                {detailLoading ? (
                    <div className="text-center py-8">
                        <Spin size="large" />
                    </div>
                ) : selectedProfile ? (
                    <div className="space-y-6">
                        <Descriptions bordered column={2}>
                            <Descriptions.Item label="ID">{selectedProfile.tutorProfileId}</Descriptions.Item>
                            <Descriptions.Item label="User ID">{selectedProfile.userId}</Descriptions.Item>
                            <Descriptions.Item label="Trình độ" span={2}>
                                {eduMap[selectedProfile.education] || selectedProfile.education}
                            </Descriptions.Item>
                            <Descriptions.Item label="Kinh nghiệm">
                                {selectedProfile.experienceYears} năm
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color={
                                    selectedProfile.status === 'Approved' ? 'green' :
                                        selectedProfile.status === 'Rejected' ? 'red' : 'gold'
                                }>
                                    {selectedProfile.status === 'Approved' ? 'Đã duyệt' :
                                        selectedProfile.status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt'}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo" span={2}>
                                {new Date(selectedProfile.createdAt).toLocaleString('vi-VN')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mô tả" span={2}>
                                {selectedProfile.description || 'Không có mô tả'}
                            </Descriptions.Item>
                        </Descriptions>

                        <div>
                            <h3 className="text-lg font-semibold mb-3">Chứng chỉ ({selectedProfile.certifications.length})</h3>
                            <div className="space-y-4">
                                {selectedProfile.certifications.map((cert) => (
                                    <div key={cert.certificationId} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{cert.documentType}</p>
                                                <p className="text-sm text-gray-600 mt-1">{cert.note}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Ngày nộp: {new Date(cert.submittedAt).toLocaleString('vi-VN')}
                                                </p>
                                            </div>
                                            <Tag color={
                                                cert.status === 'Approved' ? 'green' :
                                                    cert.status === 'Rejected' ? 'red' : 'gold'
                                            }>
                                                {cert.status === 'Approved' ? 'Đã duyệt' :
                                                    cert.status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt'}
                                            </Tag>
                                        </div>
                                        <div className="mt-3">
                                            <Image
                                                src={cert.fileUrl}
                                                alt={cert.documentType}
                                                width={200}
                                                className="rounded"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedProfile.status === 'Pending' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lý do từ chối/đình chỉ (bắt buộc khi từ chối hoặc đình chỉ)
                                </label>
                                <Input.TextArea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Nhập lý do từ chối hoặc đình chỉ..."
                                    rows={4}
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>
                ) : null}
            </Modal>

            {/* Quick Approve Confirmation Modal */}
            <Modal
                title="Xác nhận phê duyệt nhanh"
                open={confirmModalVisible}
                onOk={executeQuickApprove}
                onCancel={() => {
                    setConfirmModalVisible(false);
                    setPendingApprovalId(null);
                }}
                okText="Xác nhận"
                cancelText="Hủy"
                confirmLoading={reviewLoading}
            >
                <p>Bạn có chắc chắn muốn phê duyệt hồ sơ này?</p>
            </Modal>

            {/* Review Confirmation Modal */}
            <Modal
                title="Xác nhận thao tác"
                open={reviewConfirmVisible}
                onOk={executeReview}
                onCancel={() => {
                    setReviewConfirmVisible(false);
                    setPendingReviewStatus(null);
                }}
                okText="Xác nhận"
                cancelText="Hủy"
                confirmLoading={reviewLoading}
            >
                {pendingReviewStatus === 'Approved' ? (
                    <p>Bạn có chắc chắn muốn phê duyệt hồ sơ này?</p>
                ) : (
                    <div>
                        <p>Bạn có chắc chắn muốn {pendingReviewStatus === 'Rejected' ? 'từ chối' : 'đình chỉ'} hồ sơ này?</p>
                        <p className="mt-2"><strong>Lý do:</strong> {rejectReason}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default StaffDashboard;
