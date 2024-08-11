import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Alldiv, Bodydiv } from "../styles/HomeStyled";
import {
  Titlediv,
  BoardInBody,
  Eachseperateboard,
  BoardAlldiv,
  BoardTitle,
  BoardContent,
  Boardname
} from "../styles/BoardStyled";
import { userState } from "../context/useStates";
import { useRecoilValue } from "recoil";
import Comment from "../assets/img/Commentpicture.png";
import Likeimg from "../assets/img/Likediv.png";
import leftarrow from "../assets/img/leftarrow.png";
import rightarrow from "../assets/img/rightarrow.png";
const Mypage = () => {
  //서버 pagination 구현 노노 이거는 특정 api에서 가져오는 것 아니라 전체에서 가져오므로
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
    const [datafree, setDatafree] = useState([]);
    const [datasec, setDatasec] = useState([]);
    const [datagra, setDatagra] = useState([]);
    const [dataadv,setDataadv] = useState([]);
    const [datacir,setDatacir]= useState([]);
    const [datafres,setDatafres]= useState([]);
    const [datainf,setDatainf] = useState([]);
    const [datasoc,setDatasoc] = useState([]);
    const userInform= useRecoilValue(userState);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const freeBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/freeboard/read`
            );
            const secretBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/secretboard/read`
            );
            const graduateBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/graduateboard/read`
            );
            const advertiseBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/advertiseboard/read`
            );
            const circleBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/circleboard/read`
            );
    
            const freshmanBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/freshmanboard/read`
            );
            const informationBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/informationboard/read`
            );
    
            const socialBoardResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/socialboard/read`
            );
    
    
    
            //get으로 담는 정보에 따라서 board type 정하기
            const freeBoardData = freeBoardResponse.data.map((post) => ({
              ...post,
              name:"자유게시판",
              board: "freeboard",
              comment: "freeComment"
            }));
            const secretBoardData = secretBoardResponse.data.map((post) => ({
              ...post,
              name:"비밀게시판",
              board: "secretboard",
              comment: "secretComment"
            }));
            const graduateBoardData = graduateBoardResponse.data.map((post) => ({
              ...post,
              name:"졸업게시판",
              board: "graduateboard",
              comment: "graduateComment"
            }));
    
            const advertiseBoardData = advertiseBoardResponse.data.map((post) => ({
              ...post,
              name:"홍보게시판",
              board: "advertiseboard",
              comment: "advertiseComment"
            }));
    
            const circleBoardData = circleBoardResponse.data.map((post) => ({
              ...post,
              name:"동아리게시판",
              board: "circleboard",
              comment: "circleComment"
            }));
    
            const freshmanBoardData = freshmanBoardResponse.data.map((post) => ({
              ...post,
              name:"새내기게시판",
              board: "freshmanboard",
              comment: "freshmanComment"
            }));
    
            const informationBoardData = informationBoardResponse.data.map((post) => ({
              ...post,
              name:"정보게시판",
              board: "informationboard",
              comment: "informationComment"
            }));
    
            const socialBoardData = socialBoardResponse.data.map((post) => ({
              ...post,
              name:"시사게시판",
              board: "socialboard",
              comment: "socialComment"
            }));
    
            setDatafree(freeBoardData);
            setDatasec(secretBoardData);
            setDatagra(graduateBoardData);
            setDataadv(advertiseBoardData);
            setDatacir(circleBoardData);
            setDatafres(freshmanBoardData);
            setDatainf(informationBoardData);
            setDatasoc(socialBoardData);
    
          } catch (error) {
            console.error("Error fetching data:", error);
          
          }
        };
    
        fetchData();
      }, []);

      const boards = [
        { title: "자유게시판", data: datafree, link:"freeboard"},
        /* // 자유게시판만 로그인 기능 설정하였으므로
        { title: "비밀게시판", data: datasec,link:"secretboard"},
        { title: "졸업게시판", data: datagra,link:"graduateboard" },
        { title: "새내기게시판", data: datafres,link:"freshmanboard" },
        { title: "시사·이슈", data: datasoc,link:"socialboard"},
        { title: "정보게시판", data: datainf,link:"informationboard" },
        { title: "홍보게시판", data: dataadv,link:"advertiseboard" },
        { title: "동아리·학회", data: datacir,link:"circleboard" },
         */
      ];


      //전체 data 중에 본인이 쓴글을 보기 위해서 어느 종류의 board의 member id와 로그인 후 세션에 저장된 user의 id가 같은 것만 보여주면 됨
      const filteredPosts = boards.flatMap((board) =>
    // 여러 객체를 통틀어서 결과 값을 일정하게 리턴해야 하므로 flatMap을 사용하여 나타내는 것이 좋다.
    board.data.filter(
      //처음에 user 생성 후 data 입력 시에는 member.id로 이미 user있는 후 부터는 member로
      (post) => post.member==userInform.memberId || post.member.id==userInform.memberId 
    )
  );

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =filteredPosts
    .slice()
    .reverse()
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  //각 테이블 별로 comment의 이름이 다르므로 적용하여 나타내는 과정
  const countComments = (post, commentField) => {
    const comments = post[commentField];
    if (!comments) return 0;// comments가 undefined인 경우 0을 반환
    return comments.reduce((acc, comment) => acc + 1 + (comment.replies ? comment.replies.length : 0), 0);
  };

  console.log(filteredPosts);
  return (
    <Alldiv>
      <Bodydiv>
        <BoardInBody>
          <Titlediv>내가 쓴 글</Titlediv>
          <BoardAlldiv>
            {currentItems.map((post) => (
              <Eachseperateboard
              key={post.id}
              width={"80%"}
              to={`/${post.board}/${post.id}`}
              >
                <Boardname>{post.name}</Boardname>
                <BoardTitle> {post.title}</BoardTitle>
                <BoardContent>{post.content}</BoardContent>
                <CommentInfo>
                  <LikeIcon src={Likeimg} />
                  <LikeCount>{post.likes}</LikeCount>
                  <CommentIcon src={Comment} />
                  <CommentCount>
                    {countComments(post,post.comment)}
                  </CommentCount>
                  <CommentTime>
                    {new Date(post.createdAt).toLocaleTimeString()}
                  </CommentTime>
                  <CommentAuthor>익명</CommentAuthor>
                </CommentInfo>
              </Eachseperateboard>
            ))}
          </BoardAlldiv>

          <Pagination>
            {currentPage === 1 && indexOfLastItem >= filteredPosts .length && null}
            {currentPage != 1 && indexOfLastItem >= filteredPosts .length && (
              <>
                <Previousbutton onClick={handlePrevPage}>
                  <Leftarrow src={leftarrow} />
                  이전
                </Previousbutton>
                <Previousbutton onClick={handleFirstPage}>
                  <Leftarrow src={leftarrow} />
                  처음
                </Previousbutton>
              </>
            )}
            {currentPage === 1 && indexOfLastItem < filteredPosts .length && (
              <Nextbutton onClick={handleNextPage}>
                다음
                <Rightarrow src={rightarrow} />
              </Nextbutton>
            )}
            {currentPage != 1 && indexOfLastItem <filteredPosts .length && (
              <>
                <Previousbutton onClick={handleFirstPage}>
                  <Leftarrow src={leftarrow} />
                  처음
                </Previousbutton>
                <Previousbutton onClick={handlePrevPage}>
                  <Leftarrow src={leftarrow} />
                  이전
                </Previousbutton>

                <Nextbutton onClick={handleNextPage}>
                  다음
                  <Rightarrow src={rightarrow} />
                </Nextbutton>
              </>
            )}
          </Pagination>
        </BoardInBody>
      </Bodydiv>
    </Alldiv>
  );
};

