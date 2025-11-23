import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Spin, Modal } from 'antd';
import { classAPI, paymentAPI } from '../api/endpoints';
import type { Post } from '../types/post';



const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    // ...existing code...

    useEffect(() => {
        if (id) {
            fetchPostDetail(parseInt(id));
        }
    }, [id]);

    const fetchPostDetail = async (postId: number) => {
        try {
            setLoading(true);
            const response = await classAPI.getPostDetail(postId);
            console.log('Post detail:', response.data);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post detail:', error);
            message.error('Không thể tải thông tin bài đăng');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!post) return;

        const userId = localStorage.getItem('userId');
        const buyerName = localStorage.getItem('userName') || '';
        const buyerEmail = localStorage.getItem('userEmail') || '';

        if (!userId) {
            message.error('Vui lòng đăng nhập để đặt cọc và liên hệ');
            return;
        }

        const orderCode = Date.now(); // numeric order code (milliseconds since epoch)
        const amount = 50000; // default deposit amount in VND
        const description = `Đặt cọc: ${post.title}`;

        const origin = import.meta.env.VITE_DOMAIN || window.location.origin;
        const returnUrl = `${origin}/payment/success?orderCode=${orderCode}`;
        const cancelUrl = `${origin}/payment/cancel?orderCode=${orderCode}`;

        Modal.confirm({
            title: 'Xác nhận đặt cọc',
            content: (
                <div>
                    <p>Bạn sẽ đặt cọc <strong>{formatCurrency(amount)}</strong> cho bài đăng này.</p>
                    <p>Tiếp tục để chuyển tới cổng thanh toán.</p>
                </div>
            ),
            okText: 'Tiến hành thanh toán',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    setBookingLoading(true);
                    const body = {
                        orderCode,
                        amount,
                        description,
                        cancelUrl,
                        returnUrl,
                        buyerName,
                        buyerEmail,
                    };

                    const resp = await paymentAPI.createPayment(body);
                    // Backend may return wrapper { code, desc, data: { checkoutUrl, orderCode } }
                    const respData = resp.data || {};
                    const nested = respData.data || {};
                    const redirectUrl = nested.checkoutUrl || respData.checkoutUrl || respData.paymentUrl || respData.redirectUrl || respData.url;
                    const returnedOrderCode = nested.orderCode ?? respData.orderCode ?? null;

                    if (returnedOrderCode !== null && returnedOrderCode !== undefined) {
                        try {
                            localStorage.setItem('pendingOrderCode', String(returnedOrderCode));
                            localStorage.setItem('pendingOrderPostId', String(post.postId));
                        } catch {
                            // ignore storage errors
                        }
                    }

                    if (redirectUrl) {
                        // Redirect browser to payment provider
                        window.location.href = redirectUrl;
                    } else {
                        message.success('Yêu cầu thanh toán đã tạo. Vui lòng làm theo hướng dẫn.');
                    }
                } catch (error) {
                    console.error('Error creating payment:', error);
                    message.error('Không thể tạo yêu cầu thanh toán. Vui lòng thử lại.');
                } finally {
                    setBookingLoading(false);
                }
            }
        });
    };

    // ...existing code...

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài đăng</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
                >
                    <span>←</span>
                    <span>Quay lại</span>
                </button>

                {/* Post Detail Card */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Header */}
                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <span>🆔</span>
                                <span>ID: {post.postId}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span>📅</span>
                                <span>{formatDate(post.createdAt || '')}</span>
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 mb-8">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🎓</span>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-700 mb-1">Lớp học</h3>
                                    <p className="text-gray-900">{post.studentGrade}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📅</span>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-700 mb-1">Số buổi/tuần</h3>
                                    <p className="text-gray-900">{post.sessionsPerWeek} buổi</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">💰</span>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-700 mb-1">Lương/buổi</h3>
                                    <p className="text-2xl font-bold text-indigo-600">{formatCurrency(post.pricePerSession)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-start gap-3 mb-4">
                                <span className="text-2xl">🗓️</span>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-700 mb-1">Ngày học trong tuần</h3>
                                    <p className="text-gray-900">{post.preferredDays}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">⏰</span>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-700 mb-1">Thời gian học</h3>
                                    <p className="text-gray-900">{post.preferredTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        {post.location && (
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📍</span>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-700 mb-1">Địa điểm</h3>
                                        <p className="text-gray-900">{post.location}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        {post.description && (
                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📝</span>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-700 mb-1">Mô tả thêm</h3>
                                        <p className="text-gray-900 whitespace-pre-line">{post.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 border-t border-gray-200 pt-6">
                        <div className="flex gap-4">
                            <button
                                onClick={handleBooking}
                                disabled={bookingLoading}
                                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {bookingLoading ? 'Đang xử lý...' : 'Liên hệ'}
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                            >
                                Hủy
                            </button>
                        </div>

                        {/* ...existing code... */}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <span className="font-semibold">💡 Lưu ý:</span> Vui lòng kiểm tra kỹ thông tin trước khi booking.
                        Sau khi booking, bạn có thể liên hệ trực tiếp với người đăng bài để thỏa thuận chi tiết.
                    </p>
                </div>

                {/* ...existing code... */}
            </div>
        </div>
    );
};

export default PostDetailPage;
