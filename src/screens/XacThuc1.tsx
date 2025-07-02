import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const XacThuc1: React.FC = () => {
    const navigate = useNavigate()
    const [frontImage, setFrontImage] = useState<File | null>(null)
    const [backImage, setBackImage] = useState<File | null>(null)

    const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFrontImage(e.target.files[0])
        }
    }

    const handleBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBackImage(e.target.files[0])
        }
    }

    const handleSubmit = () => {
        // Xử lý gửi xác thực
        console.log('Front image:', frontImage)
        console.log('Back image:', backImage)
        navigate('/xacthuc2')
    }

    const handleSkip = () => {
        navigate('/xacthuc2')
    }

    return (
        <div className="container-fluid bg-gradient-to-br min-vh-100 d-flex align-items-center justify-content-center p-4">
            <div className="bg-white rounded-3 shadow-lg p-4 max-w-2xl w-100">
                <h1 className="text-center text-dark mb-4 fw-bold fs-2">Xác thực thông tin để tiếp tục</h1>
                <p className="text-center text-muted mb-4 lh-base">
                    Để xem thông tin gia sư hoặc đăng bài, bạn cần cung cấp CCCD để xác thực tài khoản. Quá trình này giúp đảm bảo an toàn và tin cậy cho cộng đồng của chúng tôi.
                </p>

                <div className="row g-4 mb-4">
                    {/* CCCD Mặt trước */}
                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center p-4 bg-light rounded border-2 border-dashed border-secondary">
                            <img
                                src="https://placehold.co/180x120/E0E0E0/808080?text=CCCD+Mặt+trước"
                                alt="Hình ảnh minh họa CCCD mặt trước"
                                className="mb-3 rounded shadow-sm"
                            />
                            <p className="text-dark fw-medium mb-3">Mặt trước CCCD/CMND</p>
                            <input
                                type="file"
                                id="frontCccdUpload"
                                accept="image/jpeg,image/png"
                                className="d-none"
                                onChange={handleFrontImageChange}
                            />
                            <label
                                htmlFor="frontCccdUpload"
                                className="btn btn-primary px-3 py-2 fw-semibold shadow-sm"
                            >
                                <svg className="w-5 h-5 d-inline-block me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                Tải lên ảnh mặt trước
                            </label>
                        </div>
                    </div>

                    {/* CCCD Mặt sau */}
                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center p-4 bg-light rounded border-2 border-dashed border-secondary">
                            <img
                                src="https://placehold.co/180x120/E0E0E0/808080?text=CCCD+Mặt+sau"
                                alt="Hình ảnh minh họa CCCD mặt sau"
                                className="mb-3 rounded shadow-sm"
                            />
                            <p className="text-dark fw-medium mb-3">Mặt sau CCCD/CMND</p>
                            <input
                                type="file"
                                id="backCccdUpload"
                                accept="image/jpeg,image/png"
                                className="d-none"
                                onChange={handleBackImageChange}
                            />
                            <label
                                htmlFor="backCccdUpload"
                                className="btn btn-primary px-3 py-2 fw-semibold shadow-sm"
                            >
                                <svg className="w-5 h-5 d-inline-block me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                Tải lên ảnh mặt sau
                            </label>
                        </div>
                    </div>
                </div>

                <p className="text-center text-muted small mb-4">
                    (Chỉ chấp nhận định dạng JPG, PNG, tối đa 5MB cho mỗi ảnh)
                </p>

                <button
                    className="btn btn-primary w-100 py-3 fw-semibold shadow-lg mb-3"
                    onClick={handleSubmit}
                >
                    Gửi xác thực
                </button>

                <p className="text-center text-muted small mb-3">
                    Quá trình xác thực có thể mất từ 1-3 ngày làm việc. Chúng tôi sẽ thông báo cho bạn khi hoàn tất.
                </p>

                <div className="text-center">
                    <button
                        className="btn btn-link text-primary text-decoration-none"
                        onClick={handleSkip}
                    >
                        Bỏ qua (chỉ duyệt)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default XacThuc1 