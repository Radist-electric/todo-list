import {useState} from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { Header } from './components/header'
import styled from 'styled-components'

const AppBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1110px;
  width: 100%;
  margin: 0 auto;
`

const initSorting = [
  {
    type: 'type',
    list: ['Рабочие', 'Личные', 'Неотложные']
  },
  {
    type: 'time',
    list: ['Текущие', 'Завершённые']
  },
  {
    type: 'name',
    list: []
  }
]

export const App = () => {
  const routes = useRoutes()
  const [sorting, setSorting] = useState(initSorting)

  const selectHandler = (value) => {
    console.log('selectHandler', value)
  }


  return (
    <AppContext.Provider value={{selectHandler, sorting}}>
      <Router>
        <AppBlock>
          <Header />
          {routes}
        </AppBlock>
      </Router>
    </AppContext.Provider>
  )
}
