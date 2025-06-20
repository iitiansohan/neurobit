import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import doc from '../../assets/doctors';
import { BASE_URL, token } from '../../config';
import useFetchdata from '../../hooks/useFetchdata';
import './doctorlist.styles.scss';

const isDoctorAvailable = (doctor) => {
  return true;
};

const DoctorListWithBooking = () => {
  const {
    data: userData,
    loading,
    error
  } = useFetchdata(`${BASE_URL}/users/profile/me`);

  const handleBookAppointment = async (doctorId, appointmentTime) => {
    try {
      const response = await fetch(`${BASE_URL}/appointments/book-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ✅ attach token here
        },
        body: JSON.stringify({
          doctorId,
          appointmentTime,
        }),
      });

      const { message } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      toast.success(message);
    } catch (error) {
      console.log('Error booking appointment:', error);
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <br /><br />
      <Row xs={1} md={3} sm={2} className="g-4">
        {doc && doc.length > 0 ? (
          doc.map((doctor) => (
            <Col key={doctor._id}>
              <Card border="dark" className="card-hover">
                <Card.Img variant="top" className="image" src={doctor.imgURL} alt="sry" />
                <Card.Body>
                  <Card.Title>{doctor.name}</Card.Title> - {doctor.specialty.toUpperCase()}
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Experience: {doctor.experience} years</ListGroup.Item>
                    <ListGroup.Item>Education: {doctor.education}</ListGroup.Item>
                    <ListGroup.Item>
                      Availability:
                      <ul>
                        {doctor.availability.map((slot) => (
                          <li key={`${doctor._id}_${slot.day}_${slot.startTime}`}>
                            {slot.day} - {slot.startTime} to {slot.endTime}
                            {isDoctorAvailable(doctor) && (
                              <Button
                                variant="outline-info"
                                onClick={() => handleBookAppointment(doctor._id, slot.day)}
                                disabled={!isDoctorAvailable(doctor)}
                                className="ms-2"
                              >
                                Book Appointment
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </Row>
    </Container>
  );
};

export default DoctorListWithBooking;
