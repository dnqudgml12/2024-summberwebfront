import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  RightSidebar,
  SearchBar,
  PopularPosts,
  SidebarSection,
  SectionTitle,
  Sectionbox,
  Sectioneachboard,
} from '../styles/HomeStyled';
import { Data } from "../data/freeBoard";
import { Datasss } from "../data/secretBoard";
import { Datass } from "../data/gradutateBoard";
const Rightbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const boards = [
    { title: '자유게시판', data: Data, link: 'freeboard' },
    { title: '비밀게시판', data: Datasss, link: 'secrete' },
    { title: '졸업게시판', data: Datass },
    { title: '시사·이슈', data: Datass },
    { title: '장터게시판', data: Datass },
    { title: '정보게시판', data: Datass },
    { title: '홍보게시판', data: Datass },
    { title: '취업·진로', data: Datass },
    { title: '동아리·학회', data: Datass },
  ];

  const reviews = [
    {
      rating: 4,
      title: 'Typography Design 1 : 이재선',
      text: '강의평 중 틀린 말 1개도 없음... 이렇게까지?',
    },
    {
      rating: 2.5,
      title: '파이썬 프로그래밍 : 나대영',
      text: '다른 기초 프로그래밍 과목에서 A 이상 받았다면 이것도 할 만하긴 함...하지만 새내기나 타전공 사람을 위한 수업은 아닌 것 같음. 배우지 못함.',
    },
    {
      rating: 3.5,
      title: '중독심리학 : 신성만',
      text: '내용이 많음, 따라가기 조금 어려움, 하지만 성적은 잘 주심.',
    },
  ];

  return (
    <RightSidebar>
      <form onSubmit={handleSearchSubmit}>
        <SearchBar
          placeholder="전체 게시판의 글을 검색하세요!"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <PopularPosts>
        <SectionTitle>실시간 인기 글</SectionTitle>
        {boards.slice(0, 2).map((post, index) => (
          <Sectioneachboard key={index}>
            <Sectionbox height={'75px'} key={post.id} to={`/${post.title}/${post.id}`}>
              {post.title}
            </Sectionbox>
          </Sectioneachboard>
        ))}
      </PopularPosts>

      <SidebarSection>
        <SectionTitle>HOT 게시물</SectionTitle>
        {boards.slice(0, 2).map((post, index) => (
          <Sectioneachboard key={index}>
            <Sectionbox key={post.id} to={`/${post.title}/${post.id}`}>
              {post.title}
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

export default Rightbar;
