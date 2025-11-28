import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Typography } from 'antd';
import { EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { fetchPosts, usePosts } from '../store/posts';
import type { Post } from '../types/post';

const PostsContent: React.FC = () => {
    const posts = usePosts()
    const navigate = useNavigate();



    useEffect(() => {
        // Gọi API khi component mount
        console.log('Fetching posts...');
        fetchPosts();
    }, []);

    const handleRefresh = () => {
        fetchPosts();
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
        // Tạm thời dùng logic đơn giản dựa vào postId
        if (postId === 1) return 'Mới';
        if (postId === 2) return '2h trước';
        if (postId === 3) return '1 ngày trước';
        return '2 ngày trước';
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
            title: 'Ngày học',
            dataIndex: 'preferredDays',
            key: 'preferredDays',
            width: '15%',
        },
        {
            title: 'Thời gian',
            dataIndex: 'preferredTime',
            key: 'preferredTime',
            width: '12%',
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
            width: '15%',
        },
        {
            title: 'Thời gian đăng',
            key: 'timeAgo',
            width: '10%',
            render: (_: unknown, record: Post) => (
                <Tag color={record.postId === 1 ? 'green' : record.postId === 2 ? 'blue' : 'default'}>
                    {getTimeAgo(record.postId)}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '12%',
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
                            <p className="text-gray-600">Hiện tại chưa có bài đăng tìm gia sư nào từ phụ huynh.</p>
                        </div>
                    ),
                }}
                scroll={{ x: 1200 }}
                size="middle"
            />
        </div>
    );
};

export default PostsContent;
