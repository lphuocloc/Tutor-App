import React, { useEffect, useState } from 'react';
import type { Post } from '../types/post';
import { message, Modal, Card, Button, Tag, Typography, Row, Col, Empty } from 'antd';
import { DeleteOutlined, ReloadOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { classAPI } from '../api/endpoints';

const { Title, Text } = Typography;

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


    const renderPostCard = (post: Post) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={12} key={post.postId}>
            <Card
                hoverable
                className="h-full rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50"
                bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 240, padding: '16px' }}
            >
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <Title level={5} className="mb-0 text-base leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                            {post.title}
                        </Title>
                    </div>

                    <div className="mt-2">
                        <div className="flex flex-wrap gap-1.5">
                            <Tag color="blue" className="text-sm rounded-full border-0 px-3">{post.subject}</Tag>
                            <Tag color="purple" className="text-sm rounded-full border-0 px-3">{post.studentGrade}</Tag>
                            <Tag color="orange" className="text-sm rounded-full border-0 px-3">{post.sessionsPerWeek} buổi/tuần</Tag>
                        </div>

                        <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                                <ClockCircleOutlined className="text-gray-500 text-sm" />
                                <Text className="text-sm">
                                    {post.preferredDays} - {post.preferredTime}
                                </Text>
                            </div>

                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2.5 rounded-xl border border-green-200 shadow-sm">
                                <DollarOutlined className="text-green-600 text-base" />
                                <Text className="text-base font-bold text-green-700">
                                    {formatCurrency(post.pricePerSession)}/buổi
                                </Text>
                            </div>

                            {post.location && (
                                <div className="flex items-center gap-2">
                                    <EnvironmentOutlined className="text-gray-500 text-sm" />
                                    <Text className="text-sm text-gray-600">
                                        {post.location}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 12 }}>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(post.postId)}
                        loading={deleting === post.postId}
                        size="middle"
                        block
                        className="rounded-lg hover:scale-105 transition-transform duration-200 shadow-md"
                    >
                        Xóa
                    </Button>
                </div>
            </Card>
        </Col>
    );

    return (
        <div className="p-6">
            <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Bài đăng tìm học sinh của tôi</h1>
                        <p className="text-blue-100 text-sm">Quản lý các bài đăng tìm gia sư của bạn</p>
                    </div>
                    <Button
                        onClick={handleRefresh}
                        loading={loading}
                        type="default"
                        icon={<ReloadOutlined />}
                        size="middle"
                        className="bg-white hover:bg-gray-50 border-0 shadow-md"
                    >
                        Làm mới
                    </Button>
                </div>
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
