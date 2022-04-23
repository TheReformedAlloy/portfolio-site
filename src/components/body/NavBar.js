import {
    Navbar,
    Nav,
    Form,
    FormControl,
    InputGroup,
    Container,
    Button
} from 'react-bootstrap';

import Image from 'next/image';

export default function NavBar ({user}) {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" id="navbar">
            <Container lg={10}>
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <Image
                        src="/favicon.svg"
                        className="d-inline-block align-top"
                        alt="Reformed Alloy Logo"
                        width="48px"
                        height="48px"
                    />
                    Reformed Alloy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between flex-column align-items-start flex-lg-row align-items-lg-center">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/projects">Projects</Nav.Link>
                        <Nav.Link href="/gallery">Gallery</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center">
                        <Form inline="true" action="/search" method="get">
                            <InputGroup>
                                <FormControl type="text" name="q" placeholder="Search" className="mr-sm-2" />
                                <Button type="submit" variant="success">Search</Button>
                            </InputGroup>
                        </Form>
                        {user ? 
                            <>
                                <Nav.Link href="/admin">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-unlock text-light" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M9.655 8H2.333c-.264 0-.398.068-.471.121a.73.73 0 0 0-.224.296 1.626 1.626 0 0 0-.138.59V14c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 0 0 .436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 0 0 .224-.296 1.627 1.627 0 0 0 .138-.59V9c0-.342-.076-.531-.14-.635a.658.658 0 0 0-.255-.237A1.122 1.122 0 0 0 9.655 8zm.012-1H2.333C.5 7 .5 9 .5 9v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2V9c0-2-1.833-2-1.833-2zM8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                                    </svg>
                                </Nav.Link>
                                <Nav.Link href="/logout">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-door-closed text-light" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z"/>
                                        <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"/>
                                    </svg>
                                </Nav.Link>
                            </>
                        :
                            <Nav.Link href="/login">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-lock text-light" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                                </svg>
                            </Nav.Link>
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
