import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { authContext } from '../context/authContext.component';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import login from '../../assets/login.jpg'
import './login.scss'
import { BASE_URL } from '../../config';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const {dispatch} = useContext(authContext)

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result  = await res.json()
            if (!res.ok) {
                throw new Error(result.message)
            }

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload:{
                   user: result.data,
                   token: result.token,
                   role: result.role, 
                }
            })

            console.log(result, "login data");

            setLoading(false)
            toast.success(result.message)
            navigate('/')
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <Row>
            <Col >
                <div className='loginImage'>
                    <img src={login} alt='sry' className='loginImg'></img>
                </div>
            </Col>
            <Col>
                <h2 className='mt-4 px-5 mx-5'>Welcome back</h2>

                <Form className='form px-3' onSubmit={submitHandler}>
                    <Form.Group className="mb-4 mt-4" controlId="formGroupEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control style={{ width: "25rem" }}
                            type="email"
                            placeholder="Enter email"
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-4 " controlId="formGroupPassword">
                        <Form.Label  >Password</Form.Label>
                        <Form.Control style={{ width: "25rem" }}
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required />

                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <span style={{ fontSize: 'smaller' }}>
                            Don't have an account?
                        </span>
                        <Link style={{ marginLeft: '10px', textDecoration: 'none' }}
                            to="/signup">Signup</Link>
                    </Form.Group>

                    <Button variant="outline-info"
                            disabled={loading && true}
                            type='submit'
                            style={{ width: "10rem" }}>
                            {loading ? <HashLoader size={22} color='#3ba12e' /> : "Login"}
                        </Button>
                </Form>

            </Col>
        </Row>
    )
}

export default Login;