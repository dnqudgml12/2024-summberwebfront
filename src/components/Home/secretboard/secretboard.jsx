import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "../../../data/secretBoard";

const Secreteboard=()=>{


    return(<div>
        <h1>비밀 게시판</h1>
        <ul>
          {Data.map(post => (
            <li key={post.id}>
              <Link to={`/secreteboard/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>)
}

export default Secreteboard;