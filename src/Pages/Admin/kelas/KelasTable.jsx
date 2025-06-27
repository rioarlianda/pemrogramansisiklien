// pages/admin/kelas/KelasTable.jsx
import React from "react";

const KelasTable = ({
  kelasList,
  getMataKuliahDetails,
  getDosenName,
  getMahasiswaDetails,
  openEditModal,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-xl bg-white">
      <table className="min-w-full table-auto rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-sm">
            <th className="px-5 py-3 text-left">ID Kelas</th>
            <th className="px-5 py-3 text-left">Nama Kelas</th>
            <th className="px-5 py-3 text-left">Mata Kuliah</th>
            <th className="px-5 py-3 text-left">Dosen Pengampu</th>
            <th className="px-5 py-3 text-left">Mahasiswa Terdaftar</th>
            <th className="px-5 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelasList.length > 0 ? (
            kelasList.map((kelas, index) => (
              <tr
                key={kelas.id}
                className={`transition-colors duration-150 hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-5 py-3 text-sm font-medium text-gray-700">
                  {kelas.id}
                </td>
                <td className="px-5 py-3">{kelas.nama || '-'}</td>
                <td className="px-5 py-3">{getMataKuliahDetails(kelas.mataKuliahId)}</td>
                <td className="px-5 py-3">{getDosenName(kelas.dosenId)}</td>
                <td className="px-5 py-3 text-xs">{getMahasiswaDetails(kelas.mahasiswaIds)}</td>
                <td className="px-5 py-3 space-x-2">
                  <button
                    onClick={() => openEditModal(kelas.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(kelas.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition duration-200"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-5 py-6 text-center text-gray-500 text-sm"
              >
                Tidak ada data kelas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KelasTable;