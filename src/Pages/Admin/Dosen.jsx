// pages/admin/dosen/Dosen.jsx
import React, { useState, useEffect } from "react";
import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";
import { confirmDialog, successDialog, errorDialog } from "../../helpers/swalHelpers";
import useLocalStorage from "../../hooks/useLocalStorage"; // Import the hook

const Dosen = () => {
  // Use useLocalStorage hook for persistence
  const [mataKuliah, setMataKuliah] = useLocalStorage("mataKuliahData", [
    { id: "MK001", nama: "Pemrograman Web", sks: 3 },
    { id: "MK002", nama: "Struktur Data", sks: 4 },
  ]);

  // For Dosen and User management, ideally, this would be fetched from a backend
  // For Local Storage demo, we'll store them here and update users separately
  const [users, setUsers] = useLocalStorage("userData", [
    { id: "user1", nama: "Prof. Ahmad", role: "dosen", dosenId: "dosen1" },
    { id: "user2", nama: "Dr. Budi", role: "dosen", dosenId: "dosen2" },
    { id: "user3", nama: "Alice", role: "mahasiswa", mahasiswaNim: "A11.2022.11111" },
    { id: "user4", nama: "Admin User", role: "admin" },
  ]);

  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [isMataKuliahModalOpen, setMataKuliahModalOpen] = useState(false);

  const [selectedUserIdForRoleChange, setSelectedUserIdForRoleChange] = useState("");
  const [newRoleForUser, setNewRoleForUser] = useState("");

  // Helper to generate unique IDs
  const getNextMataKuliahId = () => {
    const maxIdNum = mataKuliah.reduce((max, mk) => {
      const num = parseInt(mk.id.replace('MK', ''));
      return num > max ? num : max;
    }, 0);
    return `MK${String(maxIdNum + 1).padStart(3, '0')}`;
  };

  // CRUD for Mata Kuliah
  const storeMataKuliah = (newMk) => {
    const id = getNextMataKuliahId();
    setMataKuliah((prev) => [...prev, { ...newMk, id }]);
    successDialog("Berhasil!", "Mata Kuliah berhasil ditambahkan.");
  };

  const updateMataKuliah = (updatedMk) => {
    setMataKuliah((prev) =>
      prev.map((mk) => (mk.id === updatedMk.id ? updatedMk : mk))
    );
    successDialog("Berhasil!", "Mata Kuliah berhasil diperbarui.");
  };

  const deleteMataKuliah = async (id) => {
    const confirmed = await confirmDialog(
      "Hapus Mata Kuliah",
      "Yakin ingin menghapus mata kuliah ini?",
      "Hapus"
    );
    if (confirmed) {
      setMataKuliah((prev) => prev.filter((mk) => mk.id !== id));
      successDialog("Berhasil!", "Mata Kuliah berhasil dihapus.");
    }
  };

  const openAddMataKuliahModal = () => {
    setSelectedMataKuliah(null);
    setMataKuliahModalOpen(true);
  };

  const openEditMataKuliahModal = (id) => {
    const mkToEdit = mataKuliah.find((mk) => mk.id === id);
    setSelectedMataKuliah(mkToEdit);
    setMataKuliahModalOpen(true);
  };

  const handleMataKuliahSubmit = (formData) => {
    if (selectedMataKuliah) {
      updateMataKuliah(formData);
    } else {
      storeMataKuliah(formData);
    }
    setMataKuliahModalOpen(false);
  };

  // User Role Management
  const handleChangeUserRole = async () => {
    if (!selectedUserIdForRoleChange || !newRoleForUser) {
      errorDialog("Gagal!", "Pilih pengguna dan role baru.");
      return;
    }

    const confirmed = await confirmDialog(
      "Ubah Role Pengguna",
      `Yakin ingin mengubah role pengguna ini menjadi "${newRoleForUser}"?`,
      "Ubah"
    );

    if (confirmed) {
      try {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUserIdForRoleChange
              ? { ...user, role: newRoleForUser }
              : user
          )
        );
        successDialog("Berhasil!", "Role pengguna berhasil diubah.");
        setSelectedUserIdForRoleChange("");
        setNewRoleForUser("");
      } catch (error) {
        console.error("Error changing user role:", error);
        errorDialog("Gagal!", "Gagal mengubah role pengguna.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Pengelolaan Dosen dan Mata Kuliah
        </h1>

        {/* Mata Kuliah Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Daftar Mata Kuliah
            </h2>
            <button
              onClick={openAddMataKuliahModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Tambah Mata Kuliah
            </button>
          </div>
          <MataKuliahTable
            mataKuliah={mataKuliah}
            openEditModal={openEditMataKuliahModal}
            onDelete={deleteMataKuliah}
          />
        </div>

        {/* User Role Change Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ubah Role Pengguna
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Pengguna
              </label>
              <select
                id="userSelect"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedUserIdForRoleChange}
                onChange={(e) => setSelectedUserIdForRoleChange(e.target.value)}
              >
                <option value="">-- Pilih Pengguna --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nama} ({user.role})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="roleSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Role Baru
              </label>
              <select
                id="roleSelect"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newRoleForUser}
                onChange={(e) => setNewRoleForUser(e.target.value)}
              >
                <option value="">-- Pilih Role --</option>
                <option value="admin">Admin</option>
                <option value="dosen">Dosen</option>
                <option value="mahasiswa">Mahasiswa</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleChangeUserRole}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Ubah Role
            </button>
          </div>
        </div>

        <MataKuliahModal
          isModalOpen={isMataKuliahModalOpen}
          onClose={() => setMataKuliahModalOpen(false)}
          onSubmit={handleMataKuliahSubmit}
          selectedMataKuliah={selectedMataKuliah}
        />
      </div>
    </div>
  );
};

export default Dosen;