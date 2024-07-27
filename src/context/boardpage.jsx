// src/context/pageState.js
import { atom } from 'recoil';

export const currentPageState = atom({
  key: 'currentPageState',
  default: 0,
});

export const totalPagesState = atom({
  key: 'totalPagesState',
  default: 0,
});
