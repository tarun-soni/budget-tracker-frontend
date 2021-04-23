import React from 'react'
import { Container, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useRecoilState } from 'recoil'

import { userInfoState } from '../store/login'
const Header = () => {
  const [userInfo] = useRecoilState(userInfoState)

  return (
    <>
      <Navbar
        className="font-weight-bold navbar-dark bg-primary"
        // bg="dark"
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
                  <NavDropdown title="VIEW DETAILED DATA">
                    <LinkContainer to="/everyMonthDetails">
                      <NavDropdown.Item>EVERY MONTH DETAILS</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/allCategoryDetails">
                      <NavDropdown.Item>CATEGORY WISE DETAILS</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <LinkContainer to="/logout">
                    <Nav.Link>SIGN OUT</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>SIGN IN</Nav.Link>
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
