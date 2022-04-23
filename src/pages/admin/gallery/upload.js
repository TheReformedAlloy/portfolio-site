import {
    Container,
    Form,
    Button
} from 'react-bootstrap';

import { useState } from 'react';
import MarkDownEditor from '../../../components/forms/MarkDownEditor';
import CustomFileInput from '../../../components/forms/CustomFileInput';

export default function Upload(props){
    const [imgs, setImgs] = useState({});

    return (
        <>  
            <Container className="p-3">
                <h1>Create a New Gallery Post:</h1>
                <Form action="/api/gallery" method="post" encType="multipart/form-data">
                    <Form.Group controlId="postTitle">
                        <Form.Label>Exhibit Title</Form.Label>
                        <Form.Control name="title" type="text" />
                    </Form.Group>
                    <CustomFileInput controlId="postFiles" title="Exhibit Images" />
                    <MarkDownEditor controlId="postText" title="Exhibit Text" />
                    <Button type="submit">Submit Post</Button>
                </Form>
            </Container>
        </>
    );  
}