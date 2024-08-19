import React from "react";
import { useState,useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { currentPageState } from "../../../../context/boardpage";
import useApiClient from "../../../../api/apiClient";
import FreeboardAdd from "../Freeboardadd";

import writeimg from "../../../../assets/img/writeimg.png";

import { Writedivoff,Writeimg,Writecomment } from "../../../../styles/BoardStyled";
const Freeboardadd= ({fetchData})=>{

    const [data, setData] = useState([]);
    const [click, setClick] = useState(false);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const apiClient = useApiClient();

    const handleAddPost = async (newPost) => {
        try {
          const response = await apiClient.post(
            "/api/freeboard/save",
            newPost,{
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const updatedData = [response.data, ...data]; // 새 게시글을 맨 위에 추가합니다.
       
       //const updatedData = [...data, response.data];
       //updatedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // createdAt을 기준으로 내림차순 정렬합니다.
        setData(updatedData);
    
        fetchData(currentPage) // 현재 페이지 다시 로드 -> 글 작성 후에도 페이지네이션 유지
    
        } catch (error) {
            console.error("Error adding post:", error.response || error.message || error);
       
    
          const userConfirmed = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
          if (userConfirmed) {
            window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
          }
        }
      };

      const handleAddClick = () => {
        setClick(!click);
      };

    return(<>
              {click ? (
            <FreeboardAdd onAddPost={handleAddPost} onCancel={handleAddClick} />
          ) : (
            <Writedivoff onClick={handleAddClick}>
              <Writecomment> 새 글을 작성해 주세요!</Writecomment>
              <Writeimg src={writeimg}></Writeimg>
            </Writedivoff>
          )}

    </>)
}

export default Freeboardadd