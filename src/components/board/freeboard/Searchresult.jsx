import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Alldiv, Bodydiv, BoardBody } from "../../../styles/HomeStyled";
import FreeboardAdd from "./Freeboardadd";
import axios from "axios";
import Population from "../../../assets/img/Population.png";
import Question from "../../../assets/img/Questionimg.png";
import Likeimg from "../../../assets/img/Likediv.png";
import writeimg from "../../../assets/img/writeimg.png";
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
} from "../../../styles/BoardStyled";
import Comment from "../../../assets/img/Commentpicture.png";
import leftarrow from "../../../assets/img/leftarrow.png";
import rightarrow from "../../../assets/img/rightarrow.png";
const Search = () => {
  const { query } = useParams();
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const freeBoardResponse = await axios.get(
          "http://localhost:8080/api/freeboard/read"
        );

        // Add board type to each post
        const freeBoardData = freeBoardResponse.data.map((post) => ({
          ...post,
          board: "freeboard",
        }));

        setData(freeBoardData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const boards = [{ title: "자유게시판", data: data }];

  const filteredPosts = boards.flatMap((board) =>
    // 여러 객체를 통틀어서 결과 값을 일정하게 리턴해야 하므로 flatMap을 사용하여 나타내는 것이 좋다.
    board.data.filter(
      (post) => post.title.includes(query) || post.content.includes(query)
    )
  );

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
    return comments.reduce(
      (acc, comment) => acc + 1 + comment.replies.length,
      0
    );
  };

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


          <BoardAlldiv>
            {filteredPosts.length === 0 ? (
              <p>No results found</p>
            ) : (
              filteredPosts.map((post) => (
                <Eachseperateboard
                  key={post.id}
                  width={"80%"}
                  to={`/${post.board}/${post.id}`}
                >
                  <BoardTitle> {post.title}</BoardTitle>
                  <BoardContent>{post.content}</BoardContent>
                  <CommentInfo>
                    <LikeIcon src={Likeimg} />
                    <LikeCount>{post.likes}</LikeCount>
                    <CommentIcon src={Comment} />
                    <CommentCount>
                      {countComments(post.freeComment)}
                    </CommentCount>
                    <CommentTime>
                      {new Date(post.createdAt).toLocaleTimeString()}
                    </CommentTime>
                    <CommentAuthor>익명</CommentAuthor>
                  </CommentInfo>
                </Eachseperateboard>
              ))
            )}
          </BoardAlldiv>

          <Pagination>
            {currentPage === 1 && indexOfLastItem >= data.length && null}
            {currentPage != 1 && indexOfLastItem >= data.length && (
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
            {currentPage === 1 && indexOfLastItem < data.length && (
              <Nextbutton onClick={handleNextPage}>
                다음
                <Rightarrow src={rightarrow} />
              </Nextbutton>
            )}
            {currentPage != 1 && indexOfLastItem < data.length && (
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
    </Alldiv>
  );
};

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

export default Search;
