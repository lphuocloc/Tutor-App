import type { useNavigate } from "react-router-dom"

interface HistoryItem {
    id: string
    date: string
    checkIn: string
    checkOut: string
    duration: string
    status: 'completed' | 'late'
}

interface TrackingLayoutProps {
    historyData: HistoryItem[]
    showModal: boolean
    actionType?: 'checkin' | 'checkout'
    securityCode?: string
    errorMessage: string
    onSecurityCodeChange?: (val: string) => void
    onCancelModal?: () => void
    onConfirmModal?: () => void
    navigate: ReturnType<typeof useNavigate>
    children?: React.ReactNode
}
export const TrackingLayout: React.FC<TrackingLayoutProps> = ({
    historyData,
    showModal,
    actionType,
    securityCode,
    errorMessage,
    onSecurityCodeChange,
    onCancelModal,
    onConfirmModal,
    navigate,
    children
}) => {
    const getStatusBadgeClass = (status: string) => {
        return status === 'completed'
            ? 'bg-green-500 text-white'
            : 'bg-yellow-400 text-yellow-900'
    }
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-3xl transform origin-center">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">Theo dõi buổi dạy</h1>
            <p className="text-center text-gray-500 mb-6 text-lg">
                Quản lý và theo dõi các buổi học của bạn một cách dễ dàng.
            </p>
            {/* Thông tin lớp học */}
            <div className="bg-blue-100 p-5 rounded-xl border border-blue-200 shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">Lớp học hiện tại</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-base">
                    <div><span className="font-medium">Môn học:</span> Toán</div>
                    <div><span className="font-medium">Học viên:</span> Nguyễn Thị Lan (Lớp 9)</div>
                    <div><span className="font-medium">Địa điểm:</span> 123 Đường ABC, Q.3, TP.HCM</div>
                    <div><span className="font-medium">Buổi tiếp theo:</span> Thứ 6, 28/06/2025 lúc 19:00</div>
                </div>
            </div>
            {/* Section trạng thái buổi học (động) */}
            {children}
            {/* Lịch sử Check-in/Check-out */}
            <div className="bg-white p-5 rounded-xl shadow border border-gray-100 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">Lịch sử buổi dạy</h2>
                <div className="flex flex-col gap-3">
                    {historyData.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center p-3 bg-gray-100 rounded-xl shadow-sm">
                            <div className="w-full sm:w-auto mb-2 sm:mb-0">
                                <p className="font-semibold text-gray-800 mb-1">{item.date}</p>
                                <p className="text-gray-500 text-sm mb-0">
                                    Check-in: {item.checkIn} - Check-out: {item.checkOut}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`font-bold ${item.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {item.duration}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(item.status)}`}>
                                    {item.status === 'completed' ? 'Hoàn thành' : 'Đi trễ'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full text-blue-600 font-medium mt-4 flex items-center justify-center gap-1 hover:underline transition">
                    Xem tất cả lịch sử <i className="fas fa-chevron-right text-xs"></i>
                </button>
            </div>
            {/* Nút hành động khác */}
            <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-3 rounded-lg text-lg shadow-lg transition">
                    <i className="fas fa-exclamation-circle"></i> Báo cáo vấn đề
                </button>
                <button onClick={() => { navigate('/danhgia-giasu') }} className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg text-lg shadow-lg transition">
                    <i className="fas fa-stop-circle"></i> Dừng theo dõi lớp học
                </button>
                <p className="text-center text-gray-400 text-sm mt-2">
                    Nút "Dừng theo dõi" chỉ nên được sử dụng khi cả hai bên đã thống nhất kết thúc việc giảng dạy.
                </p>
            </div>
            {/* Modal nhập mã bảo mật */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-fadeIn w-full max-w-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Nhập mã bảo mật để {actionType === 'checkin' ? 'Check-in' : 'Check-out'}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Vui lòng nhập mã bảo mật của bạn để xác nhận hành động.
                        </p>
                        <input
                            type="password"
                            value={securityCode}
                            onChange={e => onSecurityCodeChange?.(e.target.value)}
                            placeholder="Mã bảo mật"
                            className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            style={{ letterSpacing: '0.5em' }}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={onCancelModal ? onCancelModal : () => { }}
                                className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={onConfirmModal}
                                className="flex-1 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                            >
                                Xác nhận
                            </button>
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}