import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Datasss } from "../../data/secretBoard";
const Secreteboarddetail=()=>{

    const { id } = useParams();
    const post = Datasss.find(p => p.id === parseInt(id));
    return(<>{
        post ? (
            <div>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <p>작성자: {post.author}</p>
            </div>
          ) : (
            <p>해당 게시물을 찾을 수 없습니다.</p>
          )
    }
        </>)
}

export default Secreteboarddetail;