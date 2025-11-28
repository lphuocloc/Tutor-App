import { useState, useEffect } from 'react';
import { bankAccountAPI } from '../api/endpoints';
import { Form, Input, Select, Button, message, Table, Space, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

// Define bank account type
interface BankAccount {
    bankAccountId: number;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    createdAt: string;
}

// Supported banks
const supportedBanks = [
    { value: 'MB', label: 'Ngân hàng Quân đội (MB)' },
    { value: 'VCB', label: 'Ngân hàng Ngoại thương Việt Nam (Vietcombank)' },
    { value: 'BIDV', label: 'Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)' },
    { value: 'AGRIBANK', label: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn (Agribank)' },
    { value: 'TPBANK', label: 'Ngân hàng Tiên Phong (TPBank)' },
    { value: 'VIETINBANK', label: 'Ngân hàng Công thương Việt Nam (VietinBank)' },
    { value: 'SACOMBANK', label: 'Ngân hàng Sài Gòn Thương Tín (Sacombank)' },
    { value: 'TECHCOMBANK', label: 'Ngân hàng Kỹ thương Việt Nam (Techcombank)' },
];

const BankAccountPage = () => {
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Bank account form state
    const [bankForm, setBankForm] = useState({
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });
    const [bankErrors, setBankErrors] = useState({
        bankName: '',
        accountNumber: '',
        accountHolder: '',
    });

    useEffect(() => {
        fetchBankAccounts();
    }, []);

    const fetchBankAccounts = async () => {
        try {
            const response = await bankAccountAPI.getMyBankAccounts();
            setBankAccounts(response.data);
        } catch (err) {
            message.error('Không thể tải danh sách tài khoản ngân hàng');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Validation functions
    const validateAccountNumber = (value: string) => {
        if (!value) return 'Số tài khoản là bắt buộc';
        if (!/^\d+$/.test(value)) return 'Số tài khoản chỉ được chứa chữ số';
        if (value.length < 6 || value.length > 20) return 'Số tài khoản phải có 6-20 chữ số';
        return '';
    };

    const validateAccountHolder = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return 'Tên chủ tài khoản là bắt buộc';
        if (trimmed.length > 200) return 'Tên chủ tài khoản không được vượt quá 200 ký tự';
        return '';
    };

    const validateBankName = (value: string) => {
        if (!value) return 'Tên ngân hàng là bắt buộc';
        return '';
    };

    // Handle form changes
    const handleBankFormChange = (field: string, value: string) => {
        setBankForm(prev => ({ ...prev, [field]: value }));

        // Clear error for the field
        setBankErrors(prev => ({ ...prev, [field]: '' }));

        // Validate accountNumber immediately
        if (field === 'accountNumber') {
            const error = validateAccountNumber(value);
            setBankErrors(prev => ({ ...prev, accountNumber: error }));
        }
    };

    // Handle form submit
    const handleSubmitBankAccount = async () => {
        // Validate all fields
        const errors = {
            bankName: validateBankName(bankForm.bankName),
            accountNumber: validateAccountNumber(bankForm.accountNumber),
            accountHolder: validateAccountHolder(bankForm.accountHolder),
        };

        setBankErrors(errors);

        // Check if any errors
        if (Object.values(errors).some(error => error)) {
            return;
        }

        setSubmitting(true);
        try {
            await bankAccountAPI.addBankAccount({
                bankName: bankForm.bankName,
                accountNumber: bankForm.accountNumber,
                accountHolder: bankForm.accountHolder.trim(),
            });
            message.success('Thêm tài khoản ngân hàng thành công!');
            // Reset form
            setBankForm({ bankName: '', accountNumber: '', accountHolder: '' });
            // Refresh list
            fetchBankAccounts();
        } catch (err) {
            message.error('Thêm tài khoản ngân hàng thất bại. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    // Table columns
    const columns = [
        {
            title: 'Ngân Hàng',
            dataIndex: 'bankName',
            key: 'bankName',
            render: (bankName: string) => {
                const bank = supportedBanks.find(b => b.value === bankName);
                return bank ? bank.label : bankName;
            },
        },
        {
            title: 'Số Tài Khoản',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
        },
        {
            title: 'Tên Chủ Tài Khoản',
            dataIndex: 'accountHolder',
            key: 'accountHolder',
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Hành Động',
            key: 'action',
            render: (_, record: BankAccount) => (
                <Space size="middle">
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteBankAccount(record.bankAccountId)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDeleteBankAccount = async (bankAccountId: number) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa tài khoản ngân hàng này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: async () => {
                try {
                    await bankAccountAPI.deleteBankAccount(bankAccountId);
                    message.success('Xóa tài khoản ngân hàng thành công!');
                    // Refresh the list
                    fetchBankAccounts();
                } catch (err) {
                    message.error('Xóa tài khoản ngân hàng thất bại. Vui lòng thử lại.');
                    console.error(err);
                }
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto mt-20">
                <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Quản Lý Tài Khoản Ngân Hàng</h1>

                {/* Add Bank Account Form */}
                <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-8">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">Thêm Tài Khoản Ngân Hàng Mới</h2>
                    <Form layout="vertical" onFinish={handleSubmitBankAccount}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Form.Item
                                label="Tên Ngân Hàng"
                                validateStatus={bankErrors.bankName ? 'error' : ''}
                                help={bankErrors.bankName}
                            >
                                <Select
                                    placeholder="Chọn ngân hàng"
                                    value={bankForm.bankName || undefined}
                                    onChange={(value) => handleBankFormChange('bankName', value)}
                                >
                                    {supportedBanks.map(bank => (
                                        <Select.Option key={bank.value} value={bank.value}>
                                            {bank.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Số Tài Khoản"
                                validateStatus={bankErrors.accountNumber ? 'error' : ''}
                                help={bankErrors.accountNumber}
                            >
                                <Input
                                    placeholder="Nhập số tài khoản"
                                    value={bankForm.accountNumber}
                                    onChange={(e) => handleBankFormChange('accountNumber', e.target.value)}
                                    maxLength={20}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Tên Chủ Tài Khoản"
                                validateStatus={bankErrors.accountHolder ? 'error' : ''}
                                help={bankErrors.accountHolder}
                            >
                                <Input
                                    placeholder="Nhập tên chủ tài khoản"
                                    value={bankForm.accountHolder}
                                    onChange={(e) => handleBankFormChange('accountHolder', e.target.value)}
                                    maxLength={200}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                Thêm Tài Khoản
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* Bank Accounts List */}
                <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">Danh Sách Tài Khoản Ngân Hàng</h2>
                    <Table
                        columns={columns}
                        dataSource={bankAccounts}
                        rowKey="bankAccountId"
                        loading={loading}
                        pagination={false}
                        locale={{ emptyText: 'Chưa có tài khoản ngân hàng nào' }}
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center mt-12 mb-8 text-gray-500 text-sm">
                <p>&copy; 2024 Chợ Tài liệu Gia sư. Bảo lưu mọi quyền.</p>
            </footer>
        </div>
    );
};

export default BankAccountPage;