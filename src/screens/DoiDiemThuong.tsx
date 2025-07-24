import { useState } from 'react';

// Component for exchanging loyalty points for vouchers
// Lưu ý: Tất cả các props (currentLoyaltyPoints, onExchange, onGoBack) đã được loại bỏ theo yêu cầu.
// Component này giờ đây hoàn toàn tự quản lý trạng thái điểm và không có khả năng thông báo
// cho component cha về các hành động.
const DoiDiemThuong = () => {
    // Sample list of available vouchers
    const [vouchers] = useState([
        {
            id: 'voucher1',
            name: 'Voucher giảm 10% cho mọi tài liệu',
            pointsCost: 500,
            description: 'Giảm 10% giá trị đơn hàng khi mua bất kỳ tài liệu nào.',
            imageUrl: 'https://placehold.co/300x200/FFDDC1/8B4513?text=Voucher+10%' // Placeholder image
        },
        {
            id: 'voucher2',
            name: 'Voucher miễn phí tài liệu dưới 50.000 VNĐ',
            pointsCost: 800,
            description: 'Đổi lấy một tài liệu có giá trị dưới 50.000 VNĐ miễn phí.',
            imageUrl: 'https://placehold.co/300x200/C1FFDDC/006400?text=Voucher+Free' // Placeholder image
        },
        {
            id: 'voucher3',
            name: 'Voucher giảm 50.000 VNĐ cho khóa học',
            pointsCost: 1000,
            description: 'Giảm 50.000 VNĐ khi đăng ký bất kỳ khóa học nào.',
            imageUrl: 'https://placehold.co/300x200/D1C1FF/4B0082?text=Voucher+KH' // Placeholder image
        },
        {
            id: 'voucher4',
            name: 'Voucher giảm 20% cho tài liệu cao cấp',
            pointsCost: 1500,
            description: 'Giảm 20% giá trị khi mua tài liệu được đánh dấu "Ưu tiên".',
            imageUrl: 'https://placehold.co/300x200/FFFACD/DAA520?text=Voucher+Premium' // Placeholder image
        },
    ]);

    // State to manage the user's current points (for demonstration).
    // Khởi tạo với giá trị cố định vì không nhận từ props.
    const [userPoints, setUserPoints] = useState(1250); // Mặc định 1250 điểm

    // Function to handle voucher exchange
    const handleExchange = (voucherId, pointsCost) => {
        if (userPoints >= pointsCost) {
            // Sử dụng window.confirm thay vì alert cho hộp thoại xác nhận
            const confirmExchange = window.confirm(`Bạn có chắc chắn muốn đổi voucher này với ${pointsCost} điểm không?`);
            if (confirmExchange) {
                setUserPoints(userPoints - pointsCost); // Deduct points
                // In a real application, you would send this exchange request to a backend
                console.log(`Đã đổi voucher ${voucherId} với ${pointsCost} điểm.`);
                // Sử dụng window.alert thay vì alert để tuân thủ hướng dẫn
                window.alert(`Bạn đã đổi thành công voucher! Điểm còn lại: ${userPoints - pointsCost}`);
                // Lưu ý: onExchange callback đã bị loại bỏ.
            }
        } else {
            window.alert('Bạn không đủ điểm để đổi voucher này.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="mx-auto mt-20 w-full">

                <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center max-w-7xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-2">
                        Đổi Điểm Thưởng
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">
                        Sử dụng điểm tích lũy của bạn để đổi lấy các voucher hấp dẫn!
                    </p>
                    <div className="mt-4 bg-purple-100 text-purple-800 font-bold py-3 px-10 rounded-lg shadow-md inline-block">
                        Điểm của bạn: <span className="text-3xl font-extrabold">{userPoints}</span> điểm
                    </div>
                    {/* Nút "Quay lại" đã bị loại bỏ vì prop onGoBack không còn tồn tại. */}
                    {/* Nếu bạn muốn nút quay lại hoạt động, bạn cần quản lý điều hướng ở component cha. */}

                </header>
            </div>


            {/* Vouchers Grid */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vouchers.map((voucher) => (
                    <div
                        key={voucher.id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                    >
                        {/* Voucher Image */}
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                            <img
                                src={voucher.imageUrl}
                                alt={voucher.name}
                                className="w-full h-full object-cover rounded-t-xl"
                            />
                        </div>

                        {/* Voucher Details */}
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-purple-800 mb-2 leading-tight">
                                {voucher.name}
                            </h2>
                            <p className="text-sm text-gray-600 mb-3 flex-grow">
                                {voucher.description}
                            </p>
                            <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                                <span className="text-lg font-bold text-green-600">
                                    {voucher.pointsCost} điểm
                                </span>
                                <button
                                    onClick={() => handleExchange(voucher.id, voucher.pointsCost)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition duration-300 ease-in-out
                    ${userPoints >= voucher.pointsCost
                                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={userPoints < voucher.pointsCost}
                                >
                                    {userPoints >= voucher.pointsCost ? 'Đổi ngay' : 'Không đủ điểm'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>


        </div>
    );
};

export default DoiDiemThuong;
