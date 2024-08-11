import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  RightSidebar,
  SearchBar,
  PopularPosts,
  SidebarSection,
  SectionTitle,
  Sectionbox,
  Sectioneachboard,
  Titledivbar,
  Contentdivbar,
  Bottomdivbar,
  Boardtype,
} from "../styles/HomeStyled";
import axios from "axios";
import Likeimg from "../assets/img/Likediv.png";
import Comment from "../assets/img/Commentpicture.png";

const Rightbar = () => {
  const [data, setData] = useState([]);
  const [datasss, setDatasss] = useState([]);
  const [datass, setDatass] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };


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

        //get으로 담는 정보에 따라서 board type 정하기
        const freeBoardData = (freeBoardResponse.data || []).map((post) => ({
          ...post,
          board: "freeboard",
        }));
        const secretBoardData = (secretBoardResponse.data || []).map((post) => ({
          ...post,
          board: "secretboard",
        }));
        const graduateBoardData = (graduateBoardResponse.data || []).map((post) => ({
          ...post,
          board: "graduateboard",
        }));


        setData(freeBoardData);
        setDatasss(secretBoardData);
        setDatass(graduateBoardData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const boards = [
    { title: "자유게시판", data: data },
    { title: "비밀게시판", data: datasss },
    { title: "졸업게시판", data: datass },
    /*
    { title: "시사·이슈", data: datass },
    { title: "장터게시판", data: datass },
    { title: "정보게시판", data: datass },
    { title: "홍보게시판", data: datass },
    { title: "취업·진로", data: datass },
    { title: "동아리·학회", data: datass },
     */
  ];

  const filteredPosts = [...data, ...datasss, ...datass].sort(
    (a, b) => b.likes - a.likes
  );

  console.log(filteredPosts);

  const reviews = [
    {
      rating: 4,
      title: "Typography Design 1 : 이재선",
      text: "강의평 중 틀린 말 1개도 없음... 이렇게까지?",
    },
    {
      rating: 2.5,
      title: "파이썬 프로그래밍 : 나대영",
      text: "다른 기초 프로그래밍 과목에서 A 이상 받았다면 이것도 할 만하긴 함...하지만 새내기나 타전공 사람을 위한 수업은 아닌 것 같음. 배우지 못함.",
    },
    {
      rating: 3.5,
      title: "중독심리학 : 신성만",
      text: "내용이 많음, 따라가기 조금 어려움, 하지만 성적은 잘 주심.",
    },
  ];
  const countComments = (comments) => {
    if (!comments) return 0; // comments가 undefined인 경우 0을 반환
    return comments.reduce((acc, comment) => acc + 1 + (comment.replies ? comment.replies.length : 0), 0);
  };
  
  // comment의 수에 따라서 hot게시물 지정하기 위한 것
  const allPosts = [...data, ...datasss, ...datass].map((post) => ({
    ...post,
    commentCount:
      post.board === "freeboard"
        ? countComments(post.freeComment)
        : post.board === "secretboard"
        ? countComments(post.secretComment)
        : countComments(post.graduateComment),
  }));

  const sortedByComments = allPosts.sort((a, b) => b.commentCount - a.commentCount);

  /**
   *          <form onSubmit={handleSearchSubmit}>
        <SearchBar
          width={"100%"}
          placeholder="전체 게시판의 글을 검색하세요!"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
   */
  return (
    <RightSidebar>
  
      <PopularPosts>
        <SectionTitle>실시간 인기 글</SectionTitle>
        {filteredPosts.slice(0, 2).map((post, index) => (
          <Sectioneachboard key={index}>
            <Sectionbox
              height={"75px"}
              key={post.id}
              to={`/${post.board}/${post.id}`}
            >
              <Titledivbar>{post.title}</Titledivbar>
              <Contentdivbar>{post.content}</Contentdivbar>
              <Bottomdivbar>
                {post.board === "freeboard" ? (
                  <Boardtype>자유게시판</Boardtype>
                ) : post.board === "secretboard" ? (
                  <Boardtype>비밀게시판 </Boardtype>
                ) : (
                  <Boardtype>졸업게시판 </Boardtype>
                )}

                <LikeIcon src={Likeimg} />
                <LikeCount>{post.likes}</LikeCount>
                <CommentIcon src={Comment} />

                {/*게시판 종류에 따라서 */}
                {post.board === "freeboard" ? (
                  <CommentCount>{countComments(post.freeComment)}</CommentCount>
                ) : post.board === "secretboard" ? (
                  <CommentCount>
                    {countComments(post.secretComment)}
                  </CommentCount>
                ) : (
                  <CommentCount>
                    {countComments(post.graduateComment)}
                  </CommentCount>
                )}
              </Bottomdivbar>
            </Sectionbox>
          </Sectioneachboard>
        ))}
      </PopularPosts>

      <SidebarSection>
        <SectionTitle>HOT 게시물</SectionTitle>
        {/*댓글 수에 따른 HOT게시물 */}
        {sortedByComments.slice(0, 2).map((post, index) => (
          <Sectioneachboard key={index}>
            <Sectionbox key={post.id} to={`/${post.board}/${post.id}`}>
            <Titledivbar>{post.title}</Titledivbar>
              <Contentdivbar>{post.content}</Contentdivbar>
              <Bottomdivbar>
                {post.board === "freeboard" ? (
                  <Boardtype>자유게시판</Boardtype>
                ) : post.board === "secretboard" ? (
                  <Boardtype>비밀게시판 </Boardtype>
                ) : (
                  <Boardtype>졸업게시판 </Boardtype>
                )}

                <LikeIcon src={Likeimg} />
                <LikeCount>{post.likes}</LikeCount>
                <CommentIcon src={Comment} />

                {/*게시판 종류에 따라서 */}
                {post.board === "freeboard" ? (
                  <CommentCount>{countComments(post.freeComment)}</CommentCount>
                ) : post.board === "secretboard" ? (
                  <CommentCount>
                    {countComments(post.secretComment)}
                  </CommentCount>
                ) : (
                  <CommentCount>
                    {countComments(post.graduateComment)}
                  </CommentCount>
                )}
              </Bottomdivbar>
            </Sectionbox>
          </Sectioneachboard>
        ))}
      </SidebarSection>
      <SidebarSection>
        <SectionTitle>BEST 게시판</SectionTitle>
      </SidebarSection>
      <SidebarSection>
        <SectionTitle>최근 강의평</SectionTitle>
        {reviews.map((review, index) => (
          <CourseReview key={index}>
            <StarRating rating={review.rating} />
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewText>{review.text}</ReviewText>
          </CourseReview>
        ))}
      </SidebarSection>
    </RightSidebar>
  );
};

const CourseReview = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
  border-top: 1px solid #e3e3e3;
  height: 98px;
`;

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <StarRatingWrapper>
      {[...Array(fullStars)].map((_, index) => (
        <Star key={`full-${index}`}>★</Star>
      ))}
      {hasHalfStar && <HalfStar>☆</HalfStar>}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={`empty-${index}`}>☆</Star>
      ))}
    </StarRatingWrapper>
  );
};

const StarRatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  font-size: 20px;
  color: gold;
`;

const HalfStar = styled.span`
  font-size: 20px;
  color: gold;
`;

const ReviewTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ReviewText = styled.div`
  font-size: 12px;
  color: #555;
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
`;
export default Rightbar;
