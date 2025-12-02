import { createBrowserRouter, RouterProvider, Navigate } from "react-router"
import "./App.css";
import RootLayout from "./layout/RootLayout";
import ProtectedRoute from "./layout/ProtectedRoute";
import UserHome from "./pages/user/UserHome";
import AdminHome from "./pages/admin/AdminHome";
import { useKeycloak } from "./hooks/useKeycloak";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import PatientRegistrationForm from "./pages/user/patient/PatientRegistrationForm";


const App = () => {
  const { authenticated, loading } = useKeycloak();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <Navigate to="/home" replace />,
            },
            {
              path: "home",
              element: <UserLayout />,
              children: [
                {
                  index: true,
                  element: <UserHome />,
                },
                {
                  path: "patient-registration",
                  element: <PatientRegistrationForm />,
                }
              ]
            },
            {
              path: "admin",
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  element: <AdminHome />,
                }
              ]
            },
          ],
        },
      ],
    }
  ])

  if (loading) {
    return (
      <div className="app-container">
        <div className="status-card">
          <div className="spinner"></div>
          <h2>Loading authentication...</h2>
          <p>Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="app-container">
        <div className="status-card">
          <div className="icon">🔒</div>
          <h2>Authenticating...</h2>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />
};

export default App;
