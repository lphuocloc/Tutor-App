import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Spin, message } from 'antd';
import { chatAPI } from '../api/endpoints';
import { fetchProfile, getUserNameByIdFromStore, useProfile } from '../store/profile';

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

    useEffect(() => {
        fetchRooms();
        fetchProfile();
    }, []);
    const user = useProfile();
    console.log('user check check chat', user)
    const navigate = useNavigate();

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const userId = Number(localStorage.getItem('userId') || 0);
            console.log('Fetching rooms for userId:', userId);
            if (!userId) {
                message.error('Vui lòng đăng nhập để xem tin nhắn');
                return;
            }
            const resp = await chatAPI.getUserChatRooms(userId);
            console.log('Rooms response:', resp.data);
            setRooms(resp.data || []);
        } catch (err) {
            console.error('Error fetching chat rooms:', err);
            message.error('Không thể tải danh sách phòng chat');
        } finally {
            setLoading(false);
        }
    };



    if (loading) return <div className="min-h-screen flex items-center justify-center"><Spin size="large" /></div>;

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
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
                                onClick={() => navigate(`/phongchat?roomId=${room.chatRoomId}&tutorPostId=${room.tutorPostId}`)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">Phòng #{room.chatRoomId}</h3>
                                        <p className="text-sm text-gray-600">Người phụ huynh: {getUserNameByIdFromStore(user, room.parentUserId)} · Gia sư: {getUserNameByIdFromStore(user, room.tutorUserId)}</p>
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
