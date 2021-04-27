import { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  height: 30px;
  min-width: 150px;
  border: 1px solid #52575C;
  border-radius: 3px;
  outline: none;
`

export const Input = (props) => {
  const [value, setValue] = useState(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const onChangeHandler = event => {
    setValue(event.target.value)
    props.getInput(event.target.value)
  }

  return (
    <StyledInput
      type={props.type}
      value={value}
      onChange={onChangeHandler}
    />
  )
}