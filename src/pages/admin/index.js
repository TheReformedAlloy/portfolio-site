import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

export default function Admin() {
    return (
        <Container>
            <Row>
                <h1>Welcome, Future Clint.</h1>
                <p>Hope you&apos;re doing okay over there. I&apos;ve heard it gets pretty nice over in that time. I hope so, because I&apos;m sure I&apos;ll make my way over sometime soon. Either way, I left you some controls for the site below. Feel free to check them out and stuff, I guess.</p>
            </Row>
            <h2>Blog Controls</h2>
            <Button variant="primary" href="/admin/blog/upload">Create a new Post</Button>
        </Container>
    )
}