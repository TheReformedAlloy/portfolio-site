import {
    Container,
    Row,
    Col,
    Spinner,
    Alert,
    Form,
    Button
} from 'react-bootstrap';

import {useState, Component} from 'react';

export default function CommentForm ({ postID, onSubmit }) {

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError(false);
        setLoading(true);
        fetch(`https://www.reformedalloy.com/api/comments`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postID,
                content
            })
        }).then((res) => {
            setLoading(false);
            
            if(!res.ok) {
                setError(true);
            } else {
                setContent('');
                if(onSubmit) {
                    onSubmit();
                }
            }
        }).catch((e) => {
            setLoading(false);
            setError(true);
        });
    }

    return (
        <Container fluid>
        {loading ? (
            <Row>
                <Col xs={12} style={{ height: "250px" }} className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" />
                </Col>
            </Row>
        ) : (
            <Form>
                {error && <Alert variant="danger">
                    There was a problem saving your comment.
                </Alert>}
                <Form.Row>
                    <h3>Reply with a Comment:</h3>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="commentContent">
                        <Form.Label>Your Comment:</Form.Label>
                        <Form.Control as="textarea" name="commentContent" placeholder="Lorem ipsum..." value={content} onChange={({target}) => {setContent(target.value)}}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </Form.Row>
            </Form>
        )}
        </Container>
    )

} 