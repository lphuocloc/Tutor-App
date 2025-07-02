import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BaiDangGiaSuCuThe: React.FC = () => {
    const navigate = useNavigate()
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedLevel, setSelectedLevel] = useState('')

    const tutorInfo = {
        name: 'Nguyễn Văn A',
        avatar: 'https://placehold.co/120x120/A0D9FF/FFFFFF?text=AV',
        subjects: 'Gia sư Toán, Lý, Hóa',
        rating: 4.9,
        reviews: 120,
        experience: '5 năm',
        education: 'Đại học Bách Khoa TP.HCM',
        price: '200.000',
        location: 'Quận 1, TP.HCM',
        schedule: 'Thứ 2, 4, 6 từ 19:00-21:00',
        description: 'Tôi là sinh viên năm 3 ngành Kỹ thuật Điện tử - Viễn thông, có kinh nghiệm gia sư Toán, Lý, Hóa cho học sinh THPT. Tôi có phương pháp giảng dạy dễ hiểu, kiên nhẫn và tận tâm với học sinh.'
    }

    const handleContact = () => {
        navigate('/xacnhan-datcoc')
    }

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Thông tin gia sư */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow p-6 mb-6">
                            <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
                                <img
                                    src={tutorInfo.avatar}
                                    alt={tutorInfo.name}
                                    className="rounded-full border-4 border-blue-300 w-[120px] h-[120px] object-cover mr-0 md:mr-6"
                                />
                                <div className="flex-1 w-full">
                                    <h2 className="font-bold text-2xl text-gray-900 mb-1">{tutorInfo.name}</h2>
                                    <p className="text-blue-600 font-medium mb-1">{tutorInfo.subjects}</p>
                                    <div className="flex items-center text-yellow-500 mb-1">
                                        <i className="fas fa-star mr-1"></i>
                                        <span>{tutorInfo.rating} ({tutorInfo.reviews} đánh giá)</span>
                                    </div>
                                    <p className="text-gray-500 mb-1 flex items-center">
                                        <i className="fas fa-graduation-cap mr-2"></i>
                                        {tutorInfo.education}
                                    </p>
                                    <p className="text-gray-500 mb-1 flex items-center">
                                        <i className="fas fa-clock mr-2"></i>
                                        Kinh nghiệm: {tutorInfo.experience}
                                    </p>
                                    <p className="text-gray-500 mb-0 flex items-center">
                                        <i className="fas fa-map-marker-alt mr-2"></i>
                                        {tutorInfo.location}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end w-full md:w-auto mt-4 md:mt-0">
                                    <h3 className="text-green-600 font-bold text-xl mb-2">{tutorInfo.price} VNĐ/buổi</h3>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center transition"
                                        onClick={handleContact}
                                    >
                                        <i className="fas fa-phone mr-2"></i>
                                        Liên hệ ngay
                                    </button>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <h5 className="font-semibold text-lg mb-3">Thông tin giảng dạy</h5>
                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Môn học</label>
                                        <select
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={selectedSubject}
                                            onChange={(e) => setSelectedSubject(e.target.value)}
                                        >
                                            <option value="">Chọn môn học</option>
                                            <option value="Toán">Toán</option>
                                            <option value="Lý">Vật lý</option>
                                            <option value="Hóa">Hóa học</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Cấp độ</label>
                                        <select
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            value={selectedLevel}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                        >
                                            <option value="">Chọn cấp độ</option>
                                            <option value="THCS">THCS</option>
                                            <option value="THPT">THPT</option>
                                            <option value="Đại học">Đại học</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-medium mb-1">Lịch học</label>
                                        <p className="text-gray-500 mb-0">{tutorInfo.schedule}</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-lg mb-3">Đánh giá từ học viên</h5>
                                    <div className="border rounded-lg p-4 mb-3 bg-gray-50">
                                        <div className="flex items-center mb-2">
                                            <div className="text-yellow-500 mr-2 flex">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <span className="font-medium">Rất tốt</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-1">"Thầy giảng rất dễ hiểu, con tôi tiến bộ rõ rệt sau 2 tháng học."</p>
                                        <small className="text-gray-400">- Phụ huynh Nguyễn Thị B</small>
                                    </div>
                                    <div className="border rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-center mb-2">
                                            <div className="text-yellow-500 mr-2 flex">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <span className="font-medium">Tuyệt vời</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-1">"Phương pháp dạy khoa học, kiên nhẫn với học sinh."</p>
                                        <small className="text-gray-400">- Phụ huynh Trần Văn C</small>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div>
                                <h5 className="font-semibold text-lg mb-3">Giới thiệu</h5>
                                <p className="text-gray-500 leading-relaxed">{tutorInfo.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="bg-white rounded-xl shadow p-6 mb-6">
                            <h5 className="font-semibold text-lg mb-3">Thông tin liên hệ</h5>
                            <div className="mb-4 flex flex-col gap-2">
                                <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium rounded-lg py-2 w-full flex items-center justify-center transition">
                                    <i className="fas fa-phone mr-2"></i>
                                    Gọi điện
                                </button>
                                <button className="border border-green-500 text-green-600 hover:bg-green-50 font-medium rounded-lg py-2 w-full flex items-center justify-center transition">
                                    <i className="fab fa-facebook-messenger mr-2"></i>
                                    Messenger
                                </button>
                                <button className="border border-cyan-500 text-cyan-600 hover:bg-cyan-50 font-medium rounded-lg py-2 w-full flex items-center justify-center transition">
                                    <i className="fas fa-comments mr-2"></i>
                                    Chat
                                </button>
                            </div>
                            <hr className="my-4" />
                            <div className="text-center">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold transition"
                                    onClick={handleContact}
                                >
                                    Đặt lịch học ngay
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <h5 className="font-semibold text-lg mb-3">Gia sư tương tự</h5>
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://placehold.co/50x50/FFB3A7/FFFFFF?text=AV"
                                    alt="Gia sư khác"
                                    className="rounded-full w-12 h-12 object-cover mr-3"
                                />
                                <div className="flex-1">
                                    <h6 className="font-semibold mb-1">Trần Thị B</h6>
                                    <p className="text-gray-500 text-sm mb-0">Gia sư Tiếng Anh</p>
                                    <div className="text-yellow-500 text-sm flex items-center">
                                        <i className="fas fa-star"></i>
                                        <span className="ml-1">4.8 (95 đánh giá)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img
                                    src="https://placehold.co/50x50/B0E0E6/FFFFFF?text=AV"
                                    alt="Gia sư khác"
                                    className="rounded-full w-12 h-12 object-cover mr-3"
                                />
                                <div className="flex-1">
                                    <h6 className="font-semibold mb-1">Lê Văn C</h6>
                                    <p className="text-gray-500 text-sm mb-0">Gia sư Lập trình</p>
                                    <div className="text-yellow-500 text-sm flex items-center">
                                        <i className="fas fa-star"></i>
                                        <span className="ml-1">4.7 (70 đánh giá)</span>
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

export default BaiDangGiaSuCuThe 