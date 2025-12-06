import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Spin, Modal, Button } from 'antd';
import { classAPI, paymentAPI, walletAPI, chatAPI } from '../api/endpoints';
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
            const fetched = response.data;
            setPost(fetched);
            try {
                const fetchedTyped = fetched as unknown as { creatorUserId?: number };
                if (fetchedTyped && fetchedTyped.creatorUserId !== undefined && fetchedTyped.creatorUserId !== null) {
                    localStorage.setItem('creatorUserId', String(fetchedTyped.creatorUserId));
                }
                if (fetched && fetched.postId !== undefined && fetched.postId !== null) {
                    localStorage.setItem('currentPostId', String(fetched.postId));
                }
            } catch {
                // ignore storage errors
            }
        } catch (error) {
            console.error('Error fetching post detail:', error);
            message.error('Không thể tải thông tin bài đăng');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!post) return;

        if (!localStorage.getItem('userId')) {
            message.error('Vui lòng đăng nhập để đặt cọc và liên hệ');
            return;
        }

        const amount = 50000; // deposit amount in VND
        const description = `Cọc: ${post.postId}`;

        // Show confirmation modal first
        Modal.confirm({
            title: 'Xác nhận đặt cọc',
            content: (
                <div>
                    <p>Bạn cần đặt cọc <strong>{formatCurrency(amount)}</strong> để liên hệ với người đăng bài.</p>
                    <p>Bạn có chắc chắn muốn tiếp tục?</p>
                </div>
            ),
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk: () => showPaymentMethodModal(amount, description),
        });
    };

    const showPaymentMethodModal = (amount: number, description: string) => {
        // Show payment method selection modal after confirmation
        Modal.confirm({
            title: 'Chọn phương thức thanh toán',
            content: (
                <div>
                    <p>Chọn phương thức thanh toán:</p>
                </div>
            ),
            okText: 'Thanh toán bằng ví',
            cancelText: 'Thanh toán online',
            okButtonProps: { type: 'primary' },
            cancelButtonProps: { type: 'default' },
            onOk: () => handleWalletPayment(amount, description),
            onCancel: () => handleOnlinePayment(amount, description),
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <Button onClick={() => Modal.destroyAll()}>Hủy</Button>
                    <CancelBtn />
                    <OkBtn />
                </>
            ),
        });
    };

    const handleWalletPayment = async (amount: number, description: string) => {
        try {
            setBookingLoading(true);

            const body = {
                amount,
                description,
            };

            const resp = await walletAPI.pay(body);

            if (resp.status === 200) {
                message.success('Thanh toán thành công! Đang tạo phòng chat...');

                // Set localStorage items like online payment does
                try {
                    localStorage.setItem('pendingOrderPostId', String(post!.postId));
                } catch {
                    // ignore storage errors
                }

                // Create chat room after successful payment
                await createChatRoomAfterPayment();
            } else {
                message.error('Thanh toán thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error making wallet payment:', error);
            message.error('Thanh toán thất bại. Vui lòng thử lại.');
        } finally {
            setBookingLoading(false);
        }
    };

    const createChatRoomAfterPayment = async () => {
        try {
            const parentPostId = Number(localStorage.getItem('parentPostId') || localStorage.getItem('pendingOrderPostId') || 0);
            const tutorPostId = Number(localStorage.getItem('pendingOrderPostId') || localStorage.getItem('tutorPostId') || post?.postId || 0);
            const parentUserId = Number(localStorage.getItem('userId') || 0);
            const tutorUserId = Number(localStorage.getItem('creatorUserId') || 0);

            const body = {
                parentPostId,
                tutorPostId,
                parentUserId,
                tutorUserId,
            };

            console.log("create room with body", body);
            const resp = await chatAPI.createChatRoom(body);
            const data = resp.data || {};
            console.log("data resp phong chat", data);

            // If backend returns roomId, pass it to chat route
            const roomId = data.chatRoomId || data.data?.roomId || null;
            console.log("roomId", roomId);

            message.success('Phòng chat đã được tạo. Chuyển tới phòng chat...');
            if (roomId) {
                navigate(`/phongchat?roomId=${roomId}&tutorUserId=${tutorUserId}&parentUserId=${parentUserId}`);
            } else {
                // fallback: open chat list
                navigate('/tinnhan');
            }
        } catch (error) {
            console.error('Error creating chat room:', error);
            message.error('Tạo phòng chat thất bại. Vui lòng thử lại.');
        }
    };

    const handleOnlinePayment = async (amount: number, description: string) => {
        const buyerName = localStorage.getItem('userName') || '';
        const buyerEmail = localStorage.getItem('userEmail') || '';

        const orderCode = Date.now(); // numeric order code (milliseconds since epoch)

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
                            localStorage.setItem('pendingOrderPostId', String(post!.postId));
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
