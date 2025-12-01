import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Info, Paperclip, Send, Check, Calendar, Clock, DollarSign, Book, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { message, Button, Input, Card, Avatar, Space } from 'antd';
import { classAPI, bookingAPI, walletAPI } from '../api/endpoints';
import axiosInstance from '../api/axiosConfig';
import type { Post } from '../types/post';

// Custom Modal Component
interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isVisible: boolean;
}

const CustomModal: React.FC<ModalProps> = ({ message, onConfirm, onCancel, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full transform transition-all duration-300 scale-100">
                <p className="text-gray-800 text-lg mb-6 text-center">{message}</p>
                <div className="flex justify-around gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 font-semibold"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-semibold"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

interface Message {
    messageId: number;
    chatRoomId: number;
    senderId: number;
    senderName: string;
    content: string;
    messageType: string;
    fileUrl?: string | null;
    isRead: boolean;
    sentAt: string; // ISO
}

const PhongChat: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatRoomId, setChatRoomId] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [showRules, setShowRules] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // State for editable class information (populated from tutor post details)
    const [classInfo, setClassInfo] = useState({
        days: '',
        time: '',
        salary: '',
        subject: ''
    });
    const [postDetail, setPostDetail] = useState<Post | null>(null);
    // No edit functionality: class info is read-only in chat

    // State for custom cancel confirmation modal
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        if (!chatRoomId) {
            message.error('Không tìm thấy chatRoomId. Vui lòng chọn phòng chat.');
            return;
        }

        const body = { chatRoomId, content: newMessage.trim() };

        try {
            await axiosInstance.post('/Message/text', body);
            // After sending, re-fetch the entire chatroom messages to keep state consistent
            if (chatRoomId) {
                const resp2 = await axiosInstance.get(`/Message/chatroom/${chatRoomId}`);
                const all = resp2.data || [];
                setMessages(all);
            }
            setNewMessage('');
        } catch (err) {
            console.error('Error sending message', err);
            message.error('Gửi tin nhắn thất bại. Vui lòng thử lại.');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Function to show the custom cancel confirmation modal
    const handleCancelChat = () => {
        setShowCancelConfirm(true);
    };

    // Function to confirm cancellation (from modal)
    const handleConfirmCancel = async () => {
        setShowCancelConfirm(false);
        if (chatRoomId) {
            try {
                await axiosInstance.delete(`/ChatRoom/${chatRoomId}`);
                message.success('Đã xóa phòng chat.');
            } catch (err) {
                console.error('Error deleting chatroom:', err);
                message.error('Xóa phòng chat thất bại.');
            }
        }
        const userId = Number(localStorage.getItem('userId') || 0);
        if (userId) {
            try {
                const resp = await walletAPI.addFunds({ userId, amount: 50000 });
                if (resp.status === 200) {
                    message.success('Hoàn tiền thành công.');
                }
                navigate('/tinnhan');
            } catch (err) {
                console.error('Error refunding:', err);
                message.error('Hoàn tiền thất bại.');
            }
        }
        message.info('Cuộc trò chuyện đã được hủy bỏ.');
    };

    // Function to close the custom cancel confirmation modal
    const handleCloseCancelModal = () => {
        setShowCancelConfirm(false);
    };

    const handleConfirm = async () => {
        // Perform booking by calling bookingAPI with fields from the fetched post detail
        try {
            if (!chatRoomId) {
                message.error('Không tìm thấy phòng chat. Vui lòng thử lại.');
                return;
            }
            if (!postDetail) {
                message.error('Không tìm thấy thông tin lớp học. Vui lòng thử lại.');
                return;
            }

            const payload = {
                chatRoomId,
                agreedPricePerSession: Number(postDetail.pricePerSession || 0),
                sessionsPerWeek: Number(postDetail.sessionsPerWeek || 0),
                agreedDays: postDetail.preferredDays || '',
                agreedTime: postDetail.preferredTime || ''
            };

            const resp = await bookingAPI.createBooking(payload);
            if (resp && (resp.status === 200 || resp.status === 201)) {
                message.success('Xác nhận nhận lớp thành công.');
                navigate('/my-posts');
            } else {
                message.error('Tạo booking thất bại. Vui lòng thử lại.');
            }
        } catch (err) {
            console.error('Error creating booking from chat:', err);
            message.error('Tạo booking thất bại. Vui lòng thử lại.');
        }
    };

    // Edit handlers removed — class info is read-only here

    // Format currency helper
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // On mount: try to read a tutor post id (from query or localStorage) and fetch its details
    useEffect(() => {
        const fetchTutorPost = async (postId: number) => {
            try {
                const resp = await classAPI.getPostDetail(postId);
                const fetched = resp.data as Post;
                if (fetched) {
                    setPostDetail(fetched);
                    const days = fetched.preferredDays || '';
                    const time = fetched.preferredTime || '';
                    const salary = fetched.pricePerSession !== undefined && fetched.pricePerSession !== null
                        ? formatCurrency(Number(fetched.pricePerSession))
                        : '';
                    const subject = fetched.subject || fetched.title || fetched.studentGrade || '';
                    const mapped = { days, time, salary, subject };
                    setClassInfo(mapped);
                } else {
                    // If no data fetched, set default values
                    setClassInfo({
                        days: 'Chưa xác định',
                        time: 'Chưa xác định',
                        salary: 'Chưa xác định',
                        subject: 'Chưa xác định'
                    });
                }
            } catch (err) {
                console.error('Error fetching tutor post detail for chat page:', err);
                // On error, set default values
                setClassInfo({
                    days: 'Chưa xác định',
                    time: 'Chưa xác định',
                    salary: 'Chưa xác định',
                    subject: 'Chưa xác định'
                });
            }
        };

        try {
            const params = new URLSearchParams(window.location.search);
            const tutorPostId = Number(params.get('tutorPostId') || 0);
            if (tutorPostId && tutorPostId > 0) {
                fetchTutorPost(tutorPostId);
            } else {
                // Fallback to localStorage if no tutorPostId in URL
                const idFromStorage = Number(localStorage.getItem('tutorPostId') || localStorage.getItem('pendingOrderPostId') || 0);
                if (idFromStorage && idFromStorage > 0) {
                    fetchTutorPost(idFromStorage);
                } else {
                    // If no postId, set default values
                    setClassInfo({
                        days: 'Thứ 2, Thứ 5',
                        time: '19 giờ - 21 giờ',
                        salary: 10000 + ' VND',
                        subject: 'Toán'
                    });
                }
            }
        } catch (e) {
            console.error('Error determining tutorPostId for chat page:', e);
            // On error, set default values
            setClassInfo({
                days: 'Thứ 2, Thứ 5',
                time: '19 giờ - 21 giờ',
                salary: 10000 + ' VND',
                subject: 'Toán'
            });
        }
    }, []);

    // Load chat messages if roomId present in querystring
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const rid = Number(params.get('roomId') || 0);
                if (!rid) return;
                setChatRoomId(rid);
                const resp = await axiosInstance.get(`/Message/chatroom/${rid}`);
                const data = resp.data || [];
                // Only update if messages changed to avoid unnecessary scrolls
                setMessages(prev => {
                    if (JSON.stringify(prev) !== JSON.stringify(data)) {
                        // Scroll only if new messages
                        setTimeout(scrollToBottom, 100);
                        return data;
                    }
                    return prev;
                });
            } catch (err) {
                console.error('Error loading chat messages:', err);
            }
        };

        // Load messages initially
        loadMessages();

        // Set up polling every 2.5 seconds
        const intervalId = setInterval(loadMessages, 2500);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 font-sans overflow-hidden">
            <div className="w-full max-w-5xl mx-auto" style={{ overflow: 'hidden' }}>
                <header className="bg-blue-600 text-white shadow-lg z-10 p-4 w-full rounded-t-2xl">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/chitiet-lophoc')} // Replaced navigate(-1)
                                className="text-white p-0 border-0 focus:outline-none"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <img
                                src="https://placehold.co/50x50/A0D9FF/FFFFFF?text=AV"
                                alt="Avatar đối phương"
                                className="rounded-full border border-blue-200"
                                style={{ width: '48px', height: '48px' }}
                            />
                            <div>
                                <h1 className="text-lg font-semibold mb-0">Phòng trò chuyện với Gia sư Nguyễn Văn A</h1>
                                <p className="text-blue-200 text-sm mb-0">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* <span className="bg-blue-100 text-blue-600 text-base px-3 py-2 rounded-md">
                                Hết hạn sau: 1 ngày 23 giờ
                            </span> */}
                            <button className="text-white p-0 border-0 focus:outline-none">
                                <Phone className="w-6 h-6" />
                            </button>
                            <button className="text-white p-0 border-0 focus:outline-none">
                                <Info className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 flex flex-col min-h-0">
                        {showRules && (
                            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg flex items-start justify-between mb-4" role="alert">
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg mb-2">Nội quy phòng chat</h3>
                                    <ul className="list-none text-sm mb-0 pl-0">
                                        <li className="mb-1">• Không trao đổi thông tin liên lạc cá nhân (số điện thoại, email, địa chỉ).</li>
                                        <li className="mb-1">• Không sử dụng ngôn ngữ xúc phạm, thiếu văn hóa.</li>
                                        <li className="mb-1">• Chỉ thảo luận về nội dung lớp học và các vấn đề liên quan.</li>
                                        <li>• Mọi vi phạm có thể dẫn đến việc bị khóa tài khoản.</li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => setShowRules(false)}
                                    className="text-yellow-700 p-0 border-0 ml-3 focus:outline-none"
                                >
                                    <XCircle className="w-6 h-6" />
                                </button>
                            </div>
                        )}

                        <Card className="mb-4" style={{ height: '400px', overflow: 'auto' }}>
                            {messages.map((msg) => {
                                const currentUserId = Number(localStorage.getItem('userId') || 0);
                                const isMy = currentUserId === msg.senderId;
                                const time = msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';
                                return (
                                    <div
                                        key={msg.messageId}
                                        style={{
                                            display: 'flex',
                                            justifyContent: isMy ? 'flex-end' : 'flex-start',
                                            marginBottom: '16px'
                                        }}
                                    >
                                        {!isMy && (
                                            <Avatar src="https://placehold.co/40x40/A0D9FF/FFFFFF?text=AV" style={{ marginRight: '8px' }} />
                                        )}
                                        <div
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                backgroundColor: isMy ? '#1890ff' : '#f0f0f0',
                                                color: isMy ? 'white' : 'black',
                                                maxWidth: '70%'
                                            }}
                                        >
                                            {!isMy && (
                                                <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>{msg.senderName}</div>
                                            )}
                                            <div style={{ marginBottom: '4px' }}>{msg.content}</div>
                                            <div style={{ fontSize: '12px', color: isMy ? '#e6f7ff' : '#999', textAlign: isMy ? 'right' : 'left' }}>
                                                {time}
                                            </div>
                                        </div>
                                        {isMy && (
                                            <Avatar src="https://placehold.co/40x40/FF7F50/FFFFFF?text=AV" style={{ marginLeft: '8px' }} />
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </Card>

                        <Card className="mb-4">
                            <Space.Compact style={{ width: '100%' }}>
                                <Button icon={<Paperclip />} />
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onPressEnter={handleKeyPress}
                                    placeholder="Gõ tin nhắn của bạn..."
                                    style={{ flex: 1 }}
                                />
                                <Button
                                    type="primary"
                                    icon={<Send />}
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                />
                            </Space.Compact>
                        </Card>

                        <Space>
                            {localStorage.getItem('userRole') !== 'Tutor' && (
                                <>
                                    <Button
                                        danger
                                        size="large"
                                        onClick={handleCancelChat}
                                        style={{ flex: 1 }}
                                    >
                                        Hủy bỏ / Không đồng ý
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={handleConfirm}
                                        icon={<Check />}
                                        style={{ flex: 1 }}
                                    >
                                        Xác nhận nhận lớp
                                    </Button>
                                </>
                            )}
                        </Space>
                    </div>

                    <Card style={{ width: '100%', maxWidth: '256px' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <h3 style={{ fontWeight: 'bold', color: '#1890ff', fontSize: '18px' }}>Thông tin lớp học</h3>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            <Space>
                                <Calendar style={{ color: '#999' }} />
                                <span style={{ fontSize: '14px' }}>Thứ dạy: </span>
                            </Space>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '24px' }}>{classInfo.days}</div>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            <Space>
                                <Clock style={{ color: '#999' }} />
                                <span style={{ fontSize: '14px' }}>Giờ dạy: </span>
                            </Space>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '24px' }}>{classInfo.time}</div>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            <Space>
                                <DollarSign style={{ color: '#999' }} />
                                <span style={{ fontSize: '14px' }}>Lương mỗi buổi: </span>
                            </Space>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#52c41a', marginLeft: '24px' }}>{classInfo.salary}</div>
                        </div>
                        <div>
                            <Space>
                                <Book style={{ color: '#999' }} />
                                <span style={{ fontSize: '14px' }}>Môn: </span>
                            </Space>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '24px' }}>{classInfo.subject}</div>
                        </div>
                    </Card>
                </main>
            </div>

            <CustomModal
                message="Bạn có chắc chắn muốn hủy bỏ cuộc trò chuyện này?"
                onConfirm={handleConfirmCancel}
                onCancel={handleCloseCancelModal}
                isVisible={showCancelConfirm}
            />
        </div>
    );
};

export default PhongChat;
