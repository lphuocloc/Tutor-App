import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
            </div>
        </div>
    )
}

export default TrangChu 