import {useState} from 'react'
import styled from 'styled-components'

const StyledArea = styled.textarea`
  height: 60px;
  width: 100%;
  border: 1px solid #52575C;
  border-radius: 3px;
  outline: none;
`

export const Textarea = (props) => {
  const [value, setValue] = useState(props.value)

  const onChangeHandler = event => {
    setValue(event.target.value)
    props.getDescription(event.target.value)
  }

  return (
    <StyledArea
      value={value}
      onChange={onChangeHandler}
    />
  )
}