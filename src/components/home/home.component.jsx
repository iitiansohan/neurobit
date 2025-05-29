import React from "react";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ConditionCard from "../condition-card/condition-card.component";

import "./home.styles.scss";
import doc from "../../assets/doc.jpg";
import tmed from "../../assets/tmed.jpg";
import ftrimg from "../../assets/ftrimg.jpg";

const Home = () => (
    <section className="body">
        <Row>
            <Col>
                <div className="container1" style={{ width: "30rem" }}>
                    <h2 className="fw-bold fst-italic text-black">
                    Connect with healthcare professionals from the comfort of your home.
                    </h2>
                    <br />
                    <p>Telehealth appointments available for:</p>
                    <li>Allergies</li>
                    <li>Cold & flu</li>
                    <li>Hair loss</li>
                    <li>Prescription Refills</li>
                    <li>Anxiety & Depression</li>
                    <br />
                    <Link to="/doctors">
                        <Button variant="primary">Schedule an Appointment</Button>{' '}
                    </Link>
                </div>
            </Col>
            <Col>

                <div className="image">
                    <img className="img" src={doc} alt="" />
                    
                </div>
            </Col>

        </Row>

        <Row>
            <h2 className="fw-bold text-black">
                    Common conditions we treat:
                    </h2>
            {/* <h2>Common conditions we treat:</h2> */}
            <ConditionCard 
            title="Prescriptions"
            conditions={['Refills','Asthma','High blood pressure','Cholestrol','Birth control']}
            />
            <ConditionCard 
            title="Cold & flu"
            conditions={['COVID-19','Cough','Fever','Headaches','Nausea & vomiting']}
            />
            <ConditionCard 
            title="Skin & hair"
            conditions={['Hair loss','Acne','Eczema','Sunburn','Gout']}
            />
            <ConditionCard 
            title="Mental health"
            conditions={['Anxiety','Depression','Stress','Grief & loss','PTSD']}
            />
            
        </Row>
        <Row>
            <Col>
                <img className="img2" src={ftrimg} />
            </Col>
        </Row>
        <div className="lstext" >
            <div className="insidetext">
                <p>From colds to cholesterol to depression, think of us as your first stop for everyday care.</p>
            </div>
        </div>

    </section>

);

export default Home;