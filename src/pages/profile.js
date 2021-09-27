import {
    Container,
    Alert,
    Button
} from 'react-bootstrap';

export default function Profile ({ user }) {
    return (
        <Container>
            {user ? (
                <>
                    <h1>Hello, {user.name.firstName}</h1>
                    {user.oauth && user.oauth.groupme.token ? (
                        <>
                            Logged in, token: {user.oauth.groupme.token}
                        </>
                    ) : (
                        <>
                            <Button href="https://oauth.groupme.com/oauth/authorize?client_id=CkMQ6U45lrPQXx4imMuziCm9TXGKwOkfk3fCtvQdDUZEGW2o">Log in with GroupMe</Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <Alert variant="danger">
                        You must be logged in to access this page. <a href="/login">Click here to login.</a>
                    </Alert>
                </>
            )}
        </Container>
    )
}