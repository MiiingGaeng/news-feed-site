import styled from 'styled-components';

const Footer = () => {
  return (
    <StFooter>
      <div className="footer-wrapper">
        <h3>King’s Ear Is 👂</h3>
        <p>자사의 약관 및 개인정보처리방침의 적용을 받습니다.</p>
        <p>
          (주) 리액트기엽조 팀장 Kim Ming gaeng, 민경 김 | 서울 강남구 테헤란로
          152 강남파이낸스센터 30층 | 2025-02-12 Team Project Start{' '}
        </p>
        <p>© 2025 Tutor’s Year is. All Rights Reserved</p>
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

  // footer logo 영역
  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #676767;
    margin-bottom: 0.75rem;
    line-height: 1.25;
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
