import React from "react";
import styled from "styled-components";
import { Link,NavLink } from "react-router-dom";
export const Alldiv = styled.div`
  display: flex;
`;


export const Bodydiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;


export const Boardalldiv = styled.div`
padding-left: 100px;
  display: flex;
  flex-direction: row;
  width: auto;
  height: auto;


`;


export const Eachboard = styled.div`

  align-items: ${(props) => props.align||"none"};
  margin-top: 100px;
  padding-left: ${(props) => props.padle||"0px"};
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width||"400px"};
  height: auto;
  margin-right: 30px;
  background-color: ${(props) => props.color};
  border:  ${(props) => props.border||"none"};
`;



export const Eachboardword= styled.div`
  border:1px solid gray;
  width: 100%;
  height: 50px;
  color: black;
  font-size: 20px;
`

export const Eachseperateboard = styled(Link)`

  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  width: ${(props) => props.width||"100%"};
  height: 50px;
  color: black;
  font-size: 20px;
  text-decoration: none;
  &:hover{
    background-color: gray;
  }
`;

export const BoardBody=styled.div`
display: flex;
flex-direction: column;
margin-top: 100px;
padding-left: 200px;

`