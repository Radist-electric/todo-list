import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import styled from 'styled-components'

const PagBlock = styled.div`
  padding: 24px;
  margin-bottom: 50px;
  border-top: 1px solid #DBDDE0;
  background-color: #FFFFFF;
`

const PagButton = styled.input`
  height: 32px;
  min-width: 32px;
  margin: 0 2px;
  border-radius: 4px;
  border: 1px solid #E8E8E8;
  outline: none;
  background-color: ${props => (props.current ? '#336CFB' : '#FFFFFF')};
  font-size: 13px;
  color: #25282B;
  cursor: pointer;
`

export const Pagination = (props) => {
  const context = useContext(AppContext)

  // Обработка постраничной навигации
  const onClickHandler = event => {
    let page
    switch (event.target.name) {
      case 'prev':
        page = context.pagination.currentPage - 1
        break
      case 'next':
        page = context.pagination.currentPage + 1
        break
      case 'num':
        page = +event.target.value
        break
      default:
        page = 1
    }
    context.paginationHandler(page)
  }

  const pages = new Array(Math.ceil(context.data.length / context.pagination.limit)).fill(1)
  const numButtons = pages.map((init, i) =>
    <PagButton
      type="button"
      onClick={onClickHandler}
      name='num'
      value={init + i}
      current={init + i === context.pagination.currentPage}
      key={i} />
  )

  return (
    <PagBlock>
      {context.data.length !== 0 && <>
        <PagButton type="button" onClick={onClickHandler} name='prev' value='&lt;' />
        {numButtons}
        <PagButton type="button" onClick={onClickHandler} name='next' value='&gt;' />
      </>}
    </PagBlock>
  )
}
