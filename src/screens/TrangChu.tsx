/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

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
    const [isPaused, setIsPaused] = useState(false);
    const [showVerificationAlert, setShowVerificationAlert] = useState(true);

    const navigation = useNavigate();


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
    const SCROLL_DURATION = tutors.length * 7 + 's'

    // Ref for the scrollable container

    // Placeholder for navigation function since useNavigate is removed


    const TutorCard = ({ name, subjects, experience, specialization, rating, reviews, avatar }) => {
        // Hàm giả lập navigation
        // const handleNavigation = (path) => {
        //     console.log(`Điều hướng đến: ${path}`);
        //     // Thêm logic router thực tế ở đây
        // };

        return (
            <div
                className="w-80 bg-white rounded-2xl flex-shrink-0 shawdow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-[1.02] "
                style={{ minWidth: '320px' }} // Đảm bảo chiều rộng cố định để cuộn mượt
            >
                <img
                    src={avatar}
                    alt={`Ảnh đại diện của ${name}`}
                    className="rounded-full border-4 border-blue-400 w-20 h-20 object-cover mb-4 shadow-md"
                />
                <h3 className="text-xl font-bold text-blue-700 mb-1">{name}</h3>
                <p className="text-gray-600 font-medium text-sm mb-1">{subjects}</p>
                <p className="text-gray-500 text-xs mb-1">Kinh nghiệm: <span className="font-semibold">{experience}</span></p>
                <p className="text-gray-500 text-xs mb-2">Chuyên môn: <span className="font-semibold">{specialization}</span></p>

                <div className="flex items-center text-yellow-500 text-base mb-4">
                    {/* Star Icon (Lucide-react replacement for simplicity) */}
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 7.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                        </svg>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-700">{rating} ({reviews})</span>
                </div>

                <button
                    className="mt-auto w-full px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg"
                // onClick={() => handleNavigation(`/gia-su/${id}`)}
                >
                    Xem CV chi tiết
                </button>
            </div>
        );
    };

    return (
        <>
            <style>
                {
                    `
                @keyframes scroll-tutors {
                    0% { transform: translateX(0); }
                    /* Cuộn 50% tổng chiều rộng (tương đương với 1 bộ CV) */
                    100% { transform: translateX(-50%); } 
                }
                .animate-scroll-tutors {
                    animation: scroll-tutors ${SCROLL_DURATION} linear infinite;
                    /* Dùng flex để các item nằm ngang và không bị ngắt dòng */
                    display: flex; 
                    width: fit-content; /* Đảm bảo wrapper đủ rộng cho 2 bộ dữ liệu */
                }

                /* Tùy chỉnh để ẩn scrollbar nhưng vẫn cho phép cuộn trên thiết bị cảm ứng */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
                `}
            </style >
            <div className="bg-gray-100 min-h-screen">
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
                    <section className="mb-10 py-8">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-extrabold text-3xl md:text-4xl  text-gray-800 mb-8">
                                CV tiêu biểu của Gia sư
                            </h2>

                            {/* Vùng chứa cuộn chính */}
                            <div className="relative overflow-hidden hide-scrollbar py-4">
                                <div
                                    className="animate-scroll-tutors space-x-6"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                    style={{ animationPlayState: isPaused ? 'paused' : 'running', gap: '1.5rem' }} // space-x-6 (1.5rem)
                                >
                                    {/* Bộ CV đầu tiên */}
                                    {featuredTutorCVs.map((tutor, index) => (
                                        <TutorCard key={`first-${index}`} {...tutor} />
                                    ))}

                                    {/* Bộ CV thứ hai (Sao chép để tạo hiệu ứng vô hạn) */}
                                    {featuredTutorCVs.map((tutor, index) => (
                                        <TutorCard key={`second-${index}`} {...tutor} />
                                    ))}
                                </div>
                            </div>
                        </div>
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
                        <div className="flex flex-wrap items-center gap-4 justify-between">
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
                            </div>
                            <button className="bg-blue-600 text-white px-5 py-2 rounded font-semibold flex items-center gap-2 shadow hover:bg-blue-700 transition">
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

                        {/* Parent Postings Table */}
                        <Table
                            columns={[
                                {
                                    title: 'Tiêu đề',
                                    dataIndex: 'title',
                                    key: 'title',
                                    width: '20%',
                                    render: (text: string) => (
                                        <Typography.Text strong style={{ fontSize: '16px' }}>
                                            {text}
                                        </Typography.Text>
                                    ),
                                },
                                {
                                    title: 'Môn học',
                                    dataIndex: 'subject',
                                    key: 'subject',
                                    width: '10%',
                                    render: (text: string) => <Tag color="blue">{text}</Tag>,
                                },
                                {
                                    title: 'Lớp',
                                    dataIndex: 'grade',
                                    key: 'grade',
                                    width: '8%',
                                    render: (text: string) => <Tag color="purple">{text}</Tag>,
                                },
                                {
                                    title: 'Số buổi/tuần',
                                    dataIndex: 'sessions',
                                    key: 'sessions',
                                    width: '12%',
                                },
                                {
                                    title: 'Thời gian',
                                    dataIndex: 'time',
                                    key: 'time',
                                    width: '20%',
                                },
                                {
                                    title: 'Khu vực',
                                    dataIndex: 'area',
                                    key: 'area',
                                    width: '15%',
                                },
                                {
                                    title: 'Lương/buổi',
                                    dataIndex: 'salary',
                                    key: 'salary',
                                    width: '12%',
                                    render: (text: string) => (
                                        <Typography.Text style={{ color: '#52c41a', fontWeight: 'bold' }}>
                                            {text}
                                        </Typography.Text>
                                    ),
                                },
                                {
                                    title: 'Thao tác',
                                    key: 'action',
                                    width: '10%',
                                    render: () => (
                                        <Button
                                            type="primary"
                                            icon={<EyeOutlined />}
                                            onClick={() => navigation('/chitiet-lophoc')}
                                            size="small"
                                        >
                                            Xem chi tiết
                                        </Button>
                                    ),
                                },
                            ]}
                            dataSource={parentPosts}
                            rowKey="id"
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} của ${total} bài đăng`,
                            }}
                            locale={{
                                emptyText: (
                                    <div className="text-center py-12">
                                        <span className="text-6xl mb-4 block">📝</span>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài đăng nào</h3>
                                        <p className="text-gray-600">Hiện tại chưa có bài đăng tìm gia sư nào.</p>
                                    </div>
                                ),
                            }}
                            scroll={{ x: 1200 }}
                            size="middle"
                        />
                    </section>
                </div>
            </div>
        </>
    );
};

export default TrangChu;
