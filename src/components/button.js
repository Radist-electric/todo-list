import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  max-width: 150px;
  padding: 0 20px;
  margin-right: 20px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #16D090;
  font-size: 16px;
  cursor: pointer;
`;

export const Button = ({ children, onClick }) => (
  <StyledButton type="button" onClick={onClick}>
    {children}
  </StyledButton>
);

