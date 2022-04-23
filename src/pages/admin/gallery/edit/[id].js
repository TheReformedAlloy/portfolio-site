import { getExhibitData, getExhibitIDs } from './../../../../lib/gallery';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import React, { useEffect, useState } from 'react';
import MarkDownEditor from '../../../../components/forms/MarkDownEditor';
import CustomFileInput from '../../../../components/forms/CustomFileInput';
import PlaceholderForm from '../../../../components/forms/PlaceholderForm';

export default function EditPost({exhibitID}){
    const [isLoading, setIsLoading] = useState(true);

    const [post, setPostData] = useState(null);

    const [fileList, setFileList] = useState(null);

    useEffect(() => {
        getExhibitData(exhibitID)
        .then(res => {
            setPostData(res)
        })
    }, [])

    useEffect(() => {
        if((post) && (post.files.length > 0)) {
            const newFiles = new DataTransfer(0);
            Promise.all(post.files.map(img => {
                return fetch(`https://s3.amazonaws.com/reformed-alloy/gallery/${exhibitID}/${encodeURIComponent(img.fileName)}.${img.imgType}`, {headers: {mode: "no-cors"}})
                    .then(res => res.blob())
                    .then(res => {
                        newFiles.items.add(new File([res], `${img.fileName}.${img.imgType}`, {type: img.contentType}));
                    });
            })).then(() => {
                setFileList(newFiles);
                setIsLoading(false);
            });
        }
    }, [post]);
    
    return (
        <>
            <Container className="p-3">
                {isLoading && <PlaceholderForm />}
                {post &&
                    <>
                        <Container fluid className={isLoading ? "d-none" : ""}>
                            <h1>Edit Your Gallery Post:</h1>
                            <Form action={`/api/gallery/${exhibitID}`} method="post" encType="multipart/form-data">
                                <Form.Group controlId="postTitle">
                                    <Form.Label>Exhibit Title</Form.Label>
                                    <Form.Control name="title" type="text" defaultValue={post.title} />
                                </Form.Group>
                                <CustomFileInput controlId="postFiles" title="Exhibit Files:" name="files" value={fileList} />
                                <MarkDownEditor controlId="postText" title="Exhibit Description:" defaultValue={post.description} />
                                <Button type="submit">Submit Post</Button>
                            </Form>
                        </Container>
                    </>
                }
            </Container>
        </>
    );
}

export async function getStaticPaths() {
    const exhibitIDs = await getExhibitIDs();
    const paths = exhibitIDs.map(item => ({
        params: {
            id: item.galleryID
        }
    }))

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            exhibitID: params.id
        }
    }
}