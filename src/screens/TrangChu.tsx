import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

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
]

const TrangChu: React.FC = () => {
    const navigate = useNavigate()
    const [showVerificationAlert, setShowVerificationAlert] = useState(true)

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
    ]

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <Header />
            {/* <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white shadow z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                    <a className="font-bold text-2xl md:text-3xl" href="#">Sutido App</a>
                    <div className="flex items-center gap-3">
                        <button
                            className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-blue-600 transition font-medium"
                            onClick={() => navigate('/dangky-lamgiasu')}
                        >
                            Đăng ký làm gia sư
                        </button>
                        <button
                            className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-100 transition"
                            onClick={() => navigate('/baidang-giasu-cuthe')}
                        >
                            Xem bài đăng
                        </button>
                    </div>
                </div>
            </nav> */}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 pt-24 pb-10">
                {/* Verification Alert */}
                {showVerificationAlert && (
                    <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6 relative" role="alert">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        <span>
                            Vui lòng <a href="#" className="underline font-semibold">xác thực CCCD</a> để đăng bài hoặc mở khóa thêm tính năng.
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

                {/* Featured Tutors */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
                    <h2 className="font-bold text-xl md:text-2xl">Các gia sư nổi bật</h2>
                    <button
                        className="bg-blue-600 text-white px-5 py-2 rounded font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
                        onClick={() => navigate('/tao-baidang-timgiasu')}
                    >
                        Đăng bài tìm gia sư <i className="fas fa-plus"></i>
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
                        <button className="border bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 transition">
                            <i className="fas fa-filter"></i>Áp dụng
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
                                <i className="fas fa-star"></i>
                                <span className="ml-1">{tutor.rating} ({tutor.reviews} đánh giá)</span>
                            </div>
                            <p className="text-gray-500 text-sm">Kinh nghiệm: {tutor.experience}</p>
                            <p className="text-gray-500 text-sm mb-3">
                                Giá: Từ <span className="font-bold text-green-600">{tutor.price} VNĐ/buổi</span>
                            </p>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition mt-auto"
                                onClick={() => navigate('/baidang-giasu-cuthe')}
                            >
                                Tìm hiểu thêm
                            </button>
                        </div>
                    ))}
                </div>
                <section>
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Các bài đăng tìm gia sư từ Phụ huynh</h1>

                    {/* Filtering and Sorting Section for Parent Postings */}
                    <div className=" p-4 rounded-xl  flex flex-wrap gap-4 items-center justify-between mb-6">
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
                            <i className="fas fa-filter"></i>Lọc bài
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
                                    onClick={() => navigate('/chitiet-lophoc')}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TrangChu 