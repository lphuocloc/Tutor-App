import { Menu, Dropdown, Tooltip } from "antd";
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div>
            <header className="bg-white py-3 px-4 shadow-md fixed top-0 left-0 right-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    {/* Back Button / Logo */}
                    <div className="flex items-center space-x-2">
                        {/* <button
                                onClick={() => window.history.back()}
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                <i className="fas fa-arrow-left text-lg"></i>
                            </button> */}
                        <NavLink to="/" className="text-blue-600 font-bold text-xl">
                            Sutido App
                        </NavLink>
                    </div>
                    {/* Search Bar (Optional, can be hidden on detail page) */}
                    <div className="flex-grow max-w-md mx-4 hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm gia sư, môn học, khu vực..."
                                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <i className="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        </div>
                    </div>
                    {/* Icons & User Menu */}
                    {/* Sử dụng Tooltip của Ant Design */}
                    {/* Đảm bảo đã import: import { Tooltip } from 'antd'; */}
                    <div className="flex items-center space-x-4">
                        <Tooltip title="Thông báo">
                            <NavLink
                                to="/"
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative"
                            >
                                <i className="fas fa-bell text-lg"></i>
                            </NavLink>
                        </Tooltip>
                        <Tooltip title="Tin nhắn">
                            <NavLink
                                to="/"
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative"
                            >
                                <i className="fas fa-comment-dots text-lg"></i>
                            </NavLink>
                        </Tooltip>
                        {/* Đăng ký làm gia sư */}
                        <Tooltip title="Đăng ký làm gia sư">
                            <NavLink
                                to="/dangky-lamgiasu"
                                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 relative"
                            >
                                <i className="fas fa-user-plus text-lg"></i>
                            </NavLink>
                        </Tooltip>
                        {/* Đăng nhập */}

                        <Dropdown
                            trigger={['hover']}
                            overlay={
                                <Menu>
                                    <Menu.Item key="login">
                                        <NavLink to="/login">Đăng nhập</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="profile">
                                        <NavLink to="/trangca-nhan">Trang cá nhân</NavLink>
                                    </Menu.Item>
                                    <Menu.Item key="schedule">
                                        <NavLink to="/lich-giasu">Lịch học</NavLink>
                                    </Menu.Item>
                                </Menu>
                            }
                            placement="bottomLeft"
                        >
                            <Tooltip title="">
                                <button className="flex items-center space-x-1 focus:outline-none" style={{ background: 'none', border: 'none', padding: 0 }}>
                                    <img
                                        src="https://placehold.co/32x32/FF7F50/FFFFFF?text=AV"
                                        alt="Avatar"
                                        className="w-8 h-8 rounded-full border border-blue-400"
                                    />
                                </button>
                            </Tooltip>
                        </Dropdown>
                    </div>
                </div>
            </header>
        </div>
    )
}
