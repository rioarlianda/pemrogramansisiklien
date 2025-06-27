import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../helpers/toastHelper";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Form from "../Components/Form";
import Label from "../Components/Label";

const Login = () => {
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState("login");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const dummyUser = {
      email: "nabilul@gmail.com",
      password: "admin123",
      name: "Nabilul",
    };

    const email = event.target.email.value;
    const password = event.target.password.value;

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const foundUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", dummyUser.name);
      showToast("Login berhasil!", "success");
      navigate("/admin/dashboard");
    } else if (foundUser) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", foundUser.name);
      showToast("Login berhasil!", "success");
      navigate("/admin/dashboard");
    } else {
      showToast("Email atau password salah!", "error");
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!name || !email || !password) {
      showToast("Semua field harus diisi!", "error");
      return;
    }

    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const isEmailRegistered = registeredUsers.some(user => user.email === email);
    if (isEmailRegistered) {
      showToast("Email sudah terdaftar. Silakan login.", "error");
      return;
    }

    const newUser = { name, email, password };
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    showToast("Registrasi berhasil! Silakan login.", "success");
    setFormMode("login");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    const emailToReset = forgotPasswordEmail;
    if (!emailToReset) {
      showToast("Email harus diisi!", "error");
      return;
    }

    // Simulasi: Dalam aplikasi nyata, ini akan mengirim permintaan ke backend
    showToast("Jika email terdaftar, instruksi reset password telah dikirim ke email Anda.", "info");
    
    setFormMode("login"); 
    setForgotPasswordEmail(""); 
  };

  const renderFormContent = () => {
    switch (formMode) {
      case "login":
        return (
          <>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                required
                placeholder="Masukkan Email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                required
                placeholder="Masukkan Password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">ingat saya</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline"
                onClick={(e) => { // Pastikan event default dicegah
                    e.preventDefault();
                    setFormMode("forgotPassword");
                    setForgotPasswordEmail(""); // Kosongkan saat pindah mode
                }} 
              >
                Lupa Password
              </a>
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Button>
          </>
        );
      case "register":
        return (
          <>
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama
              </Label>
              <Input
                type="text"
                name="name"
                required
                placeholder="Masukkan Nama Lengkap"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                required
                placeholder="Masukkan Email"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                required
                placeholder="Buat Password"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Daftar
            </Button>
          </>
        );
      case "forgotPassword":
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Masukkan email Anda untuk menerima instruksi reset password.
            </p>
            <div>
              <Label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                name="forgotPasswordEmail"
                required
                placeholder="Masukkan Email Anda"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={forgotPasswordEmail} // <--- Pastikan value terikat ke state
                onChange={(e) => setForgotPasswordEmail(e.target.value)} // <--- Pastikan onChange memperbarui state
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Kirim Instruksi Reset
            </Button>
            <Button
              type="button" // <--- PERBAIKAN PENTING: Tambahkan type="button"
              onClick={() => {
                setFormMode("login");
                setForgotPasswordEmail(""); // Kosongkan email saat batal
              }}
              className="w-full py-2 mt-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          {formMode === "login"
            ? "Login"
            : formMode === "register"
            ? "Daftar"
            : "Lupa Password"}
        </h2>
        <Form
          id={formMode}
          className="space-y-4"
          onSubmit={
            formMode === "login"
              ? handleLogin
              : formMode === "register"
              ? handleRegister
              : handleForgotPassword
          }
        >
          {renderFormContent()}
        </Form>
        <p className="text-sm text-center text-gray-600 mt-4">
          {formMode === "login" ? "Belum punya akun?" : null}{" "}
          {formMode === "register" ? "Sudah punya akun?" : null}
          {formMode === "forgotPassword" ? "Kembali ke " : null}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault(); 
              if (formMode === "login") {
                setFormMode("register");
              } else {
                setFormMode("login");
              }
              setForgotPasswordEmail(""); // Kosongkan email saat berpindah mode
            }}
          >
            {formMode === "login"
              ? "Daftar"
              : formMode === "register"
              ? "Login"
              : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;