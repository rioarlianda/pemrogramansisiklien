// Pages/Components/Sidebar.jsx
import React, { useState } from "react"; // Import useState
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaGraduationCap, FaChalkboardTeacher, FaRegBuilding, FaBars, FaSignOutAlt } from "react-icons/fa";

// Diasumsikan Anda memiliki AuthContext dan useAuth hook
// Import useAuth dari context Anda. Sesuaikan path jika berbeda.
// import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  // const { logout } = useAuth(); // Dapatkan fungsi logout dari AuthContext Anda (jika digunakan)

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State untuk mengontrol tampilan konfirmasi

  // Fungsi yang dipanggil saat tombol Logout awal diklik
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true); // Tampilkan dialog konfirmasi
  };

  // Fungsi yang dipanggil jika user mengkonfirmasi 'YA' untuk logout
  const confirmLogout = () => {
    // ---- LOGIKA LOGOUT SEBENARNYA ----
    // Jika Anda menggunakan AuthContext:
    // logout();

    // Jika Anda TIDAK menggunakan AuthContext dan logout langsung di sini:
    console.log("Melakukan logout...");
    localStorage.removeItem('userToken'); // Ganti 'userToken' dengan kunci yang Anda gunakan
    localStorage.removeItem('userData');  // Ganti 'userData' dengan kunci yang Anda gunakan
    navigate('/login'); // Ganti '/login' dengan path halaman login Anda
    // -----------------------------------

    setShowLogoutConfirm(false); // Sembunyikan dialog setelah logout
  };

  // Fungsi yang dipanggil jika user mengkonfirmasi 'TIDAK' (membatalkan logout)
  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Sembunyikan dialog
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 text-2xl font-bold flex items-center justify-between">
        Admin Panel
        <button onClick={toggleSidebar} className="text-white md:hidden">
          <FaBars />
        </button>
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-200
                ${isActive ? "bg-blue-700" : ""}`
              }
            >
              <FaTachometerAlt className="mr-3" /> Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/mahasiswa"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-200
                ${isActive ? "bg-blue-700" : ""}`
              }
            >
              <FaUsers className="mr-3" /> Mahasiswa
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/dosen"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-200
                ${isActive ? "bg-blue-700" : ""}`
              }
            >
              <FaChalkboardTeacher className="mr-3" /> Dosen & Mata Kuliah
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/admin/kelas"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-200
                ${isActive ? "bg-blue-700" : ""}`
              }
            >
              <FaRegBuilding className="mr-3" /> Kelola Kelas
            </NavLink>
          </li>

          {/* Tombol Logout awal yang memicu konfirmasi */}
          <li className="mb-2 mt-8">
            <button
              onClick={handleLogoutClick} // Panggil fungsi yang menampilkan konfirmasi
              className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-red-600 transition duration-200 w-full text-left"
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </button>
          </li>
        </ul>
      </nav>
      {/* Footer atau elemen lain di sidebar */}

      {/* Dialog Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Overlay */}
          <div className="bg-white p-6 rounded-lg shadow-xl text-center w-80">
            <p className="text-lg font-semibold text-gray-800 mb-4">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Ya
              </button>
              <button
                onClick={cancelLogout}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;