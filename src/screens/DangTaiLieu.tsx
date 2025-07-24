import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component for the document upload form
// Lưu ý: Các props onGoBack và onDocumentSubmit đã được loại bỏ theo yêu cầu.
// Điều này có nghĩa là component này sẽ không còn trực tiếp thông báo cho component cha
// về việc gửi form hay yêu cầu quay lại trang.
const DangTaiLieu = () => {
    // State variables for form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('PPT'); // Default type for document
    const [imageUrl, setImageUrl] = useState(''); // For external image URLs
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for the selected file object
    const [isPremium, setIsPremium] = useState(false); // State for premium post checkbox

    const navigate = useNavigate()

    // Handler for file input change
    const handleFileChange = (e) => {
        // Get the first file from the selected files (assuming single file selection)
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const newDocument = {
            id: `doc${Date.now()}`, // Generate a simple unique ID using current timestamp
            title,
            description,
            author,
            price,
            type,
            isPremium,
            imageUrl: imageUrl || `https://placehold.co/300x200/F0F8FF/333?text=${type}`,
            fileName: selectedFile ? selectedFile.name : 'Không có tệp đính kèm',
        };

        // Log the new document data to console, as onDocumentSubmit prop is removed
        console.log("Dữ liệu tài liệu mới được tạo (không gửi lên cha):", newDocument);

        // Clear form fields after successful submission
        setTitle('');
        setDescription('');
        setAuthor('');
        setPrice('');
        setType('PPT');
        setImageUrl('');
        setSelectedFile(null); // Clear selected file
        setIsPremium(false);

        // Lưu ý: onGoBack() đã bị loại bỏ. Nút "Quay lại" sẽ không hoạt động như trước.
        // Nếu bạn muốn nút "Quay lại" hoạt động, bạn cần truyền một prop callback từ component cha.
    };

    return (
        <div className="max-w-4xl mx-auto mt-20   bg-white shadow-lg rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Đăng Tài liệu Mới</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title input field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề tài liệu</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                {/* Description textarea */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* Price input field */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Giá (ví dụ: "150.000 VNĐ" hoặc "Miễn phí")</label>
                    <input
                        type="text"
                        id="price"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                {/* Document Type select dropdown */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Loại tài liệu</label>
                    <select
                        id="type"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="PPT">PPT</option>
                        <option value="PDF">PDF</option>
                        <option value="DOCX">DOCX</option>
                        <option value="XLSX">XLSX</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                {/* Image URL input field (for external image links) */}
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL hình ảnh minh họa (tùy chọn)</label>
                    <input
                        type="url"
                        id="imageUrl"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
                {/* File upload input field */}
                <div>
                    <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-1">Chọn tệp tài liệu từ máy tính</label>
                    <input
                        type="file"
                        id="fileUpload"
                        className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0 file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={handleFileChange}
                    />
                    {selectedFile && (
                        <p className="mt-2 text-sm text-gray-600">Đã chọn tệp: <span className="font-medium">{selectedFile.name}</span></p>
                    )}
                </div>
                {/* Premium post checkbox */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isPremium"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                    />
                    <label htmlFor="isPremium" className="ml-2 block text-sm font-medium text-gray-900">Bài đăng ưu tiên</label>
                </div>
                {/* Action buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        // Nút này sẽ không có tác dụng quay lại trang chính nữa vì onGoBack đã bị loại bỏ
                        onClick={() => { navigate('/cho-tailieu') }}
                        className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
                    >
                        Quay lại Chợ Tài liệu
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Đăng Tài liệu
                    </button>
                </div>
            </form >
        </div >
    );
};

export default DangTaiLieu;
