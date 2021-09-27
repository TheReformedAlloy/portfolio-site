import { searchPosts } from '../lib/blog';
import { searchProjects } from '../lib/projects';

import {
    Container,
    Row,
} from 'react-bootstrap';

import Date from '../components/Date';

export default function Search({posts, projects}) {
    return (
        <>
            {posts && <Container>
                <h1>Relevant Posts:</h1>
                {posts.length > 0 ?
                    posts.map(post => {
                            return (
                                <Row className="p-3" key={`post-${post.blogID}`}>
                                    <a href={`/blog/${post.blogID}`}>
                                        <h4>{post.title}</h4>
                                        <Date dateString={post.createdAt} />
                                        <p className="text-muted">{post.excerpt}</p>
                                    </a>
                                </Row>
                            )
                    })
                :   
                    <h4>No posts are currently available.</h4>
                }
            </Container>}
            {projects && <Container>
                <h1>Relevant Projects:</h1>
                {projects.length > 0 ?
                    projects.map(project => {
                            return (
                                <Row className="p-3" key={`project-${project.projectID}`}>
                                    <a href={`/projects/${project.projectID}`}>
                                        <h4>{project.name}</h4>
                                        <p className="text-muted">{project.excerpt}</p>
                                    </a>
                                </Row>
                            )
                    })
                :   
                    <h4>No posts are currently available.</h4>
                }
            </Container>}
        </>
    )
}

export async function getServerSideProps({ req }) {
    const posts = await searchPosts(req.query);
    const projects = await searchProjects(req.query);

    return {
        props: {
            posts,
            projects
        }
    }
}