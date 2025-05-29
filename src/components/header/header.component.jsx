import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { authContext } from "../context/authContext.component";

import logo from '../../assets/logo.jpeg';
import doctorLogo from '../../assets/doctorLogo.png';
import userLogo from '../../assets/userLogo.png';

import './header.styles.scss';

const Header = () => {

  const { user, role, token } = useContext(authContext);

  // useEffect(()=>{
  //   console.log('User updated:', user);
  // }, [user, role, token]);

  return (

    <div className="header">
      <Navbar className="bg-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="65"
              height="65"
              className="d-inline-block "
            />{' '}
            Neurobit
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/doctors">Find a Doctor</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              {token && user ? (
                <Navbar.Brand href={`${role == "doctor" ? "doctors/profile/me" : "users/profile/me"}`}>
                  <img
                    src={`${role == 'doctor' ? doctorLogo : userLogo}`}
                    width="55"
                    height="55"
                    className="d-inline-block " />{' '}
                  {user.name}
                </Navbar.Brand>

              ) : (
                <>
                  <Nav.Link href="/login">LOGIN</Nav.Link>
                  <Nav.Link href="/signup">REGISTER</Nav.Link>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  )
};

export default Header;
