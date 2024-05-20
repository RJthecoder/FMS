import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./footer";
import "./pages/Layout.css";
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="large-viewport-layout">
        <div className="flex justify-start overflow-x-auto">
          <Sidebar />
          <div className="flex-grow p-4">{children}</div>
          <Footer/>
        </div>
      </div>
      <div className="small-viewport-layout">
        <div className="justify-start overflow-auto">
          <div className="relative" style={{ height: "100vh" }}>
            <Sidebar />
            <div className="flex-grow p-4">{children}</div>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
