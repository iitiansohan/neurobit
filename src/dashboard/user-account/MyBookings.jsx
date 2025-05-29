import useFetchdata from "../../hooks/useFetchdata";
import { BASE_URL } from "../../config";
import DoctorListWithBooking from "../../components/doctors/doctorlist.component";
import Loading from "../../components/loader/loader.component";
import Error from "../../components/error/error.component";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyBookings = () => {

  

  const { data: appointments,
    loading,
    error
  } = useFetchdata(`${BASE_URL}/users/appointments/my-appointments`)


  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div>
          <Row>
            {appointments.map(doctor => {
              <Col>
                <DoctorListWithBooking doctor={doctor} key={doctor._id} />
              </Col>
            })}
          </Row>
          {!loading && !error && appointments.length === 0 && (
            <h4 className="py-5" style={{ fontStyle: 'italic' }}>You have no bookings!!</h4>
          )}
        </div>
      )}

    </div>
  )
}

export default MyBookings