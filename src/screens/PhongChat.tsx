import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Info, Paperclip, Send, Check, Calendar, Clock, DollarSign, Book, Edit, Save, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    id: number;
    text: string;
    isMyMessage: boolean;
    timestamp: string;
}

const PhongChat: React.FC = () => {
    const navigate = useNavigate();
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
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [showRules, setShowRules] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // State for editable class information
    const [classInfo, setClassInfo] = useState({
        days: 'Thứ 2, Thứ 4, Thứ 6',
        time: '19:00 - 21:00',
        salary: '180.000 VNĐ',
        subject: 'Toán Lớp 9'
    });
    const [isEditingClassInfo, setIsEditingClassInfo] = useState(false);
    const [tempClassInfo, setTempClassInfo] = useState(classInfo); // Temporary state for editing

    // State for custom cancel confirmation modal
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            };
            setMessages(prev => [...prev, message]);
            setNewMessage('');

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
                };
                setMessages(prev => [...prev, response]);
            }, 2000);
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

    const handleConfirm = () => {
        // In a real app, this would navigate to a confirmation page
        console.log('Class confirmed!');
        navigate('/xacnhan-giaodich');
    };

    // Handlers for editable class info
    const handleEditClassInfo = () => {
        setTempClassInfo(classInfo); // Copy current info to temp for editing
        setIsEditingClassInfo(true);
    };

    const handleSaveClassInfo = () => {
        setClassInfo(tempClassInfo); // Save changes from temp to main info
        setIsEditingClassInfo(false);
    };

    const handleCancelEditClassInfo = () => {
        setIsEditingClassInfo(false); // Discard changes and exit edit mode
    };

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
                            <span className="bg-blue-100 text-blue-600 text-base px-3 py-2 rounded-md">
                                Hết hạn sau: 1 ngày 23 giờ
                            </span>
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
                                        <li>• Mọi vi phạm có thể dẫn đến việc không được hoàn cọc và bị khóa tài khoản.</li>
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
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex items-start mb-4 ${message.isMyMessage ? 'justify-end' : ''}`}
                                >
                                    {!message.isMyMessage && (
                                        <img
                                            src="https://placehold.co/40x40/A0D9FF/FFFFFF?text=AV"
                                            alt="Avatar đối phương"
                                            className="rounded-full border border-gray-200 mr-3"
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                    )}
                                    <div
                                        className={`p-3 rounded-lg shadow-sm ${message.isMyMessage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                        style={{ maxWidth: '70%' }}
                                    >
                                        <p className="text-sm mb-1">{message.text}</p>
                                        <span className={`text-xs ${message.isMyMessage ? 'text-blue-200 text-right block' : 'text-gray-500'}`}>
                                            {message.timestamp}
                                        </span>
                                    </div>
                                    {message.isMyMessage && (
                                        <img
                                            src="https://placehold.co/40x40/FF7F50/FFFFFF?text=AV"
                                            alt="Avatar của bạn"
                                            className="rounded-full border border-gray-200 ml-3"
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                    )}
                                </div>
                            ))}
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
                            {!isEditingClassInfo ? (
                                <button
                                    onClick={handleEditClassInfo}
                                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                >
                                    <Edit className="w-5 h-5" />
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSaveClassInfo}
                                        className="text-green-600 hover:text-green-800 focus:outline-none"
                                    >
                                        <Save className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleCancelEditClassInfo}
                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Thứ dạy: </span>
                            </div>
                            {isEditingClassInfo ? (
                                <input
                                    type="text"
                                    value={tempClassInfo.days}
                                    onChange={(e) => setTempClassInfo({ ...tempClassInfo, days: e.target.value })}
                                    className="w-full border rounded-md px-2 py-1 text-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <strong className="text-sm ml-6">{classInfo.days}</strong>
                            )}
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Giờ dạy: </span>
                            </div>
                            {isEditingClassInfo ? (
                                <input
                                    type="text"
                                    value={tempClassInfo.time}
                                    onChange={(e) => setTempClassInfo({ ...tempClassInfo, time: e.target.value })}
                                    className="w-full border rounded-md px-2 py-1 text-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <strong className="text-sm ml-6">{classInfo.time}</strong>
                            )}
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Lương mỗi buổi: </span>
                            </div>
                            {isEditingClassInfo ? (
                                <input
                                    type="text"
                                    value={tempClassInfo.salary}
                                    onChange={(e) => setTempClassInfo({ ...tempClassInfo, salary: e.target.value })}
                                    className="w-full border rounded-md px-2 py-1 text-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <strong className="text-sm text-green-600 ml-6">{classInfo.salary}</strong>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center">
                                <Book className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-sm">Môn: </span>
                            </div>
                            {isEditingClassInfo ? (
                                <input
                                    type="text"
                                    value={tempClassInfo.subject}
                                    onChange={(e) => setTempClassInfo({ ...tempClassInfo, subject: e.target.value })}
                                    className="w-full border rounded-md px-2 py-1 text-sm mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                <strong className="text-sm ml-6">{classInfo.subject}</strong>
                            )}
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
