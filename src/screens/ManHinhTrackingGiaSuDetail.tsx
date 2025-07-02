import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrackingLayout } from '../components/TrackingLayout'
import Header from '../components/Header'

interface HistoryItem {
    id: string
    date: string
    checkIn: string
    checkOut: string
    duration: string
    status: 'completed' | 'late'
}

// Component: Section trạng thái buổi dạy (động)
interface LessonStatusSectionProps {
    isCheckedIn: boolean
    currentStatus: string
    onCheckIn: () => void
    onCheckOut: () => void
}
const LessonStatusSection: React.FC<LessonStatusSectionProps> = ({
    isCheckedIn,
    currentStatus,
    onCheckIn,
    onCheckOut,
}) => {
    const getStatusClass = () => {
        if (currentStatus.includes('Check-in')) return 'text-green-600'
        if (currentStatus.includes('Check-out')) return 'text-red-600'
        return 'text-blue-600'
    }
    return (
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Trạng thái buổi dạy</h2>
            <p className={`text-2xl font-bold mb-4 ${getStatusClass()}`}>{currentStatus}</p>
            <div className="flex justify-center gap-4 mb-4">
                <button
                    onClick={onCheckIn}
                    disabled={isCheckedIn}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition
                        ${isCheckedIn
                            ? 'bg-green-200 text-green-700 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'}
                    `}
                >
                    <i className="fas fa-sign-in-alt"></i> Check-in
                </button>
                <button
                    onClick={onCheckOut}
                    disabled={!isCheckedIn}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition
                        ${!isCheckedIn
                            ? 'bg-red-200 text-red-700 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600 active:scale-95'}
                    `}
                >
                    <i className="fas fa-sign-out-alt"></i> Check-out
                </button>
            </div>
            <p className="text-gray-400 text-sm italic">
                Vui lòng đảm bảo bạn đang ở địa điểm dạy khi Check-in/Check-out.
            </p>
        </div>
    )
}


const ManHinhTrackingGiaSuDetail: React.FC = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [currentStatus, setCurrentStatus] = useState('Chưa Check-in')
    const [showModal, setShowModal] = useState(false)
    const [actionType, setActionType] = useState<'checkin' | 'checkout'>('checkin')
    const [securityCode, setSecurityCode] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const correctSecurityCode = '123456'

    const historyData: HistoryItem[] = [
        {
            id: '1',
            date: 'Thứ 4, 26/06/2025',
            checkIn: '18:58',
            checkOut: '21:05',
            duration: '2h 7p',
            status: 'completed'
        },
        {
            id: '2',
            date: 'Thứ 2, 24/06/2025',
            checkIn: '19:10',
            checkOut: '21:00',
            duration: '1h 50p',
            status: 'late'
        }
    ]

    // Xử lý Check-in/Check-out
    const handleCheckIn = () => {
        setActionType('checkin')
        setShowModal(true)
        setErrorMessage('')
        setSecurityCode('')
    }
    const handleCheckOut = () => {
        setActionType('checkout')
        setShowModal(true)
        setErrorMessage('')
        setSecurityCode('')
    }
    const handleConfirmModal = () => {
        if (securityCode === correctSecurityCode) {
            if (actionType === 'checkin') {
                setIsCheckedIn(true)
                setCurrentStatus(`Đã Check-in lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`)
            } else if (actionType === 'checkout') {
                setIsCheckedIn(false)
                setCurrentStatus(`Đã Check-out lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`)
            }
            setShowModal(false)
        } else {
            setErrorMessage('Mã bảo mật không đúng. Vui lòng thử lại.')
        }
    }
    const handleCancelModal = () => {
        setShowModal(false)
        setSecurityCode('')
        setErrorMessage('')
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-inter">
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto p-6 mt-20 sm:mt-24 w-full">
                <TrackingLayout
                    historyData={historyData}
                    showModal={showModal}
                    actionType={actionType}
                    securityCode={securityCode}
                    errorMessage={errorMessage}
                    onSecurityCodeChange={setSecurityCode}
                    onCancelModal={handleCancelModal}
                    onConfirmModal={handleConfirmModal}
                    navigate={navigate}
                >
                    <LessonStatusSection
                        isCheckedIn={isCheckedIn}
                        currentStatus={currentStatus}
                        onCheckIn={handleCheckIn}
                        onCheckOut={handleCheckOut}
                    />
                </TrackingLayout>
            </main>
        </div>
    )
}

export default ManHinhTrackingGiaSuDetail