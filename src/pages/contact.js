import {
    Container,
    Row,
    Col,
    Button,
    Form
} from 'react-bootstrap'

export default function Contact() {
    return (
        <>
            <Container className="py-3">
                <h3>Contact Me:</h3>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control type="text" placeholder="First Name" required />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" placeholder="Email" required />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Phone:</Form.Label>
                                <Form.Control type="tel" placeholder="Phone Number" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label>Send a Message:</Form.Label>
                                <Form.Control as="textarea" placeholder="Lorem ipsum dolor set amet..." required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
                            <Button type="submit" className="w-100" >Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}