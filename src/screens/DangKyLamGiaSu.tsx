import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DangKyLamGiaSu: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: 'Nguyễn Văn A',
        dob: '',
        gender: '',
        address: '',
        teachingAreas: '',
        experience: '',
        desiredPrice: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form data:', formData)
        navigate('/baidang-giasu-cuthe')
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 mt-20">
                <div className="bg-white rounded-xl shadow-lg">
                    <div className="p-6">
                        <h1 className="text-center font-bold text-2xl text-gray-900 mb-3">Trở thành Gia sư của chúng tôi</h1>
                        <p className="text-center text-gray-500 mb-6">
                            Để đảm bảo chất lượng dịch vụ, chúng tôi yêu cầu bạn cung cấp các thông tin và văn bằng cần thiết.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block font-medium mb-1">Tên đầy đủ</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block font-medium mb-1">Ngày sinh</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block font-medium mb-1">Giới tính</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block font-medium mb-1">Địa chỉ hiện tại</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Nhập địa chỉ của bạn"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="teachingAreas" className="block font-medium mb-1">Khu vực có thể giảng dạy</label>
                                    <input
                                        type="text"
                                        id="teachingAreas"
                                        name="teachingAreas"
                                        value={formData.teachingAreas}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: Quận 1, Quận 3, Thủ Đức"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="experience" className="block font-medium mb-1">Kinh nghiệm giảng dạy (năm)</label>
                                    <input
                                        type="number"
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        placeholder="Số năm kinh nghiệm"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="desiredPrice" className="block font-medium mb-1">Giá tiền mong muốn/buổi (VNĐ)</label>
                                    <input
                                        type="number"
                                        id="desiredPrice"
                                        name="desiredPrice"
                                        value={formData.desiredPrice}
                                        onChange={handleInputChange}
                                        placeholder="Ví dụ: 150000"
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Tải lên văn bằng</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center p-4">
                                        <i className="fas fa-id-card text-blue-500 text-3xl mb-2"></i>
                                        <p className="text-sm mb-2 text-gray-700">CCCD/CMND (Mặt trước)</p>
                                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded flex items-center">
                                            <i className="fas fa-upload mr-1"></i>Tải lên
                                        </button>
                                    </div>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center p-4">
                                        <i className="fas fa-id-card text-blue-500 text-3xl mb-2"></i>
                                        <p className="text-sm mb-2 text-gray-700">CCCD/CMND (Mặt sau)</p>
                                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded flex items-center">
                                            <i className="fas fa-upload mr-1"></i>Tải lên
                                        </button>
                                    </div>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center p-4">
                                        <i className="fas fa-graduation-cap text-blue-500 text-3xl mb-2"></i>
                                        <p className="text-sm mb-2 text-gray-700">Bằng cấp 3</p>
                                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded flex items-center">
                                            <i className="fas fa-upload mr-1"></i>Tải lên
                                        </button>
                                    </div>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center p-4">
                                        <i className="fas fa-university text-blue-500 text-3xl mb-2"></i>
                                        <p className="text-sm mb-2 text-gray-700">Bằng Đại học/Cao đẳng</p>
                                        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded flex items-center">
                                            <i className="fas fa-upload mr-1"></i>Tải lên
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-8 transition">
                                Gửi yêu cầu đăng ký
                            </button>
                        </form>

                        <p className="text-center text-gray-500 text-sm mt-6">
                            Yêu cầu của bạn sẽ được đội ngũ của chúng tôi xem xét và duyệt thủ công trong vòng 3-5 ngày làm việc.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DangKyLamGiaSu 