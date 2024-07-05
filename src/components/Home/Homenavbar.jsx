import styled from "styled-components";
import { React, useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import everyimg from "../../assets/img/nav.logo.png";
const Homenavbar = () => {
  const navigate = useNavigate();

  return (
    <Navdiv>
      <Img
        src={everyimg}
        onClick={() => {
          navigate("/");
        }}
      />

      <LinkContent padle={"200px"} to={"/freeboard"}>
        자유 게시판
      </LinkContent>
      <LinkContent to={"/secreteboard"}>비밀 게시판</LinkContent>
      <LinkContent to={"/graduateboard"}>졸업 게시판</LinkContent>
      <LinkContent to={"/schedule"}>시간표 게시판</LinkContent>
    </Navdiv>
  );
};
export default Homenavbar;

const Navdiv = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: row;
  position: fixed;
  z-index: 100;

  width: 100%;
  height: 80px;
  border-bottom: 1px solid #d6d6d6;
  background-color: #fff;
`;

const Img = styled.img`
  padding-left: 20px;
  cursor: pointer;
  height: 100%;
`;

//https://ramincoding.tistory.com/entry/React-React-Router-NavLink-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-VS-Link-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8
const LinkContent = styled(NavLink)`
  margin-left: ${(props) => props.padle || "80px"};
  width: auto;
  font-size: 20px;
  color: black;
  height: 30px;
  padding-top: 15px;
  padding-bottom: 15px;

  text-decoration: none;

  &.active {
    color: red;
    width: auto;
    border-bottom: 8px solid red;
  }
`;

/*
//이런식으로도 쓰임
<NavLink
  to="/home"
  style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
>
  This page is...
</NavLink>
*/
