import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Freeboard from "../components/board/freeboard/Freeboard";
import FreeboardADD from "../components/board/freeboard/Freeboardadd";
import FreeboardDetail from "../components/board/freeboard/Freeboarddetail";
import Freeboardedit from "../components/board/freeboard/Freeboardedit";
import Secreteboard from "../components/board/secretboard/Secretboard";
import Secreteboarddetail from "../components/board/secretboard/Secretboarddetail";
import Graduateboard from "../components/board/graduateboard/Graduate";
import Graduateboarddetail from "../components/board/graduateboard/Graduatedetail";
import { Homenavbar } from "../components/Home/Homenavbar";
import Schedule from "../components/schedule/Schdule";
import Search from "../components/board/freeboard/Searchresult";
import Layout from "../page/Layout";
import Informationboard from "../components/board/informationboard/Informationboard";
import Informationboarddetail from "../components/board/informationboard/Informationboarddetail";
import Advertiseboard from "../components/board/advertiseboard/Advertiseboard";
import Advertiseboarddetail from "../components/board/advertiseboard/Advertiseboarddetail";
import Circleboard from "../components/board/circleboard/Circleboard";
import Circleboarddetail from "../components/board/circleboard/Circleboarddetail";
import Freshmanboard from "../components/board/freshmanboard/Freshmanboard";
import Freshmanboarddetail from "../components/board/freshmanboard/Freshmanboarddetail";
import Socialboard from "../components/board/socialboard/Socialboard";
import Socialboarddetail from "../components/board/socialboard/Socialboarddetail";

function Routing() {
  return (
    <Router>
      <Homenavbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search/:query" element={<Search />} />
          
          <Route path="freeboard" element={<Freeboard />} />
          <Route path="freeboard/:id" element={<FreeboardDetail />} />

          <Route path="secretboard" element={<Secreteboard />} />
          <Route path="secretboard/:id" element={<Secreteboarddetail />} />

          <Route path="graduateboard" element={<Graduateboard />} />
          <Route path="graduateboard/:id" element={<Graduateboarddetail />} />

          <Route path="informationboard" element={<Informationboard />} />
          <Route
            path="informationboard/:id"
            element={<Informationboarddetail />}
          />
          <Route path="advertiseboard" element={<Advertiseboard />} />
          <Route path="advertiseboard/:id" element={<Advertiseboarddetail />} />
          <Route path="circleboard" element={<Circleboard />} />
          <Route path="circleboard/:id" element={<Circleboarddetail />} />

          <Route path="socialboard" element={<Socialboard />} />
          <Route path="socialboard/:id" element={<Socialboarddetail />} />

          <Route path="freshmanboard" element={<Freshmanboard />} />
          <Route path="freshmanboard/:id" element={<Freshmanboarddetail />} />
        </Route>
      </Routes>

      <Routes>
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

export default Routing;
