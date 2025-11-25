import { Outlet, Navigate, useLocation } from "react-router"
import useUserInfo from "../hooks/useUserInfo"

const ProtectedRoute = () => {
    const { userInfo, isLoading, refetch } = useUserInfo()
    const location = useLocation()

    if (isLoading) {
        return (
            <div className="app-container">
                <div className="spinner"></div>
                <h2>Loading user information...</h2>
                <p>Please wait</p>
            </div>
        )
    }

    if (!userInfo) {
        return (
            <div className="app-container">
                <div className="status-card error">
                    <div className="icon">⚠️</div>
                    <h2>Unable to load user information</h2>
                    <p>Please try again</p>
                    <button className="retry-button" onClick={refetch}>
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    const isAdmin = userInfo.roles.includes("Admin")
    const isStandardUser = userInfo.roles.includes("Standard User")

    // Check if user has any valid role
    if (!isAdmin && !isStandardUser) {
        return (
            <div className="app-container">
                <div className="status-card error">
                    <div className="icon">🚫</div>
                    <h2>Access Denied</h2>
                    <p>You don't have the required permissions to access this application.</p>
                </div>
            </div>
        )
    }

    // Role-based route protection
    if (location.pathname === "/admin" && !isAdmin) {
        return <Navigate to="/home" replace />
    }

    if (location.pathname === "/home" && !isStandardUser && isAdmin) {
        return <Navigate to="/admin" replace />
    }

    return <Outlet />
}

export default ProtectedRoute