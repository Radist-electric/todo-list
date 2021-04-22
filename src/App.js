import { useState, useEffect } from 'react'
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
  const [currentData, setCurrentData] = useState(initDataList)

  const selectHandler = (type, value) => {
    const newSorting = [...currentSorting].map((item) => item.type === type ? { type, value } : item)
    setCurrentSorting(newSorting)
  }

  useEffect(() => {
    let filteredData = [...data]
    currentSorting.forEach((item) => {
      if(item.value === 'Все') return
      filteredData = [...filteredData].filter((elem) => item.value === elem[item.type])
    })
    setCurrentData(filteredData)
  }, [currentSorting]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <AppContext.Provider value={{ selectHandler, sorting, currentSorting, data: currentData }}>
      <Router>
        <AppBlock>
          <Header />
          {routes}
        </AppBlock>
      </Router>
    </AppContext.Provider>
  )
}
