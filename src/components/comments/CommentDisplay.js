
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import {Component} from 'react';

export default class CommentDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <strong>{this.props.comment.authorName}</strong>
                </Row>
                <Row>
                    {this.props.comment.text}
                </Row>
            </Container>
        )
    }
}
