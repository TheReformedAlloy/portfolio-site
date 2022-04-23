import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

export default function PlaceholderForm() {
    return (
        <Container className="p-4 border rounded" >
            <Row>
                <Col xs={12} md={4} lg={3} className="h1 placeholder-skeleton bg-primary" style={{height: ".75em"}} />
            </Row>
            <Row>
                <Col xs={12} className="h1 placeholder-skeleton bg-primary" style={{height: "1em"}} />
            </Row>
            <Row>
                <Col xs={12} md={4} lg={3} className="h1 placeholder-skeleton bg-primary" style={{height: ".75em"}} />
            </Row>
            <Row>
                <Col xs={12} className="h1 placeholder-skeleton bg-primary" style={{height: "1em"}} />
            </Row>
            <Row>
                <Col xs={12} md={4} lg={3} className="h1 placeholder-skeleton bg-primary" style={{height: ".75em"}} />
            </Row>
            <Row>
                <Col xs={12} className="h1 placeholder-skeleton bg-primary" style={{height: "10em"}} />
            </Row>
        </Container>
    )
}