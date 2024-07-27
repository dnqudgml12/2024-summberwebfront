import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from 'recoil';
import { userState } from "../context/useStates";

const useApiClient = () => {
  const navigate = useNavigate();
  const resetUserState = useResetRecoilState(userState);
  
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // 환경 변수에서 읽은 API 요청의 기본 URL
    withCredentials: true, // 각 요청에 쿠키를 포함하도록 설정
  });

  // 응답 인터셉터 설정
  apiClient.interceptors.response.use(
    (response) => response, // 성공적인 응답은 그대로 반환
    (error) => {
      if (error.response && error.response.status === 401) {
        // 세션 만료 또는 인증 실패 처리
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        // 필요에 따라 사용자 상태 초기화 및 로그인 페이지로 리디렉션
        resetUserState();
        window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
      }
      return Promise.reject(error); // 오류를 호출한 함수로 전달
    }
  );

  return apiClient; // 설정된 Axios 인스턴스 반환
};

export default useApiClient;
