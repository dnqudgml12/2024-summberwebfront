import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Data as initialData } from "../../data/freeBoard";
import { Alldiv, Bodydiv, BoardBody } from "../../styles/HomeStyled";
import FreeboardAdd from "./Freeboardadd";
import axios from "axios";
import Population from "../../assets/img/Population.png";
import Question from "../../assets/img/Questionimg.png";
import Likeimg from "../../assets/img/Likediv.png";
import writeimg from "../../assets/img/writeimg.png";
import {
  Titlediv,
  BoardInBody,
  SecondInBody,
  QuestionImg,
  QuestionOne,
  FirstinSecondbody,
  PopulationImg,
  PopulationOne,
  Likediv,
  Writedivoff,
  Writecomment,
  Eachseperateboard,
  Writeimg,
  BoardAlldiv,
  BoardTitle,
  BoardContent,
} from "../../styles/BoardStyled";
import Comment from "../../assets/img/Commentpicture.png"

const Freeboard = () => {
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/freeboard/save",
        newPost
      ); // Adjust the endpoint as needed
      setData([...data, response.data]); // Add the new post returned from the server
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/freeboard/read"
        ); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    setClick(!click);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .slice()
    .reverse()
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const countComments = (comments) => {
    return comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0);
  };

  const countLikes = (likes) => {
    return likes.reduce((acc, like) => acc + 1 + likes.replies.length, 0);
  };

  return (
    <Alldiv>
      <Bodydiv>
        <BoardInBody>
          <Titlediv>자유 게시판</Titlediv>
          <SecondInBody>
            <FirstinSecondbody>
              <QuestionImg src={Question} />
              <QuestionOne>학점교류하고 성적</QuestionOne>
              <QuestionOne>경주 맛집</QuestionOne>
            </FirstinSecondbody>

            <FirstinSecondbody>
              <PopulationImg src={Population} />
              <PopulationOne>
                <span
                  style={{
                    color: "#666",
                    fontSize: "14px",

                    letterSpacing: "-0.5px", // 글자 사이 간격
                  }}
                >
                  입대
                </span>
                <Likediv src={Likeimg} />
                <span
                  style={{
                    color: "#F91F15",
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  12
                </span>
              </PopulationOne>
            </FirstinSecondbody>
          </SecondInBody>

          {click ? (
            <FreeboardAdd onAddPost={handleAddPost} onCancel={handleAddClick} />
          ) : (
            <Writedivoff onClick={handleAddClick}>
              <Writecomment> 새 글을 작성해 주세요!</Writecomment>
              <Writeimg src={writeimg}></Writeimg>
            </Writedivoff>
          )}

<BoardAlldiv>
{currentItems
            .map((post) => (
              <Eachseperateboard
                key={post.id}
                width={"80%"}
                to={`/freeboard/${post.id}`}
              >
               <BoardTitle> {post.title}</BoardTitle>
               <BoardContent>{post.content}</BoardContent>
               <CommentInfo>
               <LikeIcon src={Likeimg}/>
               <LikeCount>{post.likes}</LikeCount>
                  <CommentIcon src={Comment}/>
                  <CommentCount>{countComments(post.freeComment)}</CommentCount>
                  <CommentTime>{new Date(post.createdAt).toLocaleTimeString()}</CommentTime>
                  <CommentAuthor>익명</CommentAuthor>
                </CommentInfo>
               
              </Eachseperateboard>
            ))}


</BoardAlldiv>
        
   
          <Pagination>
            {currentPage === 1 && indexOfLastItem >= data.length && null}
            {currentPage != 1 && indexOfLastItem >= data.length && (
              <>
              <button onClick={handlePrevPage}>이전</button>
              <button onClick={handleFirstPage} disabled={currentPage === 1}>
              처음
            </button>
            </>
            )}
            {currentPage === 1 && indexOfLastItem < data.length && (
              <button onClick={handleNextPage}>다음</button>
            )}
            {currentPage != 1 && indexOfLastItem < data.length && (
              <>
              <button onClick={handleFirstPage} disabled={currentPage === 1}>
              처음
            </button>
                <button onClick={handlePrevPage}>이전</button>

                <button onClick={handleNextPage}>다음</button>
              </>
            )}
          </Pagination>
        </BoardInBody>
      </Bodydiv>
    </Alldiv>
  );
};

export default Freeboard;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
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
  color: #F91F15;;

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
  color: #05BCBC;
  font-size: 12px;
  font-weight: 400;


  &::after{
    margin-left: 4px;
    content: '';
    display: inline-block;
    height: 8px;
    border-left: 1px solid #D6D6D6;
    width: 4px;
  }
`;

const CommentTime = styled.span`
  margin-right: px;
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
  &::after{
    margin-left: 4px;
    content: '';
    display: inline-block;
    height: 8px;
    border-left: 1px solid #D6D6D6;
    width: 4px;
  }
`;

const CommentAuthor = styled.span`
  margin-right: 15px;
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
`;