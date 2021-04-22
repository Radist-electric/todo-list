import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import styled from 'styled-components'

const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  border-radius: 8px;
`
const Thead = styled.thead`
  background-color: #E8E8E8;
  font-weight: 700;
  
`
const Tbody = styled.thead`
  background-color: #FFFFFF;
`
const TR = styled.tr`
  height: 55px;
  border-bottom: 1px solid #DBDDE0;
`
const TD = styled.td`
  padding-left: 24px;
  :nth-child(1) {
    width: 15%;
  }
  :nth-child(2) {
    position: relative;
    width: 50%;
    div {
      position: absolute;
      top: 50%;
      left: 24px;
      transform: translateY(-50%);
      width: calc(100% - 24px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  :nth-child(3) {
    width: 10%;
  }
  :nth-child(4) {
    width: 15%;
  }
  :nth-child(5) {
    width: 10%;
  }
`

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
}

export const TodoList = () => {
  const context = useContext(AppContext)

  // Создаём JSX
  const rows = context.data.map((row, i) => {
    return (
      <TR key={i}>
        <TD>{row.name}</TD>
        <TD><div>{row.description}</div></TD>
        <TD>{row.type}</TD>
        <TD>{row.date.toLocaleString('ru-RU', options)}</TD>
        <TD>Действия</TD>
      </TR>
    )
  })

  return (
    <Table>
      <Thead>
        <TR>
          <TD>Название</TD>
          <TD>Описание</TD>
          <TD>Тип</TD>
          <TD>Дата</TD>
          <TD>Действия</TD>
        </TR>
      </Thead>
      <Tbody>
        {rows}
      </Tbody>
    </Table>
  )
}