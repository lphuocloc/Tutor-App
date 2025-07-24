import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Main App component
const ChoTaiLieu = () => {
    // Sample document data. In a real application, this would come from a database.
    // Each document has an id, title, description, author, price (or status), and a type.
    const [documents] = useState([
        {
            id: 'doc1',
            title: 'Tài liệu Luyện thi THPT Quốc gia Môn Toán',
            description: 'Tổng hợp kiến thức và bài tập nâng cao cho kỳ thi THPT Quốc gia môn Toán.',
            author: 'Nguyễn Văn A',
            price: '150.000 VNĐ',
            type: 'PPT',
            isPremium: true, // Example for premium/priority post
            imageUrl: 'https://placehold.co/300x200/F0F8FF/333?text=Toan+THPTQG' // Placeholder image
        },
        {
            id: 'doc2',
            title: 'Bài giảng Vật lý 12 - Chuyên đề Điện xoay chiều',
            description: 'Bài giảng chi tiết, dễ hiểu về chuyên đề Điện xoay chiều, kèm ví dụ minh họa.',
            author: 'Trần Thị B',
            price: 'Miễn phí',
            type: 'PDF',
            isPremium: false,
            imageUrl: 'https://placehold.co/300x200/F0F8FF/333?text=Vat+Ly+12' // Placeholder image
        },
        {
            id: 'doc3',
            title: 'Bộ đề thi thử Tiếng Anh IELTS band 7.0+',
            description: '5 bộ đề thi thử IELTS đầy đủ 4 kỹ năng, có đáp án và giải thích chi tiết.',
            author: 'Lê Văn C',
            price: '200.000 VNĐ',
            type: 'DOCX',
            isPremium: true,
            imageUrl: 'https://placehold.co/300x200/F0F8FF/333?text=IELTS+7.0' // Placeholder image
        },
        {
            id: 'doc4',
            title: 'Sổ tay Ngữ pháp Tiếng Việt cấp 2',
            description: 'Tóm tắt các quy tắc ngữ pháp Tiếng Việt cơ bản và nâng cao cho học sinh cấp 2.',
            author: 'Phạm Thị D',
            price: 'Miễn phí',
            type: 'PDF',
            isPremium: false,
            imageUrl: 'https://placehold.co/300x200/F0F8FF/333?text=Ngu+Phap+TV' // Placeholder image
        },
        {
            id: 'doc5',
            title: 'Giáo trình Hóa học Hữu cơ Đại cương',
            description: 'Tài liệu chuyên sâu dành cho sinh viên đại học chuyên ngành Hóa học.',
            author: 'Hoàng Minh E',
            price: '250.000 VNĐ',
            type: 'PDF',
            isPremium: false,
            imageUrl: 'https://placehold.co/300x200/F0F8FF/333?text=Hoa+Hoc' // Placeholder image
        },
    ]);

    return (
        <div className="min-h-screen pb-10 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800">
            {/* Header Section */}

            {/* Documents Grid */}
            <div className="mx-auto mt-20  w-full">
                <header className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 pt-8 mb-8 text-center  mt-8" >
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-2">
                        Chợ Tài liệu Gia sư
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">
                        Nơi các gia sư chia sẻ và bán tài liệu học tập chất lượng cao.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                        <NavLink to='/dang-tailieu'>Đăng Tài liệu của bạn</NavLink>
                    </button>
                </ header>
            </div>
            <div className="max-w-7xl flex:grow mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                {
                    documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Document Image */}
                            <div className="relative h-48 sm:h-56 overflow-hidden">
                                <img
                                    src={doc.imageUrl}
                                    alt={doc.title}
                                    className="w-full h-full object-cover rounded-t-xl"
                                />
                                {doc.isPremium && (
                                    <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        Ưu tiên
                                    </span>
                                )}
                            </div>

                            {/* Document Details */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-indigo-800 mb-2 leading-tight">
                                    {doc.title}
                                </h2>
                                <p className="text-sm text-gray-600 mb-3 flex-grow">
                                    {doc.description}
                                </p>
                                <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
                                    <span className="font-medium">Tác giả: {doc.author}</span>
                                    <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        {doc.type}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                                    <span className="text-lg font-bold text-green-600">
                                        {doc.price}
                                    </span>
                                    <button className="px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Footer (Optional) */}

        </div >
    );
};

export default ChoTaiLieu;
