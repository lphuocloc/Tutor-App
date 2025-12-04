import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/post';
import { message, Modal, Button, Tag, Typography, Card, Row, Col } from 'antd';
import { ReloadOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { classAPI } from '../api/endpoints';
import { getUserNameByIdFromStore } from '../store/profile';
import { useUser } from '../store';

interface MatchingPost {
    postId: number;
    creatorUserId: number;
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

    const users = useUser();

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

    // const getTimeAgo = (postId: number) => {
    //     if (postId === 1) return 'Mới';
    //     if (postId === 2) return '2h trước';
    //     if (postId === 3) return '1 ngày trước';
    //     return '2 ngày trước';
    // };


    // Removed columns for card layout

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Bài đăng tìm gia sư của tôi</h1>
                        <p className="text-gray-600 mt-2">Quản lý các bài đăng tìm gia sư của bạn</p>
                    </div>
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        onClick={handleRefresh}
                        loading={loading}
                        size="large"
                    >
                        Làm mới
                    </Button>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">📝</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài đăng nào</h3>
                        <p className="text-gray-600">Bạn chưa có bài đăng tìm gia sư nào. Hãy tạo bài đăng mới!</p>
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {posts.map((post) => (
                            <Col xs={24} sm={12} lg={8} key={post.postId}>
                                <Card
                                    hoverable
                                    title={
                                        <Button
                                            type="link"
                                            onClick={() => navigate(`/post/${post.postId}`)}
                                            style={{ padding: 0, fontSize: '16px', fontWeight: 'bold', color: '#1890ff' }}
                                        >
                                            {post.title}
                                        </Button>
                                    }
                                    actions={[
                                        <Button
                                            type="primary"
                                            icon={<SearchOutlined />}
                                            onClick={() => handleFindMatches(post.postId)}
                                            loading={loadingMatches && selectedPostId === post.postId}
                                            size="small"
                                            key="find"
                                        >
                                            Tìm gia sư
                                        </Button>,
                                        <Button
                                            type="primary"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleDelete(post.postId)}
                                            loading={deleting === post.postId}
                                            size="small"
                                            key="delete"
                                        >
                                            Xóa
                                        </Button>
                                    ]}
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">📚 Môn học:</span>
                                            <Tag color="blue">{post.subject}</Tag>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">🎓 Lớp:</span>
                                            <Tag color="purple">{post.studentGrade}</Tag>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">📅 Số buổi/tuần:</span>
                                            <span>{post.sessionsPerWeek} buổi</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">⏰ Thời gian:</span>
                                            <div className="ml-2">
                                                <div>{post.preferredDays}</div>
                                                <div className="text-gray-500 text-sm">{post.preferredTime}</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">💰 Lương/buổi:</span>
                                            <Typography.Text style={{ color: '#52c41a', fontWeight: 'bold' }}>
                                                {formatCurrency(post.pricePerSession)}
                                            </Typography.Text>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">📍 Địa điểm:</span>
                                            <span>{post.location || 'Chưa cập nhật'}</span>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
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
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <span className="font-semibold text-blue-800">👨‍🏫 Gia sư:</span>{' '}
                                            <span className="text-blue-900 font-medium">
                                                {getUserNameByIdFromStore(users, matchPost.creatorUserId)}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
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
