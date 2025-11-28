import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/post';
import { message, Modal, Table, Button, Tag, Space, Typography } from 'antd';
import { ReloadOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { classAPI } from '../api/endpoints';

interface MatchingPost {
    postId: number;
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
            render: (text: string, record: Post) => (
                <Button
                    type="link"
                    onClick={() => navigate(`/post/${record.postId}`)}
                    style={{ padding: 0, fontSize: '16px', fontWeight: 'bold' }}
                >
                    {text}
                </Button>
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
            width: '15%',
            render: (_: unknown, record: Post) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => handleFindMatches(record.postId)}
                        loading={loadingMatches && selectedPostId === record.postId}
                        size="small"
                    >
                        Tìm gia sư
                    </Button>
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
                </Space>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
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
                                <p className="text-gray-600">Bạn chưa có bài đăng tìm gia sư nào. Hãy tạo bài đăng mới!</p>
                            </div>
                        ),
                    }}
                    scroll={{ x: 1200 }}
                    size="middle"
                />

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
                                    <div className="grid grid-cols-2 gap-3 text-sm">
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
                            ))}
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default CustomerPostsPage;
