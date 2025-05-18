import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BarChartFill, PeopleFill, PersonCheckFill } from 'react-bootstrap-icons';

const Statistics = ({ stats }) => {
  // stats attendu : { students, activeUsers, passedExams }
  return (
    <Row className="mb-4">
      <Col md={4} sm={12} className="mb-3">
        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex align-items-center">
            <PeopleFill size={36} className="text-primary me-3" />
            <div>
              <h5 className="mb-0">{stats.students}</h5>
              <small className="text-muted">Étudiants inscrits</small>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} sm={12} className="mb-3">
        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex align-items-center">
            <PersonCheckFill size={36} className="text-success me-3" />
            <div>
              <h5 className="mb-0">{stats.activeUsers}</h5>
              <small className="text-muted">Utilisateurs actifs</small>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4} sm={12} className="mb-3">
        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex align-items-center">
            <BarChartFill size={36} className="text-warning me-3" />
            <div>
              <h5 className="mb-0">{stats.passedExams}</h5>
              <small className="text-muted">Examens réussis</small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Statistics;
