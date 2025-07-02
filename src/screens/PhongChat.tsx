import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Message {
    id: number
    text: string
    isMyMessage: boolean
    timestamp: string
}

const PhongChat: React.FC = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Chào bạn, tôi là gia sư Nguyễn Văn A. Bạn cần tìm gia sư môn gì và cho lớp mấy ạ?',
            isMyMessage: false,
            timestamp: '14:30 PM'
        },
        {
            id: 2,
            text: 'Chào gia sư, tôi muốn tìm gia sư Toán cho con tôi học lớp 9. Cháu cần ôn tập kiến thức cơ bản để chuẩn bị cho kỳ thi cuối kỳ.',
            isMyMessage: true,
            timestamp: '14:32 PM'
        },
        {
            id: 3,
            text: 'À vâng, lớp 9 Toán thì cần nắm vững nhiều kiến thức quan trọng. Bạn mong muốn số buổi học trong tuần là bao nhiêu và thời gian nào thì tiện cho cháu ạ?',
            isMyMessage: false,
            timestamp: '14:35 PM'
        }
    ])
    const [newMessage, setNewMessage] = useState('')
    const [showRules, setShowRules] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: Date.now(),
                text: newMessage,
                isMyMessage: true,
                timestamp: new Date().toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
            }
            setMessages(prev => [...prev, message])
            setNewMessage('')

            // Simulate response after 2 seconds
            setTimeout(() => {
                const response: Message = {
                    id: Date.now() + 1,
                    text: 'Cảm ơn bạn đã chia sẻ thông tin. Tôi sẽ xem xét và phản hồi sớm nhất có thể.',
                    isMyMessage: false,
                    timestamp: new Date().toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                }
                setMessages(prev => [...prev, response])
            }, 2000)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleCancel = () => {
        if (window.confirm('Bạn có chắc chắn muốn hủy bỏ cuộc trò chuyện này?')) {
            navigate('/trangchu')
        }
    }

    const handleConfirm = () => {
        navigate('/xacnhan-giaodich')
    }

    return (
        <div className="min-h-screen flex flex-col bg-light">
            {/* Header */}
            <header className="bg-primary text-white p-4 shadow-lg z-10">
                <div className="max-w-4xl mx-auto d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-link text-white p-0 border-0"
                        >
                            <i className="fas fa-arrow-left fs-5"></i>
                        </button>
                        <img
                            src="https://placehold.co/50x50/A0D9FF/FFFFFF?text=AV"
                            alt="Avatar đối phương"
                            className="rounded-circle border border-primary-subtle"
                            style={{ width: '48px', height: '48px' }}
                        />
                        <div>
                            <h1 className="fs-5 fw-semibold mb-0">Phòng trò chuyện với Gia sư Nguyễn Văn A</h1>
                            <p className="text-primary-subtle small mb-0">Online</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-2">
                            Hết hạn sau: 1 ngày 23 giờ
                        </span>
                        <button className="btn btn-link text-white p-0 border-0">
                            <i className="fas fa-phone fs-5"></i>
                        </button>
                        <button className="btn btn-link text-white p-0 border-0">
                            <i className="fas fa-info-circle fs-5"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 max-w-4xl mx-auto w-100 p-4 d-flex flex-column flex-lg-row gap-4">
                {/* Chat Container */}
                <div className="flex-1 d-flex flex-column min-h-0">
                    {/* Rules Banner */}
                    {showRules && (
                        <div className="alert alert-warning d-flex align-items-start justify-content-between mb-4" role="alert">
                            <div className="flex-grow-1">
                                <h3 className="fw-bold fs-5 mb-2">Nội quy phòng chat</h3>
                                <ul className="list-unstyled small mb-0">
                                    <li className="mb-1">• Không trao đổi thông tin liên lạc cá nhân (số điện thoại, email, địa chỉ).</li>
                                    <li className="mb-1">• Không sử dụng ngôn ngữ xúc phạm, thiếu văn hóa.</li>
                                    <li className="mb-1">• Chỉ thảo luận về nội dung lớp học và các vấn đề liên quan.</li>
                                    <li>• Mọi vi phạm có thể dẫn đến việc không được hoàn cọc và bị khóa tài khoản.</li>
                                </ul>
                            </div>
                            <button
                                onClick={() => setShowRules(false)}
                                className="btn btn-link text-warning p-0 border-0 ms-3"
                            >
                                <i className="fas fa-times fs-5"></i>
                            </button>
                        </div>
                    )}

                    {/* Chat Messages */}
                    <div className="flex-1 bg-white rounded-3 shadow-sm p-4 overflow-auto mb-4" style={{ maxHeight: '400px' }}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`d-flex align-items-start mb-4 ${message.isMyMessage ? 'justify-content-end' : ''}`}
                            >
                                {!message.isMyMessage && (
                                    <img
                                        src="https://placehold.co/40x40/A0D9FF/FFFFFF?text=AV"
                                        alt="Avatar đối phương"
                                        className="rounded-circle border border-light me-3"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                )}
                                <div
                                    className={`p-3 rounded-3 shadow-sm ${message.isMyMessage
                                        ? 'bg-primary text-white'
                                        : 'bg-light text-dark'
                                        }`}
                                    style={{ maxWidth: '70%' }}
                                >
                                    <p className="small mb-1">{message.text}</p>
                                    <span className={`extra-small ${message.isMyMessage ? 'text-primary-subtle text-end' : 'text-muted'}`}>
                                        {message.timestamp}
                                    </span>
                                </div>
                                {message.isMyMessage && (
                                    <img
                                        src="https://placehold.co/40x40/FF7F50/FFFFFF?text=AV"
                                        alt="Avatar của bạn"
                                        className="rounded-circle border border-light ms-3"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="bg-white p-4 rounded-3 shadow-sm d-flex align-items-center mb-4">
                        <button className="btn btn-link text-muted me-3 p-0 border-0">
                            <i className="fas fa-paperclip fs-5"></i>
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Gõ tin nhắn của bạn..."
                            className="form-control border-0 flex-grow-1 px-4 py-2"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="btn btn-primary rounded-pill ms-3 px-4 py-2"
                            disabled={!newMessage.trim()}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="btn btn-danger flex-fill py-3 fw-semibold"
                        >
                            Hủy bỏ / Không đồng ý
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="btn btn-success flex-fill py-3 fw-semibold"
                        >
                            Xác nhận nhận lớp <i className="fas fa-check ms-2"></i>
                        </button>
                    </div>
                </div>

                {/* Notification Board */}
                <div className="bg-white rounded-3 shadow-lg p-4 border border-primary-subtle" style={{ width: '250px' }}>
                    <h3 className="fw-bold text-primary mb-3">Thông tin lớp học</h3>
                    <div className="mb-2">
                        <i className="far fa-calendar-alt me-2 text-muted"></i>
                        <span className="small">Thứ dạy: <strong>Thứ 2, Thứ 4, Thứ 6</strong></span>
                    </div>
                    <div className="mb-2">
                        <i className="far fa-clock me-2 text-muted"></i>
                        <span className="small">Giờ dạy: <strong>19:00 - 21:00</strong></span>
                    </div>
                    <div className="mb-2">
                        <i className="fas fa-money-bill-wave me-2 text-muted"></i>
                        <span className="small">Lương mỗi buổi: <strong className="text-success">180.000 VNĐ</strong></span>
                    </div>
                    <div>
                        <i className="fas fa-book me-2 text-muted"></i>
                        <span className="small">Môn: <strong>Toán Lớp 9</strong></span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PhongChat 