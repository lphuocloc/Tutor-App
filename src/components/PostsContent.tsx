import React, { useEffect } from 'react';
import { Card, Button, Tag, Typography, Row, Col, Empty } from 'antd';
import { ReloadOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { fetchPosts, usePosts } from '../store/posts';
import type { Post } from '../types/post';

const { Title, Text } = Typography;
const { Meta } = Card;

const PostsContent: React.FC = () => {
    const posts = usePosts()

    useEffect(() => {
        // Gọi API khi component mount
        console.log('Fetching posts...');
        fetchPosts();
    }, []);

    const handleRefresh = () => {
        fetchPosts();
    };



    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getTimeAgo = (postId: number) => {
        // Tạm thời dùng logic đơn giản dựa vào postId
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
            // onClick={() => handleViewDetail(post.postId)}
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
                <h1 className="text-3xl font-bold text-gray-800">Bài đăng phụ huynh</h1>
                <Button
                    onClick={handleRefresh}
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
                            <p className="text-gray-600">Hiện tại chưa có bài đăng tìm gia sư nào từ phụ huynh.</p>
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

export default PostsContent;
