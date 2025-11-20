import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { tutorAPI } from '../api/endpoints'

type EducationLevel =
    | 'HighSchoolGraduate'
    | 'CollegeStudent'
    | 'UniversityStudent'
    | 'CollegeGraduate'
    | 'UniversityGraduate'
    | 'Postgraduate'

interface CertificationItem {
    doc: string
    note: string
    file: File | null
}

const DangKyLamGiaSu: React.FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        education: '' as EducationLevel | '',
        experienceYears: '',
        description: ''
    })

    const [certifications, setCertifications] = useState<CertificationItem[]>([
        { doc: '', note: '', file: null }
    ])

    // const educationOptions = [
    //     { value: 'HighSchoolGraduate', label: 'Tốt nghiệp THPT' },
    //     { value: 'CollegeStudent', label: 'Sinh viên Cao đẳng' },
    //     { value: 'UniversityStudent', label: 'Sinh viên Đại học' },
    //     { value: 'CollegeGraduate', label: 'Tốt nghiệp Cao đẳng' },
    //     { value: 'UniversityGraduate', label: 'Tốt nghiệp Đại học' },
    //     { value: 'Postgraduate', label: 'Sau đại học' }
    // ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddCertification = () => {
        setCertifications(prev => [...prev, { doc: '', note: '', file: null }])
    }

    const handleRemoveCertification = (index: number) => {
        if (certifications.length > 1) {
            setCertifications(prev => prev.filter((_, i) => i !== index))
        }
    }

    const handleCertificationChange = (index: number, field: keyof CertificationItem, value: string) => {
        setCertifications(prev => {
            const updated = [...prev]
            updated[index] = { ...updated[index], [field]: value }
            return updated
        })
    }

    const handleFileChange = (index: number, file: File | null) => {
        setCertifications(prev => {
            const updated = [...prev]
            updated[index] = { ...updated[index], file }
            return updated
        })
    }

    const validateForm = (): string | null => {
        if (!formData.education) {
            return 'Vui lòng chọn trình độ học vấn'
        }
        if (!formData.experienceYears || parseInt(formData.experienceYears) < 0) {
            return 'Vui lòng nhập số năm kinh nghiệm hợp lệ'
        }

        // Kiểm tra certifications
        for (let i = 0; i < certifications.length; i++) {
            const cert = certifications[i]
            if (!cert.doc || !cert.note || !cert.file) {
                return `Chứng chỉ ${i + 1}: Vui lòng điền đầy đủ thông tin và upload file`
            }
        }

        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        // Validate
        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            return
        }

        // Kiểm tra userId trước khi submit
        const userId = localStorage.getItem('userId')
        console.log('userId from localStorage:', userId)

        if (!userId) {
            message.error('Vui lòng đăng nhập để đăng ký làm gia sư')
            setTimeout(() => {
                navigate('/login')
            }, 1500)
            return
        }

        try {
            setLoading(true)

            // Tạo FormData
            const submitData = new FormData()
            submitData.append('UserId', userId)
            submitData.append('Education', formData.education)
            submitData.append('ExperienceYears', formData.experienceYears)

            if (formData.description) {
                submitData.append('Description', formData.description)
            }

            // Append arrays
            certifications.forEach(cert => {
                submitData.append('Docs', cert.doc)
                submitData.append('Notes', cert.note)
                if (cert.file) {
                    submitData.append('Files', cert.file)
                }
            })

            // Gọi API
            const response = await tutorAPI.registerProfile(submitData)

            console.log('Đăng ký thành công:', response.data)

            // Hiển thị thông báo thành công
            message.success('Đăng ký làm gia sư thành công!', 2)
            setSuccess(true)

            // Chuyển hướng sau 2 giây
            setTimeout(() => {
                navigate('/trangchu')
            }, 2000)

        } catch (err: unknown) {
            console.error('Lỗi đăng ký:', err)
            let errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.'

            if (err && typeof err === 'object' && 'response' in err) {
                const response = (err as { response?: { data?: { message?: string }; status?: number } }).response
                if (response?.status === 400) {
                    errorMessage = response.data?.message || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.'
                } else if (response?.status === 401) {
                    errorMessage = 'Bạn cần đăng nhập để thực hiện chức năng này.'
                } else {
                    errorMessage = response?.data?.message || errorMessage
                }
            }

            message.error(errorMessage)
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-center text-blue-600 mb-1">
                        Đăng Ký Làm Gia Sư
                    </h1>
                    <p className="text-center text-gray-600 mb-4 text-sm">
                        Điền thông tin để trở thành gia sư của chúng tôi
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                            Đăng ký thành công! Đang chuyển hướng...
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Trình độ học vấn */}
                        <div>
                            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                                Trình độ học vấn <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="education"
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">-- Chọn trình độ --</option>
                                <option value="HighSchoolGraduate">Tốt nghiệp THPT</option>
                                <option value="CollegeStudent">Sinh viên Cao đẳng</option>
                                <option value="UniversityStudent">Sinh viên Đại học</option>
                                <option value="CollegeGraduate">Tốt nghiệp Cao đẳng</option>
                                <option value="UniversityGraduate">Tốt nghiệp Đại học</option>
                                <option value="Postgraduate">Sau đại học</option>
                            </select>
                        </div>

                        {/* Số năm kinh nghiệm */}
                        <div>
                            <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">
                                Số năm kinh nghiệm <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="experienceYears"
                                name="experienceYears"
                                value={formData.experienceYears}
                                onChange={handleInputChange}
                                min="0"
                                required
                                placeholder="VD: 3"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Mô tả */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Mô tả về bản thân
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Giới thiệu về kinh nghiệm, phương pháp giảng dạy, thành tích..."
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Chứng chỉ/Bằng cấp */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Chứng chỉ/Bằng cấp <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={handleAddCertification}
                                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                                >
                                    + Thêm chứng chỉ
                                </button>
                            </div>

                            <div className="space-y-3">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-medium text-gray-700 text-sm">Chứng chỉ {index + 1}</h3>
                                            {certifications.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCertification(index)}
                                                    className="text-red-500 hover:text-red-700 text-xs"
                                                >
                                                    Xóa
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">
                                                    Tên chứng chỉ <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.doc}
                                                    onChange={(e) => handleCertificationChange(index, 'doc', e.target.value)}
                                                    placeholder="VD: Bằng Cử nhân Toán học"
                                                    required
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">
                                                    Ghi chú <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.note}
                                                    onChange={(e) => handleCertificationChange(index, 'note', e.target.value)}
                                                    placeholder="VD: Tốt nghiệp loại Giỏi, năm 2020"
                                                    required
                                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">
                                                    File đính kèm <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                                    required
                                                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {cert.file ? `Đã chọn: ${cert.file.name}` : 'PDF, JPG, PNG'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nút submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-lg font-medium transition ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {loading ? 'Đang xử lý...' : 'Đăng ký'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DangKyLamGiaSu 