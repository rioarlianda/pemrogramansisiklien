// src/pages/admin/kelas/KelasModal.jsx
import React, { useState, useEffect } from "react";

const KelasModal = ({
  isModalOpen,
  onClose,
  onSubmit,
  selectedKelas,
  mataKuliahOptions,
  dosenOptions,
  mahasiswaOptions,
  currentSksMahasiswa,
  // --- START PERUBAHAN DI SINI ---
  // Hapus prop maxSksMahasiswa
  // maxSksMahasiswa,
  // --- END PERUBAHAN DI SINI ---
}) => {
  const [form, setForm] = useState({
    id: "",
    nama: "",
    mataKuliahId: "",
    dosenId: "",
    mahasiswaIds: [],
  });

  useEffect(() => {
    if (selectedKelas) {
      setForm(selectedKelas);
    } else {
      setForm({
        id: "",
        nama: "",
        mataKuliahId: "",
        dosenId: "",
        mahasiswaIds: [],
      });
    }
  }, [selectedKelas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMahasiswaChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setForm((prev) => ({ ...prev, mahasiswaIds: selectedOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.mataKuliahId || !form.dosenId || form.mahasiswaIds.length === 0) {
      alert("Harap lengkapi semua bidang yang wajib!");
      return;
    }

    onSubmit(form);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 transition-all duration-300">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg transform transition-all duration-300">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {selectedKelas ? "Edit Kelas" : "Tambah Kelas"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Kelas (Opsional)
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Kelas Pagi, Kelas Sore"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mata Kuliah
            </label>
            <select
              name="mataKuliahId"
              value={form.mataKuliahId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {mataKuliahOptions.map((mk) => (
                <option key={mk.id} value={mk.id}>
                  {mk.nama} ({mk.sks} SKS)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosen Pengampu
            </label>
            <select
              name="dosenId"
              value={form.dosenId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Pilih Dosen --</option>
              {dosenOptions.map((dosen) => (
                <option key={dosen.id} value={dosen.id}>
                  {dosen.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mahasiswa Terdaftar (Pilih beberapa dengan Ctrl/Cmd)
            </label>
            <select
              name="mahasiswaIds"
              multiple
              value={form.mahasiswaIds}
              onChange={handleMahasiswaChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              required
            >
              {mahasiswaOptions.map((mhs) => (
                <option key={mhs.id} value={mhs.id}>
                  {mhs.nama} (SKS saat ini: {currentSksMahasiswa[mhs.id] || 0} / Maks: **24**) {/* Langsung gunakan 24 */}
                </option>
              ))}
            </select>
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

export default KelasModal;