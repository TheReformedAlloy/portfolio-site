import {
    Container,
    Card,
    Button,
    Spinner
} from 'react-bootstrap'

import Image from 'next/image';

import {useState} from 'react'

import {getExhibitData} from '../../lib/gallery';

export default function ExhibitCard(props) {
    const [exhibit, setExhibit] = useState(null);

    getExhibitData(props.galleryID).then((data) => {
        setExhibit(data)
    });

    return (
        <Card>
            {!exhibit ?
                <>
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center border-bottom" style={{minHeight: "150px"}}>
                        <Spinner animation="border" variant="primary" role="status" />
                        <span className="sr-only mt-2">Loading...</span>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title className="placeholder-skeleton bg-primary" style={{minHeight: "2em"}}>...</Card.Title>
                        <Card.Text className="placeholder-skeleton bg-primary m-1">...</Card.Text>
                        <Card.Text className="placeholder-skeleton bg-primary m-1">...</Card.Text>
                    </Card.Body>
                    <Button className="m-2 placeholder-skeleton" disabled variant="primary" style={{height: "2.5em"}}/>
                </>
            : 
                <>  
                    <div className="rounded mt-2 position-relative" style={{height: "175px", width: "100%", overflow: "hidden"}}>
                        <Image src={`https://s3.amazonaws.com/reformed-alloy/gallery/${exhibit.galleryID}/${encodeURIComponent(exhibit.files[0].fileName)}.${exhibit.files[0].imgType}`} layout="fill" objectFit="contain" />
                    </div>
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