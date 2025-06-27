// pages/admin/dosen/MataKuliahTable.jsx
import React from "react";

const MataKuliahTable = ({ mataKuliah, openEditModal, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-xl bg-white">
      <table className="min-w-full table-auto rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-sm">
            <th className="px-5 py-3 text-left">ID Mata Kuliah</th>
            <th className="px-5 py-3 text-left">Nama Mata Kuliah</th>
            <th className="px-5 py-3 text-left">SKS</th>
            <th className="px-5 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mataKuliah.length > 0 ? (
            mataKuliah.map((mk, index) => (
              <tr
                key={mk.id}
                className={`transition-colors duration-150 hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-5 py-3 text-sm font-medium text-gray-700">
                  {mk.id}
                </td>
                <td className="px-5 py-3">{mk.nama}</td>
                <td className="px-5 py-3">{mk.sks}</td>
                <td className="px-5 py-3 space-x-2">
                  <button
                    onClick={() => openEditModal(mk.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mk.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-200"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-5 py-6 text-center text-gray-500 text-sm"
              >
                Tidak ada data mata kuliah.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MataKuliahTable;