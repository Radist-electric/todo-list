import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Select } from './select'
import { Button } from './button'
import styled from 'styled-components'

const Background = styled.div`
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
  margin: 20px 0 20px 10px;
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
          header={false}
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