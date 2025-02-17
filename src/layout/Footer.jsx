import styled from "styled-components";
import logo from "../assets/image/logo.png";

const Footer = () => {
  return (
    <StFooter>
      <div className="footer-wrapper">
        <div className="footer-logo">
          <h3>Tutor's Ears Are</h3>
          <img src={logo} alt="logo" />
        </div>
        <p>자사의 약관 및 개인정보처리방침의 적용을 받습니다.</p>
        <p>
          (주) 팀스파르타 React 9기 기엽조 | 서울특별시 강남구 테헤란로44길 8
          12층 | 2025-02-12 Team Project Start{" "}
        </p>
        <p>© 2025 Tutor’s Ear Are. All Rights Reserved</p>
      </div>
    </StFooter>
  );
};

const StFooter = styled.footer`
  background: #292929;
  color: #676767;
  padding: 2rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.6;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  word-wrap: break-word;

  // 내부 footer 영역
  .footer-wrapper {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .footer-logo {
    display: flex;
    margin-bottom: 0.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;

    // footer logo 영역
    h3 {
      height: 30px;
      font-size: 1.25rem;
      font-weight: 500;
      color: #676767;
      display: flex;
      align-items: center;
      line-height: normal;
      vertical-align: middle;
      padding-top: 2px;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }

  // footer info 영역
  p {
    margin: 0.25rem 0;
    line-height: 1;
  }

  p:last-child {
    margin-bottom: 0;
  }

  // 모바일 사이즈 반영
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 0.75rem;
    line-height: 1.4;

    h3 {
      font-size: 1rem;
    }
  }
`;
export default Footer;
