import styled from "styled-components"

const MainButton = ({children}) => {
  return (
    <StMainButton>{children}</StMainButton>
  )
}

const StMainButton = styled.button`
  line-height: 46px;
  background-color: #FFF;
  border-radius: 50px;
  color: #000;
  text-align: center;
  align-items: center;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.25rem;
  padding: 0.25rem 2.5rem;

  &:hover {
    background: #eee;
  }
`

export default MainButton