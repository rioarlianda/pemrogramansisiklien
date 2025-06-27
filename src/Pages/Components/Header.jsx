import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  let title = "Dashboard";
  if (location.pathname.startsWith("/admin/mahasiswa")) {
    title = "Mahasiswa";
  } else if (location.pathname.startsWith("/admin/dashboard")) {
    title = "Dashboard";
  } else if (location.pathname.startsWith("/login")) {
    title = "Login";
  }

  return (
    <header className="bg-white shadow-2xl">
      <div className="p-4 flex justify-between">{title}</div>
    </header>
  );
};

export default Header;
