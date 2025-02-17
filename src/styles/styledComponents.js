//title - font size: px
//paragraph - font size: px
//button - width: px / height: px

//main color - #504BA1

import styled, { createGlobalStyle } from "styled-components";

//-----전역 스타일링-----
export const GlobalWrapper = createGlobalStyle`
  body{
    width: 100vw;
    background: #504BA1;
  }
`;

//-----FeedForm에서 사용되는 공통 스타일드 컴포넌트-----
//전체 레이아웃
export const StForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//타이틀 인풋 영역
export const StFormTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;

  h3 {
    font-size: 20px;
  }

  p {
    color: tomato;
    font-weight: 500;
  }
`;

export const StFormTitleInput = styled.input`
  width: 90%;
  height: 30px;
  background: #4f4ba164;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 15px;
  line-height: 30px;
  margin-left: 5px;
`;

//본문 인풋 영역
export const StFormContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;

  h3 {
    font-size: 20px;
  }

  p {
    color: tomato;
    font-weight: 500;
  }
`;

export const StFormContentsInput = styled.textarea`
  width: 90%;
  height: 300px;
  background: #4f4ba164;
  border: none;
  border-radius: 20px;
  padding: 20px;
  font-size: 12px;
  line-height: 30px;
  margin-left: 5px;
  overflow-wrap: break-word;
`;
