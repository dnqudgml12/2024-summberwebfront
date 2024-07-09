import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Dropdownmenu } from "../components/Home/Homenavbar";
import Rightbar from "./Rightbar";

const Layout = () => {
  return (
    <>
      <Dropdownmenu />
      <LayoutContainer>
        <ContentWrapper>
          <ContentContainer>
            <Outlet />
          </ContentContainer>
          <RightbarContainer>
            <Rightbar />
          </RightbarContainer>
        </ContentWrapper>
      </LayoutContainer>
    </>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  //padding-top: 100px; // Dropdownmenu 높이만큼 패딩 추가
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  max-width: 100vw; // 전체 최대 너비 설정
  width: 100%;
  justify-content: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 850px; // 컨텐츠 최대 너비 설정
`;

const RightbarContainer = styled.div`
  width: 300px; // Rightbar의 고정 너비 설정
`;

export default Layout;
