import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Data as initialData } from "../../data/freeBoard";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../styles/HomeStyled";
import FreeboardAdd from "./Freeboardadd";
import axios from "axios";
const Freeboard=()=>{

  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);

  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post("http://localhost:8080/api/board/save", newPost); // Adjust the endpoint as needed
      setData([...data, response.data]); // Add the new post returned from the server
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/board/read"); // Replace with your API endpoint
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

    return(  
    <Alldiv>     
       <Bodydiv>
        <BoardBody>        
          <h1>자유 게시판</h1>

          {click ? (
            <FreeboardAdd onAddPost={handleAddPost} onCancel={handleAddClick} />
          ) : (
            <button style={{width:"20px"}} onClick={handleAddClick}>글작성</button>
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