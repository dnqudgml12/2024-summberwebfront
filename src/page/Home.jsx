import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { Data } from "../data/freeBoard";
import { Datasss } from "../data/secretBoard";
import { Datass } from "../data/gradutateBoard";

import {
  Alldiv,
  Bodydiv,
  Boardalldiv,
  Eachboard,
  Eachseperateboard,
  Leftboard,
  Profilebox,
  Infrombox,
  Informeach,
  ADbox,
  Img,
  Centerbox,
  Centerbanner,
  BannerImg,
  Boards,
  Eachboardword,
  RightSidebar,
  SearchBar,
  PopularPosts,
  SidebarSection,
  SectionTitle,
  PostItem,
  Sectionbox,
  Sectioneachboard,
} from "../styles/HomeStyled";
import mypic from "../assets/img/mypicture.jpeg";
import AD1 from "../assets/img/AD1.jpg";
import AD2 from "../assets/img/AD2.png";
import AD3 from "../assets/img/AD3.png";
import Banner from "../assets/img/bannerAd.png";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const reviews = [
    {
      rating: 4,
      title: "Typography Design 1 : 이재선",
      text: "강의평 중 틀린 말 1개도 없음... 이렇게까지?",
    },
    {
      rating: 2.5,
      title: "파이썬 프로그래밍 : 나대영",
      text: "다른 기초 프로그래밍 과목에서 A 이상 받았다면 이것도 할 만하긴 함...하지만 새내기나 타전공 사람을 위한 수업은 아닌 것 같음. 배우지 못함.",
    },
    {
      rating: 3.5,
      title: "중독심리학 : 신성만",
      text: "내용이 많음, 따라가기 조금 어려움, 하지만 성적은 잘 주심.",
    },
  ];
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  // boards에 게시판 늘어나면 채우기
  const boards = [
    { title: "자유게시판", data: Data, link: "freeboard" },
    { title: "비밀게시판", data: Datasss, link: "secrete" },
    { title: "졸업게시판", data: Datass },
    { title: "시사·이슈", data: Datass },
    { title: "장터게시판", data: Datass },
    { title: "정보게시판", data: Datass },
    { title: "홍보게시판", data: Datass },
    { title: "취업·진로", data: Datass },
    { title: "동아리·학회", data: Datass },
  ];
  return (
    <Alldiv>
      <Bodydiv>
        <Boardalldiv>
          <Leftboard align={"center"} border={"1px solid gray"} width={"175px"}>
            <Profilebox>
              <Myprofile src={mypic} />
              <Myname>우병희 학부생</Myname>
              <Myemail>우병희</Myemail>
              <Myemail>bwyd123</Myemail>
            </Profilebox>
            <Infrombox>
              <Informeach>내가 쓴글</Informeach>
              <Informeach>댓글 단글</Informeach>
              <Informeach borderbottom={"none"}>내 스크랩</Informeach>
            </Infrombox>
            <ADbox>
              <Img src={AD1} />
            </ADbox>
            <ADbox>
              <Img src={AD2} />
            </ADbox>
            <ADbox>
              <Img src={AD3} />
            </ADbox>
          </Leftboard>

          <Centerbox>
            <Centerbanner>
              <BannerImg src={Banner} />
              <Boards>
                {boards.map((board, index) => (
                  <Eachboard key={index}>
                    <Eachboardword to={`/${board.link}`}>
                      {board.title}
                    </Eachboardword>
                    {board.data.slice(0, 6).map((post) => (
                      <Eachseperateboard
                        key={post.id}
                        to={`/${board.link}/${post.id}`}
                      >
                        {post.title}
                      </Eachseperateboard>
                    ))}
                  </Eachboard>
                ))}
              </Boards>
            </Centerbanner>
          </Centerbox>
          
        </Boardalldiv>
      </Bodydiv>
    </Alldiv>
  );
};

export default Home;





const Myprofile = styled.img`
  margin: 15px auto;
  width: 60px;
  height: 60px;
  border-radius: 6px;
`;

const Myname = styled.div`
  margin-top: 10px;
  line-height: 20px;
  white-space: nowrap;
  // overflow: hidden;
  text-overflow: ellipsis;
  color: #393939;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Myemail = styled.div`
  line-height: 15px;
  color: #a6a6a6;
  font-size: 12px;
  text-align: center;
`;
const Mywriting = styled(Link)`
  margin-top: 30px;
  width: 120px;
  height: 30px;
  font-size: 20px;
  padding-top: 7px;
  &:hover {
    background-color: gray;
  }
  text-decoration: none;
  border: 1px solid gray;
`;
const Mycomment = styled(Link)`
  margin-top: 30px;
  width: 120px;
  height: 30px;
  font-size: 20px;
  padding-top: 7px;
  &:hover {
    background-color: gray;
  }
  text-decoration: none;
  border: 1px solid gray;
`;
