import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// The original code used Ant Design components (Menu, Dropdown, Tooltip) and react-router-dom (NavLink).
// Since this must be a single, runnable file without external dependencies, 
// we emulate the functionality using standard React, Tailwind CSS, and inline SVGs for icons.

// --- Icon Definitions (Lucide-style Inline SVG) ---

const BellIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.375 21a2 2 0 0 0 3.25 0" /></svg>
);

const MessageIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);

const UserPlusIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
);

const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);

const PlusIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
);


const Header = () => {
    // State to manage the user profile dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

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

    // Mock Tooltip component (using title attribute as a simple replacement)
    const Tooltip = ({ title, children }) => (
        <span title={title}>
            {children}
        </span>
    );

    // Dropdown Menu items (Content from Ant Design Menu)
    const menuItems = [
        { key: "myPosts", title: "Bài đăng của tôi", to: "/my-posts" },

        { key: "tutorPosts", title: "Bài đăng của gia sư", to: "/tutor-posts" },
        { key: "login", title: "Đăng nhập", to: "/login" },
        { key: "profile", title: "Trang cá nhân", to: "/trang-canhan" },
        { key: "wallet", title: "Ví của tôi", to: "/wallet" },
        { key: "bankAccount", title: "Tài khoản ngân hàng", to: "/bank-account" },
        { key: "logout", title: "Đăng xuất", action: "logout" },
    ];

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
                        <NavLink to="/" className="text-blue-900 font-bold text-3xl tracking-wide hover:text-blue-900 transition-colors">
                            Sutido
                        </NavLink>
                    </div>

                    {/* Search Bar (Center, Hidden on Mobile, max width on desktop) */}
                    <div className="flex-grow max-w-lg mx-4 hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm gia sư, môn học, khu vực..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition-all text-sm shadow-inner"
                            />
                            {/* Search Icon inside the input field */}
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Action Icons and Profile (Right) */}
                    <div className="flex items-center space-x-3 sm:space-x-4">

                        {/* Notification Icon */}
                        <Tooltip title="Thông báo">
                            <NavLink
                                to="/thongbao"
                                className="p-2 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-200 relative"
                            >
                                <BellIcon className="w-6 h-6 " />
                                {/* Mock Notification Badge */}
                                {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span> */}
                            </NavLink>
                        </Tooltip>

                        {/* Message Icon */}
                        <Tooltip title="Tin nhắn">
                            <NavLink
                                to="/tinnhan"
                                className="p-2 rounded-full text-gray-600 hover:text-blue-600  transition-colors duration-200 relative"
                            >
                                <MessageIcon className="w-6 h-6" />
                            </NavLink>
                        </Tooltip>

                        {/* Register Tutor Icon */}
                        <Tooltip title="Đăng ký làm gia sư">
                            <NavLink
                                to="/dangky-lamgiasu"
                                className="p-2 rounded-full text-gray-600 hover:text-blue-600    transition-colors duration-200 relative"
                            >
                                <UserPlusIcon className="w-6 h-6" />
                            </NavLink>
                        </Tooltip>

                        {/* Create Post Icon */}
                        <Tooltip title="Đăng bài tìm gia sư">
                            <NavLink
                                to="/tao-bai-dang-tim-gia-su"
                                className="p-2 rounded-full text-gray-600 hover:text-green-600 transition-colors duration-200 relative"
                            >
                                <PlusIcon className="w-6 h-6" />
                            </NavLink>
                        </Tooltip>

                        {/* Profile Dropdown (Emulating Ant Design Dropdown/Menu) */}
                        <div className="relative">
                            <Tooltip title="Menu tài khoản">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center focus:outline-none p-0.5 rounded-full ring-2 ring-transparent hover:ring-blue-400 transition-all"
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
                            </Tooltip>

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
