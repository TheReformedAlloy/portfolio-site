import { getListOfExhibits } from '../../lib/gallery';

import {
    Container,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';

import {Component} from 'react';

export default class Exhibits extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Container className="py-3">
                    <Row>
                        <h1>My Recent Work:</h1>
                    </Row>
                    <Row>
                        {this.props.exhibits.length > 0 ?
                            this.props.exhibits.map(exhibit => {
                                return (
                                    <Col xs={12} md={4} key={`project-${exhibit.galleryID}`}>
                                        <Card.Img className="text-center p-1" style={{maxHeight: "250px"}} variant="top" src={`data:${exhibit.imgs[0].contentType};base64,${exhibit.imgs[0].data}`} />
                                        <Card.Body>
                                            <Card.Title>{exhibit.title}</Card.Title>
                                            <Card.Text className="text-muted" >{exhibit.excerpt}</Card.Text>
                                        </Card.Body>
                                        <Button className="m-2" variant="primary" href={`/gallery/${exhibit.galleryID}`}>View</Button>
                                    </Col>
                                )
                            })
                        :
                            <h4>No exhibits are currently available.</h4>
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

export async function getServerSideProps() {
    const exhibits = await getListOfExhibits();


    return {
        props: {
            exhibits: [
                ...exhibits
            ]
                
        }
    }

}