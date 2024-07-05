import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "../../../data/freeBoard";
const Freeboard=()=>{


    return(  <div>
        <h1>자유 게시판</h1>
        <Link to='/freeboardadd'>글작성</Link>
        <ul>
          {Data.map(post => (
            <li key={post.id}>
              <Link to={`/freeboard/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>)
}

export default Freeboard;