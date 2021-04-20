import styled from 'styled-components'

const AppBlock = styled.div`
  display: flex;
  max-width: 1110px;
  width: 100%;
  margin: 0 auto;
`

export const App = () => {
  return (
    <AppBlock>
      <h1>Начинаем!</h1>
    </AppBlock>
  )
}
