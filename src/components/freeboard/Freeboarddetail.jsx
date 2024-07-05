import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Data } from "../../data/freeBoard";
import { Alldiv, Bodydiv, Eachseperateboard,BoardBody } from "../../styles/HomeStyled";
import Freeboardedit from "./Freeboardedit";
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
  const [post, setPost] = useState(null); // 초기 상태를 null로 설정
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0); // 전체 댓글 수를 관리

  const [click, setClick] = useState(false);
  const handleAddClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    const post = Data.find((post) => post.id === parseInt(id));
    if (post) {
      setPost(post);
      setCommentCount(
        post.comments.reduce(
          (count, comment) => count + 1 + comment.replies.length,
          0
        )
      );
      //reduce 배열의 각 요소에 대해 주어진 함수를 실행하여 하나의 결과값을 생성
      //post.comments 배열의 모든 댓글과 대댓글의 수를 합산
      //초기 숫자는 0, count=> 누적된 값, comment 현재 처리 중인 배열 요소
    }
  }, [id]);

  const handleDeletePost = () => {
    const index = Data.findIndex((p) => p.id === parseInt(id));
    if (index !== -1) {
      Data.splice(index, 1); // array로부터 삭제
      navigate("/freeboard");
    }
  };

  const handleAddComment = () => {
    const updatedPost = { ...post };
    const idnum = updatedPost.comments.length + 1;
    const newCommentObj = {
      id: idnum,
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
  };

  const handleAddReply = (commentId) => {
    const updatedPost = { ...post };
    const idnum =
      updatedPost.comments.find((comment) => comment.id === commentId).replies
        .length + 1;
    const newReplyObj = {
      id: idnum,
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
  };

  const handleLikePost = () => {
    const updatedPost = { ...post, likes: post.likes + 1 };
    const postIndex = Data.findIndex((p) => p.id === parseInt(id));
    Data[postIndex] = updatedPost;
    setPost(updatedPost);
  };
  console.log(post);

  return (
    <Alldiv>     
      <Bodydiv>
       <BoardBody> 
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>작성자: {post.author}</p>
          <p>좋아요: {post.likes}</p>
          <button onClick={handleLikePost}>좋아요</button>

          {click ? (
            <Freeboardedit id={post.id} onCancel={handleAddClick} />
          ) : (
            <div onClick={handleAddClick}>수정</div>
          )}
          
          <button onClick={handleDeletePost}>삭제</button>

          <h2>댓글</h2>
          <ul>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <li key={comment.id}>
                  <p>
                    {comment.content} - {comment.author}
                  </p>
                  <button onClick={() => setReplyTo(comment.id)}>답글</button>
                  <ul>
                    {comment.replies.map((reply) => (
                      <li key={reply.id}>
                        <p>
                          {reply.content} - {reply.author}
                        </p>
                      </li>
                    ))}
                  </ul>
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
