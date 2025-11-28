import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { walletAPI } from '../api/endpoints';
import { message } from 'antd';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const WalletTopUpSuccess: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const orderCode = query.get('orderCode') || '';
    const code = query.get('code') || '';
    const cancel = query.get('cancel') || '';

    // Confirm top-up when component mounts
    useEffect(() => {
        const confirmTopUp = async () => {
            if (orderCode) {
                try {
                    const orderCodeNumber = parseInt(orderCode, 10);
                    if (!isNaN(orderCodeNumber)) {
                        await walletAPI.confirmTopUp({ orderCode: orderCodeNumber });
                        console.log('Top-up confirmed successfully');
                    }
                } catch (error) {
                    console.error('Failed to confirm top-up:', error);
                    message.error('Có lỗi xảy ra khi xác nhận nạp tiền');
                }
            }
        };

        confirmTopUp();
    }, [orderCode]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow p-8 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-green-600">Nạp tiền thành công</h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700 mb-2">Mã đơn hàng: <strong>{orderCode}</strong></p>
                    {code && <p className="text-gray-600 mb-1">Mã phản hồi: {code}</p>}
                    {cancel && <p className="text-gray-600 mb-1">Cờ hủy: {cancel}</p>}
                </div>

                <p className="text-gray-600 mb-6">
                    Cảm ơn bạn đã nạp tiền vào ví! Số tiền đã được thêm vào tài khoản của bạn.
                </p>

                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => navigate('/wallet')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Xem ví của tôi
                    </button>
                    <button
                        onClick={() => navigate('/trangchu')}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WalletTopUpSuccess;