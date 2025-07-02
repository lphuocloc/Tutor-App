import { useState } from "react"
import { TrackingLayout } from "../components/TrackingLayout"
import { useNavigate } from "react-router-dom"

interface HistoryItem {
    id: string
    date: string
    checkIn: string
    checkOut: string
    duration: string
    status: 'completed' | 'late'
}
const ManHinhTrackingPhuHuynhDetail: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


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

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-sans">
            <TrackingLayout
                historyData={historyData}
                showModal={showModal}
                errorMessage={errorMessage}
                navigate={navigate}
            >

            </TrackingLayout>
        </div>
    )
}

export default ManHinhTrackingPhuHuynhDetail