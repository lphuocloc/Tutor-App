import { Navigate } from 'react-router-dom';

type UserRole = 'Staff' | 'Admin' | 'Tutor' | 'Customer';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole') as UserRole | null;

    // Nếu chưa đăng nhập, chuyển về trang login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Nếu không có role hoặc role không được phép, chuyển về trang unauthorized
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
