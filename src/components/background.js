import styled from 'styled-components'

const BG = styled.div`
  position: fixed;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

export const Background = ({ children }) => (
  <BG>
    {children}
  </BG>
);

