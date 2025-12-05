/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../api/endpoints'
import { message } from 'antd'

/**
 * Lý do xuất hiện thanh cuộn dọc/ngang khi chuyển sang sign up:
 * - Form đăng ký có nhiều trường hơn form đăng nhập, làm tăng chiều cao của box.
 * - Nếu chiều cao vượt quá viewport hoặc vượt quá max-height của container, sẽ xuất hiện thanh cuộn.
 * - Ngoài ra, việc sử dụng w-screen có thể gây ra overflow ngang nếu cộng thêm margin/padding.
 * 
 * Cách khắc phục:
 * - Sử dụng max-w-full thay vì w-screen để tránh overflow ngang.
 * - Đảm bảo container không vượt quá chiều rộng màn hình.
 * - Cho phép box scroll nội bộ nếu quá cao, hoặc cho phép trang scroll tự nhiên.
 * - Tránh dùng w-screen trên div cha nếu không cần thiết.
 */

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Form states
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        remember: false
    })

    const [signupForm, setSignupForm] = useState({
        fullName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        street: '',
        ward: '',
        district: '',
        city: ''
    })

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            setLoading(true)

            const response = await authAPI.login({
                identifier: loginForm.email,
                password: loginForm.password,
            })

            // Lưu token và role nếu backend trả về
            const data = response.data || {}

            // Debug: Log toàn bộ response để kiểm tra
            console.log('=== LOGIN RESPONSE ===')
            console.log('Full response.data:', data)
            console.log('userId:', data.userId)
            console.log('role:', data.role)
            console.log('userName:', data.userName || data.fullName)
            console.log('=====================')

            if (data.token) {
                localStorage.setItem('accessToken', data.token)
            }
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken)
            }
            if (data.role) {
                localStorage.setItem('userRole', data.role)
            }
            if (data.userId) {
                localStorage.setItem('userId', data.userId.toString())
            }
            if (data.userName || data.fullName) {
                localStorage.setItem('userName', data.userName || data.fullName)
            }
            if (data.email) {
                localStorage.setItem('userEmail', data.email)
            }

            console.log('Đăng nhập thành công:', data)

            // Điều hướng dựa trên role
            const role = data.role
            if (role === 'Admin') {
                navigate('/admin/dashboard')
            } else if (role === 'Staff') {
                navigate('/staff/dashboard')
            } else if (role === 'Tutor' || role === 'Customer') {
                // Tutor và Customer đều chuyển về Trang Chủ
                navigate('/trangchu')
            } else {
                // Role khác hoặc không có role
                navigate('/trangchu')
            }
        } catch (err: unknown) {
            console.error('Lỗi đăng nhập:', err)
            let errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.'
            if (err && typeof err === 'object' && 'response' in err) {
                const response = (err as { response?: { data?: { message?: string } } }).response
                errorMessage = response?.data?.message || errorMessage
            }
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validate password match
        if (signupForm.password !== signupForm.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp')
            return
        }

        try {
            setLoading(true)

            // Format date to ISO string
            const dateOfBirth = signupForm.dateOfBirth
                ? new Date(signupForm.dateOfBirth).toISOString()
                : new Date().toISOString()

            const response = await authAPI.register({
                fullName: signupForm.fullName,
                dateOfBirth: dateOfBirth,
                email: signupForm.email,
                phone: signupForm.phone,
                password: signupForm.password,
                confirmPassword: signupForm.confirmPassword,
                street: signupForm.street,
                ward: signupForm.ward,
                district: signupForm.district,
                city: signupForm.city
            } as any)

            console.log('Đăng ký thành công:', response.data)

            message.success('Đăng ký thành công!')

            // Save email to use in OTP verification
            // localStorage.setItem('pendingEmail', signupForm.email)

            // Navigate to OTP verification
        } catch (err: unknown) {
            console.error('Lỗi đăng ký:', err)
            let errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.'

            if (err && typeof err === 'object' && 'response' in err) {
                const response = (err as { response?: { data?: { message?: string } } }).response
                errorMessage = response?.data?.message || errorMessage
            }

            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setLoginForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setSignupForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    return (
        <>
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-2">
                <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 w-full max-w-lg mx-4 my-10">
                    <h1 className="text-center text-gray-900 mb-6 font-bold text-2xl md:text-3xl">
                        Chào mừng bạn đến với Sutido
                    </h1>

                    {/* Error message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Tab buttons */}
                    <div className="flex justify-center mb-6 gap-3">
                        <button
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${isLoginMode
                                ? 'bg-blue-600 text-white shadow'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                                }`}
                            style={{ minWidth: 120 }}
                            onClick={() => setIsLoginMode(true)}
                            type="button"
                        >
                            Đăng nhập
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${!isLoginMode
                                ? 'bg-blue-600 text-white shadow'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                                }`}
                            style={{ minWidth: 120 }}
                            onClick={() => setIsLoginMode(false)}
                            type="button"
                        >
                            Đăng ký
                        </button>
                    </div>

                    {/* Login Form */}
                    {isLoginMode && (
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="loginEmail" className="block text-gray-700 font-medium mb-1">
                                    Email / Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="loginEmail"
                                    name="email"
                                    value={loginForm.email}
                                    onChange={handleLoginInputChange}
                                    placeholder="Nhập email hoặc số điện thoại"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="loginPassword" className="block text-gray-700 font-medium mb-1">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="loginPassword"
                                    name="password"
                                    value={loginForm.password}
                                    onChange={handleLoginInputChange}
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                            </div>

                            <div className="flex justify-between items-center mb-1">
                                <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        checked={loginForm.remember}
                                        onChange={handleLoginInputChange}
                                        className="rounded border-gray-300 focus:ring-blue-400"
                                    />
                                    Ghi nhớ đăng nhập
                                </label>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 font-semibold rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                            </button>

                            <p className="text-center text-gray-500 text-sm mt-3">
                                Chưa có tài khoản?
                                <button
                                    type="button"
                                    className="ml-1 text-blue-600 hover:underline font-medium bg-transparent p-0"
                                    onClick={() => setIsLoginMode(false)}
                                >
                                    Đăng ký ngay
                                </button>
                            </p>
                        </form>
                    )}

                    {/* Signup Form */}
                    {!isLoginMode && (
                        <form onSubmit={handleSignupSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="signupName" className="block text-gray-700 font-medium mb-1">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupName"
                                    name="fullName"
                                    value={signupForm.fullName}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập họ và tên của bạn"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupDateOfBirth" className="block text-gray-700 font-medium mb-1">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupDateOfBirth"
                                    name="dateOfBirth"
                                    value={signupForm.dateOfBirth}
                                    onChange={handleSignupInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupEmail" className="block text-gray-700 font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupEmail"
                                    name="email"
                                    value={signupForm.email}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập email"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupPhone" className="block text-gray-700 font-medium mb-1">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupPhone"
                                    name="phone"
                                    value={signupForm.phone}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập số điện thoại"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupStreet" className="block text-gray-700 font-medium mb-1">
                                    Đường/Số nhà
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupStreet"
                                    name="street"
                                    value={signupForm.street}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập số nhà, tên đường"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupWard" className="block text-gray-700 font-medium mb-1">
                                    Phường/Xã
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupWard"
                                    name="ward"
                                    value={signupForm.ward}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập phường/xã"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupDistrict" className="block text-gray-700 font-medium mb-1">
                                    Quận/Huyện
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupDistrict"
                                    name="district"
                                    value={signupForm.district}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập quận/huyện"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupCity" className="block text-gray-700 font-medium mb-1">
                                    Thành phố/Tỉnh
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupCity"
                                    name="city"
                                    value={signupForm.city}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập thành phố/tỉnh"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupPassword" className="block text-gray-700 font-medium mb-1">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupPassword"
                                    name="password"
                                    value={signupForm.password}
                                    onChange={handleSignupInputChange}
                                    placeholder="Tạo mật khẩu"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="signupConfirmPassword" className="block text-gray-700 font-medium mb-1">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    id="signupConfirmPassword"
                                    name="confirmPassword"
                                    value={signupForm.confirmPassword}
                                    onChange={handleSignupInputChange}
                                    placeholder="Xác nhận mật khẩu"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 font-semibold rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Đang xử lý...' : 'Đăng ký'}
                            </button>

                            <p className="text-center text-gray-500 text-sm mt-3">
                                Đã có tài khoản?
                                <button
                                    type="button"
                                    className="ml-1 text-blue-600 hover:underline font-medium bg-transparent p-0"
                                    onClick={() => setIsLoginMode(true)}
                                >
                                    Đăng nhập
                                </button>
                            </p>
                        </form>
                    )}

                    {/* Đảm bảo my-5 không bị ghi đè bởi các class khác */}
                    {/* <div className="text-center text-gray-400" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                        Hoặc đăng nhập với
                    </div> */}
                    {/* <div className="flex justify-center gap-3">
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition font-medium"
                            type="button"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                width={20}
                                height={20}
                                className="inline-block"
                            />
                            Google
                        </button>
                        <button
                            className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition font-medium"
                            type="button"
                        >
                            <i className="fab fa-facebook text-blue-600 text-lg"></i> Facebook
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Login