import { useState, useEffect } from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { Header } from './components/header'
import { initDataSorting } from './data/initDataSorting'
import { initDataList } from './data/initDataList'
import { initCurrentSorting } from './data/initCurrentSorting'
import { View } from './components/view'
import { Edit } from './components/edit'
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
  const [edit, setEdit] = useState({
    show: false,
    post: null
  })

  const selectHandler = (type, value, element) => {
    switch (element) {
      case 'header':
        const newSorting = [...currentSorting].map((item) => item.type === type ? { type, value } : item)
        setCurrentSorting(newSorting)
        break
      case 'view':
        setView({ ...view, post: { ...view.post, [type]: value } })
        break
      case 'edit':
        setEdit({ ...edit, post: { ...edit.post, [type]: value } })
        break
      default:
        console.log('Нет такого действия')
    }

  }

  const viewHandler = (action) => {
    // action === false - Просто выйти
    // action === true - Применить новое значение и выйти
    if (action) {
      const newData = [...data]
      newData[data.findIndex((item) => item.id === view.post.id)].type = view.post.type
      setData(newData)
    }
    setView({
      show: false,
      post: null
    })
  }

  const editHandler = (action, name, description) => {
    // action === false - Просто выйти
    // action === true - Применить новое значение и выйти
    if (action) {
      const index = data.findIndex((item) => item.id === edit.post.id)
      const isOldName = sorting.find((item) => item.type === 'name').list.includes(name.trim())
      const newName = isOldName ? edit.post.name : name
      const newPost = { ...data[index], ...edit.post, name: newName, description }
      const newData = [...data.slice(0, index), newPost, ...data.slice(index + 1)]
      setData(newData)
      if (!isOldName) {
        const index = sorting.findIndex((item => item.type === 'name'))
        const newNameSorting = [...sorting][index]
        newNameSorting.list.push(newName)
        const newSorting = [...sorting.slice(0, index), newNameSorting, ...sorting.slice(index + 1)]
        setSorting(newSorting)
      }
    }
    setEdit({
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
    setEdit({
      show: true,
      post: currentData.find((item) => item.id === id)
    })
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

  // Фильтрация записей при изменении сортировки и самих данных записей
  useEffect(() => {
    filterData()
  }, [currentSorting, data]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider value={{ selectHandler, actionsHandler, viewHandler, editHandler, sorting, currentSorting, data: currentData }}>
      <Router>
        <AppBlock>
          <Header />
          {routes}
        </AppBlock>
        {view.show && <View post={view.post} />}
        {edit.show && <Edit post={edit.post} />}
      </Router>
    </AppContext.Provider>
  )
}
