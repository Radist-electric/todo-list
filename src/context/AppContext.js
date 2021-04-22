import { createContext } from 'react'

function noop() {}

export const AppContext = createContext({
  selectHandler: noop
})