import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Datass } from "../../data/gradutateBoard";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../styles/HomeStyled";
const Graduateboard = () => {
  return (
    <Alldiv>     
       <Bodydiv>
        <BoardBody>        
          <h1>졸업 게시판</h1>
        <Link to='/freeboardadd'>글작성</Link>
        <Link style={{borderBottom:"1px solid gray",width:"80.15%"}}/>
          {Datass.map(post => (
           
              <Eachseperateboard width={"80%"} to={`/graduateboard/${post.id}`}>{post.title}</Eachseperateboard>
        
          ))}
       
        </BoardBody>

        </Bodydiv>
        </Alldiv>
  );
};


export default Graduateboard;
