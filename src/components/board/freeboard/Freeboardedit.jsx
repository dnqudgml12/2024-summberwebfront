import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
//import { Data } from "../../data/freeBoard";
import {
  Addtextarea,
  Addtitle,

  Buttonimgcancle,
  Buttonimgsave,
  Formaddstyld,
  Savecancle,
  Savewrite,

} from "../../../styles/BoardStyled";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../../styles/HomeStyled";
import axios from "axios";
import useApiClient from "../../../api/apiClient";
import Cancle from "../../../assets/img/Cancle.png";
import savebutton from "../../../assets/img/Savebutton.png";
const Freeboardedit=({id,onCancel})=>{

    /*
    
      const handleUpdatePost = () => {
    axios.put(`/api/graduateboard/${id}`, post).then(() => {
      navigate("/");
    });
  };*/

    //const { id } = useParams();
    const navigate = useNavigate();
    const apiClient = useApiClient();
    const [post, setpost] = useState({ title: "", content: "" });
  
    /*
    useEffect(() => {
      const posts = Data.find((post) => post.id === parseInt(id));
      if (posts) {
        setpost(posts);
      }
    }, [id]);
  */

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/freeboard/read/${id}`); // Replace with your API endpoint
          setpost(response.data);
        } catch (error) {
          console.error("Error fetching post", error);
        }
      };
  
      fetchPost();
    }, [id]);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setpost({ ...post, [name]: value });
    };
  
    /*
    const handleUpdatePost = () => {
      const index = Data.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        Data[index] = post;
        navigate("/freeboard");
      }
    };
  */
    const handleUpdatePost = async () => {
      try {
        console.log(`Updating post with id: ${id}`);  // Logging for debugging
        console.log(post);  // Logging the post data
        await apiClient.put(`/api/freeboard/update/${id}`, post);
       
        navigate("/freeboard");
      } catch (error) {
        console.error("Error updating post", error);
      }
    };
    
    return (
      <Formaddstyld onSubmit={(e) => e.preventDefault()}>
         <Addtitle
        type="text"
        name="title"
        value={post.title}
        onChange={handleInputChange}
        placeholder="글 제목"
      />
      <Addtextarea
      name="content"
      value={post.content}
      onChange={handleInputChange}/>
      <div style={{ width: "auto", display: "flex", height: "40px" }}>
        <Savewrite type="button" onClick={handleUpdatePost}>
          <Buttonimgsave src={savebutton}/>
        </Savewrite>
        <Savecancle type="button" onClick={onCancel}>
        <Buttonimgcancle src={Cancle}/>
        </Savecancle>
      </div>
      
        </Formaddstyld>  
    
    );
  };

export default Freeboardedit;