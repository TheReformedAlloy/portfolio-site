import { useState, useEffect } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';

import Date from '../functions/Date';
import PlaceholderForm from '../forms/PlaceholderForm';

import { getExhibitData } from '../../lib/gallery';

export default function ExhibitDisplay({user, exhibitID}) {
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [exhibit, setExhibit] = useState(null);

    const handleDelete = async () => {
        await fetch(`${process.env.hostURL}/api/gallery/${post.id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(() => {
            window.location.replace(`/gallery`);
        })
    }

    useEffect(() => {
        getExhibitData(exhibitID)
            .then(res => setExhibit(res))
    }
    , [])

    useEffect(() => {
        if(exhibit) {
            setIsLoading(false);
        }
    }, [exhibit])

    return (
        <>
            {!isLoading ?
                <>
                    <Head>
                        <title>{exhibit.title}</title>  
                    </Head>
                    {(user && user.admin) && (
                        <Modal show={showDeleteModal} onHide={() => {setShowDeleteModal(false)}}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete this exhibit?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to delete this exhibit?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                                <Button variant="secondary" onClick={() => {setShowDeleteModal(false)}}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                    <Container>
                        <Row>
                            <Col>
                                <h1>{exhibit.title}</h1>
                            </Col>
                            {(user && user.admin) && (
                                <Col xs={12} lg={4} className="d-flex align-items-center">
                                    <a href={`/admin/gallery/edit/${exhibit.galleryID}`} className="px-2"> 
                                        <i className="bi bi-pencil-square" />
                                    </a>
                                    <a onClick={() => {setShowDeleteModal(true)}} className="px-2">
                                        <i className="bi bi-x-square" style={{cursor: "pointer"}} />
                                    </a>
                                </Col>
                            )}
                        </Row>
                        <Date dateString={exhibit.createdAt} />
                        <br />
                        <Carousel>
                            {exhibit.files.map((img, index) => {
                                return (
                                    <Carousel.Item key={`img-${index}`} className="p-2" style={{height: "50vh", backgroundColor: "#202036", overflow: "hidden"}}>
                                        <Image className="d-block mx-auto" alt={img.imgDesc} src={`https://s3.amazonaws.com/reformed-alloy/gallery/${exhibitID}/${encodeURIComponent(img.fileName)}.${img.imgType}`}  layout="fill" objectFit="contain" />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                        <Container className="p-3 blog-display" dangerouslySetInnerHTML={{ __html: exhibit.contentHTML  }} />
                    </Container>
                </>
            :
                <PlaceholderForm />
            }
        </>
    )
}