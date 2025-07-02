import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const XacNhanGiaoDich: React.FC = () => {
    const [showRefusalNotification, setShowRefusalNotification] = useState(false)
    const navigate = useNavigate()

    const handleConfirm = () => {
        // Simulate API call
        setTimeout(() => {
            navigate('/lich-giasu')
        }, 1000)
    }

    const handleCancel = () => {
        navigate('/trangchu')
    }

    const handleCloseNotification = () => {
        setShowRefusalNotification(false)
    }

    const handleFindOtherClass = () => {
        setShowRefusalNotification(false)
        navigate('/trangchu')
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 bg-light">
            <div className="bg-white rounded-4 shadow p-4 p-md-5 w-100" style={{ maxWidth: 500 }}>
                <div className="text-center mb-4">
                    <i className="fas fa-check-circle text-success display-3 mb-3 animate__animated animate__bounce"></i>
                    <h1 className="h3 fw-bold text-dark">Xác nhận giao dịch</h1>
                </div>

                <p className="text-center text-secondary mb-4 fs-5">
                    Bạn sắp thực hiện việc xác nhận lớp học với <span className="fw-bold text-primary">Gia sư Nguyễn Văn A</span>.
                    Khi xác nhận, bạn sẽ mất phí dịch vụ <span className="fw-bold text-danger">50.000 VNĐ</span>.
                </p>

                <div className="bg-primary bg-opacity-10 p-4 rounded-3 mb-4 shadow-sm">
                    <h2 className="h5 fw-semibold text-dark mb-3">Tóm tắt chi phí</h2>
                    <div className="d-flex justify-content-between align-items-center fs-6 mb-2">
                        <span className="text-secondary">Phí xác nhận lớp:</span>
                        <span className="fw-bold text-danger">50.000 VNĐ</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center fs-6 mb-2">
                        <span className="text-secondary">Tiền cọc đã đặt:</span>
                        <span className="fw-bold text-success">50.000 VNĐ</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center fs-5 fw-bold border-top pt-3 mt-3">
                        <span className="text-dark">Tổng cộng bạn sẽ phải trả thêm:</span>
                        <span className="text-success">0 VNĐ</span>
                    </div>
                </div>

                <div className="d-flex gap-3">
                    <button
                        onClick={handleCancel}
                        className="btn btn-secondary flex-fill py-3 fw-semibold shadow"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="btn btn-primary flex-fill py-3 fw-semibold shadow-lg"
                    >
                        Xác nhận và thanh toán
                    </button>
                </div>

                {/* Popup thông báo từ chối */}
                {showRefusalNotification && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                        <div className="bg-white rounded-4 shadow-lg p-5 text-center animate__animated animate__fadeIn" style={{ maxWidth: 400 }}>
                            <i className="fas fa-info-circle text-primary display-4 mb-3"></i>
                            <h3 className="h5 fw-bold text-dark mb-3">Thông báo</h3>
                            <p className="text-secondary mb-4">
                                Rất tiếc, Gia sư Nguyễn Văn A đã không đồng ý xác nhận lớp học này.
                                Tiền cọc của bạn đã được hoàn trả vào tài khoản Momo.
                                Cảm ơn bạn đã sử dụng dịch vụ.
                            </p>
                            <div className="d-flex gap-2 justify-content-center">
                                <button
                                    className="btn btn-primary px-4 py-2 fw-semibold"
                                    onClick={handleCloseNotification}
                                >
                                    OK
                                </button>
                                <button
                                    className="btn btn-outline-secondary px-4 py-2 fw-semibold"
                                    onClick={handleFindOtherClass}
                                >
                                    Tìm lớp khác
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default XacNhanGiaoDich 