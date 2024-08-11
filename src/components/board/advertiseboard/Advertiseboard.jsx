import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useApiClient from "../../../api/apiClient";
import { Alldiv, Bodydiv,BoardBody } from "../../../styles/HomeStyled";
import writeimg from "../../../assets/img/writeimg.png";
import axios from "axios";
import Likeimg from "../../../assets/img/Likediv.png";
import Population from "../../../assets/img/Population.png";
import Question from "../../../assets/img/Questionimg.png";
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
import AdvertiseboardAdd from "./Advertiseboardadd";
const Advertiseboard=()=>{
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const apiClient = useApiClient();
  const handleAddPost = async (newPost) => {
    try {
      const response = await apiClient.post(
        `/api/advertiseboard/save`,
        newPost
      ); // Adjust the endpoint as needed
      const updatedData = [response.data, ...data]; // 새 게시글을 맨 위에 추가합니다.
      setData(updatedData); // Add the new post returned from the server
    } catch (error) {
      console.log(error);
      const userConfirmed = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
      if (userConfirmed) {
        window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
      }
    }
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/advertiseboard/read`
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


    return(<Alldiv>
      <Bodydiv>
        <BoardInBody>
          <Titlediv>홍보 게시판</Titlediv>


          {click ? (
            <AdvertiseboardAdd onAddPost={handleAddPost} onCancel={handleAddClick} />
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
                to={`/advertiseboard/${post.id}`}
              >
                <BoardTitle> {post.title}</BoardTitle>
                <BoardContent>{post.content}</BoardContent>
                <CommentInfo>
                  <LikeIcon src={Likeimg} />
                  <LikeCount>{post.likes}</LikeCount>
                  <CommentIcon src={Comment} />
                  <CommentCount>{countComments(post.advertiseComment)}</CommentCount>
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
    </Alldiv>)
}


export default Advertiseboard;

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
