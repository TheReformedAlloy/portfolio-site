import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  ListGroup,
  Form,
  InputGroup,
  FormControl
} from 'react-bootstrap';

import styles from '../styles/modules/pages/Home.module.scss'

export default function Home() {
  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center position-relative" id={styles.hero}>
        <Container className="text-light text-center">
          <h1>Reformed Alloy</h1>
          <h2>A collection of thoughts, projects, etc.</h2>
          <Form action="/search" method="get">
            <InputGroup>
              <FormControl placeholder="Text to search for..." />
              <Button type="submit" variant="success">Search</Button>
            </InputGroup>
          </Form>
        </Container>
      </Container>
      <Container fluid id={styles["content-top"]} className="py-5">
        <Row>
          <Col><h2>To turn the world upside down...</h2></Col>
        </Row>
        <Carousel interval={15000} >
          <Carousel.Item>
            <Container>
              <h2>Looking for a web developer?</h2>
              <Row>
                <Col sm={12} md={6}>
                  <h3>Freelance Work</h3>
                  <p>I offer professional-grade work done promptly and passionately on demand. I specialize in creating Next.js and React.js websites and am experienced in any web language of your choice.</p>
                  
                  <p className="text-center text-muted">Get a quote for your project today!</p>
                  <Container fluid className="text-center">
                    <Button variant="primary" className="mx-auto" href="/contact">Contact Me</Button>
                  </Container>
                </Col>
                <Col sm={12} md={6}>
                  <h5>Services I Specialize In:</h5>
                  <ListGroup>
                    <ListGroup.Item>
                      API creation with Node.js and Next.js, Express.js, or Koa
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Styling with CSS, Bootstrap, and/or SCSS/SASS
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Template creation with React.js, Next.js, or Vue.js
                    </ListGroup.Item>
                    <ListGroup.Item>
                      NoSQL and SQL database creation, updates, and integration
                    </ListGroup.Item>
                    <ListGroup.Item>
                      .PNG and .SVG asset creation using Adobe Photoshop or Adobe Illustrator
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container fluid id={styles["content-bottom"]}>
        <Container fluid>
          <Row>
            <Col><h2 text="dark">Or to carry it on your shoulders.</h2></Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}
