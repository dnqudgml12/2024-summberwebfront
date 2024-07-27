import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
//import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { userState } from "../../context/useStates";
import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";

const LoginBtn = () => {
  const API = import.meta.env.VITE_API_URL; //vite로 빌드시에 env에서 꺼내는 방식이다.
  const [userInfo, setUserInfo] = useRecoilState(userState);
//recoil을 통해 세션스토리지에 저장된 값

  const navigate = useNavigate();
  const resetUserState = useResetRecoilState(userState);
  // 로그아웃 시에 세션 스토리지를 초기화

  // Google OAuth2 로그인 페이지로 리디렉션
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
  };

  const handleLogout = async () => {
    fetch(`${API}/api/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("로그아웃 실패했다 문제는 서버와의 통신");
        }
        resetUserState();
        navigate("/");
      })
      .catch((error) => {
        console.error("서버와의 통신 오류 또는 로그아웃 작업 실패", error);
      });
  };

  return (
    <GoogleLoginButton onClick={userInfo ? handleLogout : handleLogin}>
      <FcGoogle />
      <span>{userInfo ? "Logout" : "Login with Google"}</span>
    </GoogleLoginButton>
  );
};

export default LoginBtn;

const GoogleLoginButton = styled.button`
margin-top: 5px;
  background-color: white;
  color: #F91F15;
  padding: 15px 10px;
  border: none;
  width: 100px;
  height: 70px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color:#F91F15;
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #F91F15;
    transform: translateY(0);
  }

  svg {
    margin-right: 10px;
  }

  span {
    margin-left: 8px;
  }
`;
