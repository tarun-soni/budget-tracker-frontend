import React from 'react'
import { Container, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useRecoilState } from 'recoil'

import { userInfoState } from '../store/login'
import CustomToast from './CustomToast'
const Header = () => {
  const [userInfo] = useRecoilState(userInfoState)

  return (
    <>
      <Navbar
        className="font-weight-bold"
        bg="light"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="lspace-small">Budget Tracker</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo.isAuthenticated ? (
                <>
                  <LinkContainer to="/detailedData" className="cursor-pointer">
                    <NavItem>VIEW DETAILED DATA</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <NavItem>SIGN OUT</NavItem>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user px-1"></i>
                    SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default Header
