import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/post';
import { message, Modal } from 'antd';
import { classAPI } from '../api/endpoints';

interface MatchingPost {
    postId: number;
    title: string;
    subject: string;
    studentGrade: string;
    pricePerSession: number;
    location: string;
    postType: string;
}

const CustomerPostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [matchingPosts, setMatchingPosts] = useState<MatchingPost[]>([]);
    const [showMatches, setShowMatches] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    const navigate = useNavigate();

    const fetchUserPosts = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            if (!userId) {
                message.error('Vui lòng đăng nhập để xem bài đăng');
                return;
            }
            const response = await classAPI.getUserPosts(Number(userId), {
                page: 1,
                pageSize: 10
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
            message.error('Không thể tải bài đăng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Fetching user posts...');
        fetchUserPosts();
    }, []);

    const handleRefresh = () => {
        fetchUserPosts();
    };

    const handleDelete = async (postId: number) => {
        Modal.confirm({
            title: 'Xác nhận xóa bài đăng',
            content: 'Bạn có chắc chắn muốn xóa bài đăng này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: async () => {
                try {
                    setDeleting(postId);
                    await classAPI.deletePost(postId);
                    message.success('Xóa bài đăng thành công!');
                    fetchUserPosts(); // Reload danh sách
                } catch (error) {
                    console.error('Error deleting post:', error);
                    message.error('Có lỗi xảy ra khi xóa bài đăng');
                } finally {
                    setDeleting(null);
                }
            },
        });
    };

    const handleFindMatches = async (postId: number) => {
        try {
            // Save parentPostId when user clicks "Tìm gia sư phù hợp"
            try {
                localStorage.setItem('parentPostId', String(postId));
            } catch {
                // ignore
            }
            setLoadingMatches(true);
            setSelectedPostId(postId);
            const response = await classAPI.findMatchingTutors(postId, {
                page: 1,
                pageSize: 5
            });
            setMatchingPosts(response.data);
            setShowMatches(true);
        } catch (error) {
            console.error('Error finding matches:', error);
            message.error('Không thể tìm gia sư phù hợp');
        } finally {
            setLoadingMatches(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getTimeAgo = (postId: number) => {
        if (postId === 1) return 'Mới';
        if (postId === 2) return '2h trước';
        if (postId === 3) return '1 ngày trước';
        return '2 ngày trước';
    };

    const getBorderColor = (index: number) => {
        const colors = ['border-blue-500', 'border-purple-500', 'border-green-500', 'border-orange-500', 'border-pink-500', 'border-indigo-500'];
        return colors[index % colors.length];
    };

    const getBadgeColor = (postId: number) => {
        if (postId === 1) return 'bg-green-100 text-green-600';
        if (postId === 2) return 'bg-blue-100 text-blue-600';
        return 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Bài đăng tìm gia sư của tôi</h1>
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        <span>{loading ? '⏳' : '🔄'}</span>
                        <span>{loading ? 'Đang tải...' : 'Làm mới'}</span>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Đang tải bài đăng...</p>
                        </div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <span className="text-6xl mb-4 block">📝</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài đăng nào</h3>
                        <p className="text-gray-600">Bạn chưa có bài đăng tìm gia sư nào. Hãy tạo bài đăng mới!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {posts.map((post: Post, index: number) => (
                            <div
                                key={post.postId}
                                className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${getBorderColor(index)} hover:shadow-lg transition`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 flex-1">
                                        <button
                                            onClick={() => {
                                                navigate(`/post/${post.postId}`);
                                            }}
                                            className="text-left w-full hover:underline"
                                        >
                                            {post.title}
                                        </button>
                                    </h3>
                                    <span className={`px-3 py-1 ${getBadgeColor(post.postId)} rounded-full text-sm font-medium ml-2 whitespace-nowrap`}>
                                        {getTimeAgo(post.postId)}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <p className="text-gray-600">
                                        <span className="font-medium">📚 Môn học:</span> {post.subject}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">🎓 Lớp:</span> {post.studentGrade}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">📅 Số buổi/tuần:</span> {post.sessionsPerWeek} buổi
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">🗓️ Ngày học:</span> {post.preferredDays}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">⏰ Thời gian:</span> {post.preferredTime}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">💰 Lương/buổi:</span> {formatCurrency(post.pricePerSession)}
                                    </p>
                                    {post.location && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">📍 Địa điểm:</span> {post.location}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleFindMatches(post.postId)}
                                        disabled={loadingMatches && selectedPostId === post.postId}
                                        className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loadingMatches && selectedPostId === post.postId ? '🔍 Đang tìm...' : '🔍 Tìm gia sư phù hợp'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.postId)}
                                        disabled={deleting === post.postId}
                                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {deleting === post.postId ? 'Đang xóa...' : 'Xóa bài đăng'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Matching Tutors Modal */}
                <Modal
                    title="Gia sư phù hợp"
                    open={showMatches}
                    onCancel={() => setShowMatches(false)}
                    footer={null}
                    width={800}
                >
                    {matchingPosts.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">Không tìm thấy gia sư phù hợp</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {matchingPosts.map((matchPost) => (
                                <div
                                    key={matchPost.postId}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                                    onClick={() => navigate(`/post/${matchPost.postId}`)}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-bold text-gray-800">{matchPost.title}</h3>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                            {matchPost.postType === 'FindStudent' ? 'Tìm học sinh' : 'Tìm gia sư'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <p className="text-gray-600">
                                            <span className="font-medium">📚 Môn:</span> {matchPost.subject}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">🎓 Lớp:</span> {matchPost.studentGrade}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">💰 Giá:</span> {formatCurrency(matchPost.pricePerSession)}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">📍 Nơi:</span> {matchPost.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default CustomerPostsPage;
