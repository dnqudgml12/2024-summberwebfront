import React from "react";
import { useParams,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { Data } from "../data/freeBoard";
import { Datasss } from "../data/secretBoard";
import { Datass } from "../data/gradutateBoard";
import styled from "styled-components";

const Search=()=>{
    const { query }=useParams();
    const boards = [
        { title: "자유게시판", data: Data, link: "freeboard" },
        { title: "비밀게시판", data: Datasss },
        { title: "졸업게시판", data: Datass },
        { title: "시사·이슈", data: Datass },
        { title: "장터게시판", data: Datass },
        { title: "정보게시판", data: Datass },
        { title: "홍보게시판", data: Datass },
        { title: "취업·진로", data: Datass },
        { title: "동아리·학회", data: Datass }
      ];
      const filteredPosts = boards.flatMap(board =>
        board.data.filter(post =>
          post.title.includes(query) || post.content.includes(query)
        )
      );
      // 여러 객체를 통틀어서 결과 값을 일정하게 리턴해야 하므로 flatMap을 사용하여 나타내는 것이 좋다.
console.log(query);
console.log(filteredPosts);

    return(    
    <ResultsContainer>
      <h1>Search Results for "{query}"</h1>
      {filteredPosts.length === 0 ? (
        <p>No results found</p>
      ) : (
        filteredPosts.map((post, index) => (
          <ResultItem key={index} to={`/${post.link}/${post.id}`}>
            {post.title}
          </ResultItem>
        ))
      )}
    </ResultsContainer>)
}

const ResultsContainer = styled.div`
  padding: 20px;
`;

const ResultItem = styled(Link)`
  display: block;
  margin: 10px 0;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;


export default Search;