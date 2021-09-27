import {
    Container,
    Row,
    Col,
    Image,
    Button
} from 'react-bootstrap';

export default function Support() {
    return (
        <>
            <Container>
                <Row className="d-relative">
                    <Col xs={12} md={6} >
                        <h1>Buy me a Coffee?</h1>
                        <div className="d-none d-md-block">
                            <Image className="w-75" src="/img/coffee.png" />
                        </div>
                    </Col>
                    <Col className="" xs={12} md={6}>
                        <h2>If you like what I do, feel free to donate directly to me:</h2>
                        <Row className="flex-column justify-content-around h-auto">
                            <Button variant="outline-success" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=RFK659FNR6CVC&currency_code=USD">My PayPal</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}