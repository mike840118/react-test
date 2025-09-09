import React, { useState, useEffect } from "react";
import Menu from "../components/menu.tsx";
import Title from "../components/title.tsx";
import Footer from "../components/footer.tsx";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import Home from "../pages/home/home.tsx";
import Page1 from "../pages/page1.tsx";
import Page2 from "../pages/page2.tsx";
import "./app.css";

function AppData() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Title></Title>
          <div className="main">
            <Menu></Menu>
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
              </Routes>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}
export default AppData;
