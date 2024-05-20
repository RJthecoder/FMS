
import React from "react";
//import Sidebar from "./Sidebar";
import Sidebar2 from "./SideBar2";
import Footer from "./footer";
import "./pages/Layout.css";
const Layout2 = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="large-viewport-layout">
        <div className="flex justify-start overflow-x-auto">
          <Sidebar2 />
          <div className="flex-grow p-4">{children}</div>
          <Footer/>
        </div>
      </div>
      <div className="small-viewport-layout">
        <div className="justify-start overflow-auto">
          <div className="relative" style={{ height: "100vh" }}>
            <Sidebar2 />
            <div className="flex-grow p-4">{children}</div>
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout2;
