import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function ChiTietLopHoc() {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-50 min-h-screen font-inter">
            {/* Header */}
            <Header />
            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto p-4 mt-16 sm:mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Main Information Column */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
                        {/* 
                        Example for Phụ huynh đang xem bài đăng của Gia sư (COMMENTED OUT)
                        */}
                        {/* 
                        <div className="flex items-center space-x-2 mb-4">
                            <img src="https://placehold.co/80x80/A0D9FF/FFFFFF?text=AV" alt="Avatar Gia sư" className="w-20 h-20 rounded-full border-2 border-blue-300 shadow" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Gia sư Nguyễn Văn A</h1>
                                <p className="text-blue-600 font-medium text-lg mt-1">Chuyên Toán, Lý, Hóa - Lớp 6-12</p>
                                <div className="flex items-center text-yellow-500 mt-1">
                                    <i className="fas fa-star text-sm mr-1"></i>
                                    <i className="fas fa-star text-sm mr-1"></i>
                                    <i className="fas fa-star text-sm mr-1"></i>
                                    <i className="fas fa-star text-sm mr-1"></i>
                                    <i className="fas fa-star-half-alt text-sm mr-2"></i>
                                    <span className="text-gray-600 font-semibold text-sm">4.8</span>
                                    <span className="text-gray-500 ml-2 text-xs">(120 đánh giá)</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 border-t border-gray-200 pt-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Thông tin chi tiết gia sư</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-base">
                                <p><span className="font-medium text-gray-800">Kinh nghiệm:</span> 5 năm giảng dạy</p>
                                <p><span className="font-medium text-gray-800">Trình độ học vấn:</span> Đại học Bách Khoa TP.HCM (Kỹ sư)</p>
                                <p><span className="font-medium text-gray-800">Môn học giảng dạy:</span> Toán, Lý, Hóa</p>
                                <p><span className="font-medium text-gray-800">Các lớp dạy:</span> Lớp 6, 7, 8, 9, 10, 11, 12</p>
                                <p className="md:col-span-2"><span className="font-medium text-gray-800">Khu vực dạy:</span> Quận 1, Quận 3, Phú Nhuận, Bình Thạnh</p>
                                <p className="md:col-span-2 text-green-600 text-xl font-bold mt-2">Giá tiền: 200.000 VNĐ / buổi</p>
                            </div>
                        </div>
                        <div className="mb-4 border-t border-gray-200 pt-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Mô tả chi tiết</h2>
                            <p className="text-gray-700 leading-relaxed text-base">
                                Xin chào, tôi là Nguyễn Văn A, tốt nghiệp Đại học Bách Khoa TP.HCM chuyên ngành Kỹ thuật. Với 5 năm kinh nghiệm giảng dạy, tôi tự tin có thể giúp các em học sinh nắm vững kiến thức Toán, Lý, Hóa từ cơ bản đến nâng cao. Tôi đặc biệt chú trọng vào việc xây dựng nền tảng vững chắc, phát triển tư duy logic và kỹ năng giải quyết vấn đề cho học sinh.
                                <br /><br />
                                Phương pháp giảng dạy của tôi linh hoạt, phù hợp với từng đối tượng học sinh, từ việc củng cố kiến thức cho học sinh mất gốc đến việc ôn luyện chuyên sâu cho các kỳ thi quan trọng như thi vào lớp 10, thi THPT Quốc gia. Tôi luôn tạo không khí học tập thoải mái, khuyến khích học sinh đặt câu hỏi và tự khám phá kiến thức.
                                <br /><br />
                                Tôi cam kết đồng hành cùng học sinh để đạt được kết quả tốt nhất. Hãy liên hệ với tôi để chúng ta cùng xây dựng lộ trình học tập hiệu quả nhé!
                            </p>
                        </div>
                        */}
                        {/* Example for Gia sư đang xem bài đăng của Phụ huynh (ACTIVE) */}
                        <div className="mb-6 pb-4">
                            <div className="flex items-center space-x-2 mb-4">
                                <img
                                    src="https://placehold.co/80x80/FF7F50/FFFFFF?text=PH"
                                    alt="Avatar Phụ huynh"
                                    className="w-20 h-20 rounded-full border-2 border-purple-300 shadow"
                                />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        Cần Gia sư Tiếng Anh Lớp 7
                                    </h1>
                                    <p className="text-purple-600 font-medium text-lg mt-1">
                                        Đăng bởi Phụ huynh Trần Thị B
                                    </p>
                                    <p className="text-gray-600 text-xs mt-1">
                                        Đăng ngày: 27/06/2025
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 border-t border-gray-200 pt-4">
                                Thông tin chi tiết lớp học
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-base">
                                <p>
                                    <span className="font-medium text-gray-800">Môn học:</span> Tiếng Anh
                                </p>
                                <p>
                                    <span className="font-medium text-gray-800">Lớp:</span> 7 (Tiếng Anh giao tiếp)
                                </p>
                                <p>
                                    <span className="font-medium text-gray-800">Số buổi/tuần:</span> 2 buổi
                                </p>
                                <p>
                                    <span className="font-medium text-gray-800">Thời gian:</span> Chiều Thứ 3, 5 (16:00 - 17:30)
                                </p>
                                <p>
                                    <span className="font-medium text-gray-800">Khu vực:</span> Quận Bình Thạnh, TP.HCM
                                </p>
                                <p className="text-green-600 text-xl font-bold mt-2">
                                    Mức lương đề xuất: 150.000 VNĐ / buổi
                                </p>
                                <p className="md:col-span-2">
                                    <span className="font-medium text-gray-800">Địa điểm chi tiết:</span> Gần chợ Bà Chiểu, Quận Bình Thạnh
                                </p>
                                <p className="md:col-span-2">
                                    <span className="font-medium text-gray-800">Yêu cầu thêm:</span> Ưu tiên gia sư nữ, nhiệt tình, có phương pháp giảng dạy sáng tạo để cháu hứng thú hơn với môn học. Cháu cần cải thiện kỹ năng nghe, nói và ngữ pháp cơ bản.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md transform hover:scale-105"
                                onClick={() => navigate('/xacnhan-datcoc-giasu')}
                            >
                                Tìm hiểu thêm <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                    {/* Sidebar Column */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Section: Similar Posts */}
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Bài đăng tương tự
                            </h2>
                            <div className="space-y-2">
                                {/* Similar Card 1 */}
                                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                    <img
                                        src="https://placehold.co/40x40/B0E0E6/FFFFFF?text=PH"
                                        alt="Similar Post 1"
                                        className="w-10 h-10 rounded-full border border-gray-200"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">Cần gia sư Toán lớp 8</p>
                                        <p className="text-gray-600 text-xs">Q.1 - 170.000 VNĐ/buổi</p>
                                    </div>
                                </div>
                                {/* Similar Card 2 */}
                                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                    <img
                                        src="https://placehold.co/40x40/D8BFD8/FFFFFF?text=PH"
                                        alt="Similar Post 2"
                                        className="w-10 h-10 rounded-full border border-gray-200"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">Gia sư Lý lớp 10</p>
                                        <p className="text-gray-600 text-xs">Q.Tân Bình - 200.000 VNĐ/buổi</p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="block text-center text-blue-600 hover:text-blue-800 font-medium mt-2 text-sm"
                                >
                                    Xem thêm <i className="fas fa-chevron-right ml-1 text-xs"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            {/* Footer */}

            {/* Font and Icon CDN links */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
        </div >
    );
}
