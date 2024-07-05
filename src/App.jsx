
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './page/Home';
import Freeboard from './components/Home/freeboard/freeboard';
import Secreteboard from './components/Home/secretboard/secretboard';
import Graduateboard from './components/Home/graduateboard/graduate';
import Freeboarddetail from './components/Home/freeboard/freeboarddetail';
import Secreteboarddetail from './components/Home/secretboard/secretboarddetail';
import Graduateboarddetail from './components/Home/graduateboard/graduatedetail';
import Freeboardedit from './components/Home/freeboard/freeboardedit';
import FreeboardAdd from './components/Home/freeboard/freeboardadd';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Routes>
        <Route path="/freeboard" element={<Freeboard/>}/>
        <Route path="/freeboardadd" element={<FreeboardAdd/>}/>
        <Route path="/freeboard/:id" element={<Freeboarddetail/>}/>
        <Route path="/freeboardedit/:id" element={<Freeboardedit/>}/>
      </Routes>
      <Routes>
        <Route path="/secreteboard" element={<Secreteboard/>}/>
        <Route path="/secreteboard/:id" element={<Secreteboarddetail/>}/>
      </Routes>
      <Routes>
        <Route path="/graduateboard" element={<Graduateboard/>}/>
        <Route path="/graduateboard/:id" element={<Graduateboarddetail/>}/>
      </Routes>
  
     

      </Router>
  )
}

export default App
