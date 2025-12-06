import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Typography } from 'antd';
import { useTutorPosts, fetchTutorPosts } from '../store/tutorPosts';
import { getUser, useUser } from '../store';
import { usePosts, fetchPosts } from '../store/posts';



const TrangChu: React.FC = () => {
    // const navigate = useNavigate(); // Removed as it requires a Router context
    const [isPaused, setIsPaused] = useState(false);
    const [showAllTutors, setShowAllTutors] = useState(false);
    const tutorPosts = useTutorPosts();
    const users = useUser();
    const cusPosts = usePosts();
    const navigation = useNavigate();

    // Fetch tutor posts on component mount
    useEffect(() => {
        fetchTutorPosts({ page: 1, pageSize: 20 });
        fetchPosts({ page: 1, pageSize: 20 });
        getUser();
    }, []);

    const listRoleTutor = users.filter((user) => user.role === 'Tutor')

    const parentPosts = cusPosts.map(post => ({
        id: post.postId,
        title: post.title,
        subject: post.subject || 'Chưa cập nhật',
        grade: post.studentGrade,
        sessions: `${post.sessionsPerWeek} buổi/tuần`,
        time: `${post.preferredDays} - ${post.preferredTime}`,
        area: post.location || 'Chưa cập nhật',
        salary: post.pricePerSession.toLocaleString('vi-VN') + ' VNĐ/buổi'
    }));

    const tutors = listRoleTutor.map(user => ({
        id: user.userId,
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        rating: 4.5,
        reviews: 0,
        experience: 'Chưa cập nhật',
        avatar: 'https://placehold.co/100x100/A0D9FF/FFFFFF?text=' + (user.fullName?.charAt(0) || 'GS'),
        location: user.district && user.city ? `${user.district}, ${user.city}` : 'Chưa cập nhật'
    }));

    // Map tutorPosts data for featured CVs section
    const featuredTutorCVs = tutorPosts.posts.map(post => ({
        id: post.postId,
        name: post.title,
        subjects: post.subject || 'Chưa cập nhật',
        rating: 4.5,
        reviews: 0,
        experience: `${post.sessionsPerWeek} buổi/tuần`,
        specialization: `${post.preferredDays} - ${post.preferredTime}`,
        education: post.location || 'Chưa cập nhật',
        avatar: 'https://placehold.co/100x100/A0D9FF/FFFFFF?text=' + (post.subject?.charAt(0) || 'GS'),
        location: post.location || 'Chưa cập nhật',
        price: post.pricePerSession.toLocaleString('vi-VN'),
        grade: post.studentGrade
    }));

    const SCROLL_DURATION = featuredTutorCVs.length * 7 + 's'

    // Ref for the scrollable container

    // Placeholder for navigation function since useNavigate is removed


    const TutorCard = ({ name, subjects, experience, specialization, avatar, location, price, grade }) => {
        // Hàm giả lập navigation
        // const handleNavigation = (path) => {
        //     console.log(`Điều hướng đến: ${path}`);
        //     // Thêm logic router thực tế ở đây
        // };

        return (
            <div
                className="w-70 bg-white rounded-2xl flex-shrink-0 shawdow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-[1.02] "
                style={{ minWidth: '320px' }} // Đảm bảo chiều rộng cố định để cuộn mượt
            >
                <img
                    src={avatar}
                    alt={`Ảnh đại diện của ${name}`}
                    className="rounded-full border-4 border-blue-400 w-20 h-20 object-cover mb-4 shadow-md"
                />
                <h3 className="text-xl font-bold text-blue-700 mb-1">{name}</h3>
                <p className="text-gray-600 font-medium text-sm mb-1">{subjects}</p>
                <p className="text-gray-500 text-xs mb-1">Lớp: <span className="font-semibold">{grade}</span></p>
                <p className="text-gray-500 text-xs mb-1">Số buổi: <span className="font-semibold">{experience}</span></p>
                <p className="text-gray-500 text-xs mb-1">Thời gian: <span className="font-semibold">{specialization}</span></p>
                <p className="text-gray-500 text-xs mb-2">Khu vực: <span className="font-semibold">{location}</span></p>
                <p className="text-green-600 font-bold text-base mb-3">{price} VNĐ/buổi</p>




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
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 pt-24 pb-10">
                    {/* Verification Alert */}


                    {/* New: Featured Tutor CVs Section - Horizontal Scroll with Arrows */}
                    <section className="mb-10 py-8">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-gradient">
                                Bài đăng của Gia sư
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
                        <h2 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Các gia sư nổi bật</h2>
                        {localStorage.getItem('userRole') !== 'Tutor' && (
                            <button
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={() => navigation('/tao-baidang-timgiasu')} // Using placeholder navigation
                            >
                                Đăng bài tìm gia sư
                                {/* Plus Icon */}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </button>
                        )}
                    </div>

                    {/* Filters */}


                    {/* Tutor Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {(showAllTutors ? tutors : tutors.slice(0, 3)).map((tutor) => (
                            <div key={tutor.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center p-6 border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-2">
                                <img
                                    src={tutor.avatar}
                                    alt={`Gia sư ${tutor.name}`}
                                    className="rounded-full border-4 border-blue-300 mb-3 animate-float"
                                    style={{ width: '96px', height: '96px' }}

                                />
                                <h5 className="text-lg font-semibold mb-1 text-gray-800">{tutor.name}</h5>
                                <p className="text-blue-600 font-medium text-sm mb-1">{tutor.email}</p>
                                <p className="text-gray-600 text-sm mb-1">📞 {tutor.phone}</p>
                                <p className="text-gray-500 text-xs mb-1">🎂 {new Date(tutor.dateOfBirth).toLocaleDateString('vi-VN')}</p>
                                <p className="text-gray-500 text-sm mb-2">📍 {tutor.location}</p>
                                <div className="text-yellow-500 flex items-center justify-center mb-2">
                                    {/* Star Icon */}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Show More/Less Button */}
                    {tutors.length > 3 && (
                        <div className="flex justify-center mb-10">
                            <button
                                onClick={() => setShowAllTutors(!showAllTutors)}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                            >
                                {showAllTutors ? 'Thu gọn' : `Xem thêm ${tutors.length - 3} gia sư`}
                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${showAllTutors ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                    )}

                    <section className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Các bài đăng tìm gia sư từ Phụ huynh</h1>

                        {/* Filtering and Sorting Section for Parent Postings */}

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
