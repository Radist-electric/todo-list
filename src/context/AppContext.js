import { createContext } from 'react'

function noop() {}

export const AppContext = createContext({
  selectHandler: noop,
  actionsHandler: noop,
  viewHandler: noop,
  editHandler: noop,
  addPost: noop,
  addHandler: noop,
  paginationHandler: noop,
  sorting: [],
  currentSorting: [],
  data: [],
  pagination: {}
})