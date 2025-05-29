import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/home/home.component';
import Header from "./components/header/header.component";
import Footer from './components/footer/footer.component';
import DoctorListWithBooking from './components/doctors/doctorlist.component';
import Login from './components/sign-in-and-sign-up/login';
import Signup from './components/sign-in-and-sign-up/signup';
import MyAccount from './dashboard/user-account/MyAccount';
import ProtectedRoute from './routes/protectedRoute';



const App = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchedDoctors = require('./assets/doctors');
    setDoctors(fetchedDoctors);
  }, []);

  const isDoctorAvailable = (doctor) => {

    return true; // Placeholder; customize according to your needs
  };

  const handleBookAppointment = (doctorId) => {
    console.log(`Booking appointment with doctor ${doctorId}`);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/doctors' element={<DoctorListWithBooking doctors={doctors} onBookAppointment={handleBookAppointment} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
