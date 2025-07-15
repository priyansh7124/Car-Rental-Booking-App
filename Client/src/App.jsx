import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";

const App = () => {
  const isOwnerPath = useLocation().pathname.startsWith("/Owner");
  const [showLogin, setshowLogin] = useState(false);
  return (
    <div>
      {!isOwnerPath && <Navbar setShowLogin={setshowLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={Cars} />
        <Route />
        <Route />
      </Routes>
    </div>
  );
};

export default App;
