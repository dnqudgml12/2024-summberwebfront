import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Data } from "../../../data/freeBoard";

//author부분은 로그인 구현 기능 후에 유저의 이름으로 자동으로 들어가게 할 예정이고
//post state값으로 data를 불러오고 더하는 과정도 api 생성후 axios로 대체 할 예정
/*
 useEffect(() => {
    axios.get(`/api/graduateboard/${id}`).then((response) => {
      setPost(response.data);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = () => {
    axios.post("/api/graduateboard", newpost).then(() => {
      navigate("/");
    });
    setnewpost({ title: "", content: "", author: "" });
  };
  const handleUpdatePost = () => {
    axios.put(`/api/graduateboard/${id}`, post).then(() => {
      navigate("/");
    });
  };
 */
const FreeboardAdd=()=>{

    const [newpost, setnewpost]= useState({ title: "", content: "", author: "" });
    const navigate = useNavigate();


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewpost({ ...newpost, [name]: value });
      };
    
      const handleAddPost = () => {
        Data.push({ id: Data.length + 1, ...newpost });
        setnewpost({ title: "", content: "", author: "" });
        navigate("/freeboard");
      };
    

    return(<div>
        <h1>Add New Post</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="title"
            value={newpost.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <input
            type="textarea"
            name="content"
            value={newpost.content}
            onChange={handleInputChange}
            placeholder="Content"
          />
          <input
            type="text"
            name="author"
            value={newpost.author}
            onChange={handleInputChange}
            placeholder="Author"
          />
          <button onClick={handleAddPost}>Add Post</button>
        </form>
      </div>)
}

export default FreeboardAdd;