import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import signup from '../../assets/signup.gif'
import './login.scss'

// const BASE_URL = "http://localhost:5000/api";

const Signup = () => {

    // const [selectedFile, setSelectedFile] = useState(null)
    // const [previewURL, setPreviewURL] = useState("")
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        role: 'patient'
    });

    const navigate = useNavigate()

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    // const handleFileInputChange = async (event) => {
    //     const file = event.target.files[0]
    //     // console.log(file);
    // };
    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const { message } = await res.json()
            if (!res.ok) {

                throw new Error(message)
            }

            setLoading(false)
            toast.success(message)
            navigate('/login')
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
                    <img src={signup} alt='sry' className='loginImg'></img>
                </div>
            </Col>
            <Col>
                <div className='signup'>
                    <h2 className='mt-4 px-5 mx-5'>Create Account</h2>

                    <Form className='form px-3' onSubmit={submitHandler} >
                        <Form.Group className="mb-4 mt-4" id="formGroupName">
                            <Form.Label >Username</Form.Label>
                            <Form.Control style={{ width: "25rem" }}
                                type="name"
                                placeholder="Enter username"
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                                required />
                        </Form.Group>
                        <Form.Group className="mb-4" id="formGroupEmail">
                            <Form.Label >Email address</Form.Label>
                            <Form.Control style={{ width: "25rem" }}
                                type="email"
                                placeholder="Enter email"
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                required />
                        </Form.Group>
                        <Form.Group className="mb-4" id="formGroupPassword">
                            <Form.Label >Password</Form.Label>
                            <Form.Control style={{ width: "25rem" }}
                                type="password"
                                placeholder="Password"
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                required />
                        </Form.Group>
                        <Form.Group className="mb-4 " >
                            <Row>
                                <Col>
                                    <Form.Label >Are you a: </Form.Label>
                                    <Form.Select style={{ width: "10rem" }}
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}>
                                        <option>
                                            Select a role
                                        </option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </Form.Select>
                                </Col>
                                <Col style={{ marginRight: "16rem" }}>
                                    <Form.Label >Gender </Form.Label>
                                    <Form.Select style={{ width: "10rem" }}
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}>
                                        <option>
                                            Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Select>

                                </Col>
                            </Row>
                        </Form.Group>
                        {
                            // <Form.Group id="formFile" className="mb-4">
                            //     <Form.Label>Upload Photo</Form.Label>
                            //     <Form.Control style={{ width: "25rem" }}
                            //         type="file"
                            //         name="photo"
                            //         onChange={handleFileInputChange}
                            //         id='customFile'
                            //         accept='.png, .jpg' />
                            // </Form.Group>
                        }
                        <Button variant="outline-info"
                            disabled={loading && true}
                            type='submit'
                            style={{ width: "10rem" }}>
                            {loading ? <HashLoader size={22} color='#3ba12e' /> : "Create Account"}
                        </Button>

                        <Form.Group className='mb-3'>
                            <span style={{ fontSize: 'smaller' }}>
                                Already have an account?
                            </span>
                            <Link style={{ marginLeft: '10px', textDecoration: 'none' }}
                                to="/login">Login</Link>
                        </Form.Group>


                    </Form>
                </div>

            </Col>
        </Row>
    )
}

export default Signup;
