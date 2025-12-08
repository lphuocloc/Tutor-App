import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// The original code used Ant Design components (Menu, Dropdown, Tooltip) and react-router-dom (NavLink).
// Since this must be a single, runnable file without external dependencies, 
// we emulate the functionality using standard React, Tailwind CSS, and inline SVGs for icons.

// --- Icon Definitions (Lucide-style Inline SVG) ---


const Header = () => {
    // State to manage the user profile dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Get user role
    const userRole = localStorage.getItem('userRole');

    // Mock NavLink function for a single file setup
    // This component acts as a placeholder for react-router-dom's NavLink
    const NavLink = ({ to, className, children }) => (
        <a
            href={to}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                navigate(to);
            }}
        >
            {children}
        </a>
    );

    // Dropdown Menu items - conditional based on role
    const getMenuItems = () => {
        if (userRole === 'Tutor') {
            return [
                { key: "tutorDashboard", title: "Tutor Dashboard", to: "/tutor/dashboard" },
                { key: "logout", title: "Đăng xuất", action: "logout" },
            ];
        }
        return [
            { key: "myPosts", title: "Bài đăng của tôi", to: "/my-posts" },
            { key: "tutorPosts", title: "Bài đăng của gia sư", to: "/tutor-posts" },
            { key: "booking", title: "Lịch đã đặt", to: "/booking" },
            // { key: "login", title: "Đăng nhập", to: "/login" },
            { key: "profile", title: "Trang cá nhân", to: "/trang-canhan" },
            { key: "wallet", title: "Ví của tôi", to: "/wallet" },
            { key: "bankAccount", title: "Tài khoản ngân hàng", to: "/bank-account" },
            { key: "logout", title: "Đăng xuất", action: "logout" },
        ];
    };

    const menuItems = getMenuItems();

    // Logout function
    const handleLogout = () => {
        // Clear all localStorage data
        localStorage.clear();
        // Close dropdown
        setIsDropdownOpen(false);
        // Navigate to login page
        navigate('/login');
    };


    return (
        <div className=" pt-20 bg-gray-50 font-sans">
            {/* Main Application Header: Fixed position, elevated shadow, border for clean separation */}
            <header className="bg-white py-3 px-4 shadow-xl fixed top-0 left-0 right-0 z-50 border-b border-blue-100">
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    {/* Logo/Brand (Left) */}
                    <div className="flex items-center space-x-2">
                        <NavLink to="/trangchu" className="text-blue-900 font-bold text-3xl tracking-wide hover:text-blue-900 transition-colors">
                            Sutido
                        </NavLink>
                    </div>

                    {/* Search Bar (Center, Hidden on Mobile, max width on desktop) */}


                    {/* Action Icons and Profile (Right) */}
                    <div className="flex items-center space-x-3 sm:space-x-4">



                        {/* Message Text - Hidden for tutors */}
                        {userRole !== 'Tutor' && (
                            <NavLink
                                to="/tinnhan"
                                className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium"
                            >
                                Tin nhắn
                            </NavLink>
                        )}


                        {/* Register Tutor Text - Hidden for tutors */}
                        {userRole !== 'Tutor' && (
                            <NavLink
                                to="/dangky-lamgiasu"
                                className="px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium"
                            >
                                Đăng ký làm gia sư
                            </NavLink>
                        )}

                        {/* Create Post Text - Hidden for tutors */}
                        {userRole !== 'Tutor' && (
                            <NavLink
                                to="/tao-bai-dang-tim-gia-su"
                                className="px-3 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 font-medium"
                            >
                                Đăng bài tìm gia sư
                            </NavLink>
                        )}

                        {/* Profile Dropdown (Emulating Ant Design Dropdown/Menu) */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center focus:outline-none p-0.5 rounded-full ring-2 ring-transparent hover:ring-blue-400 transition-all"
                                title="Menu tài khoản"
                            >
                                {(() => {
                                    const userRole = localStorage.getItem('userRole');
                                    if (userRole === 'Tutor') {
                                        return (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                                Tutor
                                            </div>
                                        );
                                    } else if (userRole === 'Customer') {
                                        return (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                                Parent
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <img
                                                src="https://placehold.co/40x40/4F46E5/FFFFFF?text=AV"
                                                alt="Avatar"
                                                className="w-10 h-10 rounded-full object-cover shadow-md"
                                            />
                                        );
                                    }
                                })()}
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down origin-top-right">
                                    <div className="py-1">
                                        {menuItems.map(item => (
                                            item.action === "logout" ? (
                                                <button
                                                    key={item.key}
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                >
                                                    {item.title}
                                                </button>
                                            ) : (
                                                <div key={item.key} onClick={() => setIsDropdownOpen(false)}>
                                                    <NavLink
                                                        to={item.to!}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                    >
                                                        {item.title}
                                                    </NavLink>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Placeholder content for demonstration */}


            {/* Tailwind Keyframes for Animation */}
            <style>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.2s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Header;
