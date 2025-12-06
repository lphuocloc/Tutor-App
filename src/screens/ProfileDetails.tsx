import { useState, useEffect } from 'react';
import { userAPI } from '../api/endpoints';
import { message, Modal, Form, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

// Define the profile data type
interface UserProfile {
    userId: number;
    fullName: string;
    email: string;
    phone: string;
    street: string | null;
    ward: string | null;
    district: string;
    city: string;
    role: string;
    pointId: number;
    totalPoint: number;
}

// Component for user profile details
const ProfileDetails = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User ID not found');
                setLoading(false);
                return;
            }

            try {
                const userId = localStorage.getItem('userId');
                const response = await userAPI.getProfile(userId ? Number(userId) : 0);
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        // Đặt tiêu đề trang mặc định là Sutido
        document.title = 'Sutido';
    }, []);

    const handleEditProfile = () => {
        if (!profile) return;
        editForm.setFieldsValue({
            email: profile.email,
            phone: profile.phone,
            street: profile.street || '',
            ward: profile.ward || '',
            district: profile.district,
            city: profile.city,
        });
        setEditModalVisible(true);
    };

    const handleSaveProfile = async (values: {
        email: string;
        phone: string;
        street: string;
        ward: string;
        district: string;
        city: string;
    }) => {
        if (!profile) return;

        try {
            setSaving(true);
            await userAPI.updateProfile(profile.userId, values);
            message.success('Cập nhật thông tin thành công!');

            // Update local profile state
            setProfile({
                ...profile,
                ...values
            });

            setEditModalVisible(false);
            editForm.resetFields();
        } catch (err) {
            console.error('Error updating profile:', err);
            message.error('Có lỗi xảy ra khi cập nhật thông tin');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <p className="text-xl">Loading profile...</p>
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

    if (!profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <p className="text-xl">No profile data available</p>
            </div>
        );
    }

    // Construct address from street, ward, district, city
    const addressParts = [profile.street, profile.ward, profile.district, profile.city].filter(Boolean);
    const address = addressParts.join(', ');

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            {/* Profile Section */}
            <div className="max-w-7xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-8 flex flex-col items-center text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
                    Phụ Huynh
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-center mb-2 relative">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700">
                            {profile.fullName}
                        </h1>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={handleEditProfile}
                            style={{ position: 'absolute', right: 0 }}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">Trang cá nhân của Phụ Huynh</p>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
                        <div>
                            <p className="mb-2"><span className="font-semibold">Email:</span> {profile.email}</p>
                            <p className="mb-2"><span className="font-semibold">Số điện thoại:</span> {profile.phone}</p>
                        </div>
                        <div>
                            <p className="mb-2"><span className="font-semibold">Địa chỉ:</span> {address || 'Chưa cập nhật'}</p>
                            <p><span className="font-semibold">Vai trò:</span> {profile.role}</p>
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Chào mừng bạn đến với Sutido!</h3>
                        <p className="text-blue-700">
                            Cảm ơn bạn đã tin tưởng và sử dụng nền tảng của chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn tìm kiếm gia sư chất lượng cho con em mình.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center mt-12 mb-8 text-gray-500 text-sm">
                <p>&copy; 2024 Chợ Tài liệu Gia sư. Bảo lưu mọi quyền.</p>
            </footer>

            {/* Edit Profile Modal */}
            <Modal
                title="Chỉnh sửa thông tin cá nhân"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    editForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleSaveProfile}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input placeholder="Nhập email" disabled />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Đường/Số nhà"
                        name="street"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input placeholder="Nhập số nhà, tên đường" />
                    </Form.Item>

                    <Form.Item
                        label="Phường/Xã"
                        name="ward"
                        rules={[{ required: true, message: 'Vui lòng nhập phường/xã!' }]}
                    >
                        <Input placeholder="Nhập phường/xã" />
                    </Form.Item>

                    <Form.Item
                        label="Quận/Huyện"
                        name="district"
                        rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
                    >
                        <Input placeholder="Nhập quận/huyện" />
                    </Form.Item>

                    <Form.Item
                        label="Thành phố/Tỉnh"
                        name="city"
                        rules={[{ required: true, message: 'Vui lòng nhập thành phố/tỉnh!' }]}
                    >
                        <Input placeholder="Nhập thành phố/tỉnh" />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <Button onClick={() => {
                                setEditModalVisible(false);
                                editForm.resetFields();
                            }}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" loading={saving}>
                                Lưu thay đổi
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProfileDetails;
