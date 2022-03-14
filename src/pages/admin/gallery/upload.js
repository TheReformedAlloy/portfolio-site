import {
    Container,
    Form,
    Col,
    Button
} from 'react-bootstrap';

import Head from 'next/head';
import Script from 'next/script';

import React from 'react';

export default class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgs: []
        }
    }

    componentDidMount() {
        var simplemde = new SimpleMDE({ element: $("#postText")[0] });

        bsCustomFileInput.init();
    }

    render() {
        return (
            <>
                <Head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css" />
                </Head>
                <Script defer src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></Script>
                <Container className="p-3">
                    <h1>Create a New Gallery Post:</h1>
                    <Form action="/api/gallery" method="post" encType="multipart/form-data">
                        <Form.Group controlId="postTitle">
                            <Form.Label>Exhibit Title</Form.Label>
                            <Form.Control name="title" type="text" />
                        </Form.Group>
                        <Form.Group controlId="postFiles">
                            <Form.Label>Exhibit Images</Form.Label>
                            <Form.File multiple name="imgs" label="Search your computer for the files you would like to upload." custom />
                        </Form.Group>
                        <Form.Group controlId="postText">
                            <Form.Label>Exhibit Text</Form.Label>
                            <Form.Control name="description" as="textarea" />
                        </Form.Group>
                        
                        <Button type="submit">Submit Post</Button>
                    </Form>
                </Container>
            </>
        );
    }
}