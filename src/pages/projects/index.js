import { getProjectList } from '../../lib/projects';

import {
    Container,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';

import {Component} from 'react';

export default class Projects extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Container className="framed p-4">
                    <Row>
                        <h1>My Current Projects</h1>
                    </Row>
                    <Row>
                        <Col>
                            <p>I have a lot of different ideas that I am currently working on, but am most interested in game design, especially games in the vein of Undertale that deal with deep emotional and philosophical concepts while remaining fun to play. Ultimately, I have the dream of working on Christian video games that might do the same, although I am a long way from doing so. on my way there, I&apos;m hoping to create a lot of projects, some of which can be found either on my GitHub or in the sections below.</p>
                            <p>I also am working on honing my skills with pixel art, especially for use later in game design. Keep an eye on my gallery to see what I&apos;ve been working on recently.</p>
                        </Col>
                        <Col className="d-flex flex-column justify-content-around">
                            <Button variant="outline-primary" href="https://github.com/TheReformedAlloy">My GitHub</Button>
                            <Button variant="outline-primary" href="#">My Gallery</Button>
                        </Col>
                    </Row>
                    <Row>
                        {this.props.projects.length > 0 ?
                            this.props.projects.map(project => {
                                return (
                                    <Col xs={12} md={4} lg={3} key={`project-${project.projectID}`}>
                                        <Card>
                                            {project.thumbnail && <Card.Img variant="top" src="" />}
                                            <Card.Body>
                                                <Card.Title>{project.name}</Card.Title>
                                                <Card.Text className="text-muted" >{project.excerpt}</Card.Text>
                                            </Card.Body>
                                            <Button className="m-2" variant="primary" href={`/projects/${project.projectID}`}>View</Button>
                                        </Card>
                                    </Col>
                                )
                            })
                        :
                            <h4>No projects are currently available.</h4>
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

export async function getServerSideProps() {
    const projects = await getProjectList();

    return {
        props: {
            projects
        }
    }

}