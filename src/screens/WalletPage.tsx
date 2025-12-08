import { useState, useEffect } from 'react';
import { walletAPI } from '../api/endpoints';
import { Form, Input, Button, Modal, message, Card, Collapse } from 'antd';
import { Wallet, Plus, Shield, TrendingUp, Clock, HelpCircle, CheckCircle, Star } from 'lucide-react';

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
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 relative overflow-hidden flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-300 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>
                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Wallet className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <p className="text-xl">Đang tải thông tin ví...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 relative overflow-hidden flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-300 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>
                <div className="relative z-10 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h2>
                    <p className="text-xl text-red-600">{error}</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 border-blue-600"
                    >
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    if (!wallet) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 relative overflow-hidden flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-300 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>
                <div className="relative z-10 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Không tìm thấy ví</h2>
                    <p className="text-xl">Không tìm thấy thông tin ví của bạn</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 border-blue-600"
                    >
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-gray-800 relative overflow-hidden">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-8 left-8 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-36 h-36 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pink-400 rounded-full blur-3xl animate-pulse delay-500"></div>
                <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-green-400 rounded-full blur-3xl animate-pulse delay-1500"></div>
                <div className="absolute top-2/3 left-1/2 w-20 h-20 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/4 right-8 w-16 h-16 bg-yellow-400 rounded-full blur-2xl animate-pulse delay-2500"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-[40vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-lg">
                                <Wallet className="w-8 h-8 text-blue-600" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                                Ví của tôi
                            </h1>
                        </div>

                        {/* Balance Display */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/30 mb-6 transform hover:scale-105 transition-all duration-500">
                            <div className="text-center">
                                <p className="text-base md:text-lg text-gray-600 mb-3 font-medium">Số dư hiện tại</p>
                                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3 animate-pulse">
                                    {wallet.balance.toLocaleString('vi-VN')}
                                </p>
                                <p className="text-lg md:text-xl text-gray-500 font-light mb-4">VND</p>

                                {/* Top-up Button */}
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={showTopUpModal}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-none shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300"
                                    icon={<Plus className="w-5 h-5" />}
                                >
                                    Nạp tiền
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                                <div className="flex items-center justify-center mb-2">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">100%</p>
                                <p className="text-xs text-gray-600">Bảo mật</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                                <div className="flex items-center justify-center mb-2">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">24/7</p>
                                <p className="text-xs text-gray-600">Hỗ trợ</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                                <div className="flex items-center justify-center mb-2">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-lg font-bold text-gray-800">Tức thời</p>
                                <p className="text-xs text-gray-600">Giao dịch</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <section className="px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="max-w-5xl mx-auto">
                        {/* Benefits Section - Asymmetric Grid */}
                        <div className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
                                Tại sao chọn ví của chúng tôi?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                {/* Large Feature Card */}
                                <div className="md:col-span-8">
                                    <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                                                    <Shield className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800">Bảo mật tối tân</h3>
                                                    <p className="text-blue-600 font-medium text-sm">Công nghệ mã hóa tiên tiến</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                Chúng tôi sử dụng các tiêu chuẩn bảo mật hàng đầu thế giới để bảo vệ tài khoản và giao dịch của bạn.
                                                Tất cả dữ liệu được mã hóa end-to-end và giám sát 24/7.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">SSL</span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">2FA</span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Biometric</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Side Cards */}
                                <div className="md:col-span-4 space-y-4">
                                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="p-4 text-center">
                                            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                            <h4 className="text-base font-bold text-gray-800 mb-2">Dễ sử dụng</h4>
                                            <p className="text-gray-600 text-xs">Giao diện trực quan, thao tác đơn giản</p>
                                        </div>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="p-4 text-center">
                                            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                                            <h4 className="text-base font-bold text-gray-800 mb-2">Xử lý nhanh</h4>
                                            <p className="text-gray-600 text-xs">Giao dịch tức thời, không chờ đợi</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        {/* Tips & FAQ Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                            {/* Tips Section */}
                            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Star className="w-6 h-6 text-yellow-500 mr-2" />
                                        <h3 className="text-lg font-bold text-gray-800">Tips quản lý tiền</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-medium text-gray-800 text-sm">Theo dõi chi tiêu</h4>
                                                <p className="text-gray-600 text-xs">Kiểm tra lịch sử giao dịch thường xuyên</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-medium text-gray-800 text-sm">Nạp tiền hợp lý</h4>
                                                <p className="text-gray-600 text-xs">Chỉ nạp số tiền cần thiết</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-medium text-gray-800 text-sm">Bảo mật tài khoản</h4>
                                                <p className="text-gray-600 text-xs">Không chia sẻ thông tin đăng nhập</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* FAQ Section */}
                            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <HelpCircle className="w-6 h-6 text-blue-500 mr-2" />
                                        <h3 className="text-lg font-bold text-gray-800">Câu hỏi thường gặp</h3>
                                    </div>
                                    <Collapse
                                        ghost
                                        className="space-y-1"
                                        items={[
                                            {
                                                key: '1',
                                                label: <span className="font-medium text-sm">Làm thế nào để nạp tiền?</span>,
                                                children: <div className="pt-2 pb-3 text-gray-600 text-sm">Nhấn nút nạp tiền floating, nhập số tiền và làm theo hướng dẫn của PayOS.</div>,
                                            },
                                            {
                                                key: '2',
                                                label: <span className="font-medium text-sm">Thời gian xử lý giao dịch?</span>,
                                                children: <div className="pt-2 pb-3 text-gray-600 text-sm">Giao dịch thường được xử lý tức thời, tối đa 15 phút tùy ngân hàng.</div>,
                                            },
                                            {
                                                key: '3',
                                                label: <span className="font-medium text-sm">Có thể rút tiền không?</span>,
                                                children: <div className="pt-2 pb-3 text-gray-600 text-sm">Hiện tại chưa hỗ trợ rút tiền. Tiền dùng để thanh toán dịch vụ trên nền tảng.</div>,
                                            },
                                            {
                                                key: '4',
                                                label: <span className="font-medium text-sm">Ví có an toàn không?</span>,
                                                children: <div className="pt-2 pb-3 text-gray-600 text-sm">Chúng tôi sử dụng tiêu chuẩn bảo mật cao nhất với mã hóa end-to-end.</div>,
                                            },
                                        ]}
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* Footer */}
                        <footer className="text-center py-8 border-t border-gray-200/50">
                            <div className="max-w-3xl mx-auto">
                                <p className="text-gray-500 text-sm mb-2">&copy; 2024 Chợ Tài liệu Gia sư</p>
                                <p className="text-gray-400 text-xs">Bảo lưu mọi quyền. Hỗ trợ 24/7.</p>
                            </div>
                        </footer>
                    </div>
                </section>
            </div>

            {/* Top-up Modal */}
            <Modal
                title={
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Plus className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-800">Nạp tiền vào ví</h3>
                            <p className="text-xs text-gray-600">Thêm tiền vào tài khoản của bạn</p>
                        </div>
                    </div>
                }
                open={topUpModalVisible}
                onCancel={handleTopUpModalCancel}
                footer={[
                    <Button key="cancel" onClick={handleTopUpModalCancel} className="hover:scale-105 transition-transform px-4">
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={topUpLoading}
                        onClick={handleTopUp}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-none hover:scale-105 transition-all px-6 shadow-lg"
                    >
                        Nạp tiền ngay
                    </Button>,
                ]}
                className="rounded-xl"
                bodyStyle={{ borderRadius: '12px' }}
                width={450}
            >
                <div className="space-y-4">
                    <Form layout="vertical">
                        <Form.Item
                            label={<span className="text-sm font-medium">Số tiền nạp (VND)</span>}
                            help={<span className="text-gray-500 text-xs">Số tiền tối thiểu: <strong>10,000 VND</strong></span>}
                        >
                            <Input
                                type="number"
                                placeholder="Ví dụ: 100,000"
                                value={topUpAmount}
                                onChange={(e) => setTopUpAmount(e.target.value)}
                                min={10000}
                                step={10000}
                                className="rounded-lg h-10 text-base hover:border-green-400 focus:border-green-500 transition-colors"
                                prefix={<span className="text-gray-400">₫</span>}
                            />
                        </Form.Item>
                    </Form>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <HelpCircle className="w-3 h-3 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-1 text-sm">Quy trình thanh toán</h4>
                                <p className="text-blue-700 text-xs leading-relaxed">
                                    Bạn sẽ được chuyển hướng đến cổng thanh toán PayOS để hoàn tất giao dịch một cách an toàn.
                                    Giao dịch thường được xử lý tức thời.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                <Shield className="w-3 h-3 text-green-600" />
                            </div>
                            <p className="text-xs text-gray-600">Bảo mật</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                <Clock className="w-3 h-3 text-blue-600" />
                            </div>
                            <p className="text-xs text-gray-600">Nhanh chóng</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                <CheckCircle className="w-3 h-3 text-purple-600" />
                            </div>
                            <p className="text-xs text-gray-600">Đáng tin cậy</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default WalletPage;