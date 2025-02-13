import styled from 'styled-components';

const Detail = () => {
  return (
    <StDetailWrapper>
      <StDetailBox>
        <button className="edit_btn">EDIT</button>
        <button className="close_btn">X</button>
        <StDetailUserContentsWrapper>
          <StDetailUserWrapper>
            <img src="/" alt="user_profile_img" />
            <h3>user</h3>
          </StDetailUserWrapper>
          <h1>title</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            totam unde itaque voluptates reiciendis iste vero in exercitationem,
            quam iusto possimus corporis consectetur suscipit minima. Deserunt
            quia quidem velit suscipit. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Molestias totam unde itaque voluptates reiciendis
            iste vero in exercitationem, quam iusto possimus corporis
            consectetur suscipit minima. Deserunt quia quidem velit suscipit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            totam unde itaque voluptates reiciendis iste vero in exercitationem,
            quam iusto possimus corporis consectetur suscipit minima. Deserunt
            quia quidem velit suscipit.
          </p>
        </StDetailUserContentsWrapper>

        <StDetailCommentsWrapper>
          <h1>Comments</h1>
          {/* map돌려서 넣기 */}
          {/* 예시 */}
          <StDetailComment>
            <img src="/" alt="user_profile_img" />
            <h3>user</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              labore nostrum corporis commodi laudantium vero quasi omnis enim
              saepe, nobis voluptate beatae quidem ipsa nulla atque sequi,
              aspernatur facere delectus.
            </p>
            <button>EDIT</button>
          </StDetailComment>
          <StDetailComment>
            <img src="/" alt="user_profile_img" />
            <h3>sample456</h3>
            <p>Lorem</p>
          </StDetailComment>
        </StDetailCommentsWrapper>

        <StCommentForm>
          <StCommentInput type="text" placeholder="댓글을 작성해주세요" />
          <button>SUBMIT</button>
        </StCommentForm>
      </StDetailBox>
    </StDetailWrapper>
  );
};

//-----styled-components-----
//전체 레이아웃
const StDetailWrapper = styled.div`
  width: 1200px;
  height: calc(100vh - 61px);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StDetailBox = styled.div`
  width: 900px;
  border-radius: 30px;
  background-color: #f7f6ff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .close_btn {
    position: absolute;
    top: 30px;
    right: 30px;
    background: none;
    border: none;
    font-size: 25px;
    color: #4f4ba1a6;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #504ba1;
    }
  }

  .edit_btn {
    position: absolute;
    top: 30px;
    right: 70px;
    width: 120px;
    height: 30px;
    background: #4f4ba1a6;
    color: #f7f6ff;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #504ba1;
    }
  }
`;

//user + 본문 영역
const StDetailUserContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #504ba1;
  gap: 20px;

  h1 {
    font-size: 20px;
    padding: 0 5px;
  }

  p {
    margin-bottom: 50px;
    padding: 0 5px;
  }
`;

const StDetailUserWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffa600;
  }

  h3 {
    display: inline-block;
    width: 70px;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
  }
`;

//댓글 영역
const StDetailCommentsWrapper = styled.ul`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 20px;
    padding: 0 5px;
    margin-bottom: 20px;
  }
`;

const StDetailComment = styled.li`
  width: 100%;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffa600;
    margin-right: 10px;
  }

  h3 {
    font-size: 17px;
    margin-right: 20px;
  }

  p {
    width: 1fr;
    font-size: 12px;
  }

  & > button {
    width: 120px;
    height: 30px;
    background: #4f4ba1a6;
    color: #f7f6ff;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #504ba1;
    }
  }
`;

//댓글 입력 영역
const StCommentForm = styled.form`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  & > button {
    width: 120px;
    height: 30px;
    background: #4f4ba1a6;
    color: #f7f6ff;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #504ba1;
    }
  }
`;

const StCommentInput = styled.input`
  width: 500px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #504ba1;
  font-size: 12px;
  padding: 0 20px;
`;

export default Detail;
