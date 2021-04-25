import { useState, useEffect } from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { Header } from './components/header'
import { initDataSorting } from './data/initDataSorting'
import { initDataList } from './data/initDataList'
import { initCurrentSorting } from './data/initCurrentSorting'
import { View } from './components/view'
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
  const [view, setView] = useState({
    show: false,
    post: null
  })

  const selectHandler = (type, value, header) => {
    if (header) {
      const newSorting = [...currentSorting].map((item) => item.type === type ? { type, value } : item)
      setCurrentSorting(newSorting)
    } else {
      setView(view, view[type] = value)
    }
  }

  const viewHandler = (action) => {
    // action === false - Просто выйти
    // action === true - Применить новое значение и выйти
    if (action) {
      const newData = [...data]
      newData[data.findIndex((item) => item.id === view.post.id)].type = view.type
      setData(newData)
    }
    setView({
      show: false,
      post: null
    })
  }

  const actionsHandler = (id, action) => {
    switch (action) {
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

  // Переводим запись в статус "Завершённые"
  const completePost = (id) => {
    const newData = [...data]
    newData[data.findIndex((item) => item.id === id)].relevance = 'Завершённые'
    setData(newData)
  }

  // Просмотр записи
  const viewPost = (id) => {
    setView({
      show: true,
      post: currentData.find((item) => item.id === id)
    })
  }

  // Редактирование записи
  const editPost = (id) => {
    console.log('editPost', id)
  }

  // Удаление записи
  const deletePost = (id) => {
    const newData = [...data]
    newData.splice(data.findIndex((item) => item.id === id), 1)
    setData(newData)
  }

  // Применение фильтров к списку записей
  const filterData = () => {
    let filteredData = [...data]
    currentSorting.forEach((item) => {
      if (item.value === 'Все') return
      filteredData = [...filteredData].filter((elem) => item.value === elem[item.type])
    })
    setCurrentData(filteredData)
  }

  // Запрос фильтра записей при изменении сортировки и самих данных записей
  useEffect(() => {
    filterData()
  }, [currentSorting, data]) // eslint-disable-line react-hooks/exhaustive-deps


  // Вызываем окно просмотра записи при запросе
  // useEffect(() => {

  // }, [view])


  return (
    <AppContext.Provider value={{ selectHandler, actionsHandler, viewHandler, sorting, currentSorting, data: currentData }}>
      <Router>
        <AppBlock>
          <Header />
          {routes}
        </AppBlock>
        {view.show && <View post={view.post} />}
      </Router>
    </AppContext.Provider>
  )
}
