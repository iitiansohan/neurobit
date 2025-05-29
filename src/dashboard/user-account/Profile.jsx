import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { token, BASE_URL } from '../../config';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Profile = ({ user }) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    bloodType: ''
  });

  const navigate = useNavigate()

  useEffect(() => {
    setFormData({ name: user.name, email: user.email, gender: user.gender, bloodType: user.bloodType, phone:user.phone })
  }, [user])

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const { message } = await res.json()
      if (!res.ok) {

        throw new Error(message)
      }

      setLoading(false)
      toast.success(message)
      navigate('/users/profile/me')
    }
    catch (error) {
      console.log(error);
      toast.error(error.message)
      setLoading(false)
    }
  }


  return (
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

        <Form.Group className="mb-4" id="formGroupPhone">
          <Form.Label >Phone Number</Form.Label>
          <Form.Control style={{ width: "25rem" }}
            type="phone"
            placeholder="Enter phone number"
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            required />
        </Form.Group>

        <Form.Group className="mb-4" id="formGroupEmail">
          <Form.Label >Blood Group</Form.Label>
          <Form.Control style={{ width: "25rem" }}
            type="text"
            placeholder="Enter blood group"
            name='bloodType'
            value={formData.bloodType}
            onChange={handleInputChange}
            required />
        </Form.Group>

        <Form.Group className="mb-4 " >
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

        </Form.Group>
        <Button variant="outline-info"
          disabled={loading && true}
          type='submit'
          style={{ width: "10rem" }}>
          {loading ? <HashLoader size={22} color='#3ba12e' /> : "Update"}
        </Button>

      </Form>
    </div>
  )
}

export default Profile