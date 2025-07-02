
export default function ChiTietLopHoc() {
    return (
        <div className="bg-slate-50 min-h-screen font-inter">
            {/* Header */}
            <header className="bg-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Back Button / Logo */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.history.back()}
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                            <i className="fas fa-arrow-left text-xl"></i>
                        </button>
                        <a href="#" className="text-blue-600 font-bold text-2xl">
                            Gia Sư App
                        </a>
                    </div>
                    {/* Search Bar (Optional, can be hidden on detail page) */}
                    <div className="flex-grow max-w-xl mx-8 hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm gia sư, môn học, khu vực..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
                    {/* Icons & User Menu */}
                    <div className="flex items-center space-x-6">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative"
                        >
                            <i className="fas fa-bell text-xl"></i>
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative"
                        >
                            <i className="fas fa-comment-dots text-xl"></i>
                        </a>
                        <div className="relative group">
                            <button className="flex items-center space-x-2 focus:outline-none">
                                <img
                                    src="https://placehold.co/40x40/FF7F50/FFFFFF?text=AV"
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto p-6 mt-20 sm:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Information Column */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
                        {/* 
                        Example for Phụ huynh đang xem bài đăng của Gia sư (COMMENTED OUT)
                        */}
                        {/* 
                        <div className="flex items-center space-x-4 mb-6">
                            <img src="https://placehold.co/120x120/A0D9FF/FFFFFF?text=AV" alt="Avatar Gia sư" className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-md" />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Gia sư Nguyễn Văn A</h1>
                                <p className="text-blue-600 font-medium text-xl mt-1">Chuyên Toán, Lý, Hóa - Lớp 6-12</p>
                                <div className="flex items-center text-yellow-500 mt-2">
                                    <i className="fas fa-star text-base mr-1"></i>
                                    <i className="fas fa-star text-base mr-1"></i>
                                    <i className="fas fa-star text-base mr-1"></i>
                                    <i className="fas fa-star text-base mr-1"></i>
                                    <i className="fas fa-star-half-alt text-base mr-2"></i>
                                    <span className="text-gray-600 font-semibold">4.8</span>
                                    <span className="text-gray-500 ml-2">(120 đánh giá)</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8 border-t border-gray-200 pt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thông tin chi tiết gia sư</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
                                <p><span className="font-medium text-gray-800">Kinh nghiệm:</span> 5 năm giảng dạy</p>
                                <p><span className="font-medium text-gray-800">Trình độ học vấn:</span> Đại học Bách Khoa TP.HCM (Kỹ sư)</p>
                                <p><span className="font-medium text-gray-800">Môn học giảng dạy:</span> Toán, Lý, Hóa</p>
                                <p><span className="font-medium text-gray-800">Các lớp dạy:</span> Lớp 6, 7, 8, 9, 10, 11, 12</p>
                                <p className="md:col-span-2"><span className="font-medium text-gray-800">Khu vực dạy:</span> Quận 1, Quận 3, Phú Nhuận, Bình Thạnh</p>
                                <p className="md:col-span-2 text-green-600 text-2xl font-bold mt-4">Giá tiền: 200.000 VNĐ / buổi</p>
                            </div>
                        </div>
                        <div className="mb-8 border-t border-gray-200 pt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mô tả chi tiết</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Xin chào, tôi là Nguyễn Văn A, tốt nghiệp Đại học Bách Khoa TP.HCM chuyên ngành Kỹ thuật. Với 5 năm kinh nghiệm giảng dạy, tôi tự tin có thể giúp các em học sinh nắm vững kiến thức Toán, Lý, Hóa từ cơ bản đến nâng cao. Tôi đặc biệt chú trọng vào việc xây dựng nền tảng vững chắc, phát triển tư duy logic và kỹ năng giải quyết vấn đề cho học sinh.
                                <br /><br />
                                Phương pháp giảng dạy của tôi linh hoạt, phù hợp với từng đối tượng học sinh, từ việc củng cố kiến thức cho học sinh mất gốc đến việc ôn luyện chuyên sâu cho các kỳ thi quan trọng như thi vào lớp 10, thi THPT Quốc gia. Tôi luôn tạo không khí học tập thoải mái, khuyến khích học sinh đặt câu hỏi và tự khám phá kiến thức.
                                <br /><br />
                                Tôi cam kết đồng hành cùng học sinh để đạt được kết quả tốt nhất. Hãy liên hệ với tôi để chúng ta cùng xây dựng lộ trình học tập hiệu quả nhé!
                            </p>
                        </div>
                        */}
                        {/* Example for Gia sư đang xem bài đăng của Phụ huynh (ACTIVE) */}
                        <div className="mb-8 pb-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <img
                                    src="https://placehold.co/120x120/FF7F50/FFFFFF?text=PH"
                                    alt="Avatar Phụ huynh"
                                    className="w-28 h-28 rounded-full border-4 border-purple-300 shadow-md"
                                />
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        Cần Gia sư Tiếng Anh Lớp 7
                                    </h1>
                                    <p className="text-purple-600 font-medium text-xl mt-1">
                                        Đăng bởi Phụ huynh Trần Thị B
                                    </p>
                                    <p className="text-gray-600 text-sm mt-2">
                                        Đăng ngày: 27/06/2025
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-t border-gray-200 pt-6">
                                Thông tin chi tiết lớp học
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
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
                                <p className="text-green-600 text-2xl font-bold mt-4">
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
                        <div className="flex justify-center mt-8">
                            <button
                                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-xl hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
                                onClick={() => alert('Chuyển đến màn hình đặt cọc để trò chuyện với phụ huynh.')}
                            >
                                Tìm hiểu thêm <i className="fas fa-arrow-right ml-3"></i>
                            </button>
                        </div>
                    </div>
                    {/* Sidebar Column */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Section: Reviews and Comments */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Đánh giá &amp; Bình luận (Về Phụ huynh/Người đăng)
                            </h2>
                            <div className="space-y-4">
                                {/* Review 1 */}
                                <div className="border-b border-gray-200 pb-4 last:border-b-0">
                                    <div className="flex items-center mb-2">
                                        <img
                                            src="https://placehold.co/40x40/DDA0DD/FFFFFF?text=AV"
                                            alt="Avatar user 1"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">Gia sư Lê A</p>
                                            <div className="flex items-center text-yellow-500 text-sm">
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star mr-1"></i> 5.0
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        "Phụ huynh rất thân thiện và tạo điều kiện tốt cho việc dạy học."
                                    </p>
                                </div>
                                {/* Review 2 */}
                                <div className="border-b border-gray-200 pb-4 last:border-b-0">
                                    <div className="flex items-center mb-2">
                                        <img
                                            src="https://placehold.co/40x40/FFD700/FFFFFF?text=AV"
                                            alt="Avatar user 2"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">Gia sư Minh C</p>
                                            <div className="flex items-center text-yellow-500 text-sm">
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star mr-1"></i>
                                                <i className="fas fa-star-half-alt mr-1"></i> 4.5
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        "Học viên rất ngoan và có ý thức học hỏi."
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="block text-center text-blue-600 hover:text-blue-800 font-medium mt-4"
                                >
                                    Xem tất cả đánh giá <i className="fas fa-chevron-right ml-1 text-xs"></i>
                                </a>
                            </div>
                        </div>
                        {/* Section: Similar Posts */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Bài đăng tương tự
                            </h2>
                            <div className="space-y-4">
                                {/* Similar Card 1 */}
                                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                    <img
                                        src="https://placehold.co/60x60/B0E0E6/FFFFFF?text=PH"
                                        alt="Similar Post 1"
                                        className="w-16 h-16 rounded-full border border-gray-200"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">Cần gia sư Toán lớp 8</p>
                                        <p className="text-gray-600 text-sm">Q.1 - 170.000 VNĐ/buổi</p>
                                    </div>
                                </div>
                                {/* Similar Card 2 */}
                                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                    <img
                                        src="https://placehold.co/60x60/D8BFD8/FFFFFF?text=PH"
                                        alt="Similar Post 2"
                                        className="w-16 h-16 rounded-full border border-gray-200"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">Gia sư Lý lớp 10</p>
                                        <p className="text-gray-600 text-sm">Q.Tân Bình - 200.000 VNĐ/buổi</p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="block text-center text-blue-600 hover:text-blue-800 font-medium mt-4"
                                >
                                    Xem thêm <i className="fas fa-chevron-right ml-1 text-xs"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-400">
                        © 2025 Ứng dụng Gia Sư. Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </footer>
            {/* Font and Icon CDN links */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
        </div>
    );
}
