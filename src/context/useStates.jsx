import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userState",
  storage: sessionStorage, //로그인하면 세션 스토리지에 저장해 놓은 것이며 로그아웃 하면 세션스토리지 초기화됨
  // 이를 이용해서 수정 삭제 버튼을 막을 수 있을 듯
});

export const userState = atom({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
