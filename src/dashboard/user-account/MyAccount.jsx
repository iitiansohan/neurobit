import React, { useContext, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { authContext } from "../../components/context/authContext.component";
import useFetchdata from '../../hooks/useFetchdata.jsx';
import { BASE_URL } from '../../config.js';

import userLogo from '../../assets/userLogo.png';
import './MyAccount.styles.scss'
import Profile from './Profile.jsx';
import MyBookings from './MyBookings.jsx';
import Loading from '../../components/loader/loader.component.jsx';
import Error from '../../components/error/error.component.jsx';

const MyAccount = () => {

    const { user, dispatch } = useContext(authContext);
    const [tab, setTab] = useState('bookings')

    const { data: userData,
        loading,
        error
    } = useFetchdata(`${BASE_URL}/users/profile/me`)

    console.log("userData", userData);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    };

    return (
        <section>
            <div className='px-5 mx-auto main'>

                {loading && !error && <Loading />}

                {error && !loading && <Error errMessage={error} />}

                {!loading && !error && (<Row>
                    <Col>
                        <img
                            src={userLogo}
                            style={{ width: '130px', height: '130px' }}
                            alt="User Logo"
                            className="rounded-circle mx-auto d-block"
                        />
                        <div className=' text mt-4 text-center'>
                            <h3>{userData.name}</h3>
                            <p>{userData.email}</p>
                            <p>Phone: {userData.phone}</p>
                            <p>Blood Type: {userData.bloodType}</p>

                            <Button variant='dark'
                                onClick={handleLogout}
                                className='mt-5'
                            >Logout</Button>
                        </div>
                    </Col>
                    <Col>
                        <Button variant={`${tab === "bookings" && "dark"}`}
                            onClick={() => setTab('bookings')}
                        >My Bookings
                        </Button>{' '}
                        <Button variant={`${tab === "settings" && "dark"}`}
                            onClick={() => setTab('settings')}
                        >Profile Settings
                        </Button>

                        {tab === 'bookings' && <MyBookings />}
                        {tab === 'settings' && <Profile user={userData} />}
                    </Col>
                </Row>)}

            </div></section>
    )
}

export default MyAccount