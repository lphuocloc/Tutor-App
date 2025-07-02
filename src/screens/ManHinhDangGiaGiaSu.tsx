import React, { useState } from 'react';
import TutorReviewLayout from '../components/TutorReviewLayout';

// Layout component for the review page
// function TutorReviewLayout({ children }: { children: React.ReactNode }) {
//     return (
//         <div className="min-h-screen flex items-center justify-center p-4 font-sans transform scale-90 transform-origin-center">
//             <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
//                 {children}
//             </div>
//         </div>
//     );
// }

// Main App component
export default function App() {
    const [rating, setRating] = useState<number>(0); // State to manage the star rating
    const [review, setReview] = useState<string>(''); // State to manage the review text
    const [selectedImpressions, setSelectedImpressions] = useState<string[]>([]); // State to manage selected impressions

    // Array of possible impressions
    const impressions: string[] = [
        'Đúng giờ',
        'Nhiệt tình',
        'Chuyên môn tốt',
        'Dễ hiểu',
        'Kiên nhẫn',
        'Phương pháp hay',
    ];

    // Function to handle star rating click
    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };

    // Function to handle impression tag click
    const handleImpressionClick = (impression: string) => {
        setSelectedImpressions((prevSelected) =>
            prevSelected.includes(impression)
                ? prevSelected.filter((item) => item !== impression)
                : [...prevSelected, impression]
        );
    };

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend
        console.log({
            rating,
            review,
            selectedImpressions,
        });
        alert('Đánh giá của bạn đã được gửi!'); // Use a custom modal in a real app
        // Reset form
        setRating(0);
        setReview('');
        setSelectedImpressions([]);
    };

    return (
        <TutorReviewLayout>
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Đánh giá Gia sư Nguyễn Văn A</h1>
                <p className="text-gray-600 text-lg">
                    Hãy chia sẻ trải nghiệm của bạn để giúp cộng đồng tốt hơn.
                </p>
            </div>

            {/* Tutor Info Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-semibold mb-4 shadow-lg">
                    GS
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Gia sư Nguyễn Văn A</h2>
            </div>

            {/* Rating Section */}
            <div className="mb-8 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Mức độ hài lòng của bạn về Gia sư Nguyễn Văn A?</h3>
                <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className={`w-10 h-10 cursor-pointer transition-transform transform ${index < rating ? 'text-yellow-400 scale-110' : 'text-gray-300'
                                } hover:scale-110`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            onClick={() => handleStarClick(index)}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>

            {/* Review Textarea Section */}
            <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Chia sẻ trải nghiệm của bạn</h3>
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y min-h-[120px] text-gray-800 placeholder-gray-400"
                    placeholder="Hãy viết bình luận của bạn về Gia sư Nguyễn Văn A (Không bắt buộc)..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
            </div>

            {/* Impressions Section */}
            <div className="mb-10">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Bạn ấn tượng với điều gì?</h3>
                <div className="flex flex-wrap gap-3">
                    {impressions.map((impression) => (
                        <button
                            key={impression}
                            className={`px-5 py-2 rounded-full text-lg font-medium transition-all duration-200 ease-in-out
                  ${selectedImpressions.includes(impression)
                                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
                                }`}
                            onClick={() => handleImpressionClick(impression)}
                        >
                            {impression}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                    className="flex-1 px-8 py-4 bg-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-400 transition duration-200 ease-in-out shadow-md"
                    onClick={() => {
                        setRating(0);
                        setReview('');
                        setSelectedImpressions([]);
                        alert('Bạn đã bỏ qua đánh giá.'); // Use a custom modal in a real app
                    }}
                >
                    Bỏ qua
                </button>
                <button
                    className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200 ease-in-out shadow-lg transform hover:scale-105"
                    onClick={handleSubmit}
                >
                    Gửi đánh giá
                </button>
            </div>
        </TutorReviewLayout>
    );
}
