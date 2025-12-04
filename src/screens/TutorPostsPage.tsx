import React, { useEffect, useState, useMemo } from 'react';
import { fetchTutorPosts, useTutorPosts } from '../store/tutorPosts';
import { Button, Tag, Typography, Card, Row, Col, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const TutorPostsPage: React.FC = () => {
    const { posts } = useTutorPosts();
    const [selectedGrade, setSelectedGrade] = useState<string>('all');
    const [selectedSubject, setSelectedSubject] = useState<string>('all');
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

    // Get unique grades and subjects for filters
    const uniqueGrades = useMemo(() => {
        const allGrades = posts
            .map(post => post.studentGrade)
            .filter(Boolean)
            .flatMap(grade => grade.split(',').map(g => g.trim()))
            .filter(Boolean);

        const uniqueSet = Array.from(new Set(allGrades));

        // Sort grades logically
        const sortedGrades = uniqueSet.sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || '0');
            const numB = parseInt(b.match(/\d+/)?.[0] || '0');
            return numA - numB;
        });

        return ['all', ...sortedGrades];
    }, [posts]);

    const uniqueSubjects = useMemo(() => {
        const subjects = posts.map(post => post.subject).filter(Boolean);
        return ['all', ...Array.from(new Set(subjects))];
    }, [posts]);

    // Filter posts based on selected grade and subject
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const gradeMatch = selectedGrade === 'all' ||
                post.studentGrade?.split(',').map(g => g.trim()).includes(selectedGrade);
            const subjectMatch = selectedSubject === 'all' || post.subject === selectedSubject;
            return gradeMatch && subjectMatch;
        });
    }, [posts, selectedGrade, selectedSubject]);

    const handleResetFilters = () => {
        setSelectedGrade('all');
        setSelectedSubject('all');
    };





    // Removed columns for card layout

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
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

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
                            <Button onClick={handleResetFilters} size="large">
                                Đặt lại
                            </Button>
                        </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                        Hiển thị {filteredPosts.length} / {posts.length} bài đăng
                    </div>
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">📝</span>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài đăng nào</h3>
                        <p className="text-gray-600">Hiện tại chưa có gia sư nào đăng bài tìm học sinh.</p>
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {filteredPosts.map((post) => (
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
