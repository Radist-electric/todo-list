import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Select } from './select'
import { Button } from './button'
import { Background } from './background'
import styled from 'styled-components'

const ViewBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1110px;
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 8px;
`

const ButtonsBlock = styled.div`
  display: flex;
`

const Title = styled.h2`
  margin: 0 0 20px;
`

const Description = styled.p`
  margin: 0 0 20px;
  font-size: 18px;
`

const Relevance = styled.p`
  margin: 20px 0;
  font-size: 16px;
  span {
    font-weight: 700;
  }
`

export const View = (props) => {
  const context = useContext(AppContext)

  return (
    <Background>
      <ViewBlock>
        <Title>{props.post.name}</Title>
        <Description>{props.post.description}</Description>
        <Select
          data={context.sorting.find((item) => item.type === 'type')}
          element='view'
          init={props.post.type} />
        <Relevance><span>Актуальность: </span>{props.post.relevance}</Relevance>
        <ButtonsBlock>
          <Button onClick={() => { context.viewHandler(false) }}>Выйти</Button>
          <Button onClick={() => { context.viewHandler(true) }}>Сохранить</Button>
        </ButtonsBlock>
      </ViewBlock>
    </Background>
  )
}