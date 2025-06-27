import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLayout from "./Pages/Layout/AuthLayout"; // Your existing login layout
import AdminLayout from "./Pages/Layout/AdminLayout"; // Your existing admin layout
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail";

// Import new pages
import Dosen from "./Pages/Admin/Dosen"; // Adjusted path to new folder structure
import KelolaKelas from "./Pages/Admin/kelas/KelolaKelas"; // Adjusted path to new folder structure

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login Layout */}
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<Login />} />
          </Route>

          {/* Admin Layout - Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout /> {/* AdminLayout will render the sidebar and Outlet */}
              </ProtectedRoute>
            }
          >
            {/* Nested Admin Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="mahasiswa" element={<Mahasiswa />} />
            <Route path="mahasiswa/:nim" element={<MahasiswaDetail />} />
            {/* New Admin Routes */}
            <Route path="dosen" element={<Dosen />} />
            <Route path="kelas" element={<KelolaKelas />} />
          </Route>

          {/* Fallback for undefined routes, e.g., redirect to login or a 404 page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;