import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { Alldiv, Bodydiv,BoardBody } from "../../../styles/HomeStyled";
import writeimg from "../../../assets/img/writeimg.png";
import axios from "axios";
import Population from "../../../assets/img/Population.png";
import Question from "../../../assets/img/Questionimg.png";
import Likeimg from "../../../assets/img/Likediv.png";

import {
  Titlediv,
  BoardInBody,
  Writedivoff,
  Writecomment,
  Eachseperateboard,
  Writeimg,
  BoardAlldiv,
  BoardTitle,
  BoardContent,
} from "../../../styles/BoardStyled";
import Comment from "../../../assets/img/Commentpicture.png";

import leftarrow from "../../../assets/img/leftarrow.png";
import rightarrow from "../../../assets/img/rightarrow.png";
import CircleboardAdd from "./Circleboardadd";
const Circleboard=()=>{
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

 const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/circleboard/save`,
        newPost
      );
      const updatedData = [response.data, ...data]; // 새 게시글을 맨 위에 추가합니다.

      //const updatedData = [...data, response.data];
      //updatedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // createdAt을 기준으로 내림차순 정렬합니다.
      setData(updatedData);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/circleboard/read/paginated?page=${currentPage}&size=${itemsPerPage}&size=${itemsPerPage}&sortBy=createdAt&sortDir=desc`
          // 현재 페이지에 요청하는 갯수만큼 서버에서 불러서 가져오겠다
        );
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        // 서버에서 totalPages라는 entity를 따로 만들지 않았지만 pagination을 위해 이용한 JPA Page객체가 자동으로 가지고 있는 속성이다.
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleAddClick = () => {
    setClick(!click);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const countComments = (comments) => {
    return comments.reduce(
      (acc, comment) => acc + 1 + comment.replies.length,
      0
    );
  };


    return(<Alldiv>
      <Bodydiv>
        <BoardInBody>
          <Titlediv>클럽 게시판</Titlediv>


          {click ? (
            <CircleboardAdd onAddPost={handleAddPost} onCancel={handleAddClick} />
          ) : (
            <Writedivoff onClick={handleAddClick}>
              <Writecomment> 새 글을 작성해 주세요!</Writecomment>
              <Writeimg src={writeimg}></Writeimg>
            </Writedivoff>
          )}

          <BoardAlldiv>
            {data.map((post) => (
              <Eachseperateboard
                key={post.id}
                width={"80%"}
                to={`/circleboard/${post.id}`}
              >
                <BoardTitle> {post.title}</BoardTitle>
                <BoardContent>{post.content}</BoardContent>
                <CommentInfo>
                  <LikeIcon src={Likeimg} />
                  <LikeCount>{post.likes}</LikeCount>
                  <CommentIcon src={Comment} />
                  <CommentCount>{countComments(post.circleComment)}</CommentCount>
                  <CommentTime>
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </CommentTime>
                  <CommentAuthor>익명</CommentAuthor>
                </CommentInfo>
              </Eachseperateboard>
            ))}
          </BoardAlldiv>

          <Pagination>
          {currentPage === 0 && data.length < itemsPerPage && null}
          {currentPage !== 0 && data.length < itemsPerPage && (
              <>
                <Previousbutton onClick={handlePrevPage}>
                  <Leftarrow src={leftarrow} />
                  이전
                </Previousbutton>
                <Previousbutton onClick={handleFirstPage}>
                  <Leftarrow src={leftarrow} />
                  처음
                </Previousbutton>
              </>
            )}
            {currentPage === 0 && data.length === itemsPerPage &&  (
              <Nextbutton onClick={handleNextPage}>
                다음
                <Rightarrow src={rightarrow} />
              </Nextbutton>
            )}
            {currentPage !== 0 && data.length === itemsPerPage && (
              <>
                <Previousbutton onClick={handleFirstPage}>
                  <Leftarrow src={leftarrow} />
                  처음
                </Previousbutton>
                <Previousbutton onClick={handlePrevPage}>
                  <Leftarrow src={leftarrow} />
                  이전
                </Previousbutton>

                <Nextbutton onClick={handleNextPage}>
                  다음
                  <Rightarrow src={rightarrow} />
                </Nextbutton>
              </>
            )}
          </Pagination>
        </BoardInBody>
      </Bodydiv>
    </Alldiv>)
}


export default Circleboard;

const Leftarrow = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 7px;
`;
const Rightarrow = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 7px;
`;

const Nextbutton = styled.div`
  float: right;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0 15px 0 10px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #f91f15;
  border-radius: 3px;
  color: #f91f15;
  font-size: 14px;
  font-weight: bold;
  background-repeat: no-repeat;

  background-size: 10px 10px;
  cursor: pointer;
`;

const Previousbutton = styled.div`
  float: left;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0 10px 0 15px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #f91f15;
  border-radius: 3px;
  color: #f91f15;
  font-size: 14px;
  font-weight: bold;
  background-repeat: no-repeat;

  background-size: 10px 10px;
  cursor: pointer;
`;

const Pagination = styled.div`
 
  display: inline-block;
  //justify-content: space-between;
  width: 97.5%;
  margin-top: 20px;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  color: #666;
`;
const LikeIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  font-size: 12px;
  font-weight: 300;
`;

const LikeCount = styled.span`
  margin-right: 8px;
  font-size: 12px;
  font-weight: 400;
  color: #f91f15;
`;

const CommentIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  font-size: 12px;
  font-weight: 300;
`;

const CommentCount = styled.span`
  //margin-right: 8px;
  color: #05bcbc;
  font-size: 12px;
  font-weight: 400;

  &::after {
    margin-left: 4px;
    content: "";
    display: inline-block;
    height: 8px;
    border-left: 1px solid #d6d6d6;
    width: 4px;
  }
`;

const CommentTime = styled.span`
  margin-right: px;
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
  &::after {
    margin-left: 4px;
    content: "";
    display: inline-block;
    height: 8px;
    border-left: 1px solid #d6d6d6;
    width: 4px;
  }
`;

const CommentAuthor = styled.span`
  margin-right: 15px;
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
`;
