import React, { useEffect, useState } from 'react';
import { usePosts, fetchPosts } from '../store/posts';
import type { Post } from '../types/post';
import { message, Modal } from 'antd';
import { classAPI } from '../api/endpoints';

const CustomerPostsContent: React.FC = () => {
    const posts = usePosts();
    const [deleting, setDeleting] = useState<number | null>(null);
    useEffect(() => {
        console.log('Fetching customer posts...');
        fetchPosts();
    }, []);

    const handleRefresh = () => {
        fetchPosts();
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
                    fetchPosts(); // Reload danh sách
                } catch (error) {
                    console.error('Error deleting post:', error);
                    message.error('Có lỗi xảy ra khi xóa bài đăng');
                } finally {
                    setDeleting(null);
                }
            },
        });
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
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Bài đăng tìm gia sư của tôi</h1>
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition flex items-center gap-2"
                >
                    <span>🔄</span>
                    <span>Làm mới</span>
                </button>
            </div>

            {posts.length === 0 ? (
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
                                <h3 className="text-xl font-bold text-gray-800 flex-1">{post.title}</h3>
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

                            <button
                                onClick={() => handleDelete(post.postId)}
                                disabled={deleting === post.postId}
                                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deleting === post.postId ? 'Đang xóa...' : 'Xóa bài đăng'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerPostsContent;
