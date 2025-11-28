import React, { useEffect, useState } from 'react';
import type { Post } from '../types/post';
import { message, Modal, Table, Button, Tag, Typography } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { classAPI } from '../api/endpoints';

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
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record.postId)}
                    loading={deleting === record.postId}
                    size="small"
                >
                    Xóa
                </Button>
            ),
        },
    ];

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

            <Table
                columns={columns}
                dataSource={posts}
                rowKey="postId"
                loading={loading}
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
                            <p className="text-gray-600">Bạn chưa có bài đăng tìm học sinh nào. Hãy tạo bài đăng mới!</p>
                        </div>
                    ),
                }}
                scroll={{ x: 1200 }}
                size="middle"
            />
        </div>
    );
};

export default TutorPostsContent;
