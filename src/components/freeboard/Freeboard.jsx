import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Data as initialData } from "../../data/freeBoard";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../styles/HomeStyled";
import FreeboardAdd from "./Freeboardadd";

const Freeboard=()=>{

  const [data, setData] = useState(initialData);
  const [click, setClick] = useState(false);

  const handleAddPost = (newPost) => {
    setData([...data, { id: data.length + 1, ...newPost }]);
  };

  const handleAddClick = () => {
    setClick(!click);
  };

    return(  
    <Alldiv>     
       <Bodydiv>
        <BoardBody>        
          <h1>자유 게시판</h1>

          {click ? (
            <FreeboardAdd onAddPost={handleAddPost} onCancel={handleAddClick} />
          ) : (
            <div onClick={handleAddClick}>글작성</div>
          )}
    
        <Link style={{borderBottom:"1px solid gray",width:"80.15%"}}/>
          {data.map(post => (
           
              <Eachseperateboard width={"80%"} to={`/freeboard/${post.id}`}>{post.title}</Eachseperateboard>
        
          ))}
       
        </BoardBody>

        </Bodydiv>
        </Alldiv>

      )
}





export default Freeboard;