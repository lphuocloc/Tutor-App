import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const XacThuc2: React.FC = () => {
    const navigate = useNavigate()
    const [selfieImage, setSelfieImage] = useState<File | null>(null)
    const [additionalDoc, setAdditionalDoc] = useState<File | null>(null)

    const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelfieImage(e.target.files[0])
        }
    }

    const handleAdditionalDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAdditionalDoc(e.target.files[0])
        }
    }

    const handleSubmit = () => {
        // Xử lý gửi xác thực bổ sung
        console.log('Selfie:', selfieImage)
        console.log('Additional doc:', additionalDoc)
        navigate('/trangchu')
    }

    const handleSkip = () => {
        navigate('/trangchu')
    }

    return (
        <div className="container-fluid bg-gradient-to-br min-vh-100 d-flex align-items-center justify-content-center p-4">
            <div className="bg-white rounded-3 shadow-lg p-4 max-w-2xl w-100">
                <h1 className="text-center text-dark mb-4 fw-bold fs-2">Xác thực bổ sung</h1>
                <p className="text-center text-muted mb-4 lh-base">
                    Để hoàn tất quá trình xác thực, vui lòng cung cấp thêm một số thông tin bổ sung để đảm bảo tính chính xác.
                </p>

                <div className="row g-4 mb-4">
                    {/* Ảnh selfie */}
                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center p-4 bg-light rounded border-2 border-dashed border-secondary">
                            <img
                                src="https://placehold.co/180x120/E0E0E0/808080?text=Ảnh+Selfie"
                                alt="Hình ảnh minh họa selfie"
                                className="mb-3 rounded shadow-sm"
                            />
                            <p className="text-dark fw-medium mb-3">Ảnh selfie với CCCD</p>
                            <input
                                type="file"
                                id="selfieUpload"
                                accept="image/jpeg,image/png"
                                className="d-none"
                                onChange={handleSelfieChange}
                            />
                            <label
                                htmlFor="selfieUpload"
                                className="btn btn-primary px-3 py-2 fw-semibold shadow-sm"
                            >
                                <svg className="w-5 h-5 d-inline-block me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                Tải lên ảnh selfie
                            </label>
                        </div>
                    </div>

                    {/* Tài liệu bổ sung */}
                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center p-4 bg-light rounded border-2 border-dashed border-secondary">
                            <img
                                src="https://placehold.co/180x120/E0E0E0/808080?text=Tài+liệu+bổ+sung"
                                alt="Hình ảnh minh họa tài liệu bổ sung"
                                className="mb-3 rounded shadow-sm"
                            />
                            <p className="text-dark fw-medium mb-3">Tài liệu bổ sung (nếu có)</p>
                            <input
                                type="file"
                                id="additionalDocUpload"
                                accept="image/jpeg,image/png,.pdf"
                                className="d-none"
                                onChange={handleAdditionalDocChange}
                            />
                            <label
                                htmlFor="additionalDocUpload"
                                className="btn btn-primary px-3 py-2 fw-semibold shadow-sm"
                            >
                                <svg className="w-5 h-5 d-inline-block me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                Tải lên tài liệu
                            </label>
                        </div>
                    </div>
                </div>

                <p className="text-center text-muted small mb-4">
                    (Chỉ chấp nhận định dạng JPG, PNG, PDF, tối đa 5MB cho mỗi file)
                </p>

                <button
                    className="btn btn-primary w-100 py-3 fw-semibold shadow-lg mb-3"
                    onClick={handleSubmit}
                >
                    Hoàn tất xác thực
                </button>

                <p className="text-center text-muted small mb-3">
                    Quá trình xác thực sẽ được hoàn tất trong vòng 24 giờ. Chúng tôi sẽ thông báo cho bạn khi hoàn tất.
                </p>

                <div className="text-center">
                    <button
                        className="btn btn-link text-primary text-decoration-none"
                        onClick={handleSkip}
                    >
                        Bỏ qua và tiếp tục
                    </button>
                </div>
            </div>
        </div>
    )
}

export default XacThuc2 