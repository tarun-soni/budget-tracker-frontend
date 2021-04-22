import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LoggedOutRoute from './components/LoggedOutRoute'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import Homescreen from './screens/Homescreen'
import Logout from './components/Logout'
import DetailedScreen from './screens/DetailedScreen'
import CategoryWisePage from './screens/CategoryWisePage'

const LOGIN = '/login'
const LOGOUT = '/logout'
const HOMESCREEN = '/homescreen'
const DETAILEDSCREEN = '/everyMonthDetails'
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={LOGOUT} exact component={Logout}></Route>

        <LoggedOutRoute
          path={LOGIN}
          exact
          component={LoginScreen}
        ></LoggedOutRoute>

        <PrivateRoute path="/" exact>
          <Redirect to={LOGIN} />
        </PrivateRoute>

        <PrivateRoute path={HOMESCREEN} exact component={Homescreen} />
        <PrivateRoute
          path="/allCategoryDetails"
          exact
          component={CategoryWisePage}
        />
        <PrivateRoute path={DETAILEDSCREEN} exact component={DetailedScreen} />
      </Switch>
    </Router>
  )
}

export default Routes
