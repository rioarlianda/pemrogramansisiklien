import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};
export default LoginLayout;
