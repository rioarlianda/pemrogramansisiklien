import React, { useState, useEffect } from "react"; // Impor useEffect
import Card from "../Components/Card";
import Modal from "../Components/Modal";

const Dashboard = () => {
  const [userName, setUserName] = useState("Pengguna"); // Default value

  useEffect(() => {
    // Ambil nama pengguna dari localStorage saat komponen di-mount
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    // Jika Anda memiliki sistem otentikasi lebih lanjut (misal: Context API, Redux),
    // Anda akan mengambil nama pengguna dari sana.
  }, []); // [] agar hanya berjalan sekali saat komponen dimuat

  return (
    <div className="p-6"> {/* Tambahkan div pembungkus untuk layout */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Hi, Selamat datang, <span className="text-gray-800">{userName}</span>!
      </h1>
      {/* Jika ada Card atau Modal, bisa ditambahkan di sini */}
      {/* <Card /> */}
      {/* <Modal /> */}
    </div>
  );
};

export default Dashboard;