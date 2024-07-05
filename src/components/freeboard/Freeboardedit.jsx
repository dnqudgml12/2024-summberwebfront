import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Data } from "../../data/freeBoard";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../styles/HomeStyled";

const Freeboardedit=({id,onCancel})=>{

    /*
    
      const handleUpdatePost = () => {
    axios.put(`/api/graduateboard/${id}`, post).then(() => {
      navigate("/");
    });
  };*/

    //const { id } = useParams();
    const navigate = useNavigate();
    const [post, setpost] = useState({ title: "", content: "", author: "" });
  
    useEffect(() => {
      const posts = Data.find((post) => post.id === parseInt(id));
      if (posts) {
        setpost(posts);
      }
    }, [id]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setpost({ ...post, [name]: value });
    };
  
    const handleUpdatePost = () => {
      const index = Data.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        Data[index] = post;
        navigate("/freeboard");
      }
    };
  
    return (
      <Alldiv>     
      <Bodydiv>
       <BoardBody> 
        <h1>Edit Post</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="content"
            value={post.content}
            onChange={handleInputChange}
            placeholder="Content"
          />
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleInputChange}
            placeholder="Author"
          />
          <button onClick={handleUpdatePost}>Update Post</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
        </BoardBody>

</Bodydiv>
</Alldiv>
    );
  };

export default Freeboardedit;