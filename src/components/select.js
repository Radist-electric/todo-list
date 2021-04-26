import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import styled from 'styled-components'

const SelectBlock = styled.div`
  margin-top: 10px;
  margin-right: 10px;
`
const SelectTitle = styled.p`
  margin: 0 0 5px;
  font-weight: 700;
`
const SelectCustom = styled.select`
  height: 30px;
  min-width: 150px;
  border: 1px solid #52575C;
  border-radius: 3px;
  outline: none;
`


export const Select = (props) => {
  const context = useContext(AppContext)
  const typeValue = !!props.init ? props.init : context.currentSorting.find((item) => props.data.type === item.type).value
  const [value, setValue] = useState(typeValue)

  const handleChange = event => {
    setValue(event.target.value)
    context.selectHandler(props.data.type, event.target.value, props.element)
  }

  // Создаём JSX
  const options = props.data.list.map((value, i) => <option value={value} key={i}>{value}</option>)

  return (
    <SelectBlock>
      <SelectTitle>{props.data.title}</SelectTitle>
      <SelectCustom value={value} onChange={handleChange}>
        {props.element === 'header' && <option value='Все'>Все</option>}
        {options}
      </SelectCustom>
    </SelectBlock>
  )
}