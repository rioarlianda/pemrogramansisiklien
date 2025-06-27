import { Link } from "react-router-dom";

const MahasiswaTable = ({ mahasiswa, openEditModal, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-xl bg-white">
      <table className="min-w-full table-auto rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-sm">
            <th className="px-5 py-3 text-left">NIM</th>
            <th className="px-5 py-3 text-left">Nama</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length > 0 ? (
            mahasiswa.map((mhs, index) => (
              <tr
                key={mhs.nim}
                className={`transition-colors duration-150 hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-5 py-3 text-sm font-medium text-gray-700">
                  {mhs.nim}
                </td>
                <td className="px-5 py-3">
                  <Link
                    to={`/admin/mahasiswa/${mhs.nim}`}
                    state={{ nama: mhs.nama }}
                    className="text-blue-600 hover:underline"
                  >
                    {mhs.nama}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`font-semibold ${
                      mhs.status ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {mhs.status ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                <td className="px-5 py-3 space-x-2">
                  <button
                    onClick={() => openEditModal(mhs.nim)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mhs.nim)}
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
                Tidak ada data mahasiswa.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MahasiswaTable;
