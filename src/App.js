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

  const actionsHandler = (id, action) => {
    switch(action) {
      case 'complete':
        completePost(id)
      break
      case 'view':
        viewPost(id)
      break
      case 'edit':
        editPost(id)
      break
      case 'delete':
        deletePost(id)
      break
      default:
        console.log('Нет такого действия')
    }
  }

  const completePost = (id) => {
    const newData = [...data]
    newData[data.findIndex((item) => item.id === id)].relevance = 'Завершённые'
    setData(newData)
  }

  const viewPost = (id) => {
    console.log('viewPost',id)
  }

  const editPost = (id) => {
    console.log('editPost',id)
  }

  const deletePost = (id) => {
    const newData = [...data]
    newData.splice(data.findIndex((item) => item.id === id), 1)
    setData(newData)
  }

  const filterData = () => {
    let filteredData = [...data]
    currentSorting.forEach((item) => {
      if(item.value === 'Все') return
      filteredData = [...filteredData].filter((elem) => item.value === elem[item.type])
    })
    setCurrentData(filteredData)
  }

  useEffect(() => {
    filterData()
  }, [currentSorting, data]) // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <AppContext.Provider value={{ selectHandler, actionsHandler, sorting, currentSorting, data: currentData }}>
      <Router>
        <AppBlock>
          <Header />
          {routes}
        </AppBlock>
      </Router>
    </AppContext.Provider>
  )
}
