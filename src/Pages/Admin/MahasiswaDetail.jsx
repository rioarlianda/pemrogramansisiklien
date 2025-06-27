import { useParams, useLocation } from "react-router-dom";

const MahasiswaDetail = () => {
  const { nim } = useParams();
  const location = useLocation();
  const { nama } = location.state || {};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Detail Mahasiswa
        </h1>
        {nama ? (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">Nama</p>
              <p className="text-lg font-medium">{nama}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">NIM</p>
              <p className="text-lg font-medium">{nim}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">
            Data mahasiswa tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
};

export default MahasiswaDetail;
