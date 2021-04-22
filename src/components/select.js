import {useState, useContext} from 'react'
import { AppContext } from '../context/AppContext'
import styled from 'styled-components'

const CustomSelect = styled.select`
  height: 30px;
  width: 150px;
  margin: 0 10px;
  border: 1px solid #52575C;
  border-radius: 3px;
  outline: none;
`

export const Select = (props) => {
  const context = useContext(AppContext)
  const [value, setValue] = useState('2')

  const handleChange = event => {
    setValue(event.target.value)
    context.selectHandler(props.data.type, event.target.value)
  }

  // Создаём JSX
  const options = props.data.list.map((value, i) => <option value={value} key={i}>{value}</option>)

  return (
    <CustomSelect value={value} onChange={handleChange}>
      {options}
    </CustomSelect>
  )
}