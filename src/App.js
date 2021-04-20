import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import {Header} from './components/header'
import styled from 'styled-components'

const AppBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1110px;
  width: 100%;
  margin: 0 auto;
`

export const App = () => {
  const routes = useRoutes()


  return (
    <Router>
      <AppBlock>
        <Header/>
        {routes}
      </AppBlock>
    </Router>
  )
}
