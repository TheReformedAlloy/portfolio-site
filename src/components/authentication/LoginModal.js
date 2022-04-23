import {
    Modal
} from 'react-bootstrap';

import {useState, Component} from 'react';

import LoginForm from './LoginForm';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose () {this.setState({show: false})}
    handleOpen () {this.setState({show: true})}

    async handleSubmit(e) {
        e.preventDefault();

        await fetch(`${process.env.hostURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: e.currentTarget.username.value,
                password: e.currentTarget.password.value
            })
        })
            .then(res => {
                if(res.status == 200) {
                    location.reload();
                }
            })
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.message}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm handleSubmit={this.handleSubmit} />
                </Modal.Body>
            </Modal>
        )
    }
}