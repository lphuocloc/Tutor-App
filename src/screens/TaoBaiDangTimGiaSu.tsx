/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { classAPI } from "../api/endpoints";

const subjects = [
    { value: "", label: "Chọn môn học" },
    { value: "Toán", label: "Toán" },
    { value: "Văn", label: "Văn" },
    { value: "Tiếng Anh", label: "Tiếng Anh" },
    { value: "Vật lý", label: "Vật lý" },
    { value: "Hóa học", label: "Hóa học" },
    { value: "Sinh học", label: "Sinh học" },
    { value: "Lịch sử", label: "Lịch sử" },
    { value: "Địa lý", label: "Địa lý" },
    { value: "Tin học", label: "Tin học" },
];

const grades = [
    { value: "", label: "Chọn lớp" },
    { value: "Lớp 1", label: "Lớp 1" },
    { value: "Lớp 2", label: "Lớp 2" },
    { value: "Lớp 3", label: "Lớp 3" },
    { value: "Lớp 4", label: "Lớp 4" },
    { value: "Lớp 5", label: "Lớp 5" },
    { value: "Lớp 6", label: "Lớp 6" },
    { value: "Lớp 7", label: "Lớp 7" },
    { value: "Lớp 8", label: "Lớp 8" },
    { value: "Lớp 9", label: "Lớp 9" },
    { value: "Lớp 10", label: "Lớp 10" },
    { value: "Lớp 11", label: "Lớp 11" },
    { value: "Lớp 12", label: "Lớp 12" },
    { value: "Khác", label: "Khác (Luyện thi, Giao tiếp...)" },
];

export default function TaoBaiDangTimGiaSu() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        postTitle: "",
        subject: "",
        grade: "",
        sessionsPerWeek: "",
        preferredDays: "",
        preferredTime: "",
        salaryPerSession: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Lấy userId từ localStorage
        const userId = localStorage.getItem('userId');
        console.log('userId from localStorage:', userId);

        if (!userId) {
            console.log('No userId found, redirecting to login');
            message.error('Vui lòng đăng nhập để tạo bài đăng');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            return;
        }

        try {
            setLoading(true);

            // Chuẩn bị data theo format API
            const postData = {
                creatorUserId: parseInt(userId),
                title: form.postTitle,
                subject: form.subject,
                studentGrade: form.grade,
                sessionsPerWeek: parseInt(form.sessionsPerWeek),
                preferredDays: form.preferredDays,
                preferredTime: form.preferredTime,
                pricePerSession: parseFloat(form.salaryPerSession),
                description: form.description || undefined
            };

            console.log('Sending post data:', postData);

            // Gọi API
            const response = await classAPI.createPost(postData);

            console.log('Post created successfully:', response.data);

            // Hiển thị thông báo thành công
            message.success('Đăng bài tìm gia sư thành công!', 2);

            // Chuyển hướng sau 2 giây
            setTimeout(() => {
                navigate('/trangchu');
            }, 2000);

        } catch (error) {
            console.error('Error creating post:', error);
            const errorMessage = (error as any)?.response?.data?.message || 'Có lỗi xảy ra khi đăng bài. Vui lòng thử lại.';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br pt-5 from-green-50 to-blue-100 flex flex-col font-inter">


            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto p-6 w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Đăng bài tìm gia sư
                    </h1>
                    <p className="text-center text-gray-600 mb-8 leading-relaxed">
                        Vui lòng điền đầy đủ thông tin về lớp học bạn cần gia sư để chúng tôi có thể kết nối bạn với gia sư phù hợp nhất.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Tiêu đề bài đăng */}
                        <div>
                            <label htmlFor="postTitle" className="block text-gray-700 text-sm font-medium mb-1">
                                Tiêu đề bài đăng <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="postTitle"
                                value={form.postTitle}
                                onChange={handleChange}
                                placeholder="Ví dụ: Cần gia sư Toán lớp 9 tại Quận 3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Môn học và Lớp */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-1">
                                    Môn học <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {subjects.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="grade" className="block text-gray-700 text-sm font-medium mb-1">
                                    Lớp <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="grade"
                                    value={form.grade}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {grades.map((g) => (
                                        <option key={g.value} value={g.value}>
                                            {g.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Số buổi học và Thời gian */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="sessionsPerWeek" className="block text-gray-700 text-sm font-medium mb-1">
                                    Số buổi học trong tuần <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="sessionsPerWeek"
                                    value={form.sessionsPerWeek}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: 3"
                                    min={1}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="preferredTime" className="block text-gray-700 text-sm font-medium mb-1">
                                    Thời gian có thể học <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="preferredTime"
                                    value={form.preferredTime}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: (19:00 - 21:00)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mức lương và Khu vực */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="salaryPerSession" className="block text-gray-700 text-sm font-medium mb-1">
                                    Lương mỗi buổi (VNĐ) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="salaryPerSession"
                                    value={form.salaryPerSession}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: 180000"
                                    min={50000}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="preferredDays" className="block text-gray-700 text-sm font-medium mb-1">
                                    Ngày có thể học <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="preferredDays"
                                    value={form.preferredDays}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Thứ 2, Thứ 4, Thứ 6"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mô tả chi tiết */}
                        <div>
                            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">
                                Mô tả chi tiết (Yêu cầu thêm về gia sư, học viên...){" "}
                                <span className="text-gray-500">(Không bắt buộc)</span>
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Mô tả chi tiết về nhu cầu của bạn, ví dụ: ưu tiên gia sư nữ, có kinh nghiệm luyện thi, học viên cần củng cố kiến thức gốc..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg mt-8 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {loading ? 'Đang đăng bài...' : 'Đăng bài tìm gia sư'}
                        </button>
                    </form>
                </div>
            </main>

            {/* Footer */}
        </div>
    );
}
