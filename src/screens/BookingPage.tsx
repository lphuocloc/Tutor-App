import React, { useEffect, useState } from 'react';
import { Table, Card, Spin, message, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Booking } from '../types/booking';
import type { Tracking } from '../types/tracking';
import { getAllBookingByUserId } from '../store/booking';
import { trackingAPI } from '../api/endpoints';

const BookingPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [trackingModalVisible, setTrackingModalVisible] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [trackingData, setTrackingData] = useState<Tracking[]>([]);
    const [trackingLoading, setTrackingLoading] = useState(false);

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
        </div>
    );
};

export default BookingPage;
