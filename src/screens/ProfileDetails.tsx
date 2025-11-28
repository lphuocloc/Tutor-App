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
                const response = await userAPI.getUserProfile(Number(userId));
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
                <img
                    src="https://placehold.co/150x150/D1E7DD/000?text=User" // Placeholder for profile picture
                    alt={`Ảnh đại diện của ${profile.fullName}`}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-300 shadow-md mb-4 sm:mb-0 sm:mr-8"
                />
                <div className="flex-grow">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2">
                        {profile.fullName}
                    </h1>
                    <p className="text-lg text-gray-600 mb-3">Trang cá nhân của {profile.role}</p>

                    {/* Points Section */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-sm mb-4">
                        <h3 className="text-xl font-bold mb-1">Điểm tích lũy của bạn:</h3>
                        <p className="text-3xl font-extrabold text-yellow-700">{profile.totalPoint} điểm</p>
                        <p className="text-sm mt-2">Sử dụng điểm để giảm giá các tài liệu và khóa học!</p>
                    </div>

                    {/* Contact Information */}
                    <div className="text-sm text-gray-700 mb-4">
                        <p className="mb-1"><span className="font-semibold">Email:</span> {profile.email}</p>
                        <p className="mb-1"><span className="font-semibold">Số điện thoại:</span> {profile.phone}</p>
                        <p><span className="font-semibold">Địa chỉ:</span> {address || 'Chưa cập nhật'}</p>
                    </div>

                    {/* Role Information */}
                    <div className="text-sm text-gray-700 mt-4 pt-4 border-t border-gray-200">
                        <p><span className="font-semibold">Vai trò:</span> {profile.role}</p>
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
