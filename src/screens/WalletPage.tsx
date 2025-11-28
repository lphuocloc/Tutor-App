import { useState, useEffect } from 'react';
import { walletAPI } from '../api/endpoints';
import { Form, Input, Button, Modal, message } from 'antd';

// Define wallet type
interface Wallet {
    walletId: number;
    balance: number;
    userId: number;
}

const WalletPage = () => {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Top-up modal state
    const [topUpModalVisible, setTopUpModalVisible] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState('');
    const [topUpLoading, setTopUpLoading] = useState(false);

    useEffect(() => {
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        try {
            const response = await walletAPI.getMyWallet();
            setWallet(response.data);
        } catch (err) {
            setError('Không thể tải thông tin ví. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleTopUp = async () => {
        const amount = parseInt(topUpAmount);
        if (!amount || amount <= 0) {
            message.error('Vui lòng nhập số tiền hợp lệ');
            return;
        }

        if (amount < 10000) {
            message.error('Số tiền nạp tối thiểu là 10,000 VND');
            return;
        }

        setTopUpLoading(true);
        try {
            const redirectUrl = `${window.location.origin}/wallet/topup-success`;
            const response = await walletAPI.topUpWallet({
                amount,
                redirectUrl,
            });

            const { checkoutUrl } = response.data;
            if (checkoutUrl) {
                // Redirect to PayOS payment page
                window.location.href = checkoutUrl;
            } else {
                message.error('Không thể tạo liên kết thanh toán');
            }
        } catch (err) {
            message.error('Không thể tạo yêu cầu nạp tiền. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setTopUpLoading(false);
        }
    };

    const showTopUpModal = () => {
        setTopUpModalVisible(true);
    };

    const handleTopUpModalCancel = () => {
        setTopUpModalVisible(false);
        setTopUpAmount('');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <p className="text-xl">Đang tải thông tin ví...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }

    if (!wallet) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <p className="text-xl">Không tìm thấy thông tin ví</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto mt-20">
                <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Ví của tôi</h1>

                {/* Wallet Card */}
                <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Số dư ví</h2>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-6">
                            <p className="text-4xl font-bold mb-2">
                                {wallet.balance.toLocaleString('vi-VN')} VND
                            </p>
                            <p className="text-blue-100">Số dư hiện tại</p>
                        </div>

                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-1">ID Ví</p>
                                <p className="text-lg font-semibold text-gray-800">#{wallet.walletId}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-1">ID Người dùng</p>
                                <p className="text-lg font-semibold text-gray-800">#{wallet.userId}</p>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div
                        className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={showTopUpModal}
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Nạp tiền</h3>
                        <p className="text-gray-600 text-sm">Nạp tiền vào ví từ tài khoản ngân hàng</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Rút tiền</h3>
                        <p className="text-gray-600 text-sm">Rút tiền từ ví về tài khoản ngân hàng</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Lịch sử</h3>
                        <p className="text-gray-600 text-sm">Xem lịch sử giao dịch của ví</p>
                    </div>
                </div>
            </div>

            {/* Top-up Modal */}
            <Modal
                title="Nạp tiền vào ví"
                open={topUpModalVisible}
                onCancel={handleTopUpModalCancel}
                footer={[
                    <Button key="cancel" onClick={handleTopUpModalCancel}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={topUpLoading}
                        onClick={handleTopUp}
                    >
                        Nạp tiền
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item
                        label="Số tiền nạp (VND)"
                        help="Số tiền tối thiểu: 10,000 VND"
                    >
                        <Input
                            type="number"
                            placeholder="Nhập số tiền"
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                            min={10000}
                            step={1000}
                        />
                    </Form.Item>
                    <p className="text-sm text-gray-600">
                        Bạn sẽ được chuyển hướng đến cổng thanh toán PayOS để hoàn tất giao dịch.
                    </p>
                </Form>
            </Modal>

            {/* Footer */}
            <footer className="text-center mt-12 mb-8 text-gray-500 text-sm">
                <p>&copy; 2024 Chợ Tài liệu Gia sư. Bảo lưu mọi quyền.</p>
            </footer>
        </div>
    );
};

export default WalletPage;