/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Table, Card, Spin, message, Button, Modal, Rate } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Booking } from '../types/booking';
import type { Tracking } from '../types/tracking';
import { getAllBookingByUserId } from '../store/booking';
import { trackingAPI, bookingReviewAPI } from '../api/endpoints';

const BookingPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [trackingModalVisible, setTrackingModalVisible] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [trackingData, setTrackingData] = useState<Tracking[]>([]);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [reviewBookingId, setReviewBookingId] = useState<number | null>(null);
    const [reviewRating, setReviewRating] = useState<number>(5);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewSubmitting, setReviewSubmitting] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const userId = Number(localStorage.getItem('userId') || 0);
            if (!userId) {
                message.error('Không tìm thấy thông tin người dùng');
                return;
            }
            const data = await getAllBookingByUserId(userId);
            setBookings(data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            message.error('Không thể tải danh sách booking');
        } finally {
            setLoading(false);
        }
    };

    const handleViewTracking = async (bookingId: number) => {
        setSelectedBookingId(bookingId);
        setTrackingModalVisible(true);
        setTrackingLoading(true);
        try {
            const response = await trackingAPI.getTrackingByBooking(bookingId);
            setTrackingData(response.data || []);
        } catch (error) {
            console.error('Error fetching tracking:', error);
            message.error('Không thể tải dữ liệu tracking');
        } finally {
            setTrackingLoading(false);
        }
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
                setBookings(prev => prev.map(b => b.bookingId === reviewBookingId ? { ...b, reviewed: 'true' } : b));
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

    const trackingColumns: ColumnsType<Tracking> = [
        {
            title: 'Tracking ID',
            dataIndex: 'trackingId',
            key: 'trackingId',
            width: 100,
        },
        {
            title: 'Gia sư',
            dataIndex: 'tutorUserName',
            key: 'tutorUserName',
            width: 150,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            width: 120,
        },
        {
            title: 'Thời gian',
            dataIndex: 'actionAt',
            key: 'actionAt',
            width: 180,
            render: (date: string) => new Date(date).toLocaleString('vi-VN'),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
            width: 200,
        },
        {
            title: 'Mã bảo mật',
            dataIndex: 'securityCodeUsed',
            key: 'securityCodeUsed',
            width: 150,
        },
    ];

    const columns: ColumnsType<Booking> = [
        {
            title: 'ID',
            dataIndex: 'bookingId',
            key: 'bookingId',
            width: 100,
            render: (bookingId: number) => (
                <Button
                    type="link"
                    onClick={() => handleViewTracking(bookingId)}
                    className="p-0 font-semibold"
                >
                    {bookingId}
                </Button>
            ),
        },
        {
            title: 'Giá/Buổi',
            dataIndex: 'agreedPricePerSession',
            key: 'agreedPricePerSession',
            width: 150,
            render: (price: number) => `${price.toLocaleString('vi-VN')} đ`,
        },
        {
            title: 'Số buổi/tuần',
            dataIndex: 'sessionsPerWeek',
            key: 'sessionsPerWeek',
            width: 120,
        },
        {
            title: 'Ngày học',
            dataIndex: 'agreedDays',
            key: 'agreedDays',
            width: 200,
        },
        {
            title: 'Giờ học',
            dataIndex: 'agreedTime',
            key: 'agreedTime',
            width: 150,
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
            render: (date: string) => new Date(date).toLocaleString('vi-VN'),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (_: any, record: Booking) => (
                <div className="flex items-center gap-2">
                    {record.reviewed ? (
                        <span className="text-gray-500 text-sm">Đã đánh giá</span>
                    ) : (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => openReviewModal(record.bookingId)}
                        >
                            Đánh giá
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
            <Card title="Danh sách Booking" className="max-w-7xl mx-auto">
                <Spin spinning={loading}>
                    <Table
                        columns={columns}
                        dataSource={bookings}
                        rowKey="bookingId"
                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Tổng ${total} booking`,
                        }}
                        scroll={{ x: 1400 }}
                    />
                </Spin>
            </Card>

            <Modal
                title={`Tracking cho Booking #${selectedBookingId}`}
                open={trackingModalVisible}
                onCancel={() => setTrackingModalVisible(false)}
                footer={null}
                width={900}
            >
                <Spin spinning={trackingLoading}>
                    <Table
                        columns={trackingColumns}
                        dataSource={trackingData}
                        rowKey="trackingId"
                        pagination={false}
                        scroll={{ x: 800 }}
                    />
                </Spin>
            </Modal>

            <Modal
                title="Đánh giá từ Phụ Huynh"
                open={reviewModalVisible}
                onCancel={closeReviewModal}
                onOk={submitReview}
                confirmLoading={reviewSubmitting}
                okText="Gửi đánh giá"
                cancelText="Hủy"
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
                        <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                            rows={4}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BookingPage;
