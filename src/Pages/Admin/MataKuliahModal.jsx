// pages/admin/dosen/MataKuliahModal.jsx (asumsi namanya)
import React, { useState, useEffect } from "react";

const MataKuliahModal = ({ isModalOpen, onClose, onSubmit, selectedMataKuliah }) => {
  // ... (kode state dan useEffect Anda)
  const [form, setForm] = useState({
    id: "",
    nama: "",
    sks: 0,
  });

  useEffect(() => {
    if (selectedMataKuliah) {
      setForm(selectedMataKuliah);
    } else {
      setForm({
        id: "",
        nama: "",
        sks: 0,
      });
    }
  }, [selectedMataKuliah]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value, // Convert SKS to number
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  // ... (akhir kode state dan useEffect Anda)

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 transition-all duration-300">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg transform transition-all duration-300">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {selectedMataKuliah ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Mata Kuliah (Otomatis)
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Mata Kuliah
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKS
            </label>
            <input
              type="number"
              name="sks"
              value={form.sks}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MataKuliahModal;