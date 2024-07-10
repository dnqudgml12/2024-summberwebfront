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
import { Homenavbar } from "../components/Home/Homenavbar";
import Schedule from "../components/schedule/Schdule";
import Search from "../page/Searchresult";
import Layout from "../page/Layout";

function Routing() {
  return (
    <Router>
      <Homenavbar/>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="search/:query" element={<Search />} />
          <Route path="freeboard" element={<Freeboard />} />
          <Route path="freeboardadd" element={<FreeboardADD />} />
          <Route path="freeboard/:id" element={<FreeboardDetail />} />
          <Route path="freeboardedit/:id" element={<Freeboardedit />} />
          <Route path="secreteboard" element={<Secreteboard />} />
          <Route path="secreteboard/:id" element={<Secreteboarddetail />} />
          <Route path="graduateboard" element={<Graduateboard />} />
          <Route path="graduateboard/:id" element={<Graduateboarddetail />} />
       
        </Route>
      </Routes>

      <Routes>
      <Route path="/schedule" element={<Schedule/>} />
      </Routes>
    </Router>
  );
}

export default Routing;
