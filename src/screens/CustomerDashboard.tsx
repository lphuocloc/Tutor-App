/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerPostsContent from '../components/CustomerPostsContent';
import { message } from 'antd';
import { chatAPI } from '../api/endpoints';

type MenuType = 'dashboard' | 'myPosts' | 'tutors' | 'classes' | 'messages' | 'profile';

const CustomerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Khách hàng';
    const [activeMenu, setActiveMenu] = useState<MenuType>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const menuItems = [
        { id: 'dashboard' as MenuType, label: 'Dashboard', icon: '📊' },
        { id: 'myPosts' as MenuType, label: 'Bài đăng của tôi', icon: '📋' },
        { id: 'tutors' as MenuType, label: 'Tìm gia sư', icon: '🔍' },
        { id: 'classes' as MenuType, label: 'Lớp học của tôi', icon: '📚' },
        { id: 'messages' as MenuType, label: 'Tin nhắn', icon: '💬' },
        { id: 'profile' as MenuType, label: 'Hồ sơ cá nhân', icon: '👤' },
    ];

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <DashboardContent navigate={navigate} />;
            case 'myPosts':
                return <CustomerPostsContent />;
            case 'tutors':
                return <TutorsContent navigate={navigate} />;
            case 'classes':
                return <ClassesContent navigate={navigate} />;
            case 'messages':
                return <MessagesContent navigate={navigate} />;
            case 'profile':
                return <ProfileContent navigate={navigate} />;
            default:
                return <DashboardContent navigate={navigate} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-br from-cyan-600 to-blue-600 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
                {/* Header with Toggle */}
                <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} border-b border-cyan-500`}>
                    {sidebarOpen && <h2 className="text-xl font-bold">Customer Panel</h2>}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all"
                        title={sidebarOpen ? 'Thu gọn' : 'Mở rộng'}
                    >
                        <span className="text-lg font-bold">{sidebarOpen ? '◀' : '▶'}</span>
                    </button>
                </div>

                {/* Menu Items */}
                <nav className={`flex-1 ${sidebarOpen ? 'p-4' : 'p-2'} space-y-2 overflow-y-auto scrollbar-hide`}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveMenu(item.id)}
                            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-3 rounded-lg transition-all group relative ${activeMenu === item.id
                                ? 'bg-white text-cyan-600 shadow-lg scale-105'
                                : 'hover:bg-white/20 hover:scale-105'
                                }`}
                            title={!sidebarOpen ? item.label : ''}
                        >
                            <span className={`${sidebarOpen ? 'text-xl' : 'text-2xl'} flex-shrink-0`}>{item.icon}</span>
                            {sidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}

                            {/* Tooltip khi sidebar đóng */}
                            {!sidebarOpen && (
                                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Info & Logout */}
                <div className={`${sidebarOpen ? 'p-4' : 'p-2'} border-t border-cyan-500`}>
                    {sidebarOpen && (
                        <div className="mb-3 px-2">
                            <p className="text-sm text-cyan-200">Xin chào,</p>
                            <p className="font-semibold truncate">{userName}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-all hover:scale-105 group relative`}
                        title={!sidebarOpen ? 'Đăng xuất' : ''}
                    >
                        <span className={`${sidebarOpen ? 'text-xl' : 'text-2xl'} flex-shrink-0`}>🚪</span>
                        {sidebarOpen && <span className="font-medium">Đăng xuất</span>}

                        {/* Tooltip khi sidebar đóng */}
                        {!sidebarOpen && (
                            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                Đăng xuất
                            </div>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-50">
                {renderContent()}
            </main>
        </div>
    );
};

const DashboardContent: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Lớp học của tôi</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">3</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <span className="text-3xl">📚</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Gia sư đang dạy</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Điểm thưởng</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">450</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <span className="text-3xl">🎁</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm">Bài đăng</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg">
                        <span className="text-3xl">📝</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
                onClick={() => navigate('/tao-bai-dang-tim-gia-su')}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition mb-4">
                        <span className="text-4xl">➕</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tìm gia sư</h3>
                    <p className="text-gray-600 text-sm">Đăng bài tìm gia sư phù hợp</p>
                </div>
            </button>

            <button
                onClick={() => navigate('/bai-dang-gia-su-cu-the')}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition mb-4">
                        <span className="text-4xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Danh sách gia sư</h3>
                    <p className="text-gray-600 text-sm">Xem và chọn gia sư</p>
                </div>
            </button>

            <button
                onClick={() => navigate('/phong-chat')}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition mb-4">
                        <span className="text-4xl">💬</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tin nhắn</h3>
                    <p className="text-gray-600 text-sm">Trò chuyện với gia sư</p>
                </div>
            </button>
        </div>

        {/* My Classes */}
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Lớp học gần đây</h2>
            <div className="space-y-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-gray-800">Toán lớp 10</h3>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Đang học</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">👨‍🏫 Thầy Nguyễn Văn A</p>
                            <p className="text-sm text-gray-600">📅 Thứ 2, 4, 6 • 18:00 - 20:00</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm">
                            Chi tiết
                        </button>
                    </div>
                </div>

                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-gray-800">Tiếng Anh lớp 9</h3>
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Đang học</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">👩‍🏫 Cô Trần Thị B</p>
                            <p className="text-sm text-gray-600">📅 Thứ 3, 5, 7 • 17:00 - 19:00</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm">
                            Chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const TutorsContent: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tìm gia sư</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
            <button
                onClick={() => navigate('/bai-dang-gia-su-cu-the')}
                className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-medium"
            >
                Xem danh sách gia sư
            </button>
        </div>
    </div>
);

const ClassesContent: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lớp học của tôi</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600">Danh sách lớp học đang được phát triển...</p>
        </div>
    </div>
);

const MessagesContent: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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
            console.error('Error fetching chat rooms for customer:', err);
            message.error('Không thể tải danh sách phòng chat');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tin nhắn</h1>
            <div className="bg-white rounded-xl shadow-md p-6">
                {loading ? (
                    <div className="text-center py-8">Đang tải...</div>
                ) : rooms.length === 0 ? (
                    <p className="text-gray-600">Bạn chưa có phòng chat nào.</p>
                ) : (
                    <div className="space-y-3">
                        {rooms.map((room: any) => (
                            <button
                                key={room.chatRoomId}
                                onClick={() => navigate(`/phongchat?roomId=${room.chatRoomId}&tutorPostId=${room.tutorPostId || ''}`)}
                                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-medium">Phòng #{room.chatRoomId}</div>
                                    <div className="text-sm text-gray-500">Bài đăng phụ huynh: {room.parentPostId} · Bài đăng gia sư: {room.tutorPostId}</div>
                                </div>
                                <div className="text-sm text-gray-400">{room.createdAt ? new Date(room.createdAt).toLocaleString() : ''}</div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProfileContent: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Hồ sơ cá nhân</h1>
        <div className="bg-white rounded-xl shadow-md p-6">
            <button
                onClick={() => navigate('/trang-ca-nhan')}
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-medium"
            >
                Xem trang cá nhân
            </button>
        </div>
    </div>
);

export default CustomerDashboard;