export default Mypage;


const Leftarrow = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 7px;
`;
const Rightarrow = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 7px;
`;

const Nextbutton = styled.div`
  float: right;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0 15px 0 10px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #f91f15;
  border-radius: 3px;
  color: #f91f15;
  font-size: 14px;
  font-weight: bold;
  background-repeat: no-repeat;

  background-size: 10px 10px;
  cursor: pointer;
`;

const Previousbutton = styled.div`
  float: left;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0 10px 0 15px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #f91f15;
  border-radius: 3px;
  color: #f91f15;
  font-size: 14px;
  font-weight: bold;
  background-repeat: no-repeat;

  background-size: 10px 10px;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: inline-block;
  //justify-content: space-between;
  width: 97.5%;
  margin-top: 20px;
`;
const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  color: #666;
`;
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

  &::after {
    margin-left: 4px;
    content: "";
    display: inline-block;
    height: 8px;
    border-left: 1px solid #d6d6d6;
    width: 4px;
  }
`;

const CommentTime = styled.span`
  margin-right: px;
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
  &::after {
    margin-left: 4px;
    content: "";
    display: inline-block;
    height: 8px;
    border-left: 1px solid #d6d6d6;
    width: 4px;
  }
`;

const CommentAuthor = styled.span`
  margin-right: 15px;
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
`;
