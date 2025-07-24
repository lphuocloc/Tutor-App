import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'; // Removed as it requires a Router context

const parentPosts = [
    {
        id: 1,
        title: 'Cần gia sư Toán lớp 9',
        subject: 'Toán',
        grade: '9',
        sessions: '3 buổi',
        time: 'Tối Thứ 2, 4, 6 (19:00 - 21:00)',
        area: 'Quận 3, TP.HCM',
        salary: '180.000 VNĐ / buổi'
    },
    {
        id: 2,
        title: 'Tìm gia sư Tiếng Anh giao tiếp',
        subject: 'Tiếng Anh',
        grade: '7 (Tiếng Anh giao tiếp)',
        sessions: '2 buổi',
        time: 'Chiều Thứ 3, 5 (16:00 - 17:30)',
        area: 'Quận Bình Thạnh, TP.HCM',
        salary: '150.000 VNĐ / buổi'
    },
    {
        id: 3,
        title: 'Gia sư Vật lý lớp 11',
        subject: 'Vật lý',
        grade: '11',
        sessions: '2 buổi',
        time: 'Tối Thứ 7, Chủ Nhật (20:00 - 21:30)',
        area: 'Quận Thủ Đức, TP.HCM',
        salary: '220.000 VNĐ / buổi'
    }
];

