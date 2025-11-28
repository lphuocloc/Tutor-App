import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTutorPosts, useTutorPosts } from '../store/tutorPosts';
import type { Post } from '../types/post';
import { Table, Button, Tag, Typography } from 'antd';
import { ReloadOutlined, EyeOutlined } from '@ant-design/icons';

const TutorPostsPage: React.FC = () => {
    const { posts } = useTutorPosts();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Fetching all tutor posts for customer...');
        fetchTutorPosts();
    }, []);

    const handleRefresh = () => {
        fetchTutorPosts();
    };

    const handleViewDetail = (postId: number) => {
        navigate(`/post/${postId}`);
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

    const getTimeAgoTag = (postId: number) => {
        const time = getTimeAgo(postId);
        if (postId === 1) return <Tag color="green">{time}</Tag>;
        if (postId === 2) return <Tag color="blue">{time}</Tag>;
        return <Tag color="default">{time}</Tag>;
    };

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
            render: (text: string) => (
                <Typography.Text strong style={{ fontSize: '16px' }}>
                    {text}
                </Typography.Text>
            ),
        },
        {
            title: 'Môn học',
            dataIndex: 'subject',
            key: 'subject',
            width: '10%',
            render: (text: string) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Lớp',
            dataIndex: 'studentGrade',
            key: 'studentGrade',
            width: '8%',
            render: (text: string) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: 'Số buổi/tuần',
            dataIndex: 'sessionsPerWeek',
            key: 'sessionsPerWeek',
            width: '12%',
            render: (sessions: number) => `${sessions} buổi`,
        },
        {
            title: 'Thời gian',
            key: 'schedule',
            width: '15%',
            render: (_: unknown, record: Post) => (
                <div>
                    <div>{record.preferredDays}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>{record.preferredTime}</div>
                </div>
            ),
        },
        {
            title: 'Lương/buổi',
            dataIndex: 'pricePerSession',
            key: 'pricePerSession',
            width: '12%',
            render: (price: number) => (
                <Typography.Text style={{ color: '#52c41a', fontWeight: 'bold' }}>
                    {formatCurrency(price)}
                </Typography.Text>
            ),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
            width: '13%',
            render: (location: string) => location || 'Chưa cập nhật',
        },
        {
            title: 'Thời gian đăng',
            key: 'timeAgo',
            width: '10%',
            render: (_: unknown, record: Post) => getTimeAgoTag(record.postId),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '10%',
            render: (_: unknown, record: Post) => (
                <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewDetail(record.postId)}
                    size="small"
                >
                    Xem chi tiết
                </Button>
            ),
        },
    ];

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

                <Table
                    columns={columns}
                    dataSource={posts}
                    rowKey="postId"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} của ${total} bài đăng`,
                    }}
                    locale={{
                        emptyText: (
                            <div className="text-center py-12">
                                <span className="text-6xl mb-4 block">📝</span>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có bài đăng nào</h3>
                                <p className="text-gray-600">Hiện tại chưa có gia sư nào đăng bài tìm học sinh.</p>
                            </div>
                        ),
                    }}
                    scroll={{ x: 1200 }}
                    size="middle"
                />
            </div>
        </div>
    );
};

export default TutorPostsPage;
