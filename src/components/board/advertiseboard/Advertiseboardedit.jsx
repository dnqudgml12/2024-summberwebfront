import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
//import { Data } from "../../../data/freeBoard";
import {
  Addtextarea,
  Addtitle,

  Buttonimgcancle,
  Buttonimgsave,
  Formaddstyld,
  Savecancle,
  Savewrite,

} from "../../../styles/BoardStyled";
import useApiClient from "../../../api/apiClient";
import axios from "axios";
import Cancle from "../../../assets/img/Cancle.png";
import savebutton from "../../../assets/img/Savebutton.png";
const Advertiseboardedit=({id,onCancel})=>{

    /*
    
      const handleUpdatePost = () => {
    axios.put(`/api/graduateboard/${id}`, post).then(() => {
      navigate("/");
    });
  };*/

    //const { id } = useParams();
    const navigate = useNavigate();
    const apiClient = useApiClient();
    const [post, setpost] = useState({ title: "", content: ""});
    const [file, setFile] = useState(null);
  
    /*
    useEffect(() => {
      const posts = Data.find((post) => post.id === parseInt(id));
      if (posts) {
        setpost(posts);
      }
    }, [id]);
  */


    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };


    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/advertiseboard/read/${id}`); // Replace with your API endpoint
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
      const formData = new FormData();
      formData.append("dto", new Blob([JSON.stringify(post)], { type: "application/json" }));
      if (file) {
        formData.append("file", file);
      }
  
      try {
        await apiClient.put(`/api/advertiseboard/update/${id}`, formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }); // Replace with your API endpoint
       // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/advertiseboard/read/${id}`); // Replace with your API endpoint
        //setpost(response.data);
        navigate("/advertiseboard");
        
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

export default Advertiseboardedit;