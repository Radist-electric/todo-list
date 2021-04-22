import {useState} from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { Header } from './components/header'
import { initDataSorting } from './data/initDataSorting'
import { initDataList } from './data/initDataList'
import { initCurrentSorting } from './data/initCurrentSorting'
import styled from 'styled-components'

const AppBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1110px;
  width: 100%;
  margin: 0 auto;
`


export const App = () => {
  const routes = useRoutes()
  const [sorting, setSorting] = useState(initDataSorting)
  const [currentSorting, setCurrentSorting] = useState(initCurrentSorting)
  const [data, setData] = useState(initDataList)

  const selectHandler = (value, type) => {
    console.log('selectHandler', value, type)
  }


  return (
    <AppContext.Provider value={{selectHandler, sorting, currentSorting, data}}>
      <Router>
        <AppBlock>
          <Header />
          {routes}
        </AppBlock>
      </Router>
    </AppContext.Provider>
  )
}
