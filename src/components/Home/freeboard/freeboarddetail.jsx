import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Data } from "../../../data/freeBoard";

const Freeboarddetail=()=>{
    const {id}= useParams();
    const [post,setpost]=useState([]);
    const navigate= useNavigate();
  

    useEffect(() => {
      const posts = Data.find((post) => post.id === parseInt(id));
      if (posts) {
        setpost(posts);
      }
    }, [id]);
    const handleDeletePost = () => {
      const index = Data.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        Data.splice(index, 1); //array로 부터 삭제
        navigate("/freeboard");
      }
    };
    /*
     const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/graduateboard").then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleDeletePost = (id) => {
    axios.delete(`/api/graduateboard/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

     */
    return(<>
    
    {
        post ?(
        <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>작성자: {post.author}</p>

        <Link to={`/freeboardedit/${id}`}>수정</Link>
        <button onClick={handleDeletePost}>삭제</button>

        
      </div>
      ):(
        <p>해당 게시물을 찾을 수 없습니다.</p>
      )

    }
        </>
    )
}

export default Freeboarddetail;