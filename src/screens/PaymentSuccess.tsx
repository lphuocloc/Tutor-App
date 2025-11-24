import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { chatAPI } from '../api/endpoints';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PaymentSuccess: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const orderCode = query.get('orderCode') || localStorage.getItem('pendingOrderCode') || '';
    const code = query.get('code') || '';
    const cancel = query.get('cancel') || '';
    const [creatingRoom, setCreatingRoom] = useState(false);

    const handleOpenChat = async () => {
        // Only for Customer role
        const role = localStorage.getItem('userRole') || '';
        if (role !== 'Customer') {
            message.error('Chỉ khách hàng mới có thể mở phòng chat.');
            return;
        }

        const parentPostId = Number(localStorage.getItem('parentPostId') || localStorage.getItem('pendingOrderPostId') || 0);
        const tutorPostId = Number(localStorage.getItem('pendingOrderPostId') || localStorage.getItem('tutorPostId') || 0);
        const parentUserId = Number(localStorage.getItem('userId') || 0);
        const tutorUserId = Number(localStorage.getItem('creatorUserId') || 0);

        const body = {
            parentPostId,
            tutorPostId,
            parentUserId,
            tutorUserId,
        };

        try {
            setCreatingRoom(true);
            const resp = await chatAPI.createChatRoom(body);
            const data = resp.data || {};
            // If backend returns roomId, pass it to chat route
            const roomId = data.roomId || data.data?.roomId || null;
            message.success('Phòng chat đã được tạo. Chuyển tới phòng chat...');
            if (roomId) {
                window.location.href = `/phongchat?roomId=${roomId}`;
            } else {
                // fallback: open chat list
                window.location.href = '/phongchat';
            }
        } catch (err) {
            console.error('Error creating chat room:', err);
            message.error('Không thể tạo phòng chat. Vui lòng thử lại.');
        } finally {
            setCreatingRoom(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Thanh toán thành công</h2>
                <p className="text-gray-700 mb-4">Order code: <strong>{orderCode}</strong></p>
                {code && <p className="text-gray-600 mb-2">Response code: {code}</p>}
                {cancel && <p className="text-gray-600 mb-2">Cancel flag: {cancel}</p>}
                <p className="text-gray-600 mb-6">Cảm ơn bạn — hệ thống sẽ xử lý đơn đặt cọc và hiển thị thông tin liên hệ.</p>
                <div className="flex justify-center gap-3">
                    <button onClick={() => navigate('/my-posts')} className="px-4 py-2 bg-indigo-600 text-white rounded">Bài đăng của tôi</button>
                    <button onClick={() => navigate('/trangchu')} className="px-4 py-2 border rounded">Về trang chủ</button>
                    {(localStorage.getItem('userRole') || '') === 'Customer' && (
                        <button onClick={handleOpenChat} disabled={creatingRoom} className="px-4 py-2 bg-green-600 text-white rounded">
                            {creatingRoom ? 'Đang tạo...' : 'Vào phòng chat'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
