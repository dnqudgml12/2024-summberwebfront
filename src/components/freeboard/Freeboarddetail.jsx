import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Data } from "../../data/freeBoard";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../styles/HomeStyled";
import Freeboardedit from "./Freeboardedit";
import axios from "axios";
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
const FreeboardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(); // 초기 상태를 null로 설정
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0); // 전체 댓글 수를 관리
  const [liked, setLiked] = useState(false);

  const [click, setClick] = useState(false);
  const handleAddClick = () => {
    setClick(!click);
  };


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/board/read/${id}`); // Replace with your API endpoint
        setPost(response.data);
        setCommentCount(
          response.data.comments.reduce(
            (count, comment) => count + 1 + comment.replies.length,
            0
             //reduce 배열의 각 요소에 대해 주어진 함수를 실행하여 하나의 결과값을 생성
      //post.comments 배열의 모든 댓글과 대댓글의 수를 합산
      //초기 숫자는 0, count=> 누적된 값, comment 현재 처리 중인 배열 요소
          )

        );
        setLiked(response.data.likeStatus);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };

    fetchPost();
  }, [id]);


  const handleDeletePost = async() => {

    try {
      await axios.delete(`http://localhost:8080/api/board/delete/${id}`);
      navigate("/freeboard");
    } catch (error) {
      console.error("Error deleting post", error);
    }

    /*
    const index = Data.findIndex((p) => p.id === parseInt(id));
    if (index !== -1) {
      Data.splice(index, 1); // array로부터 삭제
      navigate("/freeboard");
    }*/
  };

  const handleAddComment = async() => {
  
    const newCommentObj = {
      content: newComment,
      author: `익명${commentCount + 1}`,
  
    };

    try {
      await axios.post(`http://localhost:8080/api/board/${id}/comments`, newCommentObj);
      const response = await axios.get(`http://localhost:8080/api/board/read/${id}`); 
      setPost(response.data);
      setCommentCount(commentCount + 1);
      setNewComment("");
      setReplyTo(null);
      navigate(`/freeboard/${id}`);

    } catch (error) {
      console.error("Error adding comment", error);
    }

    /*
    const updatedPost = { ...post };
    const idnum = updatedPost.comments.length + 1;
    const newCommentObj = {
      
      content: newComment,
      author: `익명${commentCount + 1}`,
      replies: [],
    };

    if (replyTo) {
      const parentComment = updatedPost.comments.find(
        (comment) => comment.id === replyTo
      );
      if (parentComment) {
        parentComment.replies.push(newCommentObj);
      }
    } else {
      updatedPost.comments.push(newCommentObj);
    }

    const postIndex = Data.findIndex((p) => p.id === parseInt(id));
    Data[postIndex] = updatedPost;
    setPost(updatedPost);
    setCommentCount(commentCount + 1);
    setNewComment("");
    setReplyTo(null);
*/
    
  };

  const handleAddReply = async(commentId) => {

    const newReplyObj = {
      content: newReply,
      author: `익명${commentCount + 1}`,
    };
    navigate(`/freeboard/${id}`);
    try {
     await axios.post(`http://localhost:8080/api/board/${id}/comments/${commentId}/replies`, newReplyObj);

     //post 하는 동안, get을 가져옴
      const response = await axios.get(`http://localhost:8080/api/board/read/${id}`); 
      setPost(response.data);
      setCommentCount(commentCount + 1);
      setNewReply("");
      setReplyTo(null);
      
    } catch (error) {
      console.error("Error adding reply", error);
    }

    /*
    const updatedPost = { ...post };
    const idnum =
      updatedPost.comments.find((comment) => comment.id === commentId).replies
        .length + 1;
    const newReplyObj = {
     
      content: newReply,
      author: `익명${commentCount + 1}`,
    };

    const parentComment = updatedPost.comments.find(
      (comment) => comment.id === commentId
    );
    if (parentComment) {
      parentComment.replies.push(newReplyObj);
    }

    const postIndex = Data.findIndex((p) => p.id === parseInt(id));
    Data[postIndex] = updatedPost;
    setPost(updatedPost);
    setCommentCount(commentCount + 1);
    setNewReply("");
    setReplyTo(null);
    */
  };

  /*
  const handleLikePost = () => {
    const updatedPost = { ...post, likes: post.likes + 1 };
    const postIndex = Data.findIndex((p) => p.id === parseInt(id));
    Data[postIndex] = updatedPost;
    setPost(updatedPost);
  };
  */

  const handleLikePost = async () => {
    // 좋아요 누르면 그 상태를 db에 저장(true,false)
    try {
      if (!liked) {
        await axios.post(`http://localhost:8080/api/board/like/${id}`); //좋아요 눌린상태+1
        setLiked(true);
      } else {
        await axios.delete(`http://localhost:8080/api/board/unlike/${id}`); // 좋아요 취소한 상태 -1
        setLiked(false);
      }
      const response = await axios.get(`http://localhost:8080/api/board/read/${id}`);
      setPost(response.data); // Update the post with the new like count
      setLiked(response.data.likeStatus);
    } catch (error) {
      console.error("Error liking/unliking post", error);
    }
  };
  console.log(post,"aa");

  return (
    <Alldiv>     
      <Bodydiv>
       <BoardBody> 
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>좋아요: {post.likes}</p>
          {!liked ? (  <button onClick={handleLikePost}>
                좋아요
              </button>):(<button onClick={handleLikePost}>
                좋아요 취소
              </button>
)}
            
           
          {click ? (
            <Freeboardedit id={post.id} onCancel={handleAddClick} />
          ) : (
            <button onClick={handleAddClick}>수정</button >
          )}
          
          <button onClick={handleDeletePost}>삭제</button>

          <h2>댓글</h2>
          <ul>
            {
            post.comments.length>0 ? (
              post.comments.map((comment) => (
                <li key={comment.id}>
                  <p>
                    {comment.content} - {comment.author}
                  </p>
                  <button onClick={() => setReplyTo(comment.id)}>답글</button>
                  {replyTo === comment.id && (
                    <div>
                      <textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="답글을 입력하세요"
                      />
                      <button onClick={() => handleAddReply(comment.id)}>
                        답글 달기
                      </button>
                    </div>
                  )}
                  <ul>
                    {comment.replies.map((reply) => (
                      <div key={reply.sequenceNumber}>
                        <p style={{textIndent:"30px"}}>
                          {reply.content} - {reply.author}
                        </p>
                      </div>
                    ))}
                  </ul>
            
                </li>
              ))
            ) : (
              <p>댓글이 없습니다.</p>
            )}
          </ul>

          <h3>댓글 추가</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <button onClick={handleAddComment}>
            {replyTo ? "답글 달기" : "댓글 달기"}
          </button>
        </div>
      ) : (
        <p>해당 게시물을 찾을 수 없습니다.</p>
      )}
   </BoardBody>

</Bodydiv>
</Alldiv>
  );
};

export default FreeboardDetail;
