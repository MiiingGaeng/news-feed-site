import styled from "styled-components";
import NavigationButton from "../components/common/NavigationButton";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, user, setUser } = useContext(AuthContext);

  // login state check
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // session check
      console.log("✅ session", session);

      setIsLogin(session?.user ?? null);
      setUser(session?.user || null);
    };
    getSession();
  }, [setIsLogin]);

  // login
  const handleLogin = () => {
    navigate("/login");
  };

  // logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLogin(false);
  };

  return (
    <StHomeWrapper>
      {/* 화면 전체를 감싸는 컨테이너 */}
      <StHomeContainer>
        {/* Main Title 영역 */}
        <StHomeTitle>King’s Ear Is</StHomeTitle>
        {/* 동그란 원 3개를 감싸는 영역 */}
        <StCircleWrapper>
          {/* 개별 동그란 원 스타일링 */}
          <StCircle>
            <div className="circle-area">
              <div className="circle-icon-area">🤔</div>
              <div className="circle-text-area">
                코드짜면서
                <br />
                꿀팁같은거 공유하고 싶다!
              </div>
            </div>
          </StCircle>
          <StCircle>
            <div className="circle-area">
              <div className="circle-icon-area">🤴</div>
              <div className="circle-text-area">
                수강생들끼리
                <br />
                대나무숲 있으면 재밌겠다
              </div>
            </div>
          </StCircle>
          <StCircle>
            <div className="circle-area">
              <div className="circle-icon-area">🥹</div>
              <div className="circle-text-area">
                강의보고 궁금한 내용
                <br />
                댓글 달고 싶은데...
              </div>
            </div>
          </StCircle>
        </StCircleWrapper>
      </StHomeContainer>
      <StHomeSubContainer>
        <div className="home-sub-wrapper">
          <p>수강생들만의 커뮤니티가 필요하다구요?! 바로 여깁니다!!!</p>
          <p>
            익명으로 잡담하고 싶고, 꿀팁 공유하고 싶고, 강의보다 궁금한 거 바로
            댓글 달고 싶고, 강의 타임라인 적고 싶다면
          </p>
          <p>수강생 커뮤니티 “King’s Ear Is”로 오세요!</p>
          <p>튜터님 귀는 당나귀 귀!!!</p>
        </div>
        <NavigationButton to="/signup">가입하기</NavigationButton>
      </StHomeSubContainer>
      <StHomeSubContainer>
        <div className="home-sub-wrapper">
          <h3>인기 게시글</h3>
        </div>
      </StHomeSubContainer>
      <StHomeContainer>{/* Feed  */}</StHomeContainer>
    </StHomeWrapper>
  );
};

const StHomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4rem;
  background-color: #ffffff99;
  overflow-x: hidden;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
`;

const StHomeTitle = styled.h2`
  line-height: 50px;
  color: #423e82;
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  align-items: center;
`;

// 동그란 원 3개를 감싸는 영역
const StCircleWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 90vw;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

// 개별 동그란 원 스타일링
const StCircle = styled.div`
  width: 30vw;
  height: 30vw;
  max-width: 19rem;
  max-height: 19rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;

  .circle-area {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    text-align: center;
  }

  .circle-icon-area {
    font-size: 3rem;
    line-height: 1;
    transform: scale(2.5);
    width: fit-content;
    margin: 0 auto;
    align-items: center;
  }

  .circle-text-area {
    margin-top: 2rem;
    font-size: 1.125rem;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    width: 25vw;
    height: 25vw;

    .circle-icon-area {
      font-size: 2.5rem;
      transform: scale(1.75);
    }

    .circle-text-area {
      margin-top: 0.75rem;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    width: 70vw;
    height: 70vw;

    .circle-icon-area {
      font-size: 4rem;
      transform: scale(1.5);
    }

    .circle-text-area {
      margin-top: 0.25rem;
      font-size: 1rem;
    }
  }
`;

const StHomeSubContainer = styled.div`
  width: 100vw;
  padding: 3rem 2rem;
  color: #fff;
  text-align: center;
  font-size: 1.125rem;
  .home-sub-wrapper {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    word-break: keep-all;
  }
  h3 {
    font-size: 2rem;
    color: #fff;
    font-weight: 700;
  }
  p {
    margin: 0.5rem 0;
  }
`;

export default Home;
