import Image from 'next/image';

import styles from '../../styles/modules/components/Footer.module.scss';

import {
    Container,
    Col,
    Row,
    Nav
} from 'react-bootstrap';

export default function Footer() {
    return (
        <Container fluid as="footer" id="footer" className="d-flex flex-column justify-content-center">
            <Row id={styles["footer-content"]} className="text-center pb-5">
              <Col xs={12} md={4}>
                <h5>Sitemap</h5>
                <Nav className="flex-column">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/contact">Contact Me</Nav.Link>
                  <Nav.Link href="/projects">Project Gallery</Nav.Link>
                  <Nav.Link href="/support">Support Me</Nav.Link>
                </Nav>
              </Col>
              <Col xs={12} md={4}>
                <h5>My Projects</h5>
                <Nav className="flex-column">
                  <Nav.Link href="#">Spaz</Nav.Link>
                  <Nav.Link href="#">Electrum</Nav.Link>
                </Nav>
              </Col>
              <Col xs={12} md={4}>
                <h5>My Friends</h5>
                <Nav className="flex-column">
                  <Nav.Link href="#">@jestertheartist</Nav.Link>
                </Nav>
              </Col>
              <Row>
                <div className="text-center my-3">Copyright &copy; 2019 by Clint Mooney | <a href="mailto:the.reformed.alloy@gmail.com">the.reformed.alloy@gmail.com</a> | Last updated January 3, 2020</div>
              </Row>
            </Row>
        </Container>
    )
}