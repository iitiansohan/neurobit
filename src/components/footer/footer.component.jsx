import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.jpeg';
import "./footer.styles.scss";

const Footer = () => (
    <footer className="footer">
        <hr />

        <div className="txtimg">
            <Row className="footer-row px-4">
                <Col xs={12} md={6}>
                    <p className="footernote">
                        Neurobit® telehealth services provide online medical care for urgent care, mental health, and therapy.
                    </p>
                    <div className="d-flex align-items-center">
                        <img
                            alt="Neurobit logo"
                            src={logo}
                            width="35"
                            height="35"
                            className="d-inline-block"
                        />
                        <span className="pr-lg ms-2">© {new Date().getFullYear()} Neurobit, Inc. All rights reserved.</span>
                    </div>
                    <p className="mt-2 made-with-love">Made with ❤️ by Sohan RC</p>
                </Col>

                <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-start align-items-center mt-3 mt-md-0">
                    <Link to='/register'>
                        <Button variant="link" style={{ textDecoration: 'none' }}>Register</Button>
                    </Link>
                    <Link to='/doctors'>
                        <Button variant="link" style={{ textDecoration: 'none' }}>Find Doctor</Button>
                    </Link>
                </Col>
            </Row>
        </div>
    </footer>
)

export default Footer;
