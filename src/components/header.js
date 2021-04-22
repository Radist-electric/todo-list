import { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Select } from './select'
import styled from 'styled-components'

const links = [
  {
    link: '/dashboards',
    title: 'Панель управления',
  },
  {
    link: '/',
    title: 'Список дел',
  }
]

const HeaderBlock = styled.header`
  display: flex;
  align-items: flex-end;
`
const Title = styled.h1`
  margin: 20px 0 30px;
  font-size: 40px;
  line-height: 46px;
  letter-spacing: 0.2px;
  color: #25282b;
`
const LinksBlock = styled.div`
  display: flex;
  flex-direction: column;
`
const Nav = styled.nav`
  display: flex;
  width: 100%;
`
const StyledNavLink = styled(NavLink)`
  margin-right: 33px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.linked ? '#336CFB' : '#52575C')};
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: #336cfb;
  }
  &:active {
    color: #52575c;
  }
`

export const Header = () => {
  const curPath = useLocation().pathname
  const context = useContext(AppContext)
  console.log(context.sorting);

  // Создаём JSX
  const linksList = links.map((item, i) => (
    <StyledNavLink to={item.link} key={i} linked={curPath === item.link ? 1 : 0}>
      {item.title}
    </StyledNavLink>
  ))
  const title = links.find((item) => curPath === item.link)

  const selects = context.sorting.map((item, i) => {
    return item.list.length ? <Select data={item} key={i} /> : null
  })

  return (
    <HeaderBlock>
      <LinksBlock>
        <Title>{title.title}</Title>
        <Nav>{linksList}</Nav>
      </LinksBlock>
      {curPath === '/' && <>{selects}</>}
    </HeaderBlock>
  )
}
