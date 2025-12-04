import { useState, useEffect } from 'react';
import { userAPI } from '../api/endpoints';

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
            <div className="max-w-7xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 sm:mb-0 sm:mr-8">
                    Phụ Huynh
                </div>
                <div className="flex-grow">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2">
                        {profile.fullName}
                    </h1>
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
        </div>
    );
};

export default ProfileDetails;
