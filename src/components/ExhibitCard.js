import {
    Card,
    Button
} from 'react-bootstrap'

import {useState} from 'react'

import {getExhibitData} from '../lib/gallery';

export default function ExhibitCard(props) {
    [exhibit, setExhibit] = useState("");

    return (
        <Card key={`project-${exhibit.galleryID}`}>
            {exhibit == "" ? 
                <>
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </>
            : 
                <>
                    <Card.Img className="text-center p-1" style={{maxHeight: "250px"}} alt={exhibit.imgs[0].imgDesc} variant="top" src={`data:${exhibit.imgs[0].contentType};base64,${exhibit.imgs[0].data}`} />
                    <Card.Body>
                        <Card.Title>{exhibit.title}</Card.Title>
                        <Card.Text className="text-muted" >{exhibit.excerpt}</Card.Text>
                    </Card.Body>
                    <Button className="m-2" variant="primary" href={`/gallery/${exhibit.galleryID}`}>View</Button>
                </>
            }
        </Card>
    );
}