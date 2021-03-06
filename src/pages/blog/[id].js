import { getBlogData } from '../../lib/blog';

import {
    Container,
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';

import Date from '../../components/functions/Date';
import CommentSection from '../../components/comments/CommentSection';

import Head from 'next/head';

import {useState} from 'react';

export default function Blog({user, post}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleDelete = async () => {
        await fetch(`${process.env.hostURL}/api/blog/${post.id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(() => {
            window.location.replace(`/blog`);
        })
    }

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            {(user && user.admin) && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete this post?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this post?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            )}
            <Container>
                <Row>
                    <Col>
                        <h1>{post.title}</h1>
                    </Col>
                    {(user && user.admin) && (
                        <Col xs={12} lg={4} className="d-flex align-items-center">
                            <a href={`/admin/blog/edit/${post.id}`} className="px-2"> 
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
                            </a>
                            <a onClick={handleOpen} className="px-2">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </a>
                        </Col>
                    )}
                </Row>
                <Date dateString={post.createdAt} />
                <br />
                <Container className="p-3 blog-display" dangerouslySetInnerHTML={{ __html: post.contentHTML  }} />
                <CommentSection user={user} postID={post.id}></CommentSection>
            </Container>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const post = await getBlogData(params.id);

    return {
        props: {
            post
        }
    }
}