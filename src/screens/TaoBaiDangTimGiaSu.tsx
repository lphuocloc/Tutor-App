import React, { useState } from "react";
import Header from "../components/Header";
import { message } from "antd";

const subjects = [
    { value: "", label: "Chọn môn học" },
    { value: "math", label: "Toán" },
    { value: "literature", label: "Văn" },
    { value: "english", label: "Tiếng Anh" },
    { value: "physics", label: "Vật lý" },
    { value: "chemistry", label: "Hóa học" },
    { value: "biology", label: "Sinh học" },
    { value: "history", label: "Lịch sử" },
    { value: "geography", label: "Địa lý" },
    { value: "informatics", label: "Tin học" },
];

const grades = [
    { value: "", label: "Chọn lớp" },
    { value: "1", label: "Lớp 1" },
    { value: "2", label: "Lớp 2" },
    { value: "3", label: "Lớp 3" },
    { value: "4", label: "Lớp 4" },
    { value: "5", label: "Lớp 5" },
    { value: "6", label: "Lớp 6" },
    { value: "7", label: "Lớp 7" },
    { value: "8", label: "Lớp 8" },
    { value: "9", label: "Lớp 9" },
    { value: "10", label: "Lớp 10" },
    { value: "11", label: "Lớp 11" },
    { value: "12", label: "Lớp 12" },
    { value: "other", label: "Khác (Luyện thi, Giao tiếp...)" },
];

export default function TaoBaiDangTimGiaSu() {
    const [messageApi, contextHolder] = message.useMessage();
    const [form, setForm] = useState({
        postTitle: "",
        subject: "",
        grade: "",
        sessionsPerWeek: "",
        preferredTime: "",
        salaryPerSession: "",
        area: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        messageApi.success("Đăng bài thành công!");
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-inter">
            {contextHolder}
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto p-6 mt-20 sm:mt-24 w-full">
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
                                    placeholder="Ví dụ: Tối Thứ 2, 4, 6 (19:00 - 21:00)"
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
                                <label htmlFor="area" className="block text-gray-700 text-sm font-medium mb-1">
                                    Khu vực dạy <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="area"
                                    value={form.area}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Quận 3, TP.HCM"
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
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg mt-8"
                        >
                            Đăng bài tìm gia sư
                        </button>
                    </form>
                </div>
            </main>

            {/* Footer */}
        </div>
    );
}
