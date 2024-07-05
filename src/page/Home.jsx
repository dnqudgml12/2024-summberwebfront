import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Homenavbar from "../components/Home/Homenavbar";
import { Data } from "../data/freeBoard";
import { Datasss } from "../data/secretBoard";
import { Datass } from "../data/gradutateBoard";
import {Alldiv,Bodydiv,Boardalldiv,Eachboard,Eachboardword,Eachseperateboard} from "../styles/HomeStyled";
import mypic from "../assets/img/mypicture.jpeg";
const Home = () => {
  return (
    <Alldiv>

      <Bodydiv>
        <Boardalldiv>
          <Eachboard align={"center"} border={"1px solid gray"}width={"300px"}>
          <Myprofile src={mypic} />
          <Myname>우병희 학부생</Myname>
          <Myemail>dnqudgml@gmail.com</Myemail>
          <Mywriting>내가 쓴글</Mywriting>
          <Mycomment>댓글 단글</Mycomment>
          </Eachboard>
          <Eachboard padle={"70px"}>
          <Eachboardword >자유게시판</Eachboardword>
            {Data.slice(0,8).map((post) => (
              
                <Eachseperateboard to = {`/freeboard/${post.id}`} >
                  {post.title}</Eachseperateboard>
           
            ))}
          </Eachboard>
          <Eachboard>
          <Eachboardword>비밀 게시판</Eachboardword>
            {Datasss.slice(0,8).map((post) => (
              
                <Eachseperateboard to = {`/secreteboard/${post.id}`} >
                  {post.title}</Eachseperateboard>
           
            ))}
          </Eachboard>

          <Eachboard>
          <Eachboardword>졸업 게시판</Eachboardword>
            {Datass.slice(0,8).map((post) => (
              
                <Eachseperateboard to = {`/graduateboard/${post.id}`} >
                  {post.title}</Eachseperateboard>
           
            ))}
          </Eachboard>
        </Boardalldiv>
      </Bodydiv>
    </Alldiv>
  );
};

const Myprofile= styled.img`

  padding-top: 30px;
  width: 200px;
  height: 150px;

`

const Myname= styled.div`

  margin-top: 30px;
   width: 120px;
   height: 30px;
   font-size:20px;

`

const Myemail= styled.div`

  margin-top: 10px;
  padding-left: -20px;
   width: auto;
   height: 50px;
   font-size:20px;

`
const Mywriting= styled(Link)`
    margin-top: 30px;
   width: 120px;
   height: 30px;
   font-size:20px;
   padding-top: 7px;
   &:hover{
    background-color: gray;
   }
   text-decoration: none;
   border: 1px solid gray;

`
const Mycomment= styled(Link)`
    margin-top: 30px;
   width: 120px;
   height: 30px;
   font-size:20px;
   padding-top: 7px;
   &:hover{
    background-color: gray;
   }
   text-decoration: none;
   border: 1px solid gray;

`

export default Home;
