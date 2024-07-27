import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Alldiv, Bodydiv, BoardBody, SearchBar } from "../../../styles/HomeStyled";
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
import useApiClient from "../../../api/apiClient";
import { useRecoilState } from 'recoil';
import { currentPageState, totalPagesState } from "../../../context/boardpage";

const Freeboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [totalPages, setTotalPages] = useRecoilState(totalPagesState);
  const itemsPerPage = 20;

  const apiClient = useApiClient();
  //const [userInfo] = useRecoilState(userState);

  const handleAddPost = async (newPost) => {
    try {
      const response = await apiClient.post(
        "/api/freeboard/save",
        newPost
      );
      const updatedData = [response.data, ...data]; // 새 게시글을 맨 위에 추가합니다.
   
   //const updatedData = [...data, response.data];
   //updatedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // createdAt을 기준으로 내림차순 정렬합니다.
    setData(updatedData);

    fetchData(currentPage) // 현재 페이지 다시 로드 -> 글 작성 후에도 페이지네이션 유지

    } catch (error) {
      const userConfirmed = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
      if (userConfirmed) {
        window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
      }
    }
  };

  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/read/paginated?page=${page}&size=${itemsPerPage}&size=${itemsPerPage}&sortBy=createdAt&sortDir=desc`
        // 현재 페이지에 요청하는 갯수만큼 서버에서 불러서 가져오겠다
      );
      setData(response.data.content || []); // response.data.content가 undefined일 경우 빈 배열로 설정
      setTotalPages(response.data.totalPages || 0); // response.data.totalPages가 undefined일 경우 0으로 설정
      // 서버에서 totalPages라는 entity를 따로 만들지 않았지만 pagination을 위해 이용한 JPA Page객체가 자동으로 가지고 있는 속성이다.
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {

    fetchData(currentPage);
  }, [currentPage]);

  console.log(data);

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
    if (!comments) return 0; // comments가 undefined인 경우 0을 반환
    return comments.reduce((acc, comment) => acc + 1 + (comment.replies ? comment.replies.length : 0), 0);
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
                <span style={{ color: "#666", fontSize: "14px", letterSpacing: "-0.5px" }}>
                  입대
                </span>
                <Likediv src={Likeimg} />
                <span style={{ color: "#F91F15", fontSize: "14px", marginLeft: "5px" }}>
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
            {data && data.map((post) => (
              <Eachseperateboard
                key={post.id}
                width={"80%"}
                to={`/freeboard/${post.id}`}
              >
                <BoardTitle>{post.title}</BoardTitle>
                <BoardContent>{post.content}</BoardContent>
                <CommentInfo>
                  <LikeIcon src={Likeimg} />
                  <LikeCount>{post.likes}</LikeCount>
                  <CommentIcon src={Comment} />
                  <CommentCount>{countComments(post.freeComment)}</CommentCount>
                  <CommentTime>{new Date(post.createdAt).toLocaleTimeString()}</CommentTime>
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
            {currentPage === 0 && data.length === itemsPerPage && (
              <div style={{ display: "flex" }}>
                <form onSubmit={handleSearchSubmit}>
                  <SearchBar
                    placeholder="자유 게시판의 글을 검색하세요!"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <Nextbutton onClick={handleNextPage}>
                  다음
                  <Rightarrow src={rightarrow} />
                </Nextbutton>
              </div>
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
    </Alldiv>
  );
};

export default Freeboard;

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
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
`;

/*
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//import { Data as initialData } from "../../data/freeBoard";
import { Alldiv, Bodydiv, BoardBody, SearchBar } from "../../../styles/HomeStyled";
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
const Freeboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };
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
    return comments.reduce(
      (acc, comment) => acc + 1 + comment.replies.length,
      0
    );
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
            {currentItems.map((post) => (
              <Eachseperateboard
                key={post.id}
                width={"80%"}
                to={`/freeboard/${post.id}`}
              >
                <BoardTitle> {post.title}</BoardTitle>
                <BoardContent>{post.content}</BoardContent>
                <CommentInfo>
                  <LikeIcon src={Likeimg} />
                  <LikeCount>{post.likes}</LikeCount>
                  <CommentIcon src={Comment} />
                  <CommentCount>{countComments(post.freeComment)}</CommentCount>
                  <CommentTime>
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </CommentTime>
                  <CommentAuthor>익명</CommentAuthor>
                </CommentInfo>
              </Eachseperateboard>
            ))}
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
              <div style={{ display: "flex" }}>
                <form onSubmit={handleSearchSubmit}>
                  <SearchBar
                    placeholder="자유 게시판의 글을 검색하세요!"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <Nextbutton onClick={handleNextPage}>
                  다음
                  <Rightarrow src={rightarrow} />
                </Nextbutton>
              </div>
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

export default Freeboard;

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
*/