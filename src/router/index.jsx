import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Freeboard from "../components/freeboard/Freeboard"
import FreeboardADD from "../components/freeboard/Freeboardadd"
import FreeboardDetail from "../components/freeboard/Freeboarddetail";
import Freeboardedit from "../components/freeboard/Freeboardedit";
import Secreteboard from "../components/secretboard/Secretboard";
import Secreteboarddetail from "../components/secretboard/Secretboarddetail";
import Graduateboard from "../components/graduateboard/Graduate";
import Graduateboarddetail from "../components/graduateboard/Graduatedetail";
import Homenavbar from "../components/Home/Homenavbar";
import Schedule from "../components/schedule/Schdule";


function Routing() {
  return (
    <Router>
      <Homenavbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/freeboard" element={<Freeboard />} />
        <Route path="/freeboardadd" element={<FreeboardADD />} />
        <Route path="/freeboard/:id" element={<FreeboardDetail />} />
        <Route path="/freeboardedit/:id" element={<Freeboardedit />} />
      </Routes>
      <Routes>
        <Route path="/secreteboard" element={<Secreteboard />} />
        <Route path="/secreteboard/:id" element={<Secreteboarddetail />} />
      </Routes>
      <Routes>
        <Route path="/graduateboard" element={<Graduateboard />} />
        <Route path="/graduateboard/:id" element={<Graduateboarddetail />} />
      </Routes>
      <Routes>
      <Route path="/schedule" element={<Schedule/>} />
      </Routes>
    </Router>
  );
}

export default Routing;