const TrangChu: React.FC = () => {
    // const navigate = useNavigate(); // Removed as it requires a Router context
    const [showVerificationAlert, setShowVerificationAlert] = useState(true);

    const tutors = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            subjects: 'Gia sư Toán, Lý, Hóa',
            rating: 4.9,
            reviews: 120,
            experience: '5 năm',
            price: '200.000',
            avatar: 'https://placehold.co/100x100/A0D9FF/FFFFFF?text=AV'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            subjects: 'Gia sư Tiếng Anh, Văn',
            rating: 4.8,
            reviews: 95,
            experience: '3 năm',
            price: '180.000',
            avatar: 'https://placehold.co/100x100/FFB3A7/FFFFFF?text=AV'
        },
        {
            id: 3,
            name: 'Lê Văn C',
            subjects: 'Gia sư Lập trình, Tin học',
            rating: 4.7,
            reviews: 70,
            experience: '4 năm',
            price: '250.000',
            avatar: 'https://placehold.co/100x100/B0E0E6/FFFFFF?text=AV'
        }
    ];

    // Sample data for featured CVs (can be a subset of the 'tutors' data or separate)
    const featuredTutorCVs = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            subjects: 'Toán, Lý, Hóa',
            rating: 4.9,
            reviews: 120,
            experience: '5 năm kinh nghiệm giảng dạy',
            specialization: 'Luyện thi Đại học khối A, B',
            education: 'Đại học Bách Khoa TP.HCM',
            avatar: 'https://placehold.co/100x100/A0D9FF/FFFFFF?text=AV'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            subjects: 'Tiếng Anh, Văn',
            rating: 4.8,
            reviews: 95,
            experience: '3 năm kinh nghiệm giảng dạy',
            specialization: 'IELTS, Giao tiếp',
            education: 'Đại học Sư phạm TP.HCM',
            avatar: 'https://placehold.co/100x100/FFB3A7/FFFFFF?text=AV'
        },
        {
            id: 3,
            name: 'Lê Văn C',
            subjects: 'Lập trình, Tin học',
            rating: 4.7,
            reviews: 70,
            experience: '4 năm kinh nghiệm giảng dạy',
            specialization: 'Python, Java, C++',
            education: 'Đại học Khoa học Tự nhiên',
            avatar: 'https://placehold.co/100x100/B0E0E6/FFFFFF?text=AV'
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            subjects: 'Hóa học, Sinh học',
            rating: 4.9,
            reviews: 80,
            experience: '6 năm kinh nghiệm giảng dạy',
            specialization: 'Luyện thi Đại học khối B',
            education: 'Đại học Y Dược TP.HCM',
            avatar: 'https://placehold.co/100x100/D8BFD8/800080?text=AV'
        },
        {
            id: 5,
            name: 'Hoàng Minh E',
            subjects: 'Ngữ văn',
            rating: 4.6,
            reviews: 60,
            experience: '2 năm kinh nghiệm giảng dạy',
            specialization: 'Ôn thi tốt nghiệp THPT',
            education: 'Đại học Khoa học Xã hội và Nhân văn',
            avatar: 'https://placehold.co/100x100/FFDAB9/A0522D?text=AV'
        }
    ];

    // Ref for the scrollable container
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true); // Assume initially there's content to scroll right
    const navigation = useNavigate();
    // Placeholder for navigation function since useNavigate is removed
    const handleNavigation = (path: string) => {
        alert(`Chức năng điều hướng đến "${path}" không khả dụng trong môi trường này.`);
    };

    // Function to check scroll position and update arrow visibility
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    // Effect to check scroll position on mount and whenever featuredTutorCVs changes
    useEffect(() => {
        checkScrollPosition();
        // Add event listener for resize to re-check scroll position
        window.addEventListener('resize', checkScrollPosition);
        return () => {
            window.removeEventListener('resize', checkScrollPosition);
        };
    }, [featuredTutorCVs]); // Re-run if CVs change

    // Function to scroll left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -350, // Scroll by a fixed amount (e.g., width of a card + gap)
                behavior: 'smooth'
            });
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 350, // Scroll by a fixed amount
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header (Placeholder - you might have a global Header component) */}
            <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between fixed w-full top-0 z-10">
                <div className="text-xl font-bold text-blue-800">Sutido App</div>
                <div className="flex-grow max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm gia sư, môn học, khu vực..."
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    {/* Notification Icon */}
                    <svg className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    {/* Message Icon */}
                    <svg className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    {/* User Avatar/Profile Icon */}
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:bg-blue-600">AV</div>
                </div>
            </nav>


            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pt-24 pb-10">
                {/* Verification Alert */}
                {showVerificationAlert && (
                    <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6 relative" role="alert">
                        {/* Exclamation Triangle Icon */}
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM10 11a1 1 0 100-2 1 1 0 000 2zm1-4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd"></path></svg>
                        <span>
                            Vui lòng <a href="#" className="underline font-semibold text-yellow-900 hover:text-yellow-700">xác thực CCCD</a> để đăng bài hoặc mở khóa thêm tính năng.
                        </span>
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-yellow-700 hover:text-yellow-900"
                            onClick={() => setShowVerificationAlert(false)}
                        >
                            <span className="sr-only">Đóng</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* New: Featured Tutor CVs Section - Horizontal Scroll with Arrows */}
                <section className="mb-10 relative"> {/* Added relative for arrow positioning */}
                    <h2 className="font-bold text-xl md:text-2xl text-gray-800 mb-6">CV tiêu biểu của Gia sư</h2>
                    {/* Scrollable container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto pb-4 space-x-6" // Removed scrollbar-hide to allow default scrollbar for touch devices if needed
                        onScroll={checkScrollPosition} // Add onScroll event listener
                    >
                        {featuredTutorCVs.map((tutor) => (
                            <div
                                key={tutor.id}
                                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
                            >
                                <img
                                    src={tutor.avatar}
                                    alt={`Ảnh đại diện của ${tutor.name}`}
                                    className="rounded-full border-2 border-blue-400 w-20 h-20 object-cover mb-3"
                                />
                                <h3 className="text-lg font-semibold text-blue-700 mb-1">{tutor.name}</h3>
                                <p className="text-gray-600 text-sm mb-1">{tutor.subjects}</p>
                                <p className="text-gray-500 text-xs mb-1">Kinh nghiệm: {tutor.experience}</p>
                                <p className="text-gray-500 text-xs mb-2">Chuyên môn: {tutor.specialization}</p>
                                <div className="flex items-center text-yellow-500 text-sm mb-3">
                                    {/* Star Icon */}
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 7.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                                    <span className="ml-1">{tutor.rating} ({tutor.reviews} đánh giá)</span>
                                </div>
                                <button
                                    className="mt-auto px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition"
                                    onClick={() => handleNavigation(`/gia-su/${tutor.id}`)} // Using placeholder navigation
                                >
                                    Xem CV chi tiết
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Left Scroll Arrow */}
                    {showLeftArrow && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 focus:outline-none transition-all duration-300 transform hover:scale-105 z-10" // Enhanced styling
                            aria-label="Cuộn sang trái"
                        >
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                    )}

                    {/* Right Scroll Arrow */}
                    {showRightArrow && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 focus:outline-none transition-all duration-300 transform hover:scale-105 z-10" // Enhanced styling
                            aria-label="Cuộn sang phải"
                        >
                            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    )}
                </section>


                {/* Featured Tutors */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
                    <h2 className="font-bold text-xl md:text-2xl text-gray-800">Các gia sư nổi bật</h2>
                    <button
                        className="bg-blue-600 text-white px-5 py-2 rounded font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
                        onClick={() => navigation('/tao-baidang-timgiasu')} // Using placeholder navigation
                    >
                        Đăng bài tìm gia sư
                        {/* Plus Icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </button>
                </div>

                {/* Filters */}
                <div className="rounded-xl b-6 p-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="font-medium text-gray-700">Lọc theo:</span>
                        <select className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400">
                            <option>Môn học</option>
                            <option>Toán</option>
                            <option>Văn</option>
                            <option>Tiếng Anh</option>
                        </select>
                        <select className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400">
                            <option>Lớp</option>
                            <option>Lớp 1-5</option>
                            <option>Lớp 6-9</option>
                            <option>Lớp 10-12</option>
                        </select>
                        <select className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400">
                            <option>Khu vực</option>
                            <option>Quận 1</option>
                            <option>Quận 3</option>
                            <option>Thủ Đức</option>
                        </select>
                        <select className="border rounded px-2 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400">
                            <option value="">Mức lương</option>
                            <option value="lt150">Dưới 150K</option>
                            <option value="150-200">150K - 200K</option>
                            <option value="gt200">Trên 200K</option>
                        </select>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2 shadow hover:bg-blue-700 transition">
                            {/* Filter Icon */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7.586V4z"></path></svg>
                            Áp dụng
                        </button>
                    </div>
                </div>

                {/* Tutor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {tutors.map((tutor) => (
                        <div key={tutor.id} className="bg-white rounded-xl shadow hover:shadow-lg transition h-full flex flex-col items-center p-6">
                            <img
                                src={tutor.avatar}
                                alt={`Gia sư ${tutor.name}`}
                                className="rounded-full border-4 border-blue-300 mb-3"
                                style={{ width: '96px', height: '96px' }}

                            />
                            <h5 className="text-lg font-semibold mb-1">{tutor.name}</h5>
                            <p className="text-blue-600 font-medium">{tutor.subjects}</p>
                            <div className="text-yellow-500 flex items-center justify-center mb-2">
                                {/* Star Icon */}
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 7.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                                <span className="ml-1">{tutor.rating} ({tutor.reviews} đánh giá)</span>
                            </div>
                            <p className="text-gray-500 text-sm">Kinh nghiệm: {tutor.experience}</p>
                            <p className="text-gray-500 text-sm mb-3">
                                Giá: Từ <span className="font-bold text-green-600">{tutor.price} VNĐ/buổi</span>
                            </p>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition mt-auto"
                                onClick={() => navigation('/baidang-giasu-cuthe')} // Using placeholder navigation
                            >
                                Tìm hiểu thêm
                            </button>
                        </div>
                    ))}
                </div>
                <section>
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Các bài đăng tìm gia sư từ Phụ huynh</h1>

                    {/* Filtering and Sorting Section for Parent Postings */}
                    <div className=" p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between mb-6">
                        <div className="flex flex-wrap gap-3 items-center">
                            <span className="font-medium text-gray-500">Lọc bài đăng theo:</span>
                            <select className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400 w-36">
                                <option value="">Môn học</option>
                                <option value="math">Toán</option>
                                <option value="literature">Văn</option>
                                <option value="english">Tiếng Anh</option>
                                <option value="physics">Vật lý</option>
                            </select>
                            <select className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400 w-28">
                                <option value="">Lớp</option>
                                <option value="1-5">Lớp 1-5</option>
                                <option value="6-9">Lớp 6-9</option>
                                <option value="10-12">Lớp 10-12</option>
                            </select>
                            <select className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400 w-32">
                                <option value="">Khu vực</option>
                                <option value="q1">Quận 1</option>
                                <option value="q3">Quận 3</option>
                                <option value="td">Thủ Đức</option>
                            </select>
                            <select className="border rounded px-2 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-400 w-32">
                                <option value="">Mức lương</option>
                                <option value="lt150">Dưới 150K</option>
                                <option value="150-200">150K - 200K</option>
                                <option value="gt200">Trên 200K</option>
                            </select>
                        </div>
                        <button className="bg-blue-600 text-white px-5 py-2 rounded font-semibold flex items-center gap-2 shadow hover:bg-blue-700 transition">
                            {/* Filter Icon */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7.586V4z"></path></svg>
                            Áp dụng
                        </button>
                    </div>

                    {/* Parent Postings List (Grid View) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {parentPosts.map(post => (
                            <div key={post.id} className="bg-white rounded-xl shadow p-6 flex flex-col h-full hover:shadow-lg transition">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                                <p className="text-gray-600 text-sm mb-1"><span className="font-medium">Môn học:</span> {post.subject}</p>
                                <p className="text-gray-600 text-sm mb-1"><span className="font-medium">Lớp:</span> {post.grade}</p>
                                <p className="text-gray-600 text-sm mb-1"><span className="font-medium">Số buổi/tuần:</span> {post.sessions}</p>
                                <p className="text-gray-600 text-sm mb-1"><span className="font-medium">Thời gian:</span> {post.time}</p>
                                <p className="text-gray-600 text-sm mb-1"><span className="font-medium">Khu vực:</span> {post.area}</p>
                                <p className="text-green-600 font-bold mt-2 mb-3">Lương: {post.salary}</p>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold mt-auto self-end hover:bg-blue-700 transition"
                                    onClick={() => navigation('/chitiet-lophoc')} // Using placeholder navigation
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TrangChu;
