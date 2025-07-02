import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const XacNhanDatCoc: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        numberOfSessions: '',
        totalAmount: '',
        depositAmount: '',
        paymentMethod: '',
        agreeTerms: false
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Deposit form:', formData)
        navigate('/phongchat')
    }

    const calculateDeposit = () => {
        const total = parseInt(formData.totalAmount) || 0
        return Math.round(total * 0.3) // 30% đặt cọc
    }

    return (
        <div className="container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <h2 className="text-center fw-bold text-dark mb-4">Xác nhận đặt cọc</h2>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="card border-primary">
                                            <div className="card-body text-center">
                                                <h5 className="card-title text-primary">Thông tin gia sư</h5>
                                                <img
                                                    src="https://placehold.co/80x80/A0D9FF/FFFFFF?text=AV"
                                                    alt="Gia sư"
                                                    className="rounded-circle border border-primary mb-3"
                                                />
                                                <h6 className="mb-1">Nguyễn Văn A</h6>
                                                <p className="text-muted small mb-2">Gia sư Toán, Lý, Hóa</p>
                                                <div className="text-warning small mb-2">
                                                    <i className="fas fa-star"></i>
                                                    <span className="ms-1">4.9 (120 đánh giá)</span>
                                                </div>
                                                <p className="text-success fw-bold mb-0">200.000 VNĐ/buổi</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card border-info">
                                            <div className="card-body">
                                                <h5 className="card-title text-info">Thông tin lớp học</h5>
                                                <div className="mb-2">
                                                    <strong>Môn học:</strong> Toán
                                                </div>
                                                <div className="mb-2">
                                                    <strong>Cấp độ:</strong> THPT
                                                </div>
                                                <div className="mb-2">
                                                    <strong>Lịch học:</strong> Thứ 2, 4, 6 từ 19:00-21:00
                                                </div>
                                                <div className="mb-2">
                                                    <strong>Địa điểm:</strong> Tại nhà học sinh
                                                </div>
                                                <div className="mb-0">
                                                    <strong>Thời gian bắt đầu:</strong> Tuần tới
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="numberOfSessions" className="form-label fw-medium">
                                                Số buổi học dự kiến
                                            </label>
                                            <input
                                                type="number"
                                                id="numberOfSessions"
                                                name="numberOfSessions"
                                                value={formData.numberOfSessions}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="Ví dụ: 12 buổi"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="totalAmount" className="form-label fw-medium">
                                                Tổng tiền (VNĐ)
                                            </label>
                                            <input
                                                type="number"
                                                id="totalAmount"
                                                name="totalAmount"
                                                value={formData.totalAmount}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                placeholder="Tự động tính"
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="depositAmount" className="form-label fw-medium">
                                                Số tiền đặt cọc (30%)
                                            </label>
                                            <input
                                                type="number"
                                                id="depositAmount"
                                                name="depositAmount"
                                                value={calculateDeposit()}
                                                className="form-control bg-light"
                                                readOnly
                                            />
                                            <small className="text-muted">Số tiền còn lại sẽ thanh toán sau buổi học đầu tiên</small>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="paymentMethod" className="form-label fw-medium">
                                                Phương thức thanh toán
                                            </label>
                                            <select
                                                id="paymentMethod"
                                                name="paymentMethod"
                                                value={formData.paymentMethod}
                                                onChange={handleInputChange}
                                                className="form-select"
                                                required
                                            >
                                                <option value="">Chọn phương thức</option>
                                                <option value="momo">Ví MoMo</option>
                                                <option value="zalo">Ví ZaloPay</option>
                                                <option value="bank">Chuyển khoản ngân hàng</option>
                                                <option value="cash">Tiền mặt</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="card bg-light">
                                            <div className="card-body">
                                                <h6 className="fw-semibold mb-3">Tóm tắt thanh toán</h6>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Giá mỗi buổi:</span>
                                                    <span>200.000 VNĐ</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Số buổi:</span>
                                                    <span>{formData.numberOfSessions || 0} buổi</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Tổng tiền:</span>
                                                    <span className="fw-bold">{formData.totalAmount || 0} VNĐ</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <span className="fw-semibold">Số tiền đặt cọc:</span>
                                                    <span className="fw-bold text-primary fs-5">{calculateDeposit()} VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="agreeTerms"
                                                name="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="agreeTerms">
                                                Tôi đồng ý với <a href="#" className="text-primary">Điều khoản đặt cọc</a> và <a href="#" className="text-primary">Chính sách hoàn tiền</a>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-5 py-3 fw-semibold"
                                            disabled={!formData.agreeTerms}
                                        >
                                            <i className="fas fa-credit-card me-2"></i>
                                            Xác nhận đặt cọc
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-4">
                                    <div className="alert alert-info">
                                        <h6 className="alert-heading">
                                            <i className="fas fa-info-circle me-2"></i>
                                            Lưu ý quan trọng
                                        </h6>
                                        <ul className="mb-0 small">
                                            <li>Số tiền đặt cọc sẽ được hoàn lại nếu gia sư không đáp ứng yêu cầu</li>
                                            <li>Bạn có thể hủy đặt cọc trong vòng 24 giờ trước buổi học đầu tiên</li>
                                            <li>Thanh toán còn lại sẽ được thực hiện sau buổi học đầu tiên</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default XacNhanDatCoc 