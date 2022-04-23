import { useEffect, useState } from 'react';

import Image from "next/image";
import Script from "next/script";

import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function CustomFileInput({controlId, title, onChange, value, ...rest}) { 
    const [dataTransfer, setDataTransfer] = useState(new DataTransfer())
    const [fileURLs, setFileURLs] = useState([])

    useEffect(() => {
        if(value) setDataTransfer(value)
    }, [value])

    useEffect(() => {
        $(`#${controlId}`).prop("files", dataTransfer.files);
        createFileURLs(dataTransfer.files);
    }, [dataTransfer])

    const createFileURLs = (files) => {
        Promise.all([...files].map((item) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    console.log(fileReader.result);
                    resolve(fileReader.result);
                }

                fileReader.readAsDataURL(item);
            })
        })).then((res) => {
            setFileURLs(res)
        })
    }

    const deleteFile = (index) => {
        const newTransfer = new DataTransfer();
        const newFiles = [...dataTransfer.files];
        newFiles.splice(index, 1);
        newFiles.forEach((file) => {
            newTransfer.items.add(file);
        });
        setDataTransfer(newTransfer);
    }

    const handleFileInputChange = (e) => {
        let newFiles = [...dataTransfer.files, ...e.target.files];
        let newTransfer = new DataTransfer();
        newFiles.forEach(file => {
            newTransfer.items.add(file);
        })
        setDataTransfer(newTransfer);
    }

    return (
        <>
            <Form.Group controlId={controlId}>
                <Form.Label>{title}</Form.Label>
                <Form.Control className="custom-file"
                    type="file"
                    multiple
                    label="Search your computer for the files you would like to upload."
                    custom="true"
                    onChange={handleFileInputChange}
                    {...rest} />
            </Form.Group>
            <Container>
                <Row xs={1} sm={2} md={3} lg={5}>
                    {fileURLs.map((url, index) => (
                        <Col className="position-relative border border-secondary rounded m-2 p-0 img-upload" key={`img-${index}`}>
                            <Image className="rounded" src={url} layout="fill" objectFit="contain" />
                            <div className="position-absolute" style={{top: 0, right: 0, aspectRatio: 1}}>
                                <a style={{fontSize: "1.25em", lineHeight: "1em", cursor: "pointer"}} onClick={() => deleteFile(index)}>
                                    <i className="bi bi-x-circle-fill" />
                                </a>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}