
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 ">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-lg font-semibold mb-2">Ứng dụng Sutido</p>
                <p className="text-sm text-gray-400">© 2025 Tất cả quyền được bảo lưu.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="https://www.facebook.com/profile.php?id=61581495789369" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <i className="fab fa-facebook-f"></i>
                    </a>

                    <a href="https://www.instagram.com/sutido.vn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    )
}
