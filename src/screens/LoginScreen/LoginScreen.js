import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Loader from '../../components/Loader'
import { LOGIN_USER } from '../../graphql/user/mutations'
import { userInfoState } from '../../store/login'
import './loginCss.scss'

const Login = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [LoginMutation] = useMutation(LOGIN_USER)
  const { email, password } = formData

  const history = useHistory()
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    LoginMutation({
      variables: {
        email,
        password
      }
    })
      .then((res) => {
        setLoading(false)

        if (res.data.login) {
          setUserInfo({
            userId: res.data.login._id,
            isAuthenticated: true,
            name: res.data.login.name,
            email: res.data.login.email
          })
          localStorage.setItem('loginStatus', true)

          localStorage.setItem('accessToken', res.data.login.token)
          history.replace('/homescreen')
        }
      })
      .catch((error) => {
        setLoading(false)
        setUserInfo({
          userId: null,
          isAuthenticated: false,
          name: null,
          email: null
        })
        console.log(error)
      })
  }

  if (userInfo.isAuthenticated) {
    return <Redirect to="/homescreen" />
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container className="form-container">
          <Form
            className="login-form align-self-baseline"
            onSubmit={handleLogin}
          >
            <Form.Label
              className="align-self-baseline font-weight-bold"
              htmlFor="email"
            >
              Email
            </Form.Label>
            <Form.Control
              className="w-100 m-2 mb-4"
              type="email"
              placeholder="enter email"
              name="email"
              minLength="4"
              value={email}
              onChange={(e) => onChange(e)}
            ></Form.Control>
            <Form.Label
              className="align-self-baseline font-weight-bold"
              htmlFor="password"
            >
              Password
            </Form.Label>
            <Form.Control
              className="w-100 m-2"
              type="password"
              placeholder="Password"
              name="password"
              minLength="4"
              value={password}
              onChange={(e) => onChange(e)}
            ></Form.Control>
            <Button
              type="submit"
              variant="success"
              className="w-100 mt-4 lspace-small"
            >
              Login
            </Button>
          </Form>
          <div className="features">
            <div className="feature">
              <h4>Maintain your monthy budget</h4>
              <p>View Stats</p>
            </div>
            <div className="feature">
              <h4>Sign up and Login</h4>
              <p>Login to view and maintain budget.</p>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

export default Login
