import { Calendar, Badge } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/reset.css'
import Header from '../components/Header'

const events = [
    {
        id: 1,
        title: 'Toán Lớp 9',
        student: 'Lan (Q.3)',
        time: '09:00 - 10:30',
        type: 'math',
        date: '2024-06-15',
    },
    {
        id: 2,
        title: 'Tiếng Anh Lớp 7',
        student: 'Hùng (Q.PN)',
        time: '14:00 - 15:00',
        type: 'english',
        date: '2024-06-25',
    },
    {
        id: 3,
        title: 'Vật Lý Lớp 11',
        student: 'Minh (Q.TB)',
        time: '19:00 - 20:30',
        type: 'physics',
        date: '2024-06-26',
    },
    {
        id: 4,
        title: 'Toán Lớp 9',
        student: 'Lan (Q.3)',
        time: '19:00 - 21:00',
        type: 'math',
        date: '2024-06-28',
    },
    {
        id: 5,
        title: 'Hóa Học Lớp 10',
        student: 'Bảo Anh (Q.7)',
        time: '15:00 - 16:30',
        type: 'chemistry',
        date: '2024-06-24',
    },
    // Thêm data mới
    {
        id: 6,
        title: 'Sinh Học Lớp 8',
        student: 'Phúc (Q.1)',
        time: '08:00 - 09:30',
        type: 'biology',
        date: '2024-06-27',
    },
    {
        id: 7,
        title: 'Lịch Sử Lớp 12',
        student: 'Mai (Q.5)',
        time: '16:00 - 17:30',
        type: 'history',
        date: '2024-06-29',
    },
    {
        id: 8,
        title: 'Toán Lớp 6',
        student: 'Tú (Q.10)',
        time: '10:00 - 11:30',
        type: 'math',
        date: '2024-05-29',
    },
    {
        id: 9,
        title: 'Tiếng Anh Lớp 9',
        student: 'Vy (Q.2)',
        time: '13:00 - 14:30',
        type: 'english',
        date: '2024-06-30',
    },
    {
        id: 10,
        title: 'Vật Lý Lớp 10',
        student: 'Nam (Q.4)',
        time: '18:00 - 19:30',
        type: 'physics',
        date: '2024-05-26',
    },
    {
        id: 11,
        title: 'Toán Lớp 9',
        student: 'Lan (Q.3)',
        time: '09:00 - 10:30',
        type: 'math',
        date: '2024-06-18',
    },
    {
        id: 12,
        title: 'Hóa Học Lớp 11',
        student: 'Bảo Anh (Q.7)',
        time: '15:00 - 16:30',
        type: 'chemistry',
        date: '2024-06-06',
    },
    {
        id: 13,
        title: 'Tin Học Lớp 8',
        student: 'Khoa (Q.6)',
        time: '17:00 - 18:30',
        type: 'informatics',
        date: '2024-06-03',
    },
    {
        id: 14,
        title: 'Địa Lý Lớp 7',
        student: 'Hà (Q.8)',
        time: '08:00 - 09:30',
        type: 'geography',
        date: '2024-06-09',
    },
    {
        id: 15,
        title: 'Toán Lớp 12',
        student: 'Linh (Q.BT)',
        time: '19:00 - 20:30',
        type: 'math',
        date: '2024-06-21',
    },
]

function getEventColor(type) {
    if (type === 'math') return 'blue'
    if (type === 'english') return 'purple'
    if (type === 'physics') return 'magenta'
    if (type === 'chemistry') return 'red'
    if (type === 'informatics') return 'teal'
    if (type === 'geography') return 'green'
    if (type === 'history') return 'orange'
    if (type === 'biology') return 'lime'
    return 'default'
}

function dateCellRender(value) {
    // value là dayjs object
    const dateStr = value.format('YYYY-MM-DD')
    const dayEvents = events.filter(ev => ev.date === dateStr)
    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {dayEvents.map(ev => (
                <li key={ev.id} style={{ marginBottom: 4 }}>
                    <Badge
                        color={getEventColor(ev.type)}
                        text={
                            <span>
                                <b>{ev.title}</b> <span style={{ fontSize: 12 }}>{ev.student}</span>
                                <div style={{ fontSize: 12 }}>{ev.time}</div>
                            </span>
                        }
                    />
                </li>
            ))}
        </ul>
    )
}

export default function TrangLichGiaSu() {
    const navigate = useNavigate()

    const handleSelect = (date) => {
        // Chuyển sang trang chi tiết ngày, truyền ngày qua state hoặc params
        navigate('/tracking-giasu-detail', { state: { date: date.format('YYYY-MM-DD') } })
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-inter">
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto p-6 mt-20 sm:mt-24 w-full">
                <div className="bg-white rounded-4 shadow p-4 mb-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lịch dạy hàng tháng của Gia sư</h1>
                    <Calendar
                        dateCellRender={dateCellRender}
                        fullscreen={true}
                        defaultValue={dayjs('2024-06-01')}
                        onSelect={handleSelect}
                    />
                </div>
            </main>
        </div>
    )
}