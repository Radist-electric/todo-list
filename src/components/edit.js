import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Select } from './select'
import { Button } from './button'
import { Input } from './input'
import { Textarea } from './textarea'
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
  margin: 10px 0;
`

const InputTitle = styled.p`
  margin: 10px 0;
  font-weight: 700;
`


export const Edit = (props) => {
  const context = useContext(AppContext)
  const [name, setName] = useState(props.post.name)
  const [description, setDescription] = useState(props.post.description)

  const getName = (name) => {
    setName(name)
  }

  const getDescription = (description) => {
    setDescription(description)
  }


  return (
    <Background>
      <ViewBlock>
        <Select
          data={context.sorting.find((item) => item.type === 'name')}
          element='edit'
          init={props.post.name} />
        <InputTitle>Задайте новое название</InputTitle>
        <Input
          value={props.post.name}
          getName={getName}
        />
        <InputTitle>Описание</InputTitle>
        <Textarea
          value={props.post.description}
          getDescription={getDescription}
        />
        <Select
          data={context.sorting.find((item) => item.type === 'type')}
          element='edit'
          init={props.post.type} />
        <Select
          data={context.sorting.find((item) => item.type === 'relevance')}
          element='edit'
          init={props.post.relevance} />
        <ButtonsBlock>
          <Button onClick={() => { context.editHandler(false) }}>Выйти</Button>
          <Button onClick={() => { context.editHandler(true, name, description) }}>Сохранить</Button>
        </ButtonsBlock>
      </ViewBlock>
    </Background>
  )
}