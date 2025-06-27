// pages/admin/kelas/KelolaKelas.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import KelasTable from "./KelasTable";
import KelasModal from "./KelasModal";
import { confirmDialog } from "../../../helpers/swalHelpers";
import { successDialog, errorDialog } from "../../../helpers/swalHelpers";

const KelolaKelas = () => {
  const [kelasList, setKelasList] = useState([]);
  const [mataKuliahOptions, setMataKuliahOptions] = useState([]);
  const [dosenOptions, setDosenOptions] = useState([]);

  const { mahasiswaOptions } = useOutletContext();

  const [selectedKelas, setSelectedKelas] = useState(null);
  const [isKelasModalOpen, setKelasModalOpen] = useState(false);

  // Simulated SKS limits for Dosen
  const [maxSksDosen, setMaxSksDosen] = useState({
    user1: 12, // Prof. Ahmad
    user2: 15, // Dr. Budi
  });

  // --- START PERUBAHAN DI SINI ---
  // Hapus state maxSksMahasiswa karena kita akan menggunakan nilai default 24
  // const [maxSksMahasiswa, setMaxSksMahasiswa] = useState({});
  // --- END PERUBAHAN DI SINI ---

  const [currentSksMahasiswa, setCurrentSksMahasiswa] = useState({});
  const [currentSksDosen, setCurrentSksDosen] = useState({});

  const [nextKelasId, setNextKelasId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      // Data Mata Kuliah disimulasikan. Jika ini dari API, pastikan fetchedMataKuliah
      // diperbarui dengan data terbaru dari backend.
      const fetchedMataKuliah = [
        { id: "MK001", nama: "Pemrograman Web", sks: 3 },
        { id: "MK002", nama: "Struktur Data", sks: 4 },
        { id: "MK003", nama: "Basis Data", sks: 3 },
        { id: "MK004", nama: "Sistem Operasi", sks: 3 },
        { id: "MK005", nama: "Jaringan Komputer", sks: 3 }, // Contoh mata kuliah baru
        { id: "MK006", nama: "Kecerdasan Buatan", sks: 4 }, // Contoh mata kuliah baru
      ];
      setMataKuliahOptions(fetchedMataKuliah);

      const fetchedDosen = [
        { id: "dosen1", nama: "Prof. Ahmad", userId: "user1" },
        { id: "dosen2", nama: "Dr. Budi", userId: "user2" },
      ];
      setDosenOptions(fetchedDosen);

      const fetchedKelas = [
        { id: "KLS001", nama: "Kelas A", mataKuliahId: "MK001", dosenId: "dosen1", mahasiswaIds: ["mhs1"] },
        { id: "KLS002", nama: "Kelas B", mataKuliahId: "MK002", dosenId: "dosen2", mahasiswaIds: ["mhs2"] },
      ];
      setKelasList(fetchedKelas);

      if (fetchedKelas.length > 0) {
        const maxIdNum = Math.max(...fetchedKelas.map(k => parseInt(k.id.replace('KLS', ''))));
        setNextKelasId(maxIdNum + 1);
      }
    };
    fetchData();
  }, []); // Dependensi kosong agar hanya dijalankan sekali saat komponen pertama kali di-mount

  useEffect(() => {
    calculateCurrentSKS();
  }, [kelasList, mataKuliahOptions, mahasiswaOptions]);

  const calculateCurrentSKS = () => {
    const mhsSks = {};
    const dosenSks = {};

    mahasiswaOptions.forEach(mhs => (mhsSks[mhs.id] = 0));
    dosenOptions.forEach(dosen => (dosenSks[dosen.id] = 0));

    kelasList.forEach(kelas => {
      const mataKuliah = mataKuliahOptions.find(mk => mk.id === kelas.mataKuliahId);
      if (mataKuliah) {
        const sks = mataKuliah.sks;

        kelas.mahasiswaIds.forEach(mhsId => {
          mhsSks[mhsId] = (mhsSks[mhsId] || 0) + sks;
        });

        if (kelas.dosenId) {
          dosenSks[kelas.dosenId] = (dosenSks[kelas.dosenId] || 0) + sks;
        }
      }
    });

    setCurrentSksMahasiswa(mhsSks);
    setCurrentSksDosen(dosenSks);
  };

  const storeKelas = (newKelasData) => {
    const id = `KLS${String(nextKelasId).padStart(3, '0')}`;
    setKelasList((prev) => [...prev, { ...newKelasData, id }]);
    setNextKelasId(prev => prev + 1);
    successDialog("Berhasil!", "Kelas berhasil ditambahkan.");
  };

  const updateKelas = (updatedKelasData) => {
    setKelasList((prev) =>
      prev.map((kelas) =>
        kelas.id === updatedKelasData.id ? updatedKelasData : kelas
      )
    );
    successDialog("Berhasil!", "Kelas berhasil diperbarui.");
  };

  const deleteKelas = async (id) => {
    const confirmed = await confirmDialog(
      "Hapus Kelas",
      "Yakin ingin menghapus kelas ini?",
      "Hapus"
    );
    if (confirmed) {
      setKelasList((prev) => prev.filter((kelas) => kelas.id !== id));
      successDialog("Berhasil!", "Kelas berhasil dihapus.");
    }
  };

  const openAddKelasModal = () => {
    setSelectedKelas(null);
    setKelasModalOpen(true);
  };

  const openEditKelasModal = (id) => {
    const kelasToEdit = kelasList.find((kelas) => kelas.id === id);
    setSelectedKelas(kelasToEdit);
    setKelasModalOpen(true);
  };

  const handleKelasSubmit = (formData) => {
    const { mataKuliahId, dosenId, mahasiswaIds } = formData;
    const selectedMataKuliah = mataKuliahOptions.find(
      (mk) => mk.id === mataKuliahId
    );
    const classSks = selectedMataKuliah ? selectedMataKuliah.sks : 0;

    const isMataKuliahAssigned = kelasList.some(
      (kelas) =>
        kelas.mataKuliahId === mataKuliahId &&
        (!selectedKelas || kelas.id !== selectedKelas.id)
    );
    if (isMataKuliahAssigned) {
      errorDialog("Gagal!", "Mata Kuliah ini sudah memiliki dosen di kelas lain.");
      return;
    }

    const currentDosenSksForThisDosen = kelasList
      .filter(kelas => kelas.dosenId === dosenId && (!selectedKelas || kelas.id !== selectedKelas.id))
      .reduce((sum, kelas) => {
        const mk = mataKuliahOptions.find(m => m.id === kelas.mataKuliahId);
        return sum + (mk ? mk.sks : 0);
      }, 0);

    const effectiveMaxSksDosen = dosenOptions.find(d => d.id === dosenId)?.userId ? maxSksDosen[dosenOptions.find(d => d.id === dosenId).userId] : Infinity;

    if ((currentDosenSksForThisDosen + classSks) > effectiveMaxSksDosen) {
        errorDialog("Gagal!", `Dosen ini akan melebihi maksimal SKS yang dapat ditempuh (${effectiveMaxSksDosen} SKS).`);
        return;
    }

    // --- START PERUBAHAN DI SINI ---
    // Gunakan nilai konstanta 24 untuk maksimal SKS mahasiswa
    const MAX_SKS_MAHASISWA_GLOBAL = 24;
    for (const mhsId of mahasiswaIds) {
      const currentMhsSks = (currentSksMahasiswa[mhsId] || 0) - (selectedKelas && selectedKelas.mahasiswaIds.includes(mhsId) ? selectedMataKuliah.sks : 0);

      if ((currentMhsSks + classSks) > MAX_SKS_MAHASISWA_GLOBAL) {
          errorDialog("Gagal!", `Mahasiswa "${mahasiswaOptions.find(m => m.id === mhsId)?.nama}" akan melebihi maksimal SKS yang dapat ditempuh (${MAX_SKS_MAHASISWA_GLOBAL} SKS).`);
          return;
      }
    }
    // --- END PERUBAHAN DI SINI ---

    if (selectedKelas) {
      updateKelas(formData);
    } else {
      storeKelas(formData);
    }
    setKelasModalOpen(false);
  };

  const getMataKuliahDetails = (id) => {
    const mk = mataKuliahOptions.find((mk) => mk.id === id);
    return mk ? `${mk.nama} (${mk.sks} SKS)` : "N/A";
  };

  const getDosenName = (id) => {
    const dosen = dosenOptions.find((dosen) => dosen.id === id);
    return dosen ? dosen.nama : "N/A";
  };

  const getMahasiswaDetails = (ids) => {
    // --- START PERUBAHAN DI SINI ---
    const MAX_SKS_MAHASISWA_GLOBAL = 24; // Definisi ulang untuk konsistensi tampilan
    return ids
      .map((id) => {
        const mhs = mahasiswaOptions.find((mhs) => mhs.id === id);
        if (mhs) {
          const currentSks = currentSksMahasiswa[mhs.id] || 0;
          return `${mhs.nama} (${currentSks} / ${MAX_SKS_MAHASISWA_GLOBAL} SKS)`;
        }
        return "N/A";
      })
      .join(", ");
    // --- END PERUBAHAN DI SINI ---
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Pengelolaan Kelas
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Daftar Kelas
            </h2>
            <button
              onClick={openAddKelasModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Tambah Kelas
            </button>
          </div>
          <KelasTable
            kelasList={kelasList}
            getMataKuliahDetails={getMataKuliahDetails}
            getDosenName={getDosenName}
            getMahasiswaDetails={getMahasiswaDetails}
            openEditModal={openEditKelasModal}
            onDelete={deleteKelas}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ringkasan SKS Mahasiswa
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white text-sm">
                  <th className="px-5 py-3 text-left">NIM</th>
                  <th className="px-5 py-3 text-left">Nama Mahasiswa</th>
                  <th className="px-5 py-3 text-left">SKS Diambil</th>
                  <th className="px-5 py-3 text-left">Maksimal SKS</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswaOptions && mahasiswaOptions.length > 0 ? (
                  mahasiswaOptions.map((mhs, index) => (
                    <tr
                      key={mhs.id}
                      className={`transition-colors duration-150 hover:bg-blue-50 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-5 py-3 text-sm font-medium text-gray-700">
                        {mhs.nim}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">
                        {mhs.nama}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">
                        {currentSksMahasiswa[mhs.id] || 0}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">
                        24 {/* Langsung tampilkan 24 */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-5 py-6 text-center text-gray-500 text-sm">
                      Tidak ada data mahasiswa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <KelasModal
          isModalOpen={isKelasModalOpen}
          onClose={() => setKelasModalOpen(false)}
          onSubmit={handleKelasSubmit}
          selectedKelas={selectedKelas}
          mataKuliahOptions={mataKuliahOptions}
          dosenOptions={dosenOptions}
          mahasiswaOptions={mahasiswaOptions}
          currentSksMahasiswa={currentSksMahasiswa}
          // --- START PERUBAHAN DI SINI ---
          // Prop maxSksMahasiswa dihapus karena tidak lagi diperlukan di KelasModal
          // Nilai 24 akan hardcode di sana.
          // maxSksMahasiswa={maxSksMahasiswa}
          // --- END PERUBAHAN DI SINI ---
        />
      </div>
    </div>
  );
};

export default KelolaKelas;