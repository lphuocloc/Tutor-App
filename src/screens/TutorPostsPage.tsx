import React, { useEffect } from 'react';
import { fetchTutorPosts, useTutorPosts } from '../store/tutorPosts';
import { Button, Tag, Typography, Card, Row, Col } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const TutorPostsPage: React.FC = () => {
    const { posts } = useTutorPosts();
    // const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching all tutor posts for customer...');
        fetchTutorPosts();
    }, []);

    const handleRefresh = () => {
        fetchTutorPosts();
    };

    // const handleViewDetail = (postId: number) => {
    //     navigate(`/post/${postId}`);
    // };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };





    // Removed columns for card layout

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Bài đăng tìm học sinh của gia sư</h1>
                        <p className="text-gray-600 mt-2">Xem các bài đăng gia sư đang tìm học sinh</p>
                    </div>
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        onClick={handleRefresh}
                        size="large"
                    >
                        Làm mới
                    </Button>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">📝</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài đăng nào</h3>
                        <p className="text-gray-600">Hiện tại chưa có gia sư nào đăng bài tìm học sinh.</p>
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {posts.map((post) => (
                            <Col xs={24} sm={12} lg={8} key={post.postId}>
                                <Card
                                    hoverable
                                    title={
                                        <Typography.Text strong style={{ fontSize: '16px' }}>
                                            {post.title}
                                        </Typography.Text>
                                    }
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
            </div>
        </div>
    );
};

export default TutorPostsPage;
