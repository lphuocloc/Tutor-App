import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Không có quyền truy cập</h1>
                    <p className="text-gray-600">
                        Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là lỗi.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium"
                    >
                        ← Quay lại
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                    >
                        Đăng nhập lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
