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

    // Số tiền đặt cọc auto là 50 chục ngàn (tức 500,000 VNĐ)
    const calculateDeposit = () => {
        return `50.000`
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 flex flex-col items-center">
            <div className="w-full max-w-7xl mx-auto mt-20">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Xác nhận đặt cọc</h2>

                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        {/* Gia sư */}
                        <div className="flex-1 bg-blue-50 border border-blue-300 rounded-xl p-6 flex flex-col items-center">
                            <h5 className="text-blue-600 font-semibold text-lg mb-3">Thông tin gia sư</h5>
                            <img
                                src="https://placehold.co/80x80/A0D9FF/FFFFFF?text=AV"
                                alt="Gia sư"
                                className="rounded-full border-2 border-blue-400 mb-3 w-20 h-20 object-cover"
                            />
                            <h6 className="font-semibold text-gray-800 mb-1">Nguyễn Văn A</h6>
                            <p className="text-gray-500 text-sm mb-2">Gia sư Toán, Lý, Hóa</p>
                            <div className="flex items-center text-yellow-500 text-sm mb-2">
                                <i className="fas fa-star"></i>
                                <span className="ml-1">4.9 (120 đánh giá)</span>
                            </div>
                            <p className="text-green-600 font-bold text-base mb-0">200.000 VNĐ/buổi</p>
                        </div>
                        {/* Lớp học */}
                        <div className="flex-1 bg-cyan-50 border border-cyan-300 rounded-xl p-6">
                            <h5 className="text-cyan-600 font-semibold text-lg mb-3">Thông tin lớp học</h5>
                            <div className="mb-3">
                                <span className="font-medium">Môn học:</span> Toán
                            </div>
                            <div className="mb-3">
                                <span className="font-medium">Cấp độ:</span> THPT
                            </div>
                            <div className="mb-3">
                                <span className="font-medium">Lịch học:</span> Thứ 2, 4, 6 từ 19:00-21:00
                            </div>
                            <div className="mb-3">
                                <span className="font-medium">Địa điểm:</span> Tại nhà học sinh
                            </div>
                            <div>
                                <span className="font-medium">Thời gian bắt đầu:</span> Tuần tới
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="numberOfSessions" className="block font-medium text-gray-700 mb-1">
                                    Số buổi học dự kiến
                                </label>
                                <input
                                    type="number"
                                    id="numberOfSessions"
                                    name="numberOfSessions"
                                    value={formData.numberOfSessions}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ví dụ: 12 buổi"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="totalAmount" className="block font-medium text-gray-700 mb-1">
                                    Tổng tiền (VNĐ)
                                </label>
                                <input
                                    type="number"
                                    id="totalAmount"
                                    name="totalAmount"
                                    value={formData.totalAmount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                                    placeholder="Tự động tính"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label htmlFor="depositAmount" className="block font-medium text-gray-700 mb-1">
                                    Số tiền đặt cọc (cố định)
                                </label>
                                <input
                                    type="number"
                                    id="depositAmount"
                                    name="depositAmount"
                                    value={calculateDeposit()}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700"
                                    disabled={true}
                                    readOnly
                                />
                                <small className="text-gray-500">Số tiền còn lại sẽ thanh toán sau buổi học đầu tiên</small>
                            </div>
                            <div>
                                <label htmlFor="paymentMethod" className="block font-medium text-gray-700 mb-1">
                                    Phương thức thanh toán
                                </label>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                        {/* Tóm tắt thanh toán */}
                        <div className="mt-8">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                                <h6 className="font-semibold text-gray-700 mb-4">Tóm tắt thanh toán</h6>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Giá mỗi buổi:</span>
                                    <span>200.000 VNĐ</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Số buổi:</span>
                                    <span>{formData.numberOfSessions || 0} buổi</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Tổng tiền:</span>
                                    <span className="font-bold">{formData.totalAmount || 0} VNĐ</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="font-semibold">Số tiền đặt cọc:</span>
                                    <span className="font-bold text-blue-600 text-lg">{calculateDeposit()} VNĐ</span>
                                </div>
                            </div>
                        </div>

                        {/* Điều khoản */}
                        <div className="mt-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    type="checkbox"
                                    id="agreeTerms"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="text-gray-700">
                                    Tôi đồng ý với{' '}
                                    <a href="#" className="text-blue-600 underline hover:text-blue-800">Điều khoản đặt cọc</a> và{' '}
                                    <a href="#" className="text-blue-600 underline hover:text-blue-800">Chính sách hoàn tiền</a>
                                </span>
                            </label>
                        </div>

                        {/* Nút xác nhận */}
                        <div className="mt-8 text-center">
                            <button
                                type="submit"
                                className={`inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg ${!formData.agreeTerms ? 'opacity-60 cursor-not-allowed' : ''}`}
                                disabled={!formData.agreeTerms}
                            >
                                <i className="fas fa-credit-card mr-2"></i>
                                Xác nhận đặt cọc
                            </button>
                        </div>
                    </form>

                    {/* Lưu ý */}
                    <div className="mt-8">
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                                <span className="font-semibold text-blue-700">Lưu ý quan trọng</span>
                            </div>
                            <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                                <li>Số tiền đặt cọc sẽ được hoàn lại nếu gia sư không đáp ứng yêu cầu</li>
                                <li>Bạn có thể hủy đặt cọc trong vòng 24 giờ trước buổi học đầu tiên</li>
                                <li>Thanh toán còn lại sẽ được thực hiện sau buổi học đầu tiên</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default XacNhanDatCoc 