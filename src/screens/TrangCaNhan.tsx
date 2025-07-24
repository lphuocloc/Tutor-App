import { useState } from 'react';

// Component for a parent's personal page (profile)
// In a real application, parentId would be passed as a prop or fetched from URL params,
// and data would be fetched from a backend.
const TrangCaNhan = () => {
    // Sample parent data. In a real app, this would be fetched from a backend.
    const [parentInfo] = useState({
        id: 'parent456',
        name: 'Trần Văn Long',
        profilePic: 'https://placehold.co/150x150/D1E7DD/000?text=Phu+Huynh', // Placeholder for profile picture
        contact: '0912-345-678',
        email: 'longtv@example.com',
        address: 'Số 123, Đường ABC, Quận XYZ, TP.HCM',
        loyaltyPoints: 1250, // Sample loyalty points
        children: [ // Optional: list of children or enrolled courses
            { id: 'child1', name: 'Trần Thị Mai', grade: 'Lớp 10', enrolledCourse: 'Toán THPT' },
            { id: 'child2', name: 'Trần Văn Nam', grade: 'Lớp 7', enrolledCourse: 'Vật lý Cơ bản' },
        ],

    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            {/* Parent Profile Section */}
            <div className="max-w-7xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                <img
                    src={parentInfo.profilePic}
                    alt={`Ảnh đại diện của ${parentInfo.name}`}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-300 shadow-md mb-4 sm:mb-0 sm:mr-8"
                />
                <div className="flex-grow">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2">
                        {parentInfo.name}
                    </h1>
                    <p className="text-lg text-gray-600 mb-3">Trang cá nhân của phụ huynh</p>

                    {/* Loyalty Points Section */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-sm mb-4">
                        <h3 className="text-xl font-bold mb-1">Điểm tích lũy của bạn:</h3>
                        <p className="text-3xl font-extrabold text-yellow-700">{parentInfo.loyaltyPoints} điểm</p>
                        <p className="text-sm mt-2">Sử dụng điểm để giảm giá các tài liệu và khóa học!</p>
                    </div>

                    {/* Contact Information */}
                    <div className="text-sm text-gray-700 mb-4">
                        <p className="mb-1"><span className="font-semibold">Liên hệ:</span> {parentInfo.contact}</p>
                        <p className="mb-1"><span className="font-semibold">Email:</span> {parentInfo.email}</p>
                        <p><span className="font-semibold">Địa chỉ:</span> {parentInfo.address}</p>
                    </div>

                    {/* Children/Enrolled Courses Section (Optional) */}
                    {parentInfo.children && parentInfo.children.length > 0 && (
                        <div className="text-sm text-gray-700 mt-4 pt-4 border-t border-gray-200">
                            <h3 className="font-semibold text-md text-blue-600 mb-2">Con cái / Khóa học đã đăng ký:</h3>
                            <ul className="list-disc list-inside text-left mx-auto sm:mx-0 max-w-md">
                                {parentInfo.children.map((child) => (
                                    <li key={child.id} className="mb-1">
                                        <span className="font-medium">{child.name}</span> ({child.grade}) - Khóa: {child.enrolledCourse}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Recent Activities Section (Removed as per user request) */}
                    {/*
          {parentInfo.recentActivities && parentInfo.recentActivities.length > 0 && (
            <div className="text-sm text-gray-700 mt-4 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-md text-blue-600 mb-2">Hoạt động gần đây:</h3>
              <ul className="list-disc list-inside text-left mx-auto sm:mx-0 max-w-md">
                {parentInfo.recentActivities.map((activity, index) => (
                  <li key={index} className="mb-1">{activity}</li>
                ))}
              </ul>
            </div>
          )}
          */}
                </div>
            </div>

            {/* Footer (Optional) */}
            <footer className="text-center mt-12 mb-8 text-gray-500 text-sm">
                <p>&copy; 2024 Chợ Tài liệu Gia sư. Bảo lưu mọi quyền.</p>
            </footer>
        </div>
    );
};

export default TrangCaNhan;
