import styled from 'styled-components'

const HeaderBlock = styled.header`
  display: flex;
  width: 100%;
`

export const Header = () => {
  return (
    <HeaderBlock>
      <h1>Header</h1>
    </HeaderBlock>
  )
}