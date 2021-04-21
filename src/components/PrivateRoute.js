import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header'

const PrivateRoute = ({ component: C, ...props }) => {
  return (
    <Route
      {...props}
      render={() => {
        return localStorage.getItem('loginStatus') === 'true' ? (
          <>
            {props.path !== '/homescreen' && <Header />}
            <C />
          </>
        ) : (
          <Switch>
            <Redirect to="/login" />
          </Switch>
        )
      }}
    />
  )
}

export default PrivateRoute
