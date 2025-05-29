import React from 'react';
import { Col, Card } from 'react-bootstrap';

const ConditionCard = ({ title, conditions }) => {
  return (
    <Col>
      <Card
        style={{
          width: '20rem',
          background: 'linear-gradient(135deg,rgb(121, 186, 248) 0%,rgb(54, 44, 255) 100%)',
          color: 'white',  // to improve readability on dark gradient
          border: 'none',
        }}
      >
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>{title}</Card.Title>
          <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
          <Card.Text>
            <ul>
              {conditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ConditionCard;
