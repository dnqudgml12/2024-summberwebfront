import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
export const Alldiv = styled.div`
  display: flex;
`;

export const Bodydiv = styled.div`
  margin-top: 350px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;

export const Boardalldiv = styled.div`
  //background-color: red;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  width: 1180;
  box-sizing: border-box;
  height: auto;
`;

export const Leftboard = styled.div`
  margin-top: 100px;
  // float: left;
  margin-right: 15px;
  width: 175px;
  height: 100%;
`;
export const Profilebox = styled.div`
  display: flex;
  flex-direction: column;
  width: 175px;
  margin-bottom: 5px;
  border: 1px solid #d6d6d6;
  background-color: #f9f9f9;
  height: 219px;
`;
export const Infrombox = styled.div`
  margin-bottom: 5px;
  border: 1px solid #d6d6d6;
  background-color: #f9f9f9;
  width: 175px;
  height: 124px;
`;

export const Informeach = styled.div`
  width: 100%;
  display: block;
  padding: 10px 0 10px 37px;
  border-bottom: ${(props) => props.borderbottom || "1px solid #e3e3e3"};
  line-height: 20px;

  box-sizing: border-box;
  color: #444444;
  font-size: 14px;
  background-size: 12px auto;
  //background-position: 15px center;
`;

export const ADbox = styled.div`
  margin-bottom: 5px;
  border: 1px solid #d6d6d6;
  background-color: #f9f9f9;
  width: 175px;
  height: 117.33px;
`;

export const Centerbox = styled.div`
  margin-top: 100px;
  margin-left: 30px;

  width: 605px;
  display: flex;
  flex-direction: column;
`;
export const BannerImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const Centerbanner = styled.div`
  width: 100%;
  height: 159.38px;
`;

export const Eachboard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px 5px 0;
  width: 295px;
  border: 1px solid #e3e3e3;
  overflow: hidden;
  background-color: #f9f9f9;
`;

export const Eachboardword = styled(Link)`
 text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: red;
  padding: 10px;
`;

export const Eachseperateboard = styled(Link)`
  font-size: 14px;
  padding: 10px;
  display: block;
  text-decoration: none;
  color: black;
  border-top: 1px solid #e3e3e3;

  &:hover {
    text-decoration: underline;
  }
`;

export const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding-left: 200px;
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(150px, auto);
  gap: 5px;
`;

export const Eachboards = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

export const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 325px;
  padding: 20px;
  margin-top: 80px;
`;

export const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  line-height: 20px;
  padding: 10px 40px 10px 10px;
  box-sizing: border-box;
  border: 2px solid #d6d6d6;
  color: #292929;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const PopularPosts = styled.div`
  width: 100%;

  border: 1px solid #d6d6d6;
  background-color: #f9f9f9;
  margin-bottom: 20px;
`;
export const Sectioneachboard = styled.div`
  display: flex;
  flex-direction: column;
  //margin: 0 5px 5px 0;
  width: 100%;
  //border: 1px solid #e3e3e3;
  overflow: hidden;
  background-color: #f9f9f9;
`;

export const Sectionbox = styled.div`
  padding: 10px;
  width: 100%;
  height: ${(props) => props.height||"none"};
  border-top: 1px solid #e3e3e3;
`;

export const SidebarSection = styled.div`
  width: 100%;

  border: 1px solid #d6d6d6;
  background-color: #f9f9f9;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
//background-color: blue;
color: #056AB5;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
 // margin-bottom: 10px;
`;

export const PostItem = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
