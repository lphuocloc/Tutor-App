import { Routes, Route, Navigate } from 'react-router-dom'

// Import các màn hình
import Login from './screens/Login'
import TrangChu from './screens/TrangChu'
import DangKyLamGiaSu from './screens/DangKyLamGiaSu'
import BaiDangGiaSuCuThe from './screens/BaiDangGiaSuCuThe'
import XacNhanDatCoc from './screens/XacNhanDatCoc'
import PhongChat from './screens/PhongChat'
import DieuKhoanVaThongTinLop from './screens/DieuKhoanVaThongTinLop'
import XacNhanGiaoDich from './screens/XacNhanGiaoDich'
import TrangLichGiaSu from './screens/TrangLichGiaSu'
import ManHinhTrackingGiaSuDetail from './screens/ManHinhTrackingGiaSuDetail'
import ManHinhDangGiaGiaSu from './screens/ManHinhDangGiaGiaSu'
import ManHinhDanhGiaPhuHuynh from './screens/ManHinhDanhGiaPhuHuynh'
import XacThuc1 from './screens/XacThuc1'
import XacThuc2 from './screens/XacThuc2'
import ManHinhTrackingPhuHuynhDetail from './screens/ManHinhTrackingPhuHuynhDetail'
import ChiTietLopHoc from './screens/ChiTietLopHoc'
import TaoBaiDangTimGiaSu from './screens/TaoBaiDangTimGiaSu'

import Header from './components/Header'
import Footer from './components/Footer'
import XacNhanDatCocGiaSu from './screens/XacNhanDatCocGiaSu'
import ChoTaiLieu from './screens/ChoTaiLieu'
import DangTaiLieu from './screens/DangTaiLieu'
import TrangCaNhan from './screens/TrangCaNhan'
import DoiDiemThuong from './screens/DoiDiemThuong'

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
      <Route path="/" element={<Navigate to="/trangchu" replace />} />

      {/* Các route không cần layout */}
      <Route path="/login" element={<Login />} />

      {/* Các route có layout */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/xacthuc1" element={<XacThuc1 />} />
              <Route path="/xacthuc2" element={<XacThuc2 />} />
              <Route path="/trangchu" element={<TrangChu />} />
              <Route path="/dangky-lamgiasu" element={<DangKyLamGiaSu />} />
              <Route path="/baidang-giasu-cuthe" element={<BaiDangGiaSuCuThe />} />
              <Route path="/xacnhan-datcoc" element={<XacNhanDatCoc />} />
              <Route path="/xacnhan-datcoc-giasu" element={<XacNhanDatCocGiaSu />} />
              <Route path="/phongchat" element={<PhongChat />} />
              <Route path="/dieukhoan-thongtinlop" element={<DieuKhoanVaThongTinLop />} />
              <Route path="/xacnhan-giaodich" element={<XacNhanGiaoDich />} />
              <Route path="/lich-giasu" element={<TrangLichGiaSu />} />
              <Route path="/tracking-giasu-detail" element={<ManHinhTrackingGiaSuDetail />} />
              <Route path="/tracking-phuhuynh-detail" element={<ManHinhTrackingPhuHuynhDetail />} />
              <Route path="/danhgia-giasu" element={<ManHinhDangGiaGiaSu />} />
              <Route path="/danhgia-phuhuynh" element={<ManHinhDanhGiaPhuHuynh />} />
              <Route path="/chitiet-lophoc" element={<ChiTietLopHoc />} />
              <Route path="/tao-baidang-timgiasu" element={<TaoBaiDangTimGiaSu />} />
              <Route path="/cho-tailieu" element={<ChoTaiLieu />} />
              <Route path="/dang-tailieu" element={<DangTaiLieu />} />
              <Route path="/trang-canhan" element={<TrangCaNhan />} />
              <Route path="/doi-diem-thuong" element={<DoiDiemThuong />} />

            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
