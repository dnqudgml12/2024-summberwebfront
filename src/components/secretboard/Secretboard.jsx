import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Datasss } from "../../data/secretBoard";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../styles/HomeStyled";

const Secreteboard=()=>{


    return(<Alldiv>     
      <Bodydiv>
       <BoardBody>        
         <h1>비밀 게시판</h1>
       <Link to='/secreteboard'>글작성</Link>
       <Link style={{borderBottom:"1px solid gray",width:"80.15%"}}/>
         {Datasss.map(post => (
          
             <Eachseperateboard width={"80%"} to={`/secreteboard/${post.id}`}>{post.title}</Eachseperateboard>
       
         ))}
      
       </BoardBody>

       </Bodydiv>
       </Alldiv>)
}


export default Secreteboard;