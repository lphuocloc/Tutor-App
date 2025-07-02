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

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route mặc định chuyển đến màn hình đăng nhập */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Các route theo thứ tự màn hình */}
        <Route path="/login" element={<Login />} />
        <Route path="/xacthuc1" element={<XacThuc1 />} />
        <Route path="/xacthuc2" element={<XacThuc2 />} />
        <Route path="/trangchu" element={<TrangChu />} />
        <Route path="/dangky-lamgiasu" element={<DangKyLamGiaSu />} />
        <Route path="/baidang-giasu-cuthe" element={<BaiDangGiaSuCuThe />} />
        <Route path="/xacnhan-datcoc" element={<XacNhanDatCoc />} />
        <Route path="/phongchat" element={<PhongChat />} />
        <Route path="/dieukhoan-thongtinlop" element={<DieuKhoanVaThongTinLop />} />
        <Route path="/xacnhan-giaodich" element={<XacNhanGiaoDich />} />
        <Route path="/lich-giasu" element={<TrangLichGiaSu />} />
        <Route path="/tracking-giasu-detail" element={<ManHinhTrackingGiaSuDetail />} />
        <Route path="/tracking-phuhuynh-detail" element={<ManHinhTrackingPhuHuynhDetail />} />
        <Route path="/danhgia-giasu" element={<ManHinhDangGiaGiaSu />} />
        <Route path="/danhgia-phuhuynh" element={<ManHinhDanhGiaPhuHuynh />} />
      </Routes>
    </div>
  )
}

export default App
