import {
    Container,
    Form,
    Col,
    Button
} from 'react-bootstrap';

import Head from 'next/head';

import React from 'react';

export default class Upload extends React.Component {
    componentDidMount() {
        var simplemde = new SimpleMDE({ element: $("#postText")[0] });
    }

    render() {
        return (
            <>
                <Head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
                    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
                </Head>
                <Container className="p-3">
                    <h1>Create a New Project Post:</h1>
                    <Form action="/api/projects" method="post">
                        <Form.Group controlId="postTitle">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control name="name" type="text" />
                        </Form.Group>
                        <Form.Group controlId="postText">
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control name="description" as="textarea" />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="srcLink">
                                <Form.Label>SRC Link</Form.Label>
                                <Form.Control name="src" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="downloadLink">
                                <Form.Label>Download Link</Form.Label>
                                <Form.Control name="download" />
                            </Form.Group>
                        </Form.Row>
                        
                        <Button type="submit">Submit Post</Button>
                    </Form>
                </Container>
            </>
        );
    }
}