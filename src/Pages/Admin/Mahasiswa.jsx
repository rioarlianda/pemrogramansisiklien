// Pages/Admin/Mahasiswa.jsx
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom"; // NEW: Import useOutletContext
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { confirmDialog, successDialog, errorDialog } from "../../helpers/swalHelpers";
// REMOVED: import useLocalStorage from "../../hooks/useLocalStorage"; // Hapus import ini

const Mahasiswa = () => {
  // NEW: Ambil mahasiswaOptions dan fungsi-fungsi mutasinya dari Outlet Context
  const { mahasiswaOptions, addMahasiswa, updateMahasiswa, deleteMahasiswa } = useOutletContext();

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Perubahan fungsi storeMahasiswa untuk menggunakan addMahasiswa dari context
  const storeMahasiswa = (newMhsData) => {
    // Check for duplicate NIM (tetap di sini untuk validasi segera)
    const isDuplicate = mahasiswaOptions.some(mhs => mhs.nim === newMhsData.nim);
    if (isDuplicate) {
      errorDialog("Gagal!", "NIM sudah terdaftar. Gunakan NIM lain.");
      return;
    }
    addMahasiswa(newMhsData); // Gunakan fungsi dari context
    successDialog("Berhasil!", "Mahasiswa berhasil ditambahkan.");
  };

  // Perubahan fungsi updateMahasiswa untuk menggunakan updateMahasiswa dari context
  const updateMahasiswaHandler = (updatedMhsData) => { // Beri nama berbeda untuk menghindari konflik
    updateMahasiswa(updatedMhsData); // Gunakan fungsi dari context
    successDialog("Berhasil!", "Mahasiswa berhasil diperbarui.");
  };

  // Perubahan fungsi deleteMahasiswa untuk menggunakan deleteMahasiswa dari context
  const deleteMahasiswaHandler = async (id) => { // Ubah parameter ke ID, bukan NIM
    const confirmed = await confirmDialog(
      "Hapus Data",
      "Yakin ingin menghapus data mahasiswa ini?",
      "Hapus"
    );
    if (confirmed) {
      deleteMahasiswa(id); // Gunakan fungsi dari context
      successDialog("Berhasil!", "Mahasiswa berhasil dihapus.");
    }
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  // Ubah openEditModal agar mencari berdasarkan ID, bukan NIM (sesuai data mahasiswa)
  const openEditModal = (id) => {
    const mahasiswaToEdit = mahasiswaOptions.find((mhs) => mhs.id === id);
    setSelectedMahasiswa(mahasiswaToEdit);
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      updateMahasiswaHandler(formData); // Panggil handler yang diperbarui
    } else {
      storeMahasiswa(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => { // Ubah parameter ke ID
    deleteMahasiswaHandler(id); // Panggil handler yang diperbarui
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Daftar Mahasiswa</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tambah Mahasiswa
          </button>
        </div>

        {/* MahasiswaTable sekarang menerima mahasiswaOptions dari context */}
        <MahasiswaTable
          mahasiswa={mahasiswaOptions} // Gunakan mahasiswaOptions dari context
          openEditModal={openEditModal}
          onDelete={handleDelete}
        />

        <MahasiswaModal
          isModalOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          selectedMahasiswa={selectedMahasiswa}
        />
      </div>
    </div>
  );
};

export default Mahasiswa;