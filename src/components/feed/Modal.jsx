import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseButton from './CloseButton';

const Modal = ({onShowModal, children}) => {
  return (
    // Modal 전체 Wrapper
    <StModalWrapper>
      {/* Modal Overlay */}
      <StDim onClick={onShowModal}/>
      {/* Modal 창 실제 사용영역 */}
      <StModalArea>
        {/* 닫기 버튼 (컴포넌트 사용) */}
        <CloseButton onClick={onShowModal}/>
        {/* Modal 창 내부 영역 */}
        <StModalBox>
          {children}
        </StModalBox>
      </StModalArea>
    </StModalWrapper>
  )
}

const StModalWrapper = styled.div`
  position: fixed;
  top: 0%;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const StDim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
`

const StModalArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  border: none;
  border-radius: 10px;
  background-color: #FFF;
  width: 700px;
  max-width: calc(100% - 48px);
`

const StModalBox = styled.div`
  max-height: calc(100vh - 122px);
  min-height: 200px;
  padding: 24px;
  position: relative;
  overflow-y: auto;
`

Modal.propTypes = {
  onShowModal: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal