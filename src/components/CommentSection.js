import {
    Container,
    Row,
    Col,
    Button,
    Spinner
} from 'react-bootstrap'

import React from 'react';

import CommentDisplay from './CommentDisplay';
import CommentForm from './CommentForm';
import LoginModal from './LoginModal';

export default class CommentSection extends React.Component {
    constructor(props) {
        super(props);

        this.loginModal = React.createRef();

        this.state = {
            comments: [],
            loading: false,
            postID: props.postID
        }

        this.retrieveComments = this.retrieveComments.bind(this);
        this.showLogin = this.showLogin.bind(this);
    }

    retrieveComments () {
        this.setState({
            loading: true
        });
        fetch(`https://www.reformedalloy.com/api/comments/post/${this.state.postID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    comments: data,
                    loading: false
                });
            })
    }

    componentDidMount () {
        this.retrieveComments();
    }

    showLogin() {
        this.loginModal.current.handleOpen();
    }

    render () {
        return (
        <Container fluid>
            <LoginModal ref={this.loginModal} message="You must log in to leave a comment." />
            <Row>
                <h2>Comments:</h2>
            </Row>
            <Row>
                <Col xs={12} lg={6}>
                    {this.state.loading ? (
                            <Container fluid style={{ height: "250px" }} className="d-flex justify-content-center align-items-center">
                                <Spinner animation="border" />
                            </Container>
                        ) : 
                            this.state.comments.length == 0 ? (
                                <>
                                    <h4>There are no comments on this post.</h4>
                                    <p>Be the first to comment!</p>
                                </>
                            ) : (
                                <>
                                    {this.state.comments.map(comment => {
                                        return (
                                            <CommentDisplay comment={comment} key={`cm-${comment.commentID}`} />
                                        )
                                    })}
                                </>
                            )
                    }
                </Col>
                <Col xs={12} lg={6}>
                    {this.props.user ? 
                    <CommentForm postID={this.state.postID} onSubmit={this.retrieveComments} />
                    :
                        (
                            <>
                                <p>You must login to leave a comment.</p>
                                <Button onClick={this.showLogin}>Log In</Button>
                            </>
                        )
                    }
                </Col>  
            </Row>
        </Container>
    )}
}