import { useState, useEffect } from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { Header } from './components/header'
import { initDataSorting } from './data/initDataSorting'
import { initDataList } from './data/initDataList'
import { initCurrentSorting } from './data/initCurrentSorting'
import { initPagination } from './data/initPagination'
import { View } from './components/view'
import { Edit } from './components/edit'
import nextId from 'react-id-generator'
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
  const [pagination, setPagination] = useState(initPagination)
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
  const [add, setAdd] = useState({
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
      case 'add':
        setAdd({ ...add, post: { ...add.post, [type]: value } })
        break
      default:
        console.log('Нет такого действия')
    }

  }

  // Обработка данных просмотра записи
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

  // Обработка данных редактирования записи
  const editHandler = (action, name, description, date) => {
    // action === false - Просто выйти
    // action === true - Применить новое значение и выйти
    if (action) {
      const index = data.findIndex((item) => item.id === edit.post.id)
      const isOldName = sorting.find((item) => item.type === 'name').list.includes(name.trim())
      const newName = isOldName ? edit.post.name : name
      const newPost = { ...data[index], ...edit.post, name: newName, description, date }
      const newData = [...data.slice(0, index), newPost, ...data.slice(index + 1)]
      setData(newData)
      if (!isOldName) changeSorting(newName)
    }
    setEdit({
      show: false,
      post: null
    })
  }

  // Обработка данных добавления записи
  const addHandler = (action, name, description, date) => {
    // action === false - Просто выйти
    // action === true - Применить новое значение и выйти
    if (action) {
      const isOldName = sorting.find((item) => item.type === 'name').list.includes(name.trim())
      const newName = isOldName ? add.post.name : name
      const newPost = { ...add.post, id: nextId(), name: newName, description, date }
      const newData = [...data]
      newData.unshift(newPost)
      setData(newData)
      if (!isOldName) changeSorting(newName)
    }
    setAdd({
      show: false,
      post: null
    })
  }

  // Добавить новый пенкт в сортровку Названия
  const changeSorting = newName => {
    const index = sorting.findIndex((item => item.type === 'name'))
    const newNameSorting = [...sorting][index]
    newNameSorting.list.push(newName)
    const newSorting = [...sorting.slice(0, index), newNameSorting, ...sorting.slice(index + 1)]
    setSorting(newSorting)
  }

  // Обработка кнопок действий списка записей
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

  // Добавление новой записи
  const addPost = () => {
    const newPost = {
      id: null,
      name: sorting.find((item) => item.type === 'name').list[0],
      description: '',
      type: sorting.find((item) => item.type === 'type').list[0],
      date: getISODate(new Date(Date.now())),
      relevance: sorting.find((item) => item.type === 'relevance').list[0]
    }
    setAdd({
      show: true,
      post: newPost
    })
  }

  // Получаем время в нужно формате
  const getISODate = time => {
    const num = (number) => number < 10 ? '0' + number : number
    return `${time.getFullYear()}-${num(time.getMonth() + 1)}-${num(time.getDay())}T${num(time.getHours())}:${num(time.getMinutes())}`
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
    setPagination({
      currentPage: 1,
      limit: 10
    })
  }

  // Обработка пагинации
  const paginationHandler = page => {
    if (page !== 0 && page <= Math.ceil(currentData.length / pagination.limit) && page !== pagination.currentPage) {
      setPagination({
        currentPage: page,
        limit: 10
      })
    }
  }

  // Фильтрация записей при изменении сортировки и самих данных записей
  useEffect(() => {
    filterData()
  }, [currentSorting, data]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider value={{ selectHandler, actionsHandler, viewHandler, editHandler, addPost, addHandler, paginationHandler, sorting, currentSorting, data: currentData, pagination }}>
      <Router>
        <AppBlock>
          <Header />
          {routes}
        </AppBlock>
        {view.show && <View post={view.post} />}
        {edit.show && <Edit post={edit.post} action={true} />}
        {add.show && <Edit post={add.post} action={false} />}
      </Router>
    </AppContext.Provider>
  )
}
