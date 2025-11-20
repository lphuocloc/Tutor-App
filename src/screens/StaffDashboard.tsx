/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Button, Space, Modal, Descriptions, Image, Spin, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    useTutorProfiles,
    useLoading,
    getAllTutorProfiles
} from '../store/tutorProfiles';
import type { TutorProfile } from '../types/tutorProfile';
import { tutorAPI } from '../api/endpoints';


const StaffDashboard: React.FC = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Staff';

    const profiles = useTutorProfiles();
    const loading = useLoading();

    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<TutorProfile | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [pendingApprovalId, setPendingApprovalId] = useState<number | null>(null);
    const [reviewConfirmVisible, setReviewConfirmVisible] = useState(false);
    const [pendingReviewStatus, setPendingReviewStatus] = useState<'Approved' | 'Rejected' | 'Suspended' | null>(null);

    useEffect(() => {
        getAllTutorProfiles();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const handleViewDetail = async (tutorProfileId: number) => {
        try {
            setDetailLoading(true);
            setDetailModalVisible(true);
            const response = await tutorAPI.getTutorProfileDetail(tutorProfileId);
            setSelectedProfile(response.data);
            setRejectReason(''); // Reset reason
        } catch (error: any) {
            console.error('Error loading profile detail:', error);
            console.error('Error response:', error?.response);
            message.error('Không thể tải chi tiết hồ sơ');
            setDetailModalVisible(false);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleQuickApprove = (tutorProfileId: number) => {
        console.log('handleQuickApprove called with ID:', tutorProfileId);
        setPendingApprovalId(tutorProfileId);
        setConfirmModalVisible(true);
    };

    const executeQuickApprove = async () => {
        if (!pendingApprovalId) return;

        console.log('Executing quick approve for ID:', pendingApprovalId);
        setConfirmModalVisible(false);

        try {
            const reviewerId = parseInt(localStorage.getItem('userId') || '1');

            const requestData = {
                TutorProfileId: pendingApprovalId,
                ReviewerBy: reviewerId,
                status: 'Approved' as const
            };

            console.log('Sending review request:', requestData);

            const response = await tutorAPI.reviewTutorProfile(requestData);

            console.log('Review response:', response);

            message.success('Phê duyệt hồ sơ thành công');

            // Reload data
            getAllTutorProfiles();
        } catch (error: any) {
            console.error('Error quick approving profile:', error);
            console.error('Error response:', error?.response);
            message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi phê duyệt hồ sơ');
        } finally {
            setPendingApprovalId(null);
        }
    };

    const handleReview = (status: 'Approved' | 'Rejected' | 'Suspended') => {
        console.log('handleReview called with status:', status);
        console.log('selectedProfile:', selectedProfile);
        console.log('rejectReason:', rejectReason);

        if (!selectedProfile) return;

        // Validate reason for Rejected/Suspended
        if ((status === 'Rejected' || status === 'Suspended') && !rejectReason.trim()) {
            console.log('Validation failed: No reason provided');
            message.error('Vui lòng nhập lý do từ chối/đình chỉ');
            return;
        }

        console.log('Validation passed, opening confirm modal');
        setPendingReviewStatus(status);
        setReviewConfirmVisible(true);
    };

    const executeReview = async () => {
        if (!selectedProfile || !pendingReviewStatus) return;

        console.log('Executing review with status:', pendingReviewStatus);
        setReviewConfirmVisible(false);

        try {
            setReviewLoading(true);

            const reviewerId = parseInt(localStorage.getItem('userId') || '1');

            const requestData = {
                TutorProfileId: selectedProfile.tutorProfileId,
                ReviewerBy: reviewerId,
                status: pendingReviewStatus,
                ...(pendingReviewStatus !== 'Approved' && { Reason: rejectReason })
            };

            console.log('Sending review request:', requestData);

            await tutorAPI.reviewTutorProfile(requestData);

            message.success(`${pendingReviewStatus === 'Approved' ? 'Phê duyệt' : pendingReviewStatus === 'Rejected' ? 'Từ chối' : 'Đình chỉ'} hồ sơ thành công`);
            setDetailModalVisible(false);
            setSelectedProfile(null);
            setRejectReason('');
            setPendingReviewStatus(null);

            // Reload data
            getAllTutorProfiles();
        } catch (error: any) {
            console.error('Error reviewing profile:', error);
            console.error('Error response:', error?.response);
            message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi xử lý hồ sơ');
        } finally {
            setReviewLoading(false);
        }
    };

    const eduMap: Record<string, string> = {
        'HighSchoolGraduate': 'Tốt nghiệp THPT',
        'CollegeStudent': 'Sinh viên Cao đẳng',
        'UniversityStudent': 'Sinh viên Đại học',
        'CollegeGraduate': 'Tốt nghiệp Cao đẳng',
        'UniversityGraduate': 'Tốt nghiệp Đại học',
        'Postgraduate': 'Sau Đại học'
    };

    const columns: ColumnsType<TutorProfile> = [
        {
            title: 'ID',
            dataIndex: 'tutorProfileId',
            key: 'tutorProfileId',
            width: 80,
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 100,
        },
        {
            title: 'Trình độ',
            dataIndex: 'education',
            key: 'education',
            width: 150,
            render: (education: string) => eduMap[education] || education,
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experienceYears',
            key: 'experienceYears',
            width: 120,
            render: (years: number) => `${years} năm`,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status: string) => {
                const statusConfig: Record<string, { color: string; text: string }> = {
                    'Pending': { color: 'gold', text: 'Chờ duyệt' },
                    'Approved': { color: 'green', text: 'Đã duyệt' },
                    'Rejected': { color: 'red', text: 'Từ chối' }
                };
                const config = statusConfig[status] || { color: 'default', text: status };
                return <Tag color={config.color}>{config.text}</Tag>;
            }
        },
        {
            title: 'Chứng chỉ',
            key: 'certifications',
            width: 100,
            render: (_, record) => record.certifications.length,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        size="small"
                        onClick={() => handleViewDetail(record.tutorProfileId)}
                    >
                        Xem
                    </Button>
                    {record.status === 'Pending' && (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleQuickApprove(record.tutorProfileId)}
                        >
                            Duyệt
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>
                            <p className="text-gray-600 mt-2">Chào mừng, {userName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>

                {/* Tutor Profiles Table */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách hồ sơ gia sư</h2>
                    <Table
                        columns={columns}
                        dataSource={profiles}
                        loading={loading}
                        rowKey="tutorProfileId"
                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Tổng ${total} hồ sơ`,
                            showSizeChanger: true,
                        }}
                        scroll={{ x: 1200 }}
                    />
                </div>

                {/* Detail Modal */}
                <Modal
                    title="Chi tiết hồ sơ gia sư"
                    open={detailModalVisible}
                    onCancel={() => setDetailModalVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setDetailModalVisible(false)}>
                            Đóng
                        </Button>,
                        ...(selectedProfile?.status === 'Pending' ? [
                            <Button
                                key="approve"
                                type="primary"
                                loading={reviewLoading}
                                onClick={() => handleReview('Approved')}
                            >
                                Phê duyệt
                            </Button>,
                            <Button
                                key="reject"
                                danger
                                loading={reviewLoading}
                                onClick={() => handleReview('Rejected')}
                            >
                                Từ chối
                            </Button>,
                            <Button
                                key="suspend"
                                danger
                                type="default"
                                loading={reviewLoading}
                                onClick={() => handleReview('Suspended')}
                            >
                                Đình chỉ
                            </Button>
                        ] : [])
                    ]}
                    width={800}
                >
                    {detailLoading ? (
                        <div className="text-center py-8">
                            <Spin size="large" />
                        </div>
                    ) : selectedProfile ? (
                        <div className="space-y-6">
                            <Descriptions bordered column={2}>
                                <Descriptions.Item label="ID">{selectedProfile.tutorProfileId}</Descriptions.Item>
                                <Descriptions.Item label="User ID">{selectedProfile.userId}</Descriptions.Item>
                                <Descriptions.Item label="Trình độ" span={2}>
                                    {eduMap[selectedProfile.education] || selectedProfile.education}
                                </Descriptions.Item>
                                <Descriptions.Item label="Kinh nghiệm">
                                    {selectedProfile.experienceYears} năm
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">
                                    <Tag color={
                                        selectedProfile.status === 'Approved' ? 'green' :
                                            selectedProfile.status === 'Rejected' ? 'red' : 'gold'
                                    }>
                                        {selectedProfile.status === 'Approved' ? 'Đã duyệt' :
                                            selectedProfile.status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt'}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày tạo" span={2}>
                                    {new Date(selectedProfile.createdAt).toLocaleString('vi-VN')}
                                </Descriptions.Item>
                                <Descriptions.Item label="Mô tả" span={2}>
                                    {selectedProfile.description || 'Không có mô tả'}
                                </Descriptions.Item>
                            </Descriptions>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Chứng chỉ ({selectedProfile.certifications.length})</h3>
                                <div className="space-y-4">
                                    {selectedProfile.certifications.map((cert) => (
                                        <div key={cert.certificationId} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">{cert.documentType}</p>
                                                    <p className="text-sm text-gray-600 mt-1">{cert.note}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Ngày nộp: {new Date(cert.submittedAt).toLocaleString('vi-VN')}
                                                    </p>
                                                </div>
                                                <Tag color={
                                                    cert.status === 'Approved' ? 'green' :
                                                        cert.status === 'Rejected' ? 'red' : 'gold'
                                                }>
                                                    {cert.status === 'Approved' ? 'Đã duyệt' :
                                                        cert.status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt'}
                                                </Tag>
                                            </div>
                                            <div className="mt-3">
                                                <Image
                                                    src={cert.fileUrl}
                                                    alt={cert.documentType}
                                                    width={200}
                                                    className="rounded"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedProfile.status === 'Pending' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Lý do từ chối/đình chỉ (bắt buộc khi từ chối hoặc đình chỉ)
                                    </label>
                                    <Input.TextArea
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Nhập lý do từ chối hoặc đình chỉ..."
                                        rows={4}
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </div>
                    ) : null}
                </Modal>

                {/* Quick Approve Confirmation Modal */}
                <Modal
                    title="Xác nhận phê duyệt nhanh"
                    open={confirmModalVisible}
                    onOk={executeQuickApprove}
                    onCancel={() => {
                        setConfirmModalVisible(false);
                        setPendingApprovalId(null);
                    }}
                    okText="Xác nhận"
                    cancelText="Hủy"
                >
                    <p>Bạn có chắc chắn muốn phê duyệt hồ sơ này?</p>
                </Modal>

                {/* Review Confirmation Modal */}
                <Modal
                    title={`Xác nhận ${pendingReviewStatus === 'Approved' ? 'phê duyệt' : pendingReviewStatus === 'Rejected' ? 'từ chối' : 'đình chỉ'}`}
                    open={reviewConfirmVisible}
                    onOk={executeReview}
                    onCancel={() => {
                        setReviewConfirmVisible(false);
                        setPendingReviewStatus(null);
                    }}
                    okText="Xác nhận"
                    cancelText="Hủy"
                    confirmLoading={reviewLoading}
                >
                    {pendingReviewStatus === 'Approved' ? (
                        <p>Bạn có chắc chắn muốn phê duyệt hồ sơ này?</p>
                    ) : (
                        <div>
                            <p>Bạn có chắc chắn muốn {pendingReviewStatus === 'Rejected' ? 'từ chối' : 'đình chỉ'} hồ sơ này?</p>
                            <p className="mt-2"><strong>Lý do:</strong> {rejectReason}</p>
                        </div>
                    )}
                </Modal>

            </div>
        </div>
    );
};

export default StaffDashboard;
