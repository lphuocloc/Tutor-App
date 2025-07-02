import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <div className="container-fluid bg-light min-vh-100">
            {/* Header */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold fs-3" href="#">Gia Sư App</a>

                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-outline-light me-2" onClick={() => navigate('/dangky-lamgiasu')}>
                            Đăng ký làm gia sư
                        </button>
                        <button className="btn btn-light" onClick={() => navigate('/baidang-giasu-cuthe')}>
                            Xem bài đăng
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mt-5 pt-5">
                {/* Verification Alert */}
                {showVerificationAlert && (
                    <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Vui lòng <a href="#" className="alert-link">xác thực CCCD</a> để đăng bài hoặc mở khóa thêm tính năng.
                        <button type="button" className="btn-close" onClick={() => setShowVerificationAlert(false)}></button>
                    </div>
                )}

                {/* Featured Tutors */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Các gia sư nổi bật</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/dangky-lamgiasu')}>
                        Đăng bài tìm gia sư <i className="fas fa-plus ms-2"></i>
                    </button>
                </div>

                {/* Filters */}
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <span className="fw-medium">Lọc theo:</span>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select">
                                    <option>Môn học</option>
                                    <option>Toán</option>
                                    <option>Văn</option>
                                    <option>Tiếng Anh</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select">
                                    <option>Lớp</option>
                                    <option>Lớp 1-5</option>
                                    <option>Lớp 6-9</option>
                                    <option>Lớp 10-12</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select">
                                    <option>Khu vực</option>
                                    <option>Quận 1</option>
                                    <option>Quận 3</option>
                                    <option>Thủ Đức</option>
                                </select>
                            </div>
                            <div className="col-md-auto">
                                <button className="btn btn-outline-secondary">
                                    <i className="fas fa-filter me-2"></i>Áp dụng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tutor Cards */}
                <div className="row g-4">
                    {tutors.map((tutor) => (
                        <div key={tutor.id} className="col-lg-4 col-md-6">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <img
                                        src={tutor.avatar}
                                        alt={`Gia sư ${tutor.name}`}
                                        className="rounded-circle border border-primary mb-3"
                                        style={{ width: '96px', height: '96px' }}
                                    />
                                    <h5 className="card-title">{tutor.name}</h5>
                                    <p className="text-primary fw-medium">{tutor.subjects}</p>
                                    <div className="text-warning mb-2">
                                        <i className="fas fa-star"></i>
                                        <span className="ms-1">{tutor.rating} ({tutor.reviews} đánh giá)</span>
                                    </div>
                                    <p className="text-muted small">Kinh nghiệm: {tutor.experience}</p>
                                    <p className="text-muted small mb-3">
                                        Giá: Từ <span className="fw-bold text-success">{tutor.price} VNĐ/buổi</span>
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate('/baidang-giasu-cuthe')}
                                    >
                                        Tìm hiểu thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <section>
                    <h1 className="fs-2 fw-bold text-center text-dark mb-4">Các bài đăng tìm gia sư từ Phụ huynh</h1>

                    {/* Filtering and Sorting Section for Parent Postings */}
                    <div className="bg-white p-4 rounded shadow-sm mb-4 d-flex flex-wrap gap-3 align-items-center justify-content-between">
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                            <span className="fw-medium text-secondary me-2">Lọc bài đăng theo:</span>
                            <select className="form-select" style={{ width: 140 }}>
                                <option value="">Môn học</option>
                                <option value="math">Toán</option>
                                <option value="literature">Văn</option>
                                <option value="english">Tiếng Anh</option>
                                <option value="physics">Vật lý</option>
                            </select>
                            <select className="form-select" style={{ width: 120 }}>
                                <option value="">Lớp</option>
                                <option value="1-5">Lớp 1-5</option>
                                <option value="6-9">Lớp 6-9</option>
                                <option value="10-12">Lớp 10-12</option>
                            </select>
                            <select className="form-select" style={{ width: 130 }}>
                                <option value="">Khu vực</option>
                                <option value="q1">Quận 1</option>
                                <option value="q3">Quận 3</option>
                                <option value="td">Thủ Đức</option>
                            </select>
                            <select className="form-select" style={{ width: 130 }}>
                                <option value="">Mức lương</option>
                                <option value="lt150">Dưới 150K</option>
                                <option value="150-200">150K - 200K</option>
                                <option value="gt200">Trên 200K</option>
                            </select>
                        </div>
                        <button className="btn btn-primary fw-semibold shadow-sm">
                            <i className="fas fa-filter me-2"></i>Lọc bài
                        </button>
                    </div>

                    {/* Parent Postings List (Grid View) */}
                    <div className="row g-4">
                        {parentPosts.map(post => (
                            <div key={post.id} className="col-lg-4 col-md-6">
                                <div className="bg-white rounded shadow p-4 d-flex flex-column h-100 hover-shadow">
                                    <h3 className="fs-5 fw-semibold text-dark mb-2">{post.title}</h3>
                                    <p className="text-secondary small mb-1"><span className="fw-medium">Môn học:</span> {post.subject}</p>
                                    <p className="text-secondary small mb-1"><span className="fw-medium">Lớp:</span> {post.grade}</p>
                                    <p className="text-secondary small mb-1"><span className="fw-medium">Số buổi/tuần:</span> {post.sessions}</p>
                                    <p className="text-secondary small mb-1"><span className="fw-medium">Thời gian:</span> {post.time}</p>
                                    <p className="text-secondary small mb-1"><span className="fw-medium">Khu vực:</span> {post.area}</p>
                                    <p className="text-success fw-bold mt-2 mb-3">Lương: {post.salary}</p>
                                    <button
                                        className="btn btn-primary rounded-pill fw-semibold mt-auto align-self-end"
                                        onClick={() => navigate('/baidang-giasu-cuthe')}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TrangChu 