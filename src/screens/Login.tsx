import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [isLoginMode, setIsLoginMode] = useState(true)

    // Form states
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        remember: false
    })

    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    })

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Xử lý đăng nhập
        console.log('Login:', loginForm)
        navigate('/xacthuc1')
    }

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Xử lý đăng ký
        console.log('Signup:', signupForm)
        navigate('/xacthuc1')
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

            <div className="min-h-screen w-screen flex items-center justify-center bg-[#f5f6fa]">
                <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 w-full max-w-lg mx-4 my-10">
                    <h1 className="text-center text-gray-900 mb-6 font-bold text-2xl md:text-3xl">
                        Chào mừng bạn đến với Ứng dụng Gia Sư
                    </h1>

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
                                <a href="#" className="text-blue-600 text-sm hover:underline">
                                    Quên mật khẩu?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 font-semibold rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition text-lg"
                            >
                                Đăng nhập
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
                                    name="name"
                                    value={signupForm.name}
                                    onChange={handleSignupInputChange}
                                    placeholder="Nhập họ và tên của bạn"
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

                            <div className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    id="agreeTerms"
                                    name="agreeTerms"
                                    checked={signupForm.agreeTerms}
                                    onChange={handleSignupInputChange}
                                    className="rounded border-gray-300 focus:ring-blue-400"
                                />
                                <label htmlFor="agreeTerms" className="ml-2 text-gray-600 text-sm">
                                    Tôi đồng ý với{' '}
                                    <a href="#" className="text-blue-600 underline hover:text-blue-700">
                                        Điều khoản dịch vụ
                                    </a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 font-semibold rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition text-lg"
                            >
                                Đăng ký
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
                    <div className="text-center text-gray-400" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                        Hoặc đăng nhập với
                    </div>
                    <div className="flex justify-center gap-3">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login