import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Home=()=>{


    return( <div>
        <h1>게시판 선택</h1>
        <ul>
          <li><Link to="/freeboard">자유 게시판</Link></li>
          <li><Link to="/secreteboard">비밀 게시판</Link></li>
          <li><Link to="/graduateboard">졸업 게시판</Link></li>
        </ul>
      </div>)
}

export default Home;