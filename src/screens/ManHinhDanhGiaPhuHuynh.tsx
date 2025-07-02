import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TutorReviewLayout from '../components/TutorReviewLayout'

const TAGS = [
    'Thái độ hợp tác',
    'Đúng giờ',
    'Học viên ngoan',
    'Hỗ trợ tốt',
    'Môi trường học tốt',
    'Thanh toán đúng hẹn'
]

const RATING_TEXTS: { [key: number]: string } = {
    0: 'Chọn số sao của bạn',
    1: 'Rất tệ',
    2: 'Tệ',
    3: 'Trung bình',
    4: 'Tốt',
    5: 'Tuyệt vời!'
}

const ManHinhDanhGiaPhuHuynh: React.FC = () => {
    const navigate = useNavigate()
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const handleStarClick = (value: number) => {
        setRating(value)
    }

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    const handleSubmit = () => {
        alert('Cảm ơn bạn đã gửi đánh giá!')
        navigate('/trangchu')
    }

    const handleSkip = () => {
        navigate('/trangchu')
    }

    return (
        <TutorReviewLayout>
            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Đánh giá Phụ huynh Trần Thị B</h2>
                <p className="text-gray-600 text-lg">
                    Hãy chia sẻ trải nghiệm của bạn để giúp cộng đồng tốt hơn.
                </p>
            </div>
            {/* Parent Info Section */}
            <div className="flex flex-col items-center mb-8">
                <img
                    src="https://placehold.co/120x120/FF7F50/FFFFFF?text=PH"
                    alt="Avatar Phụ huynh"
                    className="w-28 h-28 rounded-full border-4 border-orange-300 mb-4 shadow-lg object-cover"
                />
                <div className="text-2xl font-semibold text-gray-800">Phụ huynh Trần Thị B</div>
            </div>
            {/* Rating Section */}
            <div className="mb-8 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Mức độ hài lòng của bạn về Phụ huynh Trần Thị B?</h3>
                <div className="flex justify-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                        <svg
                            key={star}
                            className={`w-10 h-10 cursor-pointer transition-transform transform ${star <= rating ? 'text-yellow-400 scale-110' : 'text-gray-300'} hover:scale-110`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            onClick={() => handleStarClick(star)}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <div className="text-gray-500 font-medium">{RATING_TEXTS[rating]}</div>
            </div>

            {/* Comment Section */}
            <div className="mb-10">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Chia sẻ trải nghiệm của bạn</h3>
                <textarea
                    id="comment"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200 ease-in-out resize-y min-h-[100px] text-gray-800 placeholder-gray-400"
                    placeholder="Hãy viết bình luận của bạn về Phụ huynh Trần Thị B (Không bắt buộc)..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
            </div>
            {/* Tag Section */}
            <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-700 mb-4">Bạn ấn tượng với điều gì?</h3>
                <div className="flex flex-wrap gap-3">
                    {TAGS.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={`px-5 py-2 rounded-full text-lg font-medium transition-all duration-200 ease-in-out
                                    ${selectedTags.includes(tag)
                                    ? 'bg-orange-500 text-white shadow-md scale-105'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'}
                                `}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                    type="button"
                    className="flex-1 px-8 py-4 bg-gray-300 text-gray-800 font-semibold rounded-xl hover:bg-gray-400 transition duration-200 ease-in-out shadow-md"
                    onClick={handleSkip}
                >
                    Bỏ qua
                </button>
                <button
                    type="button"
                    className="flex-1 px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition duration-200 ease-in-out shadow-lg transform hover:scale-105"
                    onClick={handleSubmit}
                >
                    Gửi đánh giá
                </button>
            </div>
        </TutorReviewLayout>
    )
}

export default ManHinhDanhGiaPhuHuynh