import { Switch, Route, Redirect } from 'react-router-dom'
import { Dashboards } from './pages/Dashboards'
import { TodoList } from './pages/TodoList'
import { NotFoundPage } from './pages/NotFoundPage'


export const useRoutes = () => {

  return (
    <Switch>
      <Route exact path="/">
        <TodoList />
      </Route>
      <Route exact path="/dashboards">
        <Dashboards />
      </Route>
      <Route exact path="/404">
        <NotFoundPage />
      </Route>
      <Redirect to="/404" />
    </Switch>
  )

}