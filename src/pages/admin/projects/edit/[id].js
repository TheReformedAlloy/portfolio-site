import { getProjectData } from './../../../../lib/projects';

import {
    Container,
    Form,
    Button
} from 'react-bootstrap';

import Head from 'next/head';

import React from 'react';

export default class EditPost extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var simplemde = new SimpleMDE({ element: $("#postText")[0] });
        
        simplemde.value(this.props.postData.contentMD);
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
                            <Form.Control name="name" type="text" defaultValue={this.props.postData.name}/>
                        </Form.Group>
                        <Form.Group controlId="postText">
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control name="description" as="textarea"/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="srcLink">
                                <Form.Label>SRC Link</Form.Label>
                                <Form.Control name="src" defaultValue={this.props.postData.src}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="downloadLink">
                                <Form.Label>Download Link</Form.Label>
                                <Form.Control name="download" defaultValue={this.props.postData.download}/>
                            </Form.Group>
                        </Form.Row>
                        
                        <Button type="submit">Submit Post</Button>
                    </Form>
                </Container>
            </>
        );
    }
}

export async function getServerSideProps({ params }) {
    const postData = await getProjectData(params.id);

    return {
        props: {
            postData
        }
    }
}