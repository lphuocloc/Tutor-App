import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const XacNhanDatCoc: React.FC = () => {
    const navigate = useNavigate();

    // Giá cố định cho mỗi buổi học
    const PRICE_PER_SESSION = 200000; // 200.000 VNĐ
    // Số tiền đặt cọc cố định
    const FIXED_DEPOSIT_AMOUNT = 50000; // 50.000 VNĐ
    // Tỷ lệ quy đổi điểm: 1 điểm = 1 VNĐ (vì 1000 điểm = 1 nghìn VNĐ)
    const POINTS_TO_VND_RATE = 1;

    // State cho thông tin form
    const [formData, setFormData] = useState({
        numberOfSessions: '',
        paymentMethod: '',
        agreeTerms: false
    });

    // State cho điểm thưởng của người dùng (giả định)
    const [userLoyaltyPoints, setUserLoyaltyPoints] = useState(1250); // Ví dụ: 1250 điểm
    // State cho số điểm muốn sử dụng
    const [pointsToUse, setPointsToUse] = useState('');

    // Các giá trị tính toán
    const [estimatedTotalAmount, setEstimatedTotalAmount] = useState(0);
    const [discountFromPoints, setDiscountFromPoints] = useState(0);
    const [finalTotalAmount, setFinalTotalAmount] = useState(0);
    const [remainingAmountToPay, setRemainingAmountToPay] = useState(0);

    // Effect để tính toán lại tổng tiền và số tiền còn lại mỗi khi numberOfSessions hoặc pointsToUse thay đổi
    useEffect(() => {
        const sessions = parseInt(formData.numberOfSessions) || 0;
        const estimated = sessions * PRICE_PER_SESSION;
        setEstimatedTotalAmount(estimated);

        let appliedPoints = parseInt(pointsToUse) || 0;
        // Đảm bảo số điểm sử dụng không vượt quá điểm hiện có
        appliedPoints = Math.min(appliedPoints, userLoyaltyPoints);
        // Đảm bảo số tiền giảm giá không làm tổng tiền âm
        const maxDiscountAllowed = Math.max(0, estimated); // Không giảm giá quá tổng tiền
        appliedPoints = Math.min(appliedPoints, maxDiscountAllowed / POINTS_TO_VND_RATE);


        const discount = appliedPoints * POINTS_TO_VND_RATE;
        setDiscountFromPoints(discount);

        const final = Math.max(0, estimated - discount); // Tổng tiền sau giảm giá, không âm
        setFinalTotalAmount(final);

        // Số tiền còn lại phải trả sau khi trừ đặt cọc
        const remaining = Math.max(0, final - FIXED_DEPOSIT_AMOUNT);
        setRemainingAmountToPay(remaining);

    }, [formData.numberOfSessions, pointsToUse, userLoyaltyPoints]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePointsToUseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value) || 0;
        // Đảm bảo số điểm không âm
        value = Math.max(0, value);
        // Đảm bảo số điểm không vượt quá điểm hiện có
        value = Math.min(value, userLoyaltyPoints);
        setPointsToUse(value.toString());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Cập nhật điểm của người dùng sau khi sử dụng (trong ứng dụng thực tế sẽ gửi lên backend)
        setUserLoyaltyPoints(userLoyaltyPoints - (parseInt(pointsToUse) || 0));

        console.log('Deposit form submitted:', {
            ...formData,
            estimatedTotalAmount,
            discountFromPoints,
            finalTotalAmount,
            depositAmount: FIXED_DEPOSIT_AMOUNT,
            remainingAmountToPay,
            pointsUsed: parseInt(pointsToUse) || 0
        });
        navigate('/phongchat'); // Uncomment this line if you have a routing setup
    };

    // Hàm định dạng số tiền
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

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
                                {/* Font Awesome star icon */}
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.532 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.777.565-1.832-.197-1.532-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 7.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                                <span className="ml-1">4.9 (120 đánh giá)</span>
                            </div>
                            <p className="text-green-600 font-bold text-base mb-0">{formatCurrency(PRICE_PER_SESSION)}/buổi</p>
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
                                    min="1" // Đảm bảo số buổi học là số dương
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="loyaltyPoints" className="block font-medium text-gray-700 mb-1">
                                    Điểm thưởng hiện có: <span className="font-bold text-purple-600">{userLoyaltyPoints} điểm</span>
                                </label>
                                <input
                                    type="number"
                                    id="pointsToUse"
                                    name="pointsToUse"
                                    value={pointsToUse}
                                    onChange={handlePointsToUseChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Số điểm muốn sử dụng"
                                    min="0"
                                    max={userLoyaltyPoints} // Không cho phép sử dụng quá số điểm hiện có
                                />
                                <small className="text-gray-500">1000 điểm = 1.000 VNĐ</small>
                            </div>
                            {/* Dòng trống để căn chỉnh layout */}
                            <div></div>
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
                                    <span>{formatCurrency(PRICE_PER_SESSION)}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Số buổi:</span>
                                    <span>{formData.numberOfSessions || 0} buổi</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Tổng tiền dự kiến:</span>
                                    <span className="font-bold">{formatCurrency(estimatedTotalAmount)}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Giảm giá từ điểm thưởng:</span>
                                    <span className="font-bold text-red-600">- {formatCurrency(discountFromPoints)}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-700 border-t pt-2 border-gray-300">
                                    <span className="font-semibold text-lg">Tổng tiền sau giảm giá:</span>
                                    <span className="font-bold text-blue-700 text-lg">{formatCurrency(finalTotalAmount)}</span>
                                </div>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Số tiền đặt cọc (cố định):</span>
                                    <span className="font-bold text-blue-600">{formatCurrency(FIXED_DEPOSIT_AMOUNT)}</span>
                                </div>
                                <div className="flex justify-between mt-2 pt-2 border-t border-gray-300">
                                    <span className="font-semibold text-lg">Số tiền còn lại phải thanh toán:</span>
                                    <span className="font-bold text-green-600 text-lg">{formatCurrency(remainingAmountToPay)}</span>
                                </div>
                                <small className="text-gray-500 mt-1 block">Số tiền còn lại sẽ thanh toán sau buổi học đầu tiên</small>
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
                                {/* Font Awesome icon for credit card */}
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                Xác nhận đặt cọc
                            </button>
                        </div>
                    </form>

                    {/* Lưu ý */}
                    <div className="mt-8">
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                {/* Font Awesome info icon */}
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
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
    );
};

export default XacNhanDatCoc;
