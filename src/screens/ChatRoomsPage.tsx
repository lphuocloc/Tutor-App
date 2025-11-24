import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Spin, message } from 'antd';
import { chatAPI } from '../api/endpoints';

interface ChatRoom {
    chatRoomId: number;
    parentPostId: number;
    tutorPostId: number;
    parentUserId: number;
    tutorUserId: number;
    createdAt: string;
    isActive: boolean;
    isConfirmed: boolean;
}

const ChatRoomsPage: React.FC = () => {
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const userId = Number(localStorage.getItem('userId') || 0);
            if (!userId) {
                message.error('Vui lòng đăng nhập để xem tin nhắn');
                return;
            }
            const resp = await chatAPI.getUserChatRooms(userId);
            setRooms(resp.data || []);
        } catch (err) {
            console.error('Error fetching chat rooms:', err);
            message.error('Không thể tải danh sách phòng chat');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Spin size="large" /></div>;

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Tin nhắn</h1>
                {rooms.length === 0 ? (
                    <div className="bg-white p-8 rounded shadow text-center">Bạn chưa có phòng chat nào.</div>
                ) : (
                    <List
                        itemLayout="vertical"
                        dataSource={rooms}
                        renderItem={(room) => (
                            <List.Item
                                key={room.chatRoomId}
                                className="bg-white rounded p-4 mb-4 shadow-sm cursor-pointer hover:shadow-md"
                                onClick={() => navigate(`/phongchat?roomId=${room.chatRoomId}`)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">Phòng #{room.chatRoomId}</h3>
                                        <p className="text-sm text-gray-600">Bài đăng phụ huynh: {room.parentPostId} · Bài đăng gia sư: {room.tutorPostId}</p>
                                        <p className="text-sm text-gray-600">Người phụ huynh: {room.parentUserId} · Gia sư: {room.tutorUserId}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">{new Date(room.createdAt).toLocaleString()}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatRoomsPage;
