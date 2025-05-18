import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import logo from '../../assets/LOGO.png'; // remplace par le chemin correct si besoin

const About = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4">
          <Image src={logo} alt="Logo ISSTM" fluid rounded />
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-3">À propos de l'application</h4>
              <p>
                Cette plateforme a été conçue pour simplifier la gestion des étudiants au sein de l’<strong>ISSTM</strong> (Institut Supérieur des Sciences, Technologies de Mahajanga).
              </p>
              <p>
                Développée avec <strong>React</strong>, <strong>Express</strong> et <strong>Mariadb</strong>
              </p>
              <p className="text-muted small mb-0">
                Version : 1.0 — Dernière mise à jour : Mai 2025
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
