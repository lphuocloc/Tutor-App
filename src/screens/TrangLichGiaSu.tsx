import { Calendar, Badge } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import 'antd/dist/reset.css'

const events = [
    {
        id: 1,
        title: 'Toán Lớp 9',
        student: 'Lan (Q.3)',
        time: '09:00 - 10:30',
        type: 'math',
        date: '2024-06-24',
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
]

function getEventColor(type) {
    if (type === 'math') return 'blue'
    if (type === 'english') return 'purple'
    if (type === 'physics') return 'magenta'
    if (type === 'chemistry') return 'red'
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
        <div style={{ background: '#f5f6fa', minHeight: '100vh', padding: 24 }}>
            <div className="bg-white rounded-4 shadow p-4 mb-4">
                <h1 className="h2 fw-bold text-dark mb-4 text-center">Lịch dạy hàng tháng của Gia sư</h1>
                <Calendar
                    dateCellRender={dateCellRender}
                    fullscreen={true}
                    defaultValue={dayjs('2024-06-01')}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    )
}