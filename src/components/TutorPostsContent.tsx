import React, { useEffect, useState } from 'react';
import type { Post } from '../types/post';
import { message, Modal, Card, Button, Tag, Typography, Row, Col, Empty } from 'antd';
import { DeleteOutlined, ReloadOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { classAPI } from '../api/endpoints';

const { Title, Text } = Typography;
const { Meta } = Card;

const TutorPostsContent: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);

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
        console.log('Fetching tutor posts...');
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

    const renderPostCard = (post: Post) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={post.postId}>
            <Card
                hoverable
                className="h-full shadow-sm hover:shadow-md transition-shadow duration-300"
                actions={[
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(post.postId)}
                        loading={deleting === post.postId}
                        size="small"
                        block
                    >
                        Xóa
                    </Button>
                ]}
            >
                <Meta
                    title={
                        <div className="flex items-center justify-between">
                            <Title level={5} className="mb-0 text-lg leading-tight">
                                {post.title}
                            </Title>
                            <Tag color={post.postId === 1 ? 'green' : post.postId === 2 ? 'blue' : 'default'}>
                                <ClockCircleOutlined /> {getTimeAgo(post.postId)}
                            </Tag>
                        </div>
                    }
                    description={
                        <div className="space-y-3 mt-3">
                            <div className="flex flex-wrap gap-2">
                                <Tag color="blue">{post.subject}</Tag>
                                <Tag color="purple">{post.studentGrade}</Tag>
                                <Tag color="orange">{post.sessionsPerWeek} buổi/tuần</Tag>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <ClockCircleOutlined className="text-gray-500" />
                                    <Text className="text-sm">
                                        {post.preferredDays} - {post.preferredTime}
                                    </Text>
                                </div>

                                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                                    <DollarOutlined className="text-green-600 text-lg" />
                                    <Text className="text-lg font-bold text-green-700">
                                        {formatCurrency(post.pricePerSession)}/buổi
                                    </Text>
                                </div>

                                {post.location && (
                                    <div className="flex items-center gap-2">
                                        <EnvironmentOutlined className="text-gray-500" />
                                        <Text className="text-sm text-gray-600">
                                            {post.location}
                                        </Text>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                />
            </Card>
        </Col>
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Bài đăng tìm học sinh của tôi</h1>
                <Button
                    onClick={handleRefresh}
                    loading={loading}
                    type="primary"
                    icon={<ReloadOutlined />}
                    size="large"
                >
                    Làm mới
                </Button>
            </div>

            {posts.length === 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài đăng nào</h3>
                            <p className="text-gray-600">Bạn chưa có bài đăng tìm học sinh nào. Hãy tạo bài đăng mới!</p>
                        </div>
                    }
                />
            ) : (
                <Row gutter={[16, 16]}>
                    {posts.map(renderPostCard)}
                </Row>
            )}
        </div>
    );
};

export default TutorPostsContent;
