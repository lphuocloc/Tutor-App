import { Routes, Route, Navigate } from 'react-router-dom'

// Import các màn hình
import Login from './screens/Login'
import TrangChu from './screens/TrangChu'
import DangKyLamGiaSu from './screens/DangKyLamGiaSu'
import BaiDangGiaSuCuThe from './screens/BaiDangGiaSuCuThe'
import PhongChat from './screens/PhongChat'
import ChatRoomsPage from './screens/ChatRoomsPage'
import DieuKhoanVaThongTinLop from './screens/DieuKhoanVaThongTinLop'
import TrangLichGiaSu from './screens/TrangLichGiaSu'
import ManHinhTrackingGiaSuDetail from './screens/ManHinhTrackingGiaSuDetail'
import ManHinhDangGiaGiaSu from './screens/ManHinhDangGiaGiaSu'
import ManHinhDanhGiaPhuHuynh from './screens/ManHinhDanhGiaPhuHuynh'
import ManHinhTrackingPhuHuynhDetail from './screens/ManHinhTrackingPhuHuynhDetail'
import ChiTietLopHoc from './screens/ChiTietLopHoc'
import TaoBaiDangTimGiaSu from './screens/TaoBaiDangTimGiaSu'

// import các màn hình cơ bản
import HomePage from './screens/HomePage'

// Import dashboards theo role
import AdminDashboard from './screens/AdminDashboard'
import StaffDashboard from './screens/StaffDashboard'
import TutorDashboard from './screens/TutorDashboard'
// import CustomerDashboard from './screens/CustomerDashboard'
import TutorPostsPage from './screens/TutorPostsPage'
import PostDetailPage from './screens/PostDetailPage'
import CustomerPostsPage from './screens/CustomerPostsPage'
import PaymentSuccess from './screens/PaymentSuccess'
import PaymentCancel from './screens/PaymentCancel'
import Unauthorized from './screens/Unauthorized'

// Import ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute'

import Header from './components/Header'
import Footer from './components/Footer'
import ChoTaiLieu from './screens/ChoTaiLieu'
import DangTaiLieu from './screens/DangTaiLieu'
import TrangCaNhan from './screens/ProfileDetails'
import DoiDiemThuong from './screens/DoiDiemThuong'
import BankAccountPage from './screens/BankAccountPage'
import WalletPage from './screens/WalletPage'
import WalletTopUpSuccess from './screens/WalletTopUpSuccess'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-inter">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* Route mặc định chuyển đến màn hình đăng nhập */}
      <Route path="/" element={<Navigate to="/home-page" replace />} />

      {/* Các route không cần layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/home-page" element={<HomePage />} />

      {/* Protected Routes - Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Staff */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Staff']}>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Tutor */}
      <Route
        path="/tutor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Tutor']}>
            <TutorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Customer */}


      {/* Các route có layout - Public hoặc Customer */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>

              <Route path="/trangchu" element={<TrangChu />} />
              <Route path="/tutor-posts" element={<TutorPostsPage />} />
              <Route path="/my-posts" element={<CustomerPostsPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/dangky-lamgiasu" element={<DangKyLamGiaSu />} />
              <Route path="/baidang-giasu-cuthe" element={<BaiDangGiaSuCuThe />} />
              <Route path="/phongchat" element={<PhongChat />} />
              <Route path="/tinnhan" element={<ChatRoomsPage />} />
              <Route path="/dieukhoan-thongtinlop" element={<DieuKhoanVaThongTinLop />} />
              <Route path="/lich-giasu" element={<TrangLichGiaSu />} />
              <Route path="/tracking-giasu-detail" element={<ManHinhTrackingGiaSuDetail />} />
              <Route path="/tracking-phuhuynh-detail" element={<ManHinhTrackingPhuHuynhDetail />} />
              <Route path="/danhgia-giasu" element={<ManHinhDangGiaGiaSu />} />
              <Route path="/danhgia-phuhuynh" element={<ManHinhDanhGiaPhuHuynh />} />
              <Route path="/chitiet-lophoc" element={<ChiTietLopHoc />} />
              <Route path="/tao-baidang-timgiasu" element={<TaoBaiDangTimGiaSu />} />
              {/* Alias route with hyphens for links that use dashed path */}
              <Route path="/tao-bai-dang-tim-gia-su" element={<TaoBaiDangTimGiaSu />} />
              <Route path="/cho-tailieu" element={<ChoTaiLieu />} />
              <Route path="/dang-tailieu" element={<DangTaiLieu />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/trang-canhan" element={<TrangCaNhan />} />
              <Route path="/doi-diem-thuong" element={<DoiDiemThuong />} />
              <Route path="/bank-account" element={<BankAccountPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/wallet/topup-success" element={<WalletTopUpSuccess />} />
            </Routes>
          </Layout>

        }
      />

    </Routes>
  )
}

export default App
