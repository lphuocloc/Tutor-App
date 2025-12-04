import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, Tag, Typography, Row, Col, Empty, Select } from 'antd';
import { ReloadOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { fetchPosts, usePosts } from '../store/posts';
import type { Post } from '../types/post';

const { Title, Text } = Typography;
const { Option } = Select;

const PostsContent: React.FC = () => {
    const posts = usePosts()
    const [selectedGrade, setSelectedGrade] = useState<string>('all');
    const [selectedSubject, setSelectedSubject] = useState<string>('all');

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

    // Get unique grades and subjects for filters
    const uniqueGrades = useMemo(() => {
        const grades = posts.map(post => post.studentGrade).filter(Boolean);
        return ['all', ...Array.from(new Set(grades))];
    }, [posts]);

    const uniqueSubjects = useMemo(() => {
        const subjects = posts.map(post => post.subject).filter(Boolean);
        return ['all', ...Array.from(new Set(subjects))];
    }, [posts]);

    // Filter posts based on selected grade and subject
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const gradeMatch = selectedGrade === 'all' || post.studentGrade === selectedGrade;
            const subjectMatch = selectedSubject === 'all' || post.subject === selectedSubject;
            return gradeMatch && subjectMatch;
        });
    }, [posts, selectedGrade, selectedSubject]);

    const handleResetFilters = () => {
        setSelectedGrade('all');
        setSelectedSubject('all');
    };

    const renderPostCard = (post: Post) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={post.postId}>
            <Card
                hoverable
                className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-xl overflow-hidden"
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <Title level={5} className="mb-0 text-base leading-tight text-gray-800 font-semibold">
                            {post.title}
                        </Title>
                        <Tag color={post.postId === 1 ? 'green' : post.postId === 2 ? 'blue' : 'default'} className="rounded-full">
                            <ClockCircleOutlined className="text-sm" /> {getTimeAgo(post.postId)}
                        </Tag>
                    </div>

                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                            <Tag color="blue" className="text-sm rounded-full bg-blue-100 text-blue-800 border-blue-200">{post.subject}</Tag>
                            <Tag color="cyan" className="text-sm rounded-full bg-cyan-100 text-cyan-800 border-cyan-200">{post.studentGrade}</Tag>
                            <Tag color="orange" className="text-sm rounded-full bg-orange-100 text-orange-800 border-orange-200">{post.sessionsPerWeek} buổi/tuần</Tag>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <ClockCircleOutlined className="text-gray-500 text-sm" />
                                <Text className="text-sm text-gray-700">
                                    {post.preferredDays} - {post.preferredTime}
                                </Text>
                            </div>

                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 rounded-lg border border-green-200">
                                <DollarOutlined className="text-green-600 text-base" />
                                <Text className="text-base font-semibold text-green-700">
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
            </Card>
        </Col>
    );

    return (
        <div className="p-6">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-2xl p-6 mb-6 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Bài đăng phụ huynh</h1>
                        <p className="text-blue-100 text-sm">Xem các bài đăng tìm gia sư từ phụ huynh</p>
                    </div>
                    <Button
                        onClick={handleRefresh}
                        type="default"
                        icon={<ReloadOutlined />}
                        size="large"
                        className="bg-white hover:bg-gray-50 border-0 shadow-md"
                    >
                        Làm mới
                    </Button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            🎓 Lọc theo lớp:
                        </label>
                        <Select
                            value={selectedGrade}
                            onChange={setSelectedGrade}
                            style={{ width: '100%' }}
                            size="large"
                        >
                            <Option value="all">Tất cả</Option>
                            {uniqueGrades.filter(grade => grade !== 'all').map(grade => (
                                <Option key={grade} value={grade}>{grade}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            📚 Lọc theo môn:
                        </label>
                        <Select
                            value={selectedSubject}
                            onChange={setSelectedSubject}
                            style={{ width: '100%' }}
                            size="large"
                        >
                            <Option value="all">Tất cả</Option>
                            {uniqueSubjects.filter(subject => subject !== 'all').map(subject => (
                                <Option key={subject} value={subject}>{subject}</Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Button onClick={handleResetFilters} size="large" className="bg-white hover:bg-gray-50 border-0 shadow-md">
                            Đặt lại
                        </Button>
                    </div>
                </div>
                <div className="mt-3 text-sm text-gray-700">
                    Hiển thị {filteredPosts.length} / {posts.length} bài đăng
                </div>
            </div>

            {filteredPosts.length === 0 ? (
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
                    {filteredPosts.map(renderPostCard)}
                </Row>
            )}
        </div>
    );
};

export default PostsContent;
