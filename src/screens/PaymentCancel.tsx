import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const PaymentCancel: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const orderCode = query.get('orderCode') || localStorage.getItem('pendingOrderCode') || '';
    const reason = query.get('reason') || '';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Thanh toán bị hủy</h2>
                <p className="text-gray-700 mb-4">Order code: <strong>{orderCode}</strong></p>
                {reason && <p className="text-gray-600 mb-2">Lý do: {reason}</p>}
                <p className="text-gray-600 mb-6">Bạn có thể thử lại hoặc liên hệ để được hỗ trợ.</p>
                <div className="flex justify-center gap-3">
                    <button onClick={() => navigate('/my-posts')} className="px-4 py-2 bg-indigo-600 text-white rounded">Bài đăng của tôi</button>
                    <button onClick={() => navigate('/trangchu')} className="px-4 py-2 border rounded">Về trang chủ</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
