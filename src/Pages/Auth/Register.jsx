import { useState } from "react";
import api from "../../helpers/axiosHelper";
import { showToast } from "../../helpers/toastHelper";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", nama: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      showToast("Registrasi berhasil! Silakan login.", "success");
      // Redirect ke login jika perlu
    } catch {
      showToast("Registrasi gagal!", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ...input nama, email, password, tombol submit... */}
    </form>
  );
};

export default Register;
