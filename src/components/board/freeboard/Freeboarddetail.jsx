import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
//import { Data } from "../../data/freeBoard";
import {
  Alldiv,
  Bodydiv,
  Eachseperateboard,
  BoardBody,
} from "../../../styles/HomeStyled";
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
import {
  BoardInBody,
  Imgandnameinfrom,
  Imgpicture,
  NameandTime,
  SecondIndetailBody,
  Titlediv,
  Names,
  Dates,
  Likecommentdiv,
  Titledetaildiv,
  Contentdetaildiv,
  Likedetailbutton,
  Likedetaildiv,
  Likedetailimg,
  DeleteandModity,
  Modifydiv,
  Deletediv,
  Commentsavedetail,
  Inputdivdetail,
  Savewrite,
  Buttonimgsave,
  Savewritedetail,
  Commentbox,
  Namepicturecomment,
  Picturecomment,
  Namecomment,
  Contentcomment,
  Datecommet,
  Replycomment,
  Likecomment,
  Singoomment,
  Messagecomment,
  Replysavedetail,
  Inputreplydetail,
  ReplyDiv,
  Replycontent,
  Replydate,
} from "../../../styles/BoardStyled";

import anony from "../../../assets/img/anonypicture.png";
import Comment from "../../../assets/img/Commentpicture.png";
import Likeimg from "../../../assets/img/Likediv.png";
import likedetail from "../../../assets/img/Likedetail.png";
import savebutton from "../../../assets/img/Savebutton.png";
import { BiLike } from "react-icons/bi";
const FreeboardDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(); // 초기 상태를 null로 설정
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0); // 전체 댓글 수를 관리
  const [liked, setLiked] = useState(false);

  const [click, setClick] = useState(false);// 관리 수정 상태

  const handleAddClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/freeboard/read/${id}`
        ); // Replace with your API endpoint
        setPost(response.data);
        setCommentCount(
          response.data.freeComment.reduce(
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

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/freeboard/delete/${id}`);
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

  const handleAddComment = async () => {
    const newCommentObj = {
      content: newComment,
      author: `익명${commentCount + 1}`,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/freeboard/${id}/comments`,
        newCommentObj
      );
      const response = await axios.get(
        `http://localhost:8080/api/freeboard/read/${id}`
      );
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

  const handleAddReply = async (commentId) => {
    const newReplyObj = {
      content: newReply,
      author: `익명${commentCount + 1}`,
    };
    navigate(`/freeboard/${id}`);
    try {
      await axios.post(
        `http://localhost:8080/api/freeboard/${id}/comments/${commentId}/replies`,
        newReplyObj
      );

      //post 하는 동안, get을 가져옴
      const response = await axios.get(
        `http://localhost:8080/api/freeboard/read/${id}`
      );
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
        await axios.post(`http://localhost:8080/api/freeboard/like/${id}`); //좋아요 눌린상태+1
        setLiked(true);
      } else {
        await axios.delete(`http://localhost:8080/api/freeboard/unlike/${id}`); // 좋아요 취소한 상태 -1
        setLiked(false);
      }
      const response = await axios.get(
        `http://localhost:8080/api/freeboard/read/${id}`
      );
      setPost(response.data); // Update the post with the new like count
      setLiked(response.data.likeStatus);
    } catch (error) {
      console.error("Error liking/unliking post", error);
    }
  };
  console.log(post, "aa");
  const countComments = (comments) => {
    return comments.reduce(
      (acc, comment) => acc + 1 + comment.replies.length,
      0
    );
  };

  return (
    <Alldiv>
      <Bodydiv>
        <BoardInBody>
          <Titlediv>자유게시판</Titlediv>
          {post ? (
            <>
              <SecondIndetailBody>
                <Imgandnameinfrom>
                  <Imgpicture src={anony} />
                  <NameandTime>
                    <Names>익명</Names>
                    <Dates>
                      {new Date(post.createdAt).toLocaleTimeString()}
                    </Dates>
                  </NameandTime>

                  <DeleteandModity>
                  <Modifydiv onClick={handleAddClick}>
                      {click ? "" : "수정"}
                    </Modifydiv>

                    <Deletediv onClick={handleDeletePost}>삭제</Deletediv>
                  </DeleteandModity>
                </Imgandnameinfrom>

                {click ? (
                  <Freeboardedit id={post.id} onCancel={handleAddClick} />
                ) : (
                  <>
                    <Titledetaildiv>{post.title}</Titledetaildiv>
                    <Contentdetaildiv>{post.content}</Contentdetaildiv>
                  </>
                )}

                <Likecommentdiv>
                  <LikeIcon src={Likeimg} />
                  <LikeCount>{post.likes}</LikeCount>
                  <CommentIcon src={Comment} />
                  <CommentCount>{countComments(post.freeComment)}</CommentCount>
                </Likecommentdiv>
                <Likedetaildiv>
                  {!liked ? (
                    <Likedetailbutton
                      backgroundcolor={"#f9f9f9"}
                      color={"#737373"}
                      onClick={handleLikePost}
                    >
                      <Likedetailimg src={likedetail} />
                      공감
                    </Likedetailbutton>
                  ) : (
                    <Likedetailbutton
                      backgroundcolor={"#f91f15"}
                      color={"#fff"}
                      onClick={handleLikePost}
                    >
                      <BiLike
                        style={{
                          marginTop: "3px",
                          marginRight: "5px",
                          width: "15px",
                          height: "15px",
                        }}
                      />
                      공감
                    </Likedetailbutton>
                  )}
                </Likedetaildiv>

                <>
                  {post.freeComment.length > 0 ? (
                    post.freeComment.map((comment) => (
                      <Commentbox key={comment.id}>
                        <Namepicturecomment>
                          <Picturecomment src={anony} />
                          <Namecomment>{comment.author}</Namecomment>
                          <Replycomment onClick={() => setReplyTo(comment.id)}>
                            대댓글
                          </Replycomment>
                          <Likecomment
                            onClick={() => {
                              alert("좋아요 기능 구현 예정");
                            }}
                          >
                            공감
                          </Likecomment>
                          <Messagecomment
                            onClick={() => {
                              alert("쪽지 기능 구현 예정");
                            }}
                          >
                            쪽지
                          </Messagecomment>
                          <Singoomment
                            onClick={() => {
                              alert("신고 기능 구현 예정");
                            }}
                          >
                            신고
                          </Singoomment>
                        </Namepicturecomment>
                        <Contentcomment>{comment.content}</Contentcomment>
                        <Datecommet>
                          {new Date(post.createdAt).toLocaleTimeString()}
                        </Datecommet>

                        <>
                          {comment.replies.map((reply) => (
                            <ReplyDiv key={reply.sequenceNumber}>
                              <Namepicturecomment>
                                <Picturecomment src={anony} />
                                <Namecomment>{reply.author}</Namecomment>

                                <Likecomment
                                  marginleft={"73%;"}
                                  onClick={() => {
                                    alert("좋아요 기능 구현 예정");
                                  }}
                                >
                                  공감
                                </Likecomment>
                                <Messagecomment
                                  onClick={() => {
                                    alert("쪽지 기능 구현 예정");
                                  }}
                                >
                                  쪽지
                                </Messagecomment>
                                <Singoomment
                                  onClick={() => {
                                    alert("신고 기능 구현 예정");
                                  }}
                                >
                                  신고
                                </Singoomment>
                              </Namepicturecomment>

                              <Replycontent>
                                {reply.content}
                              </Replycontent>
                              <Replydate>
                              {new Date(post.createdAt).toLocaleTimeString()}
                              </Replydate>
                            </ReplyDiv>

                            
                          ))}


                        {replyTo === comment.id && (
                          <Replysavedetail>
                            <Inputreplydetail
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                              placeholder="대댓글을 입력하세요."
                            />
                            <Savewritedetail
                              type="button"
                              onClick={() => handleAddReply(comment.id)}
                            >
                              <Buttonimgsave src={savebutton} />
                            </Savewritedetail>
                          </Replysavedetail>
                        )}
                        </>
                      </Commentbox>
                    ))
                  ) : (
                    <></>
                  )}
                </>

                <Commentsavedetail>
                  <Inputdivdetail
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    type="text"
                    placeholder="댓글을 입력하세요."
                  />
                  <Savewritedetail type="button" onClick={handleAddComment}>
                    <Buttonimgsave src={savebutton} />
                  </Savewritedetail>
                </Commentsavedetail>
              </SecondIndetailBody>
            </>
          ) : (
            <p>해당 게시물을 찾을 수 없습니다.</p>
          )}
        </BoardInBody>
      </Bodydiv>
    </Alldiv>
  );
};

export default FreeboardDetail;

const LikeIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  font-size: 12px;
  font-weight: 300;
`;

const LikeCount = styled.span`
  margin-right: 8px;
  font-size: 12px;
  font-weight: 400;
  color: #f91f15;
`;

const CommentIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  font-size: 12px;
  font-weight: 300;
`;

const CommentCount = styled.span`
  //margin-right: 8px;
  color: #05bcbc;
  font-size: 12px;
  font-weight: 400;
`;
