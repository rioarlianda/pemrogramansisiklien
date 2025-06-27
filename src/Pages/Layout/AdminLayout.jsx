// Pages/Layout/AdminLayout.jsx
import React, { useState, useEffect } from 'react'; // NEW: Import useEffect
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import useLocalStorage from '../../hooks/useLocalStorage'; // NEW: Import useLocalStorage

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // NEW: Pindahkan state mahasiswa dan useLocalStorage ke AdminLayout
  const [mahasiswaOptions, setMahasiswaOptions] = useLocalStorage("mahasiswaData", [
    { id: "mhs1", nim: "A11.2022.11111", nama: "John Doe", status: true, userId: "user3" },
    { id: "mhs2", nim: "A11.2022.22222", nama: "Jane Smith", status: false },
  ]);

  // NEW: Tambahkan state untuk nextMahasiswaId agar id unik terus menerus
  const [nextMahasiswaId, setNextMahasiswaId] = useState(1);

  // NEW: Hitung nextMahasiswaId berdasarkan data yang ada di localStorage saat pertama load
  useEffect(() => {
    if (mahasiswaOptions.length > 0) {
      const maxIdNum = Math.max(...mahasiswaOptions.map(m => parseInt(m.id?.replace('mhs', '')) || 0));
      setNextMahasiswaId(maxIdNum + 1);
    }
  }, [mahasiswaOptions]); // Jalankan ini saat mahasiswaOptions pertama kali dimuat

  // NEW: Fungsi untuk menambah mahasiswa (akan dipass ke Mahasiswa.jsx)
  const addMahasiswa = (newMhsData) => {
    const newId = `mhs${String(nextMahasiswaId).padStart(3, '0')}`;
    setMahasiswaOptions(prev => [...prev, { ...newMhsData, id: newId }]);
    setNextMahasiswaId(prev => prev + 1);
  };

  // NEW: Fungsi untuk memperbarui mahasiswa (akan dipass ke Mahasiswa.jsx)
  const updateMahasiswa = (updatedMhsData) => {
    setMahasiswaOptions(prev =>
      prev.map(mhs => (mhs.id === updatedMhsData.id ? updatedMhsData : mhs))
    );
  };

  // NEW: Fungsi untuk menghapus mahasiswa (akan dipass ke Mahasiswa.jsx)
  const deleteMahasiswa = (mhsId) => {
    setMahasiswaOptions(prev => prev.filter(mhs => mhs.id !== mhsId));
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Container */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-blue-800 text-white z-50
          transition-all duration-300 transform
          ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}
          overflow-hidden
        `}
      >
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content area */}
      <div
        className={`flex-1 p-4 bg-gray-100 transition-all duration-300
          ${isSidebarOpen ? 'ml-64' : 'ml-0'}
        `}
      >
        <button
          onClick={toggleSidebar}
          className="p-2 bg-blue-600 text-white rounded-md mb-4 md:hidden"
        >
          {isSidebarOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
        </button>

        {/* NEW: Meneruskan mahasiswaOptions dan fungsi-fungsi mutasinya melalui context */}
        <Outlet context={{ mahasiswaOptions, setMahasiswaOptions, addMahasiswa, updateMahasiswa, deleteMahasiswa }} />
      </div>
    </div>
  );
};

export default AdminLayout;