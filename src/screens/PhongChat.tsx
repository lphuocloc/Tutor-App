import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Info, Paperclip, Send, Check, Calendar, Clock, DollarSign, Book, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { classAPI, bookingAPI } from '../api/endpoints';
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
    const handleConfirmCancel = () => {
        setShowCancelConfirm(false);
        // In a real app, this would navigate away or close the chat
        console.log('Chat conversation cancelled.');
        alert('Cuộc trò chuyện đã được hủy bỏ.'); // Using alert for demonstration, replace with a better UI message
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
                }
            } catch (err) {
                console.error('Error fetching tutor post detail for chat page:', err);
            }
        };

        try {
            const params = new URLSearchParams(window.location.search);
            const idFromQuery = Number(params.get('tutorPostId') || params.get('postId') || 0);
            const idFromStorage = Number(localStorage.getItem('tutorPostId') || localStorage.getItem('pendingOrderPostId') || 0);
            const postId = idFromQuery || idFromStorage;
            if (postId && postId > 0) {
                fetchTutorPost(postId);
            }
        } catch (e) {
            console.error('Error determining tutorPostId for chat page:', e);
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
                setMessages(data);
            } catch (err) {
                console.error('Error loading chat messages:', err);
            }
        };
        loadMessages();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
            <div className="w-full max-w-7xl mx-auto mt-20">
                <header className="bg-blue-600 text-white shadow-lg z-10 p-4 w-full rounded-t-2xl">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
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

                <main className="flex-1 w-full max-w-7xl mx-auto p-4 flex flex-col lg:flex-row gap-4">
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

                        <div className="flex-1 bg-white rounded-lg shadow-sm p-4 overflow-auto mb-4 max-h-[400px]">
                            {messages.map((msg) => {
                                const currentUserId = Number(localStorage.getItem('userId') || 0);
                                const isMy = currentUserId === msg.senderId;
                                const time = msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';
                                return (
                                    <div
                                        key={msg.messageId}
                                        className={`flex items-start mb-4 ${isMy ? 'justify-end' : ''}`}
                                    >
                                        {!isMy && (
                                            <img
                                                src="https://placehold.co/40x40/A0D9FF/FFFFFF?text=AV"
                                                alt="Avatar đối phương"
                                                className="rounded-full border border-gray-200 mr-3"
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                        )}
                                        <div
                                            className={`p-3 rounded-lg shadow-sm ${isMy ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                                            style={{ maxWidth: '70%' }}
                                        >
                                            {!isMy && (
                                                <div className="text-xs text-gray-500 mb-1">{msg.senderName}</div>
                                            )}
                                            <p className="text-sm mb-1">{msg.content}</p>
                                            <span className={`text-xs ${isMy ? 'text-blue-200 text-right block' : 'text-gray-500'}`}>
                                                {time}
                                            </span>
                                        </div>
                                        {isMy && (
                                            <img
                                                src="https://placehold.co/40x40/FF7F50/FFFFFF?text=AV"
                                                alt="Avatar của bạn"
                                                className="rounded-full border border-gray-200 ml-3"
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center mb-4">
                            <button className="text-gray-500 mr-3 p-0 border-0 focus:outline-none">
                                <Paperclip className="w-6 h-6" />
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Gõ tin nhắn của bạn..."
                                className="border-0 flex-grow px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-600 text-white rounded-full ml-3 px-4 py-2 flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!newMessage.trim()}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelChat}
                                className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-semibold shadow-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Hủy bỏ / Không đồng ý
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
                            >
                                Xác nhận nhận lớp <Check className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-4 border border-blue-200 lg:w-64 w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-blue-600 text-lg">Thông tin lớp học</h3>
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Thứ dạy: </span>
                            </div>
                            <strong className="text-sm ml-6">{classInfo.days}</strong>
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Giờ dạy: </span>
                            </div>
                            <strong className="text-sm ml-6">{classInfo.time}</strong>
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Lương mỗi buổi: </span>
                            </div>
                            <strong className="text-sm text-green-600 ml-6">{classInfo.salary}</strong>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <Book className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Môn: </span>
                            </div>
                            <strong className="text-sm ml-6">{classInfo.subject}</strong>
                        </div>
                    </div>
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
