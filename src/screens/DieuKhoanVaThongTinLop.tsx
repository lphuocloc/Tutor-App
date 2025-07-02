import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DieuKhoanVaThongTinLop: React.FC = () => {
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    // Sử dụng Alert của antd để thể hiện thông báo
    const handleConfirm = () => {
        messageApi.success('Bạn đã đồng ý với điều khoản và xác nhận thông tin lớp học!');
        setTimeout(() => {
            navigate('/trangchu');
        }, 1200); // Hiển thị Alert 1.2s rồi chuyển trang
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-4 px-2 sm:px-4 lg:px-6">
            <div className="bg-white rounded-2xl shadow-xl p-3 md:p-5 w-full max-w-7xl mt-20 transition-all duration-300 ease-in-out">
                {/* Alert xác nhận */}
                <div className="mb-4">
                    <Alert
                        message="Bạn đã đồng ý với điều khoản và xác nhận thông tin lớp học!"
                        type="success"
                        showIcon
                    />
                </div>

                {/* Header xác nhận */}
                <div className="text-center mb-6 animate-fadeIn">
                    <style>
                        {`
                        @keyframes bounceIcon {
                            0%, 100% { transform: translateY(0);}
                            20% { transform: translateY(-15px);}
                            40% { transform: translateY(0);}
                            60% { transform: translateY(-10px);}
                            80% { transform: translateY(0);}
                        }
                        .bounce-vertical {
                            animation: bounceIcon 1.5s infinite;
                            display: inline-block;
                        }
                        `}
                    </style>
                    <i className="fas fa-check-circle text-green-500 text-3xl mb-2 bounce-vertical"></i>
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Lớp học của bạn đã được xác nhận!</h1>
                    <p className="text-gray-600 text-base">Chúc mừng bạn đã tìm được gia sư/lớp học phù hợp.</p>
                </div>

                {/* Thông tin liên hệ */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
                        <i className="fas fa-address-book text-blue-500"></i> Thông tin liên hệ
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Thẻ Gia sư */}
                        <div className="flex flex-col items-center bg-blue-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md">
                            <img
                                src="https://placehold.co/80x80/A0D9FF/FFFFFF?text=GS"
                                alt="Avatar Gia sư"
                                className="rounded-full border-2 border-blue-400 mb-2 w-20 h-20 object-cover"
                            />
                            <p className="font-bold text-gray-900 text-base mb-1">Gia sư Nguyễn Văn A</p>
                            <div className="text-blue-700 text-sm mb-3 flex items-center justify-center gap-1">
                                <i className="fas fa-phone-alt"></i>
                                <span>0987 654 321</span>
                            </div>
                            <div className="flex gap-2">
                                <a href="tel:0987654321" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full transition-all duration-200 shadow">
                                    <i className="fas fa-phone"></i> Gọi
                                </a>
                                <a href="sms:0987654321" className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full transition-all duration-200 shadow">
                                    <i className="fas fa-sms"></i> Nhắn tin
                                </a>
                            </div>
                        </div>
                        {/* Thẻ Phụ huynh */}
                        <div className="flex flex-col items-center bg-cyan-50 rounded-lg p-3 transition-all duration-300 hover:shadow-md">
                            <img
                                src="https://placehold.co/80x80/FF7F50/FFFFFF?text=PH"
                                alt="Avatar Phụ huynh"
                                className="rounded-full border-2 border-cyan-400 mb-2 w-20 h-20 object-cover"
                            />
                            <p className="font-bold text-gray-900 text-base mb-1">Phụ huynh Trần Thị B</p>
                            <div className="text-cyan-700 text-sm mb-3 flex items-center justify-center gap-1">
                                <i className="fas fa-phone-alt"></i>
                                <span>0912 345 678</span>
                            </div>
                            <div className="flex gap-2">
                                <a href="tel:0912345678" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full transition-all duration-200 shadow">
                                    <i className="fas fa-phone"></i> Gọi
                                </a>
                                <a href="sms:0912345678" className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-full transition-all duration-200 shadow">
                                    <i className="fas fa-sms"></i> Nhắn tin
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin lớp học */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
                        <i className="fas fa-info-circle text-gray-500"></i> Thông tin lớp học
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-gray-800 text-sm">
                        {/* Trái */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-700 flex items-center gap-1">
                                    <i className="fas fa-book text-blue-400"></i> Môn học:
                                </span>
                                <span>Toán</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-700 flex items-center gap-1">
                                    <i className="fas fa-graduation-cap text-purple-400"></i> Lớp:
                                </span>
                                <span>9</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-700 flex items-center gap-1">
                                    <i className="fas fa-calendar-alt text-red-400"></i> Số buổi/tuần:
                                </span>
                                <span>3 buổi</span>
                            </div>
                        </div>
                        {/* Phải */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-700 flex items-center gap-1">
                                    <i className="fas fa-clock text-orange-400"></i> Thời gian dạy:
                                </span>
                                <span>Tối Thứ 2, 4, 6 (19:00 - 21:00)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-700 flex items-center gap-1">
                                    <i className="fas fa-money-bill-wave text-green-500"></i> Lương/buổi:
                                </span>
                                <span className="font-bold text-green-600 text-base">180.000 VNĐ</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-700 flex items-center gap-1">
                                    <i className="fas fa-map-marker-alt text-indigo-400"></i> Địa điểm:
                                </span>
                                <span>123 Đường ABC, Phường XYZ, Quận 3, TP.HCM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Điều khoản & Quy định */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
                        <i className="fas fa-file-contract text-gray-500"></i> Điều khoản & Quy định Lớp học
                    </h2>
                    <div className="overflow-y-auto rounded-lg p-3 bg-gray-50 text-gray-800 text-xs mb-4 custom-scrollbar max-h-32">
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Gia sư cam kết đến đúng giờ, chuẩn bị bài giảng đầy đủ và có trách nhiệm với kết quả học tập của học viên.</li>
                            <li>Phụ huynh cam kết tạo điều kiện học tập tốt nhất cho học viên, thanh toán học phí đúng hạn theo thỏa thuận.</li>
                            <li>Trong <b>7 ngày đầu tiên</b> kể từ buổi học đầu tiên, nếu có bất kỳ vấn đề phát sinh (gia sư không phù hợp, học viên không hợp...), hai bên có quyền yêu cầu hỗ trợ từ nền tảng để giải quyết. Các trường hợp hoàn phí/đổi gia sư sẽ được xem xét tùy theo mức độ.</li>
                            <li>Nền tảng sẽ theo dõi quá trình giảng dạy qua chức năng check-in/check-out của gia sư.</li>
                            <li className="text-red-700 font-medium">Mọi hành vi vi phạm điều khoản, bao gồm nhưng không giới hạn việc cố ý trao đổi thông tin liên lạc cá nhân ngoài luồng hệ thống nhằm trốn tránh phí dịch vụ, sẽ bị xử lý nghiêm khắc (không hoàn cọc, khóa tài khoản...).</li>
                            <li>Sau khi kết thúc thời gian theo dõi lớp học, hai bên sẽ thực hiện đánh giá lẫn nhau để cải thiện chất lượng dịch vụ.</li>
                            <li>Các điều khoản khác sẽ được áp dụng theo chính sách chung của Ứng dụng Gia Sư.</li>
                        </ul>
                        <p className="font-bold mt-2 text-red-600 text-center text-xs">Vui lòng đọc kỹ trước khi đồng ý.</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <input
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            type="checkbox"
                            id="agreeTerms"
                            checked={agreed}
                            onChange={e => setAgreed(e.target.checked)}
                        />
                        <label className="ml-2 text-sm text-gray-800 select-none cursor-pointer" htmlFor="agreeTerms">
                            Tôi đã đọc và <b>đồng ý</b> với các điều khoản trên.
                        </label>
                    </div>
                </div>

                {/* Nút Xác nhận */}
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 text-lg font-bold rounded-lg shadow transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                    disabled={!agreed}
                    onClick={handleConfirm}
                >
                    Xác nhận thông tin lớp học
                </button>
            </div>
            {contextHolder}
        </div>
    );
};

export default DieuKhoanVaThongTinLop;