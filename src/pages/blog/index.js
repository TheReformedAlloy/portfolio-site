import { getBlogList } from "../../lib/blog";

import {
    Container,
    Row
} from 'react-bootstrap';

import Date from '../../components/functions/Date';

export default function Index({posts}) {
    return (
    <>
        <Container className="framed p-4">
            <h1>Recent Posts:</h1>
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
        </Container>
    </>)
}

export async function getServerSideProps() {
    const posts = await getBlogList();

    return {
        props: {
            posts
        }
    }

}